import { observer } from "mobx-react-lite";
import { Projects_Themes as ProjectTheme, Themes_Angles_Updates } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import { PresetTheme, themes as availableThemesWithAngles } from "../../../lib/constants/MatrixPreset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectFacebookCreativesContext, ThemesAnglesContext, ThemesContext, toastsStore } from "../../../../stores/stores";
import { useContext } from "react";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { ToastType } from "../../../../stores/toast";
// import _ from 'lodash'
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import _ from "lodash";
import CopyConfigurationView from "./CopyConfigurationView";
const TestMatrix: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const themesStore = useContext(ThemesContext)
  const anglesStore = useContext(ThemesAnglesContext)
  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativesContext)
  const MAX_THEMES = 4
  const { data: facebookCreatives } = useQuery({
    queryKey: ['facebookCreatives'],
    retry: false,
    queryFn: () => projectFacebookCreativesStore.fetchProjectFacebookCreativesByProjectID({ projectId: props.project?.id })
  })
  const { data: themes, refetch: refetchThemes, isLoading } = useQuery({
    queryKey: ['themes'],
    retry: false,
    queryFn: () => themesStore.fetchThemes({ projectId: props.project?.id })
  })
  const createThemeMutation = useMutation({
    mutationKey: ['createTheme'],
    mutationFn: () => themesStore.createTheme({ name: availableThemesWithAngles.filter((item) => !themes?.map((theme) => theme.name).includes(item.name))[0].name, projectId: props.project?.id }),
    onSuccess: () => { toastsStore.addToast({ message: 'Successfully created theme', type: ToastType.SUCCESS }); refetchThemes() }
  })
  const updateThemeMutation = useMutation({
    mutationKey: ['updateTheme'],
    mutationFn: ({ name, themeId }: { name: string, themeId: string }) => themesStore.updateTheme({ id: themeId, payload: { name } as ProjectTheme }),
    onSuccess: async (data: ProjectTheme) => { await updateAngles({ theme: data }); refetchThemes(); if (props.saveProject) props.saveProject({}) }
  })
  async function updateAngles({ theme }: { theme: ProjectTheme }) {
    try {
      const presetTheme = _.find(availableThemesWithAngles, (item: PresetTheme) => item.name === theme.name)
      if (presetTheme) {
        await anglesStore.updateAngles({ updates: theme.angles.map((angle: ThemeAngle) => { return { where: { theme_id: { _eq: theme.id }, id: { _eq: angle.id } }, _set: { name: presetTheme.angles[theme.angles.indexOf(angle)].name } } }) as Themes_Angles_Updates[] })
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleThemeChange = (value: string, themeId: string) => {
    updateThemeMutation.mutate({ name: value, themeId })
  }
  function matrixCell(item: ProjectTheme) {
    return (
      <>
        {
          <div className="flex flex-col" style={{ borderRight: '1px solid rgba(0,0,0,.14)' }} >
            <select disabled={facebookCreatives?.length !== 0} value={item.name} onChange={(e) => handleThemeChange(e.target.value, item.id)} className='rounded-none select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xs text-md font-bold' style={{ width: 230, height: 80, borderRadius: '0', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid rgba(0,0,0,.14)' }}>
              {availableThemesWithAngles.map((availableTheme) => <option disabled={themes?.find((theme) => theme.name === availableTheme.name) != undefined} key={availableTheme.name} className={`${themes?.find((theme) => theme.name === availableTheme.name) ? 'bg-gray-200' : 'bg-white'} font-bold text-xxs`}>{availableTheme.name}</option>)}
            </select>
            {item.angles.map((angle) =>
              <div key={angle.id} className='flex pl-4 items-center w-full max-w-xs text-xxs font-bold' style={{ width: 230, height: 80, borderBottom: '1px solid rgba(0,0,0,.14)' }}>
                <span>{angle.name}</span>
              </div>)}

          </div>
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
            <div className="flex overflow-x-auto">
              {
                themes?.map((theme) => <div key={theme.id}>{matrixCell(theme)}</div>)
              }
              <div className="flex flex-col">
                {themes.length < MAX_THEMES && <button className="btn flex-1 bg-white rounded-none ml-5" onClick={() => createThemeMutation.mutate()}><span className="mdi mdi-plus" /></button>}
              </div>
            </div>
          </div>
          <div className="px-6 pb-8">
            <CopyConfigurationView {...props} />
          </div>
        </div>
      }
     
    </>
  )
})

export default TestMatrix