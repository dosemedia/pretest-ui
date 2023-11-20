import { observer } from "mobx-react-lite";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import { themes as availableThemes } from "../../../lib/constants/MatrixPreset";
import { angles as availableAngles } from "../../../lib/constants/MatrixPreset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ThemesAnglesContext, ThemesContext } from "../../../../stores/stores";
import { useContext } from "react";
import { Projects as Project } from "../../../../gql/graphql";
const TestMatrix = observer(({ project, onUpdate }: { project: Project, onUpdate: () => void }) => {
  const themesStore = useContext(ThemesContext)
  const anglesStore = useContext(ThemesAnglesContext)
  const { data: themes, refetch } = useQuery({
    queryKey: ['themes'],
    retry: false,
    queryFn: () => themesStore.fetchThemes({ projectId: project.id })
  })
  const updateAngleMutation = useMutation({
    mutationKey: ['updateAngle'],
    mutationFn: ({ name, angleId }: { name: string, angleId: string }) => anglesStore.updateAngle({ id: angleId,payload: { name } as ThemeAngle }),
    onSuccess: () => { refetch(), onUpdate() }
  })
  const updateThemeMutation = useMutation({
    mutationKey: ['updateTheme'],
    mutationFn: ({ name, themeId }: { name: string, themeId: string }) => themesStore.updateTheme({ id: themeId, payload: { name } as ProjectTheme }),
    onSuccess: () => { refetch(), onUpdate() }
  })
  const handleAngleChange = (value: string, angleId: string) => {
    updateAngleMutation.mutate({ name: value, angleId })
  }
  const handleThemeChange = (value: string, themeId: string) => {
    updateThemeMutation.mutate({ name: value, themeId })
  }
  function matrixCell(item: ProjectTheme | ThemeAngle, isTheme?: boolean, isLastTheme?: boolean, isLastAngle?: boolean) {
    return (
      <>
        {isTheme ?
          <select value={item.name} onChange={(e) => handleThemeChange(e.target.value, item.id)} className='select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xstext-md font-bold' style={{ borderRadius: '0', borderRight: !isLastTheme ? '1px solid rgba(0,0,0,.14)' : "", borderBottom: '1px solid rgba(0,0,0,.14)', width: 230, height: 80 }}>
            {availableThemes.map((availableTheme) => <option key={availableTheme.name} className="font-normal text-xxs">{availableTheme.name}</option>)}
          </select> :
          <select value={item.name} onChange={(e) => handleAngleChange(e.target.value, item.id)} className='select bg-transparent w-full hover:bg-gray-100 focus:outline-none max-w-xs' style={{ borderRadius: '0', borderRight: !isLastTheme ? '1px solid rgba(0,0,0,.14)' : "", borderBottom: !isLastAngle ? '1px solid rgba(0,0,0,.14)' : '', width: 230, height: 80 }}>
          {availableAngles.map((availableAngle) => <option key={availableAngle} className="font-normal text-xxs">{availableAngle}</option>)}
        </select>
        }
      </>
    )
  }
  return (
    <>
      <div className="card" style={{ backgroundColor: 'white', padding: 0 }}>
        <div className="card-body">
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
    </>
  )
})

export default TestMatrix