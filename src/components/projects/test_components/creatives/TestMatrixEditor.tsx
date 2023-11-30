import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../../gql/graphql";
import { Projects_Themes as ProjectTheme } from "../../../../gql/graphql";
import { Themes_Angles as ThemeAngle } from "../../../../gql/graphql";
import '../../../../css/test_matrix_editor.css';
import { useState } from "react";
import FacebookPreviewContainer from "../../../social/FacebookPreviewContainer";
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from "../../../../gql/graphql";
const TestMatrixEditor = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {
  const themes: ProjectTheme[] = project.themes
  const [selectedAngle, setSelectedAngle] = useState<ThemeAngle | null>(null)
  const ctaOptions = ['SHOP NOW', 'LEARN MORE']
  const projectFacebookCreativeTemplates: ProjectFacebookCreativeTemplate[] = project.project_facebook_creative_templates
  function themeContainer(theme: ProjectTheme, index: number) {
    return (
      <div key={theme.id} className="flex flex-col w-full">
        <div className="text-xxs opacity-60">Theme {index + 1}</div>
        <div className="text-md font-bold mb-6">{theme.name}</div>
        <div className="w-full">{theme.angles.map((angle: ThemeAngle) => angleContainer(angle, theme.angles.indexOf(angle)))}</div>
      </div>
    )
  }
  function angleContainer(angle: ThemeAngle, index: number) {
    return (
      <div className="flex">
        {selectedAngle?.id === angle.id && <div className="angle-container-border" />}
        <div className={`angle-container ${selectedAngle?.id === angle.id && 'selected'} ${index % 2 === 0 ? 'bg-white' : 'bg-transparent'} p-4 cursor-pointer w-full`} onClick={() => setSelectedAngle(angle)}>
          <div className="text-md">
            {angle.name}
          </div>
          <div className="opacity-60 text-xxs mx-5 mt-2">
            <div className="flex gap-x-8">
              <div className="font-bold w-[40px]">
                Header
              </div>
              <div>
                Emotional Appeal related header
              </div>
            </div>
            <div className="flex gap-x-8">
              <div className="font-bold w-[40px]">
                Claim
              </div>
              <div>
                This [product] brings me {angle.name} because it's...
              </div>
            </div>
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
      <div className="flex justify-between">
        <div className="w-full md:w-5/12">
          <div className="flex flex-col items-start gap-y-6">
            {themes?.map((item: ProjectTheme) => themeContainer(item, themes.indexOf(item)))}
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
                {ctaOptions.map((item) => <option>{item}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12">
          {projectFacebookCreativeTemplates && projectFacebookCreativeTemplates.length && <FacebookPreviewContainer template={projectFacebookCreativeTemplates[0]} data={{ ...projectFacebookCreativeTemplates[0].data, mainCopy: selectedAngle?.name }} />}
        </div>
      </div>
    </>
  )
})

export default TestMatrixEditor