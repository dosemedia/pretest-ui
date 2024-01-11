import { useMutation, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { CopyConfigurationContext } from "../../../../stores/stores";
import { useParams } from "react-router-dom";
import { ProjectStatus } from "../../../../stores/projects";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { Copy_Configurations as CopyConfiguration } from "../../../../gql/graphql";
import _ from "lodash";

const CopyConfigurationView: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const copyConfigurationStore = useContext(CopyConfigurationContext)
  const { projectId } = useParams() as { projectId: string }
  const perspectiveOptions = ['1st', '2nd', '3rd']
  const characterCountOptions = [25, 50, 100, 150, 200, 250]
  const templateTypeOptions = ['list', 'statement', 'rhetorical', 'product review', 'tweet']
  const toneOptions = ['humorous', 'factual', 'emotional', 'motivational', 'aspirational', 'functional']
  const [characterCount, setCharacterCount] = useState(100)
  const [brandTone, setBrandTone] = useState('')
  const [perspective, setPerspective] = useState('')
  const [templateType, setTemplateType] = useState('')
  const [tone, setTone] = useState('')
  const saveCopyConfiguration = useMemo(() => _.debounce((updates: CopyConfiguration) => saveCopyConfigurationMutation.mutate(updates), 600), [])
  const { data: copyConfiguration, refetch } = useQuery({
    queryKey: ['fetchCopyConfiguration'],
    queryFn: () => copyConfigurationStore.fetchCopyConfiguration({ projectId }),
  })
  const createCopyConfigurationMutation = useMutation({
    mutationKey: ['createCopyConfiguration'],
    mutationFn: () => copyConfigurationStore.createCopyConfiguration({ projectId }),
    onSuccess: () => refetch()
  })
  const saveCopyConfigurationMutation = useMutation({
    mutationKey: ['saveCopyConfiguration'],
    mutationFn: (updates: CopyConfiguration) => copyConfigurationStore.saveCopyConfiguration({ projectId, updates }),
    onSuccess: () => { if (props.saveProject) props.saveProject({}) }
  })
  useEffect(() => {
    const configuration = { brand_tone: brandTone, perspective, character_count: characterCount, template_type: templateType, tone } as CopyConfiguration
    saveCopyConfiguration(configuration)
  }, [brandTone, perspective, characterCount, templateType, tone])
  useEffect(() => {
    if (copyConfiguration === null) {
      createCopyConfigurationMutation.mutate()
    }
    console.log(copyConfiguration)
    setBrandTone(copyConfiguration?.brand_tone || '')
    setPerspective(copyConfiguration?.perspective || '')
    setCharacterCount(copyConfiguration?.character_count || 100)
    setTemplateType(copyConfiguration?.template_type || '')
    setTone(copyConfiguration?.tone || '')
  }, [copyConfiguration])
  return (
    <>
      <hr />
      <p className="text-lg font-bold mt-5">
        Copy Configuration
      </p>
      <div className="form-control" style={{ marginTop: 20 }}>
        <div className="flex flex-col gap-y-4">
          <div>
            <label className="label">
              <span className="text-sm">What is the voice and tone of your brand?</span>
            </label>
            <input type="text" className="input" disabled={props.project?.status !== ProjectStatus.DRAFT} placeholder="1-5 word answer describing brand's tone" value={brandTone} onChange={(e) => setBrandTone(e.target.value)} />
          </div>
          <div>
            <label className="label">
              <span className="text-sm">Will this copy be written from 1st, 2nd, or 3rd person?</span>
            </label>
            <select value={perspective} className="select" onChange={(e) => setPerspective(e.target.value)}>
              {perspectiveOptions.map((option: string) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label className="label">
              <span className="text-sm">What is your ideal character count for the messaging?</span>
            </label>
            <select value={characterCount} className="select" onChange={(e) => setCharacterCount(parseInt(e.target.value))}>
              {characterCountOptions.map((option: number) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label className="label">
              <span className="text-sm">What type of copy style would you like?</span>
            </label>
            <select value={templateType} className="select" onChange={(e) => setTemplateType(e.target.value)}>
              {templateTypeOptions.map((option: string) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label className="label">
              <span className="text-sm">How would you like this copy expressed to your audience?</span>
            </label>
            <select value={tone} className="select" onChange={(e) => setTone(e.target.value)}>
              {toneOptions.map((option: string) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
        {/* <input type="text" className="input" disabled={props.project?.status !== ProjectStatus.DRAFT} placeholder="Will this copy be written from 1st, 2nd, or 3rd person? e" value={brandTone} onChange={(e) => setBrandTone(e.target.value)} /> */}
      </div>
    </>
  )
})

export default CopyConfigurationView