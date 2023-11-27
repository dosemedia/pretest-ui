
import { observer } from "mobx-react-lite";
const CreatomateTemplates = observer(({ templateId }: { templateId: string | undefined }) => {
  function renderTemplate() {
    switch (templateId) {
      case 'bbc1d5be-1d3e-42c0-8173-b9f9afc8f5db': {
        return (
          <div style={{ width: '100%', height: 400 }}>
            template 1
          </div>
        )
      }
      case '44ffaac4-8546-42fe-9ac6-44728c16aef': {
        return (<div>
          template 2
        </div>)
      }
      default: {
        return (
          <div>
            default template
          </div>
        )
      }
    }
  }
  return (
    <>
      {renderTemplate()}
    </>
  )
})

export default CreatomateTemplates