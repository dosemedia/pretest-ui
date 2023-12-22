import _, { snakeCase } from 'lodash'
import { marked } from 'marked'
import { useState } from 'react'
import { LandingPageHeroSimplePollPageData } from './LandingPageHeroSimplePollForm'

function LandingPageHeroSimplePoll({ 
    onSubmit,
    submitWait,
    submitError,
    submitted,
    data
  }: { 
    onSubmit: (selections: {[key: string]: Array<string>}) => void,
    submitWait: boolean,
    submitError: string,
    submitted: boolean,
    data: LandingPageHeroSimplePollPageData
  }) {

  const parseMarkdown = (questionTitle: string) => {
    return {
      __html: marked.parse(questionTitle)
    }
  }

  // We can expose these as props to the editor later on if needed (each is a string of tailwind classes)...
  const pageClasses = ''
  const headerImageClasses = ''
  const headerTitleClasses = ''
  const headerSubtitleClasses = ''
  const inputClasses = ''
  const questionTitleClasses = ''
  const optionClasses = ''
  const questionClasses = ''
  let submitButtonClasses = ''
  if (submitWait) {
    submitButtonClasses += 'btn-disabled'
  }
  const submittedTextClasses = ''

  const defaultSelectedOptions : {[key: string]: Array<string>} = {}
  data.questions.forEach((question) => {
    defaultSelectedOptions[snakeCase(question.title)] = []
  })

  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions)

  const triggerSubmit = () => { 
    onSubmit(selectedOptions)
  }

  let completedQuestionsCount = 0
  _.keys(selectedOptions).forEach((key) => {
    if (selectedOptions[key].length > 0) {
      completedQuestionsCount++
    }
  })
  const isComplete = data.questions.length === completedQuestionsCount

  const updateCheckboxSelections = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedOptions = {...selectedOptions}
    if (!newSelectedOptions[e.target.name]) {
      newSelectedOptions[e.target.name] = []
    }
    if (e.target.checked) {
      newSelectedOptions[e.target.name].push(e.target.value)
    }
    else {
      newSelectedOptions[e.target.name] = newSelectedOptions[e.target.name].filter((option: string) => option !== e.target.value)
    }
    setSelectedOptions(newSelectedOptions)
  }

  const updateRadioSelections = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedOptions = {...selectedOptions}
    newSelectedOptions[e.target.name] = [e.target.value]
    setSelectedOptions(newSelectedOptions)
  }

  return (
      <div
        style={{minHeight: '100vh'}}
      >

        <div className={'grid grid-cols-1 md:grid-cols-2'} style={{ backgroundColor: data.headerBackgroundColor }}>
        { data.headerImageUrl &&
          <div className={"lg:w-full text-center" + ' ' + headerImageClasses}>
            <img src={data.headerImageUrl} alt="Header Image" />
          </div>
        }
        { (data.headerTitle || data.headerSubtitle) &&
          <div className="p-4 flex flex-col items-center justify-center">
          { data.headerTitle &&
            <div
              style={{color: data.headerTextColor}}
              className={"text-xl" + ' ' + headerTitleClasses}
            >{ data.headerTitle }</div>
          }
          { data.headerSubtitle &&
            <div
              dangerouslySetInnerHTML={parseMarkdown(data.headerSubtitle)}
              style={{color: data.headerTextColor}}
              className={"" + ' ' + headerSubtitleClasses}
            ></div>
          }
          </div>
        }
        </div>

        <div className={"p-4 flex items-center justify-start flex-col" + ' '  + pageClasses} style={{ backgroundColor: data.pageBackgroundColor }}>
          {data.questions && data.questions.map((question, questionIndex) => (
            <div className={"w-full p-4" + ' ' + questionClasses} key={questionIndex}>
              <div
                dangerouslySetInnerHTML={parseMarkdown(question.title)}
                style={{color: data.textColor}}
                className={"text-center text-lg pb-4" + ' ' + questionTitleClasses}
              ></div>
              {question.options.map((option, optionIndex) => (
                <div className="flex items-center mb-4 row-span-1" key={optionIndex}>
                  {question.multipleChoice &&
                    <input
                      type="checkbox"
                      className={"bg-white checkbox checkbox-sm" + ' ' + inputClasses}
                      name={snakeCase(question.title)}
                      value={option}
                      checked={selectedOptions[snakeCase(question.title)] && selectedOptions[snakeCase(question.title)].includes(option)}
                      onChange={updateCheckboxSelections}
                      disabled={submitWait || submitted}
                    />
                  }
                  {!question.multipleChoice &&
                    <input
                      type="radio"
                      className={"bg-white radio radio-sm" + ' ' + inputClasses}
                      name={snakeCase(question.title)}
                      value={option}
                      checked={selectedOptions[snakeCase(question.title)] && selectedOptions[snakeCase(question.title)].includes(option)}
                      onChange={updateRadioSelections}
                      disabled={submitWait || submitted}
                    />
                  }
                  <span
                    style={{color: data.textColor}}
                    className={"ml-2" + ' ' + optionClasses}
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
              onClick={triggerSubmit}
              style={{color: data.submitButtonTextColor, backgroundColor: (submitWait || submitted || !isComplete) ? '' : data.submitButtonBackgroundColor}}
              className={"btn" + ' ' + submitButtonClasses}
              disabled={submitWait || submitted || !isComplete}
            >
              {/* From flowbite : https://flowbite.com/docs/components/spinner/ */}
              { submitWait &&
                <span className="loading loading-spinner"></span>
              }
              { data.submitButtonText }
            </button>
          }
          {submitted &&
            <div
              style={{color: data.textColor}}
              className={"text-lg text-center" + ' ' + submittedTextClasses }
            >
              { data.submittedText }
            </div>
          }
        </div>
      </div>
  );
}

export default LandingPageHeroSimplePoll
