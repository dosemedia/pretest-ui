import { observer } from "mobx-react-lite";
const TestAudience = observer(() => {
  const pageStyle = {
    fontWeight: '500'
  }
  return (
    <>
      <div style={{ color: '#282828', fontWeight: '500', opacity: 0.7 }}>
        <div className="text-lg mb-4" style={pageStyle}>
          Who do you want to speak to?
        </div>
        <div className="flex flex-wrap gap-y-10 gap-x-10">
          // TODO
        </div>
      </div>
    </>
  )
})

export default TestAudience