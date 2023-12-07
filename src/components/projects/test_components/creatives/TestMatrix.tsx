import { observer } from "mobx-react-lite";
import { Facebook_Creatives_Insert_Input, Projects_Themes as ProjectTheme, Themes_Angles_Insert_Input } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import { themes as availableThemes } from "../../../lib/constants/MatrixPreset";
import { angles as availableAngles } from "../../../lib/constants/MatrixPreset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectFacebookCreativeTemplatesContext, ProjectFacebookCreativesContext, ThemesAnglesContext, ThemesContext, toastsStore } from "../../../../stores/stores";
import { useContext } from "react";
import { Projects as Project } from "../../../../gql/graphql";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { ToastType } from "../../../../stores/toast";
import _ from 'lodash'
const TestMatrix = observer(({ project, onSave }: { project: Project, onSave: (payload: object) => void }) => {
  const themesStore = useContext(ThemesContext)
  const anglesStore = useContext(ThemesAnglesContext)
  const element_id = 'generate_creatives_modal'
  const projectFacebookCreativeTemplatesStore = useContext(ProjectFacebookCreativeTemplatesContext)
  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativesContext)
  const MAX_THEMES = 4
  const { data: projectFacebookCreativeTemplates } = useQuery({
    queryKey: ["projectFacebookCreativeTemplates"],
    retry: false,
    queryFn: () => projectFacebookCreativeTemplatesStore.fetchProjectFacebookCreativeTemplatesByProject({ project })
  })
  const { data: facebookCreatives, refetch: refetchFacebookCreatives } = useQuery({
    queryKey: ['facebookCreatives'],
    retry: false,
    queryFn: () => projectFacebookCreativesStore.fetchProjectFacebookCreativesByProjectID({ projectId: project.id })
  })
  const { data: themes, refetch: refetchThemes, isLoading } = useQuery({
    queryKey: ['themes'],
    retry: false,
    queryFn: () => themesStore.fetchThemes({ projectId: project.id })
  })
  const createThemeMutation = useMutation({
    mutationKey: ['createTheme'],
    mutationFn: () => themesStore.createTheme({ name: _.filter(availableThemes, (item) => !themeTaken(item as ProjectTheme))[0].name, projectId: project.id, numberOfAngles: themes![0].angles.length }),
    onSuccess: () => { toastsStore.addToast({ message: 'Successfully created theme', type: ToastType.SUCCESS }); refetchThemes() }
  })
  const createAnglesMutation = useMutation({
    mutationKey: ['createAngles'],
    mutationFn: () => anglesStore.createMultipleAngles({ angleObjects: themes?.map((item) => { return { theme_id: item.id, name: availableAngles[Math.floor(Math.random() * availableAngles.length)] } }) as Themes_Angles_Insert_Input }),
    onSuccess: () => { toastsStore.addToast({ message: 'Successfully created angles', type: ToastType.SUCCESS }); refetchThemes() }
  })
  const projectFacebookCreativesMutation = useMutation({
    mutationKey: ['createFacebookCreatives'],
    onMutate: () => (document.getElementById(element_id) as HTMLDialogElement).show(),
    mutationFn: ({ facebookCreativesInput }: { facebookCreativesInput: Facebook_Creatives_Insert_Input[] }) => projectFacebookCreativesStore.createProjectFacebookCreatives({ facebookCreativesInput }),
    onError: (error) => toastsStore.addToast({ message: error as string, type: ToastType.ERROR }),
    onSuccess: () => { toastsStore.addToast({ message: 'Creatives successfully created', type: ToastType.SUCCESS }); refetchFacebookCreatives(); onSave({}); (document.getElementById(element_id) as HTMLDialogElement).close() }
  })
  const deleteProjectFacebookCreativesMutation = useMutation({
    mutationKey: ['deleteFacebookCreatives'],
    mutationFn: () => projectFacebookCreativesStore.deleteProjectFacebookCreativesByProjectID({ projectId: project.id }),
    onError: (error) => toastsStore.addToast({ message: error as string, type: ToastType.ERROR }),
    onSuccess: () => { toastsStore.addToast({ message: 'Creatives successfully deleted', type: ToastType.SUCCESS }); onSave({}); refetchFacebookCreatives() }
  })
  const updateAngleMutation = useMutation({
    mutationKey: ['updateAngle'],
    mutationFn: ({ name, angleId }: { name: string, angleId: string }) => anglesStore.updateAngle({ id: angleId, payload: { name } as ThemeAngle }),
    onSuccess: () => { refetchThemes(), onSave({}) }
  })
  const updateThemeMutation = useMutation({
    mutationKey: ['updateTheme'],
    mutationFn: ({ name, themeId }: { name: string, themeId: string }) => themesStore.updateTheme({ id: themeId, payload: { name } as ProjectTheme }),
    onSuccess: () => { refetchThemes(), onSave({}) }
  })
  const handleAngleChange = (value: string, angleId: string) => {
    updateAngleMutation.mutate({ name: value, angleId })
  }
  const handleThemeChange = (value: string, themeId: string) => {
    updateThemeMutation.mutate({ name: value, themeId })
  }
  function generateCreatives() {
    const creatives = []
    if (themes && projectFacebookCreativeTemplates && projectFacebookCreativeTemplates[0]) {
      for (const theme of themes) {
        for (const angle of theme.angles) {
          creatives.push({
            project_id: project.id,
            template_name: projectFacebookCreativeTemplates[0].template_name,
            theme_id: theme.id,
            angle_id: angle.id,
            data: { ...projectFacebookCreativeTemplates[0].data, mainCopy: `This is an example of using a prompt with the theme of ${theme.name} paired with an angle of ${angle.name}` }
          })
        }
      }
    }
    projectFacebookCreativesMutation.mutate({ facebookCreativesInput: creatives })
  }
  function themeTaken(theme: ProjectTheme) {
    return Boolean(_.find(themes, (item) => theme.name === item.name))
  }
  function matrixCell(item: ProjectTheme | ThemeAngle, isTheme?: boolean, isLastTheme?: boolean, isLastAngle?: boolean) {
    return (
      <>

        {isTheme ?
          <select disabled={facebookCreatives?.length !== 0} value={item.name} onChange={(e) => handleThemeChange(e.target.value, item.id)} className='select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xs text-md font-bold' style={{ borderRadius: '0', borderRight: !isLastTheme ? '1px solid rgba(0,0,0,.14)' : "", borderBottom: '1px solid rgba(0,0,0,.14)', width: 230, height: 80 }}>
            {availableThemes.map((availableTheme) => <option disabled={themeTaken(availableTheme as ProjectTheme)} key={availableTheme.name} className="bg-white font-bold text-xxs">{availableTheme.name}</option>)}
          </select>  :
          <select disabled={facebookCreatives?.length !== 0} value={item.name} onChange={(e) => handleAngleChange(e.target.value, item.id)} className='select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xs' style={{ borderRadius: '0', borderRight: !isLastTheme ? '1px solid rgba(0,0,0,.14)' : "", borderBottom: !isLastAngle ? '1px solid rgba(0,0,0,.14)' : '', width: 230, height: 80 }}>
            {availableAngles.map((availableAngle) => <option key={availableAngle} className="bg-white font-bold text-xxs">{availableAngle}</option>)}
          </select>
        }
      </>
    )
  }
  return (
    <>
      {isLoading && <SpinningLoading isLoading={isLoading} size="loading-xl" />}
      {!isLoading && themes &&
        <div className="card" style={{ backgroundColor: 'white', padding: 0, width: 'auto' }}>
          <div className="card-body">
            <div className="mb-7">
              {facebookCreatives && facebookCreatives.length === 0 && <button className="btn btn-info border-none text-white normal-case w-[200px]" onClick={() => generateCreatives()}>Generate Creatives<SpinningLoading isLoading={projectFacebookCreativesMutation.isLoading} /></button>}
              {facebookCreatives && facebookCreatives.length !== 0 && <button className="btn btn-error border-none text-white normal-case w-[200px]" onClick={() => deleteProjectFacebookCreativesMutation.mutate()}>Remove Creatives<SpinningLoading isLoading={projectFacebookCreativesMutation.isLoading} /></button>}
            </div>
            <div className="flex overflow-x-auto">
              {
                themes?.map((theme) => <div key={theme.id}>{matrixCell(theme, true, themes.indexOf(theme) === themes.length - 1)}<div className="flex flex-col">{theme.angles.map((angle) => <div key={angle.id}>{matrixCell(angle, false, themes.indexOf(theme) === themes.length - 1, theme.angles.indexOf(angle) === theme.angles.length - 1)}</div>)}</div></div>)
              }
              <div className="flex flex-col">
                {themes.length < MAX_THEMES && <button className="btn flex-1 bg-white rounded-none ml-5" onClick={() => createThemeMutation.mutate()}><span className="mdi mdi-plus" /></button>}
              </div>
            </div>
            <div className={`flex ${themes?.length === 3 ? 'w-8/12': 'w-11/12'} mt-3`}>
              {<button disabled={facebookCreatives && facebookCreatives.length > 0} className="btn flex-1 bg-white rounded-none" onClick={() => createAnglesMutation.mutate()}><span className="mdi mdi-plus" /></button>}
            </div>
          </div>
        </div>
      }
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <div className="flex items-center gap-x-5 m-5">
            <span className="loading loading-spinner loading-lg bg-primary" />
            <div>
              <div className="text-base opacity-60">Hang tight while we're</div>
              <div className="text-xl font-bold">Generating your copy</div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
})

export default TestMatrix