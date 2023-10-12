class ToastController {
  isShowing: boolean = false
  message: string = ''
  type: string = 'error'

  public show({ message, type }: { message: string, type: string }): void {
    this.isShowing = true
    this.message = message
    this.type = type
  }

  public hide(): void {
    this.isShowing = false
  }
}

export const toastController = new ToastController()

export const Toast = () => {
  return (
    <>
     {
        toastController.isShowing &&
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{toastController.message}</span>
          </div>
        </div>
      }
    </>
  )
}