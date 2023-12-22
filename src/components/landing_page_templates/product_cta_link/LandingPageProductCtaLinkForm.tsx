import LandingPageImageField from "../LandingPageImageField";

export interface LandingPageProductCtaLinkPageData {
  version?: number,
  productImageUrl: string,
  pageBackgroundColor: string,
  title: string,
  subtitle: string,
  textColor: string,
  linkButtonText: string,
  linkButtonUrl: string,
  linkButtonBackgroundColor: string,
  linkButtonTextColor: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageProductCtaLinkForm: React.FC<{ data: LandingPageProductCtaLinkPageData, onChange : (newData: LandingPageProductCtaLinkPageData) => void, projectId: string }> = ({ data, onChange, projectId }) => {
  const formData = data || {
    version: 1,
    productImageUrl: '',
    pageBackgroundColor: '',
    title: '',
    subtitle: '',
    textColor: '',
    linkButtonText: '',
    linkButtonUrl: '',
    linkButtonBackgroundColor: '',
    linkButtonTextColor: ''
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="text-sm">Product Image Url</span>
          </label>
          <LandingPageImageField value={formData.productImageUrl} projectId={projectId} onChange={(productImageUrl) => onChange({...formData, productImageUrl})} />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Title</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter page header title"
            value={formData.title}
            onChange={(e) => onChange({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Subtitle</span>
          </label>
          <textarea
            className="input w-full textarea"
            placeholder="Enter page header subtitle"
            value={formData.subtitle}
            onChange={(e) => onChange({...formData, subtitle: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Page Background Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.pageBackgroundColor}
            onChange={(e) => onChange({...formData, pageBackgroundColor: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Page Text Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.textColor}
            onChange={(e) => onChange({...formData, textColor: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Link Button Text</span>
          </label>
          <input
            type="text"
            className="input"
            value={formData.linkButtonText}
            onChange={(e) => onChange({...formData, linkButtonText: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Link Button Url</span>
          </label>
          <input
            type="text"
            className="input"
            value={formData.linkButtonUrl}
            onChange={(e) => onChange({...formData, linkButtonUrl: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Link Button Background Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.linkButtonBackgroundColor}
            onChange={(e) => onChange({...formData, linkButtonBackgroundColor: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Link Button Text Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.linkButtonTextColor}
            onChange={(e) => onChange({...formData, linkButtonTextColor: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPageProductCtaLinkForm
