import _, { snakeCase } from 'lodash'
import { marked } from 'marked'
import { useState } from 'react'

import { LandingPageSimplePollPageData } from './LandingPageSimplePollForm'

function LandingPageSimplePoll({ 
    onSubmit,
    data,
    submitWait,
    submitted,
    submitError
  }: { 
    onSubmit: (selections: {[key: string]: Array<string>}) => void,
    data: LandingPageSimplePollPageData,
    submitWait: boolean,
    submitted: boolean,
    submitError: string
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
        style={{minHeight: '100vh', backgroundColor: data.pageBackgroundColor}}
        className={"p-4 flex items-center justify-start flex-col" + ' '  + pageClasses}
      >
        { data.headerImageUrl &&
          <div className={"lg:w-1/2 text-center" + ' ' + headerImageClasses}>
            <img src={data.headerImageUrl} alt="Header Image" />
          </div>
        }
        {data.questions && data.questions.map((question, questionIndex) => (
          <div className={"w-full p-4" + ' ' + questionClasses} key={questionIndex}>
            <div
              dangerouslySetInnerHTML={parseMarkdown(question.title)}
              style={{color: data.textColor}}
              className={"font-bold pb-4" + ' ' + questionTitleClasses}
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

        {submitError &&
          <div role="alert" className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{submitError}</span>
          </div>
        }
        
        {!submitted &&
          <button
            onClick={triggerSubmit}
            style={{color: data.submitButtonTextColor, backgroundColor: (submitWait || submitted || !isComplete) ? '' : data.submitButtonBackgroundColor, borderColor: (submitWait || submitted || !isComplete) ? '' : data.submitButtonBackgroundColor}}
            className={"btn" + ' ' + submitButtonClasses}
            disabled={submitWait || submitted || !isComplete}
          >
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
  );
}

export default LandingPageSimplePoll
