import { observer } from "mobx-react-lite";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { ProjectStatus } from "../../../../stores/projects";
import { useContext, useState } from "react";
import { CopyConfigurationContext, ProjectFacebookCreativeTemplatesContext, ProjectFacebookCreativesContext, ThemesContext, ToastsContext } from "../../../../stores/stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastType } from "../../../../stores/toast";
import { Facebook_Creatives_Insert_Input } from "../../../../gql/graphql"; 
import axios from "axios";

const GenerateCreativesButton: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps, showPromptPreview: boolean) => {
  const projectFacebookCreativeTemplatesStore = useContext(ProjectFacebookCreativeTemplatesContext)
  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativesContext)
  const toastsStore = useContext(ToastsContext)
  const themesStore = useContext(ThemesContext)
  const [generating, setGenerating] = useState(false)
  const copyConfigurationStore = useContext(CopyConfigurationContext)
  const { data: themes } = useQuery({
    queryKey: ['themes'],
    retry: false,
    queryFn: () => themesStore.fetchThemes({ projectId: props.project?.id })
  })
  const { data: projectFacebookCreativeTemplates } = useQuery({
    queryKey: ["projectFacebookCreativeTemplates"],
    retry: false,
    queryFn: () => projectFacebookCreativeTemplatesStore.fetchProjectFacebookCreativeTemplatesByProject({ project: props.project! })
  })
  const { data: facebookCreatives, refetch: refetchFacebookCreatives } = useQuery({
    queryKey: ['facebookCreatives'],
    queryFn: () => projectFacebookCreativesStore.fetchProjectFacebookCreativesByProjectID({ projectId: props.project?.id })
  })
  const { data: copyConfiguration } = useQuery({
    queryKey: ['copyConfiguration'],
    queryFn: () => copyConfigurationStore.fetchCopyConfiguration({ projectId: props.project?.id })
  })
  const projectFacebookCreativesMutation = useMutation({
    mutationKey: ['createFacebookCreatives'],
    mutationFn: ({ facebookCreativesInput }: { facebookCreativesInput: Facebook_Creatives_Insert_Input[] }) => projectFacebookCreativesStore.createProjectFacebookCreatives({ facebookCreativesInput }),
    onError: (error) => toastsStore.addToast({ message: error as string, type: ToastType.ERROR }),
    onSuccess: () => {  refetchFacebookCreatives(); toastsStore.addToast({ message: 'Creatives successfully created', type: ToastType.SUCCESS }); if (props.saveProject) props.saveProject({}); }
  })
  const deleteProjectFacebookCreativesMutation = useMutation({
    mutationKey: ['deleteFacebookCreatives'],
    mutationFn: () => projectFacebookCreativesStore.deleteProjectFacebookCreativesByProjectID({ projectId: props.project?.id }),
    onError: (error) => toastsStore.addToast({ message: error as string, type: ToastType.ERROR }),
    onSuccess: () => { toastsStore.addToast({ message: 'Creatives successfully deleted', type: ToastType.SUCCESS }); if (props.saveProject) props.saveProject({}); refetchFacebookCreatives() }
  })

  function prompt({ column, angle }: { column: string, angle: string }) {
    const productDescription = props.project?.product_description
    const brandTone = copyConfiguration?.brand_tone
    const objective = props.project?.objective
    const templateType = copyConfiguration?.template_type
    const copyPerspective = templateType === 'tweet' ? 'customer' : 'brand'
    const perspective = copyConfiguration?.perspective
    const characterCount = copyConfiguration?.character_count
    const tone = copyConfiguration?.tone
    const facebookAudience = props.project?.facebook_audiences[0]
    return `As a socially forward copywriter, you are writing for a ${productDescription} brand that is ${brandTone}. This copy will be used in a social media ad to ${objective}
    and drive high engagement and clicks on social media speaking authentically to ${facebookAudience?.genders ? formatGenders(facebookAudience?.genders) : 'Females'} ages ${facebookAudience?.min_age} - ${facebookAudience?.max_age}. Write 1 version of copy from a ${copyPerspective} perspective in ${perspective} person with a maximum character count of ${characterCount} characters in ${templateType}
    style and in ${tone} tone, without using hashtags or emojis, while highlighting ${column} and ${angle} in the messaging.`
  }

  function formatGenders (genders: number[]) {
    const formattedGenderArray: string[] = []
    genders.forEach((gender) => {
      const genderString = gender === 1 ? 'Males' : 'Females'
      if (formattedGenderArray.length === 1) {
        formattedGenderArray.push('and')
      }
      formattedGenderArray.push(genderString)
    })
    return formattedGenderArray.join(' ')
  }

  async function generateCreatives() {
    const creatives = []
    if (themes && projectFacebookCreativeTemplates && projectFacebookCreativeTemplates[0]) {
      for (const theme of themes) {
        for (const angle of theme.angles) {
          const payload = {
            messages: [{
              role: 'user',
              content: prompt({ column: theme.name, angle: angle.name})
            }],
            temperature: 0.7,
            model: 'gpt-3.5-turbo',
            max_tokens: 256,
            top_p: 1
          }
          try {
            setGenerating(true)
            const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
              }
            })
            
            if (response?.data) {
              const content = response.data.choices[0].message.content
              creatives.push({
                project_id: props.project?.id,
                template_name: projectFacebookCreativeTemplates[0].template_name,
                theme_id: theme.id,
                angle_id: angle.id,
                data: { ...projectFacebookCreativeTemplates[0].data, mainCopy: content }
              })
            }
          } catch (e) {
            throw new Error(e as string)
          }
        }
      }
    }
    await projectFacebookCreativesMutation.mutateAsync({ facebookCreativesInput: creatives })
    setGenerating(false)
  }
  return (
    <>
      {showPromptPreview && themes && <div className="bg-gray-100 p-3 rounded-md mb-5">
        <p className="text-base font-bold mb-3">
          Prompt Preview <i className="text-xs font-normal">This is an example of the prompt that will be sent to OpenAI for copy generation</i>
        </p>
        {prompt({ column: themes[0].name, angle: themes[0].angles[0].name })}
      </div>}
      {facebookCreatives && facebookCreatives.length === 0 && <button disabled={props.project?.status !== ProjectStatus.DRAFT} className="btn btn-info border-none text-white normal-case w-[200px]" onClick={() => generateCreatives()}>Generate Creatives<SpinningLoading isLoading={[projectFacebookCreativesMutation.isLoading, generating]} /></button>}
      {facebookCreatives && facebookCreatives.length !== 0 && <button disabled={props.project?.status !== ProjectStatus.DRAFT} className="btn btn-error border-none text-white normal-case w-[200px]" onClick={() => deleteProjectFacebookCreativesMutation.mutate()}>Remove Creatives<SpinningLoading isLoading={projectFacebookCreativesMutation.isLoading} /></button>}
    </>
  )
})

export default GenerateCreativesButton