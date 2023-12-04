import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../../gql/graphql";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import '../../../../css/test_matrix_editor.css';
import { useEffect, useState } from "react";
import FacebookPreviewContainer from "../../../social/FacebookPreviewContainer";
import { Facebook_Creatives as FacebookCreative } from "../../../../gql/graphql";
import { useSearchParams } from "react-router-dom";
const TestMatrixEditor = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {
  const themes: ProjectTheme[] = project.themes
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedAngle, setSelectedAngle] = useState<ThemeAngle | null>(themes[0]?.angles[0])
  const ctaOptions = ['SHOP NOW', 'LEARN MORE']
  const [selectedCreative, setSelectedCreative] = useState<FacebookCreative | null>(selectedAngle?.facebook_creatives[0] as FacebookCreative)
  function themeContainer(theme: ProjectTheme, index: number) {
    return (
      <div key={theme.id} className="flex flex-col w-full">
        <div className="text-xxs opacity-60">Theme {index + 1}</div>
        <div className="text-md font-bold mb-6">{theme.name}</div>
        <div className="w-full">{theme.angles.map((angle: ThemeAngle) => angleContainer(angle, theme.angles.indexOf(angle)))}</div>
      </div>
    )
  }

  useEffect(() => {
    if (selectedAngle) {
      setSelectedCreative(selectedAngle.facebook_creatives[0])
    }
  }, [selectedAngle])
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
            <div className="flex flex-col items-start gap-y-6">
              <div style={{ height: 600, overflow: 'scroll' }}>
                {themes?.map((item: ProjectTheme) => themeContainer(item, themes.indexOf(item)))}
              </div>
            </div>
            <div className="flex flex-col gap-y-6 mt-4">
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">Social copy</span>
                </label>
                <textarea className="textarea w-full" />
              </div>
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">CTA text</span>
                </label>
                <textarea className="textarea w-full" />
              </div>
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">Button CTA</span>
                </label>
                <select className="select w-full max-w-xs" style={{ backgroundColor: 'white', border: '1px solid #E3E1D9' }}>
                  {ctaOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            {selectedCreative ? <FacebookPreviewContainer template={selectedCreative} data={selectedCreative.data} /> : <div className="alert alert-info text-white"><span>Click on a creative in order to see a preview.</span></div>}
          </div>
        </div>
      }
    </>
  )
})

export default TestMatrixEditor