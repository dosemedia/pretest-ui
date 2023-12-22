import { marked } from 'marked'
import { LandingPageProductCtaLinkPageData } from './LandingPageProductCtaLinkForm'

function LandingPageSimplePoll({ 
    onClick,
    data
  }: { 
    onClick: () => void,
    data: LandingPageProductCtaLinkPageData
  }) {

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
  const linkButtonClasses = ''

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
          {
            data.linkButtonText && data.linkButtonUrl &&
            <div className="mt-4">
              <button
                onClick={onClick}
                style={{color: data.linkButtonTextColor, backgroundColor: data.linkButtonBackgroundColor, borderColor: data.linkButtonBackgroundColor}}
                className={"btn" + ' ' + linkButtonClasses}
              >{data.linkButtonText}</button>
            </div>
          }
          </div>
        }
      </div>
      
      { data.productImageUrl &&
        <div className={"basis-1/3 flex justify-start md:justify-center flex-col" + ' ' + productImageClasses}>
          <img src={data.productImageUrl} alt="Product Image" />
        </div>
      }

      </div>
  );
}

export default LandingPageSimplePoll
