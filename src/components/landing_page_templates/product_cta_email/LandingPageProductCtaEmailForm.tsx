import LandingPageImageField from "../LandingPageImageField";

export interface LandingPageProductCtaEmailPageData {
  version?: number,
  productImageUrl: string,
  pageBackgroundColor: string,
  title: string,
  subtitle: string,
  textColor: string,
  submitButtonText: string,
  submitButtonBackgroundColor: string,
  submitButtonTextColor: string,
  submittedText: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageProductCtaEmailForm: React.FC<{ data: LandingPageProductCtaEmailPageData, onChange : (newData: LandingPageProductCtaEmailPageData) => void, projectId: string }> = ({ data, onChange, projectId }) => {
  const formData = data || {
    version: 1,
    productImageUrl: '',
    pageBackgroundColor: '',
    title: '',
    subtitle: '',
    textColor: '',
    submitButtonText: '',
    submitButtonBackgroundColor: '',
    submitButtonTextColor: '',
    submittedText: ''
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
            <span className="text-sm">Email Form Button Text</span>
          </label>
          <input
            type="text"
            className="input"
            value={formData.submitButtonText}
            onChange={(e) => onChange({...formData, submitButtonText: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Email Form Button Background Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.submitButtonBackgroundColor}
            onChange={(e) => onChange({...formData, submitButtonBackgroundColor: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Email Form Button Text Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.submitButtonTextColor}
            onChange={(e) => onChange({...formData, submitButtonTextColor: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPageProductCtaEmailForm
