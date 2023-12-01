import { observer } from "mobx-react-lite";
import { Facebook_Creatives_Insert_Input, Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import { themes as availableThemes } from "../../../lib/constants/MatrixPreset";
import { angles as availableAngles } from "../../../lib/constants/MatrixPreset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectFacebookCreativeTemplatesContext, ProjectFacebookCreativesContext, ThemesAnglesContext, ThemesContext, toastsStore } from "../../../../stores/stores";
import { useContext, useEffect } from "react";
import { Projects as Project } from "../../../../gql/graphql";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { ToastType } from "../../../../stores/toast";
const TestMatrix = observer(({ project, onUpdate }: { project: Project, onUpdate: () => void }) => {
  const themesStore = useContext(ThemesContext)
  const anglesStore = useContext(ThemesAnglesContext)
  const projectFacebookCreativeTemplatesStore = useContext(ProjectFacebookCreativeTemplatesContext)
  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativesContext)
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
  const projectFacebookCreativesMutation = useMutation({
    mutationKey: ['createFacebookCreatives'],
    mutationFn: ({ facebookCreativesInput }: { facebookCreativesInput: Facebook_Creatives_Insert_Input[] }) => projectFacebookCreativesStore.createProjectFacebookCreatives({ facebookCreativesInput }),
    onError: (error) => toastsStore.addToast({ message: error as string, type: ToastType.ERROR }),
    onSuccess: () => { toastsStore.addToast({ message: 'Creatives successfully created', type: ToastType.SUCCESS }); refetchFacebookCreatives() }
  })
  const deleteProjectFacebookCreativesMutation = useMutation({
    mutationKey: ['deleteFacebookCreatives'],
    mutationFn: () => projectFacebookCreativesStore.deleteProjectFacebookCreativesByProjectID({ projectId: project.id }),
    onError: (error) => toastsStore.addToast({ message: error as string, type: ToastType.ERROR }),
    onSuccess: () => { toastsStore.addToast({ message: 'Creatives successfully deleted', type: ToastType.SUCCESS }); refetchFacebookCreatives() }
  })
  const updateAngleMutation = useMutation({
    mutationKey: ['updateAngle'],
    mutationFn: ({ name, angleId }: { name: string, angleId: string }) => anglesStore.updateAngle({ id: angleId, payload: { name } as ThemeAngle }),
    onSuccess: () => { refetchThemes(), onUpdate() }
  })
  const updateThemeMutation = useMutation({
    mutationKey: ['updateTheme'],
    mutationFn: ({ name, themeId }: { name: string, themeId: string }) => themesStore.updateTheme({ id: themeId, payload: { name } as ProjectTheme }),
    onSuccess: () => { refetchThemes(), onUpdate() }
  })
  const handleAngleChange = (value: string, angleId: string) => {
    updateAngleMutation.mutate({ name: value, angleId })
  }
  const handleThemeChange = (value: string, themeId: string) => {
    updateThemeMutation.mutate({ name: value, themeId })
  }
  useEffect(() => {

  }, [facebookCreatives])
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
  function matrixCell(item: ProjectTheme | ThemeAngle, isTheme?: boolean, isLastTheme?: boolean, isLastAngle?: boolean) {
    return (
      <>

        {isTheme ?
          <select disabled={facebookCreatives?.length !== 0} value={item.name} onChange={(e) => handleThemeChange(e.target.value, item.id)} className='select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xstext-md font-bold' style={{ borderRadius: '0', borderRight: !isLastTheme ? '1px solid rgba(0,0,0,.14)' : "", borderBottom: '1px solid rgba(0,0,0,.14)', width: 230, height: 80 }}>
            {availableThemes.map((availableTheme) => <option key={availableTheme.name} className="font-normal text-xxs">{availableTheme.name}</option>)}
          </select> :
          <select disabled={facebookCreatives?.length !== 0} value={item.name} onChange={(e) => handleAngleChange(e.target.value, item.id)} className='select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xs' style={{ borderRadius: '0', borderRight: !isLastTheme ? '1px solid rgba(0,0,0,.14)' : "", borderBottom: !isLastAngle ? '1px solid rgba(0,0,0,.14)' : '', width: 230, height: 80 }}>
            {availableAngles.map((availableAngle) => <option key={availableAngle} className="font-normal text-xxs">{availableAngle}</option>)}
          </select>
        }
      </>
    )
  }
  return (
    <>
      {isLoading && <SpinningLoading isLoading={isLoading} size="loading-xl" />}
      {!isLoading && themes &&
        <div className="card" style={{ backgroundColor: 'white', padding: 0 }}>
          <div className="card-body">
            <div className="mb-7">
              {facebookCreatives && facebookCreatives.length === 0 && <button className="btn btn-info border-none text-white normal-case w-[200px]" onClick={() => generateCreatives()}>Generate Creatives<SpinningLoading isLoading={projectFacebookCreativesMutation.isLoading} /></button>}
              {facebookCreatives && facebookCreatives.length !== 0 && <button className="btn btn-error border-none text-white normal-case w-[200px]" onClick={() => deleteProjectFacebookCreativesMutation.mutate()}>Remove Creatives<SpinningLoading isLoading={projectFacebookCreativesMutation.isLoading} /></button>}
            </div>
            <div className="flex justify-center">
              {
                themes?.map((theme) => <div key={theme.id}>{matrixCell(theme, true, themes.indexOf(theme) === themes.length - 1)}<div className="flex flex-col">{theme.angles.map((angle) => <div key={angle.id}>{matrixCell(angle, false, themes.indexOf(theme) === themes.length - 1, theme.angles.indexOf(angle) === theme.angles.length - 1)}</div>)}</div></div>)
              }
              <div className="flex flex-col">
                <button className="btn flex-1 bg-white rounded-none ml-5"><span className="mdi mdi-plus" /></button>
              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
})

export default TestMatrix