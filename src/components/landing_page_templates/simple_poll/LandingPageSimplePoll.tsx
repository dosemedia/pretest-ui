import { marked } from 'marked'

function LandingPageSimplePoll({ 
    onSubmit,
    headerImageUrl,
    pageBackgroundColor,
    textColor,
    questions,
    submitButtonText,
    submitButtonBackgroundColor,
    submitButtonTextColor,
    submitWait,
    submitted,
    submitError,
    submittedText
  }: { 
    onSubmit: () => void,
    headerImageUrl: string,
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
    submitWait: boolean,
    submitted: boolean,
    submitError: string,
    submittedText: string
  }) {

  const parseMarkdown = (questionTitle: string) => {
    return {
      __html: marked.parse(questionTitle)
    }
  }

  // We can expose these as props to the editor later on if needed (each is a string of tailwind classes)...
  const pageClasses = ''
  const headerImageClasses = ''
  const inputClasses = ''
  const questionTitleClasses = ''
  const optionClasses = ''
  const questionClasses = ''
  let submitButtonClasses = ''
  if (submitWait) {
    submitButtonClasses += 'btn-disabled'
  }
  const submittedTextClasses = ''

  return (
      <div
        style={{minHeight: '100vh', backgroundColor: pageBackgroundColor}}
        className={"p-4 flex items-center justify-center flex-col" + ' '  + pageClasses}
      >
        { headerImageUrl &&
          <div className={"w-1/2 text-center" + ' ' + headerImageClasses}>
            <img src={headerImageUrl} alt="Header Image" />
          </div>
        }
        {questions && questions.map((question) => (
          <div className={"w-full p-4" + ' ' + questionClasses}>
            <div
              dangerouslySetInnerHTML={parseMarkdown(question.title)}
              style={{color: textColor}}
              className={"text-lg font-bold pb-4" + ' ' + questionTitleClasses}
            ></div>
            {question.options.map((option) => (
              <div className="flex items-center mb-4 row-span-1">
                {question.multipleChoice &&
                  <input
                    type="checkbox"
                    className={"bg-white checkbox checkbox-lg" + ' ' + inputClasses}
                    name=""
                    value=""
                    disabled={submitWait || submitted}
                  />
                }
                {!question.multipleChoice &&
                  <input
                    type="radio"
                    className={"bg-white radio radio-lg" + ' ' + inputClasses}
                    name=""
                    value=""
                    disabled={submitWait || submitted}
                  />
                }
                <span
                  style={{color: textColor}}
                  className={"ml-2 text-lg" + ' ' + optionClasses}
                >{option}</span>
              </div>
            ))}
          </div>
        ))}

        {/* From flowbite : https://flowbite.com/docs/components/alerts/ */}
        {submitError &&
          <div role="alert" className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{submitError}</span>
          </div>
        }
        
        {!submitted &&
          <button
            onClick={onSubmit}
            style={{color: submitButtonTextColor, backgroundColor: submitButtonBackgroundColor}}
            className={"btn" + ' ' + submitButtonClasses}
            disabled={submitWait || submitted}
          >
            {/* From flowbite : https://flowbite.com/docs/components/spinner/ */}
            { submitWait &&
              <span className="loading loading-spinner"></span>
            }
            { submitButtonText }
          </button>
        }
        {submitted &&
          <div
            style={{color: textColor}}
            className={"text-lg" + ' ' + submittedTextClasses }
          >
            { submittedText }
          </div>
        }
      </div>
  );
}

export default LandingPageSimplePoll
