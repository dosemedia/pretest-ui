import { observer } from "mobx-react-lite";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from 'react'
import { ThemesContext } from "../../../../stores/stores";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import _ from 'lodash'
import { themes as availableThemes } from "../../../lib/constants/MatrixPreset";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
const TestThemes: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const themesStore = useContext(ThemesContext)
  const { data: themes, isLoading, refetch } = useQuery({
    queryKey: ['themes'],
    retry: false,
    queryFn: () => themesStore.fetchThemes({ projectId: props.project?.id })
  })
  const createProjectThemeMutation = useMutation({
    mutationKey: ['createProjectTheme'],
    onSuccess: () => refetch(),
    mutationFn: (name: string) => themesStore.createTheme({ name, projectId: props.project?.id, numberOfAngles: 3 })
  })
  const deleteProjectThemeMutation = useMutation({
    mutationKey: ['deleteProjectTheme'],
    onSuccess: () => refetch(),
    mutationFn: (id: string) => themesStore.deleteTheme({ id })
  })

  async function handleSelectedTheme(availableTheme: ProjectTheme) {
    if (!createProjectThemeMutation.isLoading) {
      const selectedTheme = _.find(themes, (item) => availableTheme.name === item.name)
      if (selectedTheme) {
        await deleteProjectThemeMutation.mutateAsync(selectedTheme.id)
      } else if (themes && themes.length < 3) {
        await createProjectThemeMutation.mutateAsync(availableTheme.name)
      }
      if (props.onSave) {
        props.onSave({})
      }
    }
  }
  function selectionCard(item: ProjectTheme) {
    return (
      <div key={item.name} style={{ width: 'auto', height: 86 }}>
        <div className={`card cursor-pointer ${themes?.map((theme) => theme.name).includes(item.name) ? 'card-selected' : ''} ${props.project?.status === ProjectStatus.REVIEW && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 10px' }} onClick={() => handleSelectedTheme(item)}>
          <div className="card-body">
            <span className="text-sm font-bold text-center">{item.name}</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      {isLoading && <SpinningLoading isLoading={isLoading} />}

      <div>
        <p className="my-4">
          Please choose up to 3 themes
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-4">
          {availableThemes?.map((item) => selectionCard(item as ProjectTheme))}
        </div>
      </div>
    </>
  )
})

export default TestThemes