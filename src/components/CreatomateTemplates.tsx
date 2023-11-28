
import { observer } from "mobx-react-lite";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreatomateTemplates = observer(({ templateId, data }: { templateId: string | undefined, data: any }) => {
  function renderTemplate() {
    if (!data) {
      return <></>
    }
    switch (templateId) {
      case '48042870-80ad-43e0-93c1-0ad3e743ce65': {
        return (
          <div style={{ width: '100%', height: '400px', backgroundColor: 'green', position: 'relative' }}>
            <div style={{ position: 'absolute', height: '100%' }}>
              <video autoPlay muted loop id="myVideo" style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                <source src="https://creatomate.com/files/assets/7ddac3c9-2d4d-411e-8fcd-9855eec74290" type="video/mp4" />
              </video>
            </div> 
            <div style={{ position: 'absolute', top: '45%', left: '5%', width: '36%', height: '41%', color: '#1c43a4', fontWeight: '700', fontSize: 'clamp(1vmin, 100vmin, 30px)', lineHeight: '100%' }}>
              { data['Main Copy']}
            </div>
            <img src={data['Product 1']} style={{ position: 'absolute', top: '35%', left: '50%', width: '38%' }} />
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