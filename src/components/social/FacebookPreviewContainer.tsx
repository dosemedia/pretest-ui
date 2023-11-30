import { observer } from "mobx-react-lite";
import CreativeTemplateRender from "../renders/CreativeTemplateRender";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FacebookPreviewContainer = observer(({ data }: { data: any }) => {
  return (
    <>
      <div className="p-4" style={{ background: '#242526', borderRadius: '6px 6px 0 0' }}>
        <div className="flex gap-x-2 items-center">
          <div className="rounded-full" style={{ background: '#CF6260', width: 32, height: 32 }} />
          <div className="text-white text-sm">
            Profile Name
            <div className="opacity-50" style={{ fontSize: 10 }}>
              Sponsored <span className="mdi mdi-network" />
            </div>
          </div>
        </div>
        <div className="text-white text-xxs mt-2">
        Lorem ipsum dolor sit amet consectetur. Velit donec volutpat morbi mattis commodo ac sit consectetur.
        </div>
      </div>
      <div>
        <CreativeTemplateRender data={data} component={'SimpleTextLogo'} />
      </div>
      <div className="p-4" style={{ background: '#3A3B3C' }}>
        <div className="flex justify-between">
          <div>
            <p className="opacity-60 text-white" style={{ fontSize: 10 }}>
              THEURLHERE.COM
            </p>
            <p className="font-bold text-xxs text-white">
              CTA text to go here
            </p>
          </div>
          <div>
            <button className="btn btn-sm normal-case border-none text-white font-bold" style={{ background: '#4E4F50', borderRadius: 2 }}>
              Learn more
            </button>
          </div>
        </div>
      </div>
      <img src="/src/assets/facebook_footer.png" className="w-full" />
    </>
  )
})

export default FacebookPreviewContainer