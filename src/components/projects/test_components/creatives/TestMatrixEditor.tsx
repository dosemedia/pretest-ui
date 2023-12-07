import { observer } from "mobx-react-lite";
import { Facebook_Creatives_Updates, Projects as Project } from "../../../../gql/graphql";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import '../../../../css/test_matrix_editor.css';
import { useContext, useEffect, useMemo, useState } from "react";
import FacebookPreviewContainer from "../../../social/FacebookPreviewContainer";
import { Facebook_Creatives as FacebookCreative } from "../../../../gql/graphql";
import { useSearchParams } from "react-router-dom";
import _ from 'lodash'
import { ProjectFacebookCreativesContext } from "../../../../stores/stores";
import { useMutation } from "@tanstack/react-query";
const TestMatrixEditor = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {
  const themes: ProjectTheme[] = project.themes
  const facebookCreativesStore = useContext(ProjectFacebookCreativesContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedAngle, setSelectedAngle] = useState<ThemeAngle | null>(themes[0]?.angles[0])
  const ctaOptions = [null, 'SHOP NOW', 'LEARN MORE']
  const [socialCopy, setSocialCopy] = useState(themes[0].angles[0].facebook_creatives[0]?.social_copy || '')
  const [ctaText, setCtaText] = useState(themes[0].angles[0].facebook_creatives[0]?.cta_text || '')
  const [ctaType, setCtaType] = useState(themes[0].angles[0].facebook_creatives[0]?.cta_type || '')
  const [selectedCreative, setSelectedCreative] = useState<FacebookCreative | null>(selectedAngle?.facebook_creatives[0] as FacebookCreative)
  function themeContainer(theme: ProjectTheme, index: number) {
    return (
      <div key={theme.id} className="flex flex-col w-full mb-10">
        <div className="text-xxs opacity-60">Theme {index + 1}</div>
        <div className="text-md font-bold mb-6">{theme.name}</div>
        <div className="w-full">{theme.angles.map((angle: ThemeAngle) => angleContainer(angle, theme.angles.indexOf(angle)))}</div>
      </div>
    )
  }

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

  useEffect(() => {
    if (selectedAngle) {
      setSelectedCreative(selectedAngle.facebook_creatives[0])
    }
  }, [selectedAngle])
  useEffect(() => {
    debouncedSave({ socialCopy, ctaText, ctaType })
  }, [socialCopy, ctaText, ctaType])
  function angleContainer(angle: ThemeAngle, index: number) {
    const creative: FacebookCreative = angle.facebook_creatives[0] // There is only one creative associated with an angle
    return (
      <div key={angle.id} className="flex">
        {selectedAngle?.id === angle.id && <div className="angle-container-border" />}
        <div className={`angle-container ${selectedAngle?.id === angle.id && 'selected'} ${index % 2 === 0 ? 'bg-white' : 'bg-transparent'} p-4 cursor-pointer w-full`} onClick={() => { setSelectedAngle(angle) }}>
          <div className="text-md">
            {angle.name}
          </div>
          <div className="opacity-60 text-xxs mx-5 mt-2">
            {Object.keys(creative.data).map((key) =>
            (<div key={key} className="flex gap-x-8">
              <div className="font-bold w-[40px]">
                {key}
              </div>
              <div>
                {creative.data[key]}
              </div>
            </div>)
            )
            }
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="text-lg configuration-title mb-4">
        Build your test matrix
      </div>
      {themes && themes[0].angles[0].facebook_creatives?.length === 0 ? <div className="alert alert-warning"><span>You must <span className="link" onClick={() => setSearchParams({ step: (parseInt(searchParams.get('step')!) - 1).toString() })}>generate</span> creatives before moving on to this step</span></div> :
        <div className="flex flex-wrap gap-y-8 justify-between">
          <div className="w-full md:w-5/12">
            <div className="flex flex-col items-start">
              <div style={{ height: 600, overflow: 'scroll' }}>
                {themes?.map((item: ProjectTheme) => themeContainer(item, themes.indexOf(item)))}
              </div>
            </div>
            <div className="flex flex-col gap-y-6 mt-4">
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">Social copy</span>
                </label>
                <textarea className="textarea w-full" value={socialCopy} onChange={(e) => setSocialCopy(e.target.value)} />
              </div>
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">CTA text</span>
                </label>
                <textarea className="textarea w-full" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
              </div>
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">Button CTA</span>
                </label>
                <select className="select w-full max-w-xs" value={ctaType} style={{ backgroundColor: 'white', border: '1px solid #E3E1D9' }} onChange={(e) => setCtaType(e.target.value)}>
                  {ctaOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            {selectedCreative ? <FacebookPreviewContainer template={selectedCreative} data={selectedCreative.data} socialCopy={socialCopy} ctaText={ctaText} ctaType={ctaType} /> : <div className="alert alert-info text-white"><span>Click on a creative in order to see a preview.</span></div>}
          </div>
        </div>
      }
    </>
  )
})

export default TestMatrixEditor