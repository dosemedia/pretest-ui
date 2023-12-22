import LandingPageImageField from "../LandingPageImageField";

export interface LandingPageHeroSimplePollPageData {
  version?: number,
  headerImageUrl: string,
  headerTitle: string,
  headerSubtitle: string,
  headerTextColor: string,
  headerBackgroundColor: string,
  pageBackgroundColor: string,
  textColor: string,
  questions: {
    title: string,
    multipleChoice: boolean,
    options: string[]
  }[],
  submitButtonText: string,
  submitButtonBackgroundColor: string,
  submitButtonTextColor: string,
  submittedText: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageHeroSimplePollForm: React.FC<{ data: LandingPageHeroSimplePollPageData, onChange : (newData: LandingPageHeroSimplePollPageData) => void, projectId: string }> = ({ data, onChange, projectId }) => {
  const formData = data || {
    version: 1,
    headerImageUrl: '',
    headerTitle: '',
    headerSubtitle: '',
    headerTextColor: '',
    headerBackgroundColor: '',
    pageBackgroundColor: '',
    textColor: '',
    questions: [],
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
            <span className="text-sm">Header Image Url</span>
          </label>
          <LandingPageImageField value={formData.headerImageUrl} projectId={projectId} onChange={(headerImageUrl) => onChange({...formData, headerImageUrl})} />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Title</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter page header title"
            value={formData.headerTitle}
            onChange={(e) => onChange({...formData, headerTitle: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Subtitle</span>
          </label>
          <textarea
            className="input w-full textarea"
            placeholder="Enter page header subtitle"
            value={formData.headerSubtitle}
            onChange={(e) => onChange({...formData, headerSubtitle: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Background Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.headerBackgroundColor}
            onChange={(e) => onChange({...formData, headerBackgroundColor: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Text Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.headerTextColor}
            onChange={(e) => onChange({...formData, headerTextColor: e.target.value})}
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
            <span className="text-sm">Submit Button Text</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter header image url"
            value={formData.submitButtonText}
            onChange={(e) => onChange({...formData, submitButtonText: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Submit Button Background Color</span>
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
            <span className="text-sm">Submit Button Text Color</span>
          </label>
          <input
            type="color"
            className="input"
            value={formData.submitButtonTextColor}
            onChange={(e) => onChange({...formData, submitButtonTextColor: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Submission Acknowledgement Text</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Submission acknowledgement text"
            value={formData.submittedText}
            onChange={(e) => onChange({...formData, submittedText: e.target.value})}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="label">
          <span className="text-sm">Questions</span>
        </label>
        <div className="grid grid-cols-1 gap-4">
          {formData.questions && formData.questions.map((question, i) => (
            <div key={i}>
              <div className="flex items-center mb-4">
                <textarea
                  className="input w-full textarea"
                  placeholder="Question"
                  value={question.title}
                  onChange={(e) => {
                    const newQuestions = [...formData.questions]
                    newQuestions[i].title = e.target.value
                    onChange({...formData, questions: newQuestions})
                  }}
                />
              </div>
              <div className="flex items-center mb-4">
                <button
                  className="btn btn-sm btn-red"
                  onClick={() => {
                    const newQuestions = [...formData.questions]
                    newQuestions.splice(i, 1)
                    onChange({...formData, questions: newQuestions})
                  }}
                >Delete Question</button>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={question.multipleChoice}
                  onChange={(e) => {
                    const newQuestions = [...formData.questions]
                    newQuestions[i].multipleChoice = e.target.checked
                    onChange({...formData, questions: newQuestions})
                  }}
                />
                <span className="ml-2">Multiple Choice</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex flex-col w-full">
                  {question.options && question.options.map((option, j) => (
                    <div className="flex items-center mb-4" key={j}>
                      <input
                        type="text"
                        className="input grow"
                        placeholder="Option"
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions]
                          newQuestions[i].options[j] = e.target.value
                          onChange({...formData, questions: newQuestions})
                        }}
                      />
                      <button
                        className="btn btn-sm btn-red ml-2"
                        onClick={() => {
                          const newQuestions = [...formData.questions]
                          newQuestions[i].options.splice(j, 1)
                          onChange({...formData, questions: newQuestions})
                        }}
                      >Delete</button>
                    </div>
                  ))}
                  <button
                    className="btn btn-sm btn-green"
                    onClick={() => {
                      const newQuestions = [...formData.questions]
                      newQuestions[i].options.push('')
                      onChange({...formData, questions: newQuestions})
                    }
                  }>Add Option</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
              className="btn btn-sm btn-green w-full"
              onClick={() => {
                const newQuestions = [...formData.questions]
                newQuestions.push({title: '', multipleChoice: false, options: ['']})
                onChange({...formData, questions: newQuestions})
              }
            }>Add Question</button>
        </div>

      </div>

    </div>
  );
}

export default LandingPageHeroSimplePollForm
