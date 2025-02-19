

const MessageAlert: React.FC<{message:string, type: string}> = ({ message, type='error' }) => {
  function getTypeColor () {
    if (type === 'success') {
      return 'alert-success'
    } else if (type === 'warning') {
      return 'alert-warning'
    } else if (type === 'info') {
      return 'alert-info'
    }
    return 'alert-error'
  }
  return (
    <div className={`alert ${getTypeColor()}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-white shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span className="text-white">
        {message}
      </span>
    </div>
    )
}

export default MessageAlert