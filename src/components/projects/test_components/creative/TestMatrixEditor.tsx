import { observer } from "mobx-react-lite";
import { Facebook_Creatives_Updates } from "../../../../gql/graphql";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import '../../../../css/test_matrix_editor.css';
import { useContext, useEffect, useMemo, useState } from "react";
import { Facebook_Creatives as FacebookCreative } from "../../../../gql/graphql";
import { useSearchParams } from "react-router-dom";
import _ from 'lodash'
import { ProjectFacebookCreativesContext } from "../../../../stores/stores";
import { useMutation } from "@tanstack/react-query";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
import CopyEditModal from "./CopyEdit";
import FacebookPreviewContainer from "../../../social/FacebookPreviewContainer";
const TestMatrixEditor: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const themes: ProjectTheme[] = props.project!.themes
  const facebookCreativesStore = useContext(ProjectFacebookCreativesContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedAngle, setSelectedAngle] = useState<ThemeAngle | null>(themes[0]?.angles[0])
  const ctaOptions = [null, 'SHOP NOW', 'LEARN MORE']
  const [socialCopy, setSocialCopy] = useState(themes[0].angles[0].facebook_creatives[0]?.social_copy || '')
  const [ctaText, setCtaText] = useState(themes[0].angles[0].facebook_creatives[0]?.cta_text || '')
  const [ctaType, setCtaType] = useState(themes[0].angles[0].facebook_creatives[0]?.cta_type || '')
  const debouncedSave = useMemo(() => _.debounce(saveCreatives, 1000), [])

  const updateFacebookCreativesMutation = useMutation({
    mutationKey: ['updateFacebookCreatives'],
    mutationFn: (facebookCreativesUpdates: Facebook_Creatives_Updates[]) => facebookCreativesStore.updateProjectFacebookCreatives({ facebookCreativesUpdates })
  })

  function saveCreatives(payload: { socialCopy: string, ctaText: string, ctaType: string }) {
    const creatives: FacebookCreative[] = []
    for (const theme of themes) {
      for (const angle of theme.angles) {
        creatives.push(angle.facebook_creatives[0])
      }
    }
    updateFacebookCreativesMutation.mutate(creatives.map((item: FacebookCreative) => { return { where: { id: { _eq: item.id } }, _set: { social_copy: payload.socialCopy, cta_text: payload.ctaText, cta_type: payload.ctaType } } }) as Facebook_Creatives_Updates[])
  }

  function creativeContainer(angle: ThemeAngle) {
    const creative = angle.facebook_creatives[0]
    return (
      <div key={angle.id} className="bg-white px-6" style={{ borderTop: '1px solid red' }}>
        <p className="text-md font-bold mt-6 mb-3">{angle.name}</p><FacebookPreviewContainer editTemplate={false} disabled={props.project?.status !== ProjectStatus.DRAFT} template={creative} data={creative?.data} socialCopy={socialCopy} ctaText={ctaText} ctaType={ctaType} />
        <CopyEditModal props={props} angle={angle} />
      </div>

    )
  }
  useEffect(() => {
    if (selectedAngle) {
      for (const theme of props.project!.themes) {
        const angle = theme.angles.find((item) => item.id === selectedAngle.id)
        if (angle) {
          setSelectedAngle({ ...angle })
        }
      }
    }
  }, [props.project])
  useEffect(() => {
    debouncedSave({ socialCopy, ctaText, ctaType })
  }, [socialCopy, ctaText, ctaType])
  return (
    <>
      {themes && themes[0].angles[0].facebook_creatives?.length === 0 ? <div className="alert alert-warning"><span>You must <span className="link" onClick={() => setSearchParams({ step: (parseInt(searchParams.get('step')!) - 1).toString() })}>generate</span> creatives before moving on to this step</span></div> :
        <div>
          <div className="flex gap-x-5" style={{ overflowX: 'auto' }}>
            {themes?.map((item: ProjectTheme) =>
              <div key={item.id}>
                <p className="text-xxs opacity-60">Theme {themes.indexOf(item) + 1}</p>
                <p className="text-base font-bold">{item.name}</p>
                <div className="flex flex-col gap-y-8 mt-3">
                  {item.angles.map((angle: ThemeAngle) =>
                    creativeContainer(angle)
                  )}
                </div>
              </div>)
            }
            {/* {themes?.map((item: ProjectTheme) => themeContainer(item, themes.indexOf(item)))} */}
          </div>
          <div className="flex flex-col gap-y-6 mt-4 w-full md:w-5/12">
            <div>
              <label className="label">
                <span className="text-sm opacity-60">Social Caption</span>
              </label>
              <textarea disabled={props.project?.status !== ProjectStatus.DRAFT} className="textarea w-full" value={socialCopy} onChange={(e) => setSocialCopy(e.target.value)} />
            </div>
            <div>
              <label className="label">
                <span className="text-sm opacity-60">CTA Bumber</span>
              </label>
              <textarea disabled={props.project?.status !== ProjectStatus.DRAFT} className="textarea w-full" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
            </div>
            <div>
              <label className="label">
                <span className="text-sm opacity-60">Button CTA</span>
              </label>
              <select disabled={props.project?.status !== ProjectStatus.DRAFT} className="select w-full max-w-xs" value={ctaType} style={{ backgroundColor: 'white', border: '1px solid #E3E1D9' }} onChange={(e) => setCtaType(e.target.value)}>
                {ctaOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
        </div>
      }
    </>
  )
})

export default TestMatrixEditor