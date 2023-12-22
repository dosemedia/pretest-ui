import { marked } from 'marked'
import { LandingPageProductCtaEmailPageData } from './LandingPageProductCtaEmailForm'
import { useState } from 'react'
import validator from 'validator'

function LandingPageSimplePoll({ 
    onSubmit,
    data,
    submitWait,
    submitted,
    submitError
  }: { 
    onSubmit: (email: string) => void,
    data: LandingPageProductCtaEmailPageData,
    submitWait: boolean,
    submitted: boolean,
    submitError: string
  }) {

  const [email, setEmail] = useState('')

  const isValid = validator.isEmail(email)

  const triggerSubmit = () => { 
    onSubmit(email)
  }

  const parseMarkdown = (questionTitle: string) => {
    return {
      __html: marked.parse(questionTitle)
    }
  }

  // We can expose these as props to the editor later on if needed (each is a string of tailwind classes)...
  const pageClasses = ''
  const productImageClasses = ''
  const titleClasses = ''
  const subtitleClasses = ''
  let submitButtonClasses = ''
  if (submitWait || !isValid) {
    submitButtonClasses += 'btn-disabled'
  }
  const submittedTextClasses = ''

  return (
      <div
        style={{minHeight: '100vh', backgroundColor: data.pageBackgroundColor}}
        className={"p-4 flex flex-col md:flex-row" + ' '  + pageClasses}
      >
        <div className="md:basis-2/3 flex justify-start md:justify-center flex-col">
        { (data.title || data.subtitle) &&
          <div className="p-4 flex flex-col items-center justify-center">
          { data.title &&
            <div
              style={{color: data.textColor}}
              className={"text-center text-xl" + ' ' + titleClasses}
            >{ data.title }</div>
          }
          { data.subtitle &&
            <div
              dangerouslySetInnerHTML={parseMarkdown(data.subtitle)}
              style={{color: data.textColor}}
              className={"text-center" + ' ' + subtitleClasses}
            ></div>
          }

          {submitError &&
            <div role="alert" className="alert alert-error my-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{submitError}</span>
            </div>
          }
          {
            !submitted &&
            <div className="mt-4 flex flex-col md:flex-row">
              <input
                type="email"
                className="input input-bordered max-w-0.5"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <button
                onClick={triggerSubmit}
                style={{color: data.submitButtonTextColor, backgroundColor: (submitWait || submitted || !isValid) ? '' : data.submitButtonBackgroundColor, borderColor: (submitWait || submitted || !isValid) ? '' : data.submitButtonBackgroundColor}}
                className={"md:ml-4 btn rounded-r-lg" + ' ' + submitButtonClasses}
                disabled={submitWait || submitted || !isValid}
              >
                { submitWait &&
                  <span className="loading loading-spinner loading-sm"></span>
                }
                {data.submitButtonText}
              </button>
            </div>
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
        }
        </div>
      
        { data.productImageUrl &&
          <div className={"basis-1/3 flex justify-start md:justify-center flex-col max-h-full" + ' ' + productImageClasses}>
            <img src={data.productImageUrl} className='object-scale-down' alt="Product Image" />
          </div>
        }

      </div>
  );
}

export default LandingPageSimplePoll
