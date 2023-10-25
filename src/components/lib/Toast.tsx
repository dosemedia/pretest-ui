import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { ToastsContext } from "../../stores/stores";
import { Toast } from "../../stores/toast";
export const Toasts = observer(() => {
  const toastStore = useContext(ToastsContext)
  return (
    <div className="toast toast-top toast-center" style={{ zIndex: 100 }}>
      {toastStore.toasts.map((toast: Toast) => (
        <div key={toast.id}>
          <ToastItem toast={toast} />
        </div>
      ))
      }
    </div>
  )
})

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icon: any = {
    success: 'mdi mdi-check-circle',
    error: 'mdi mdi-alert-circle-outline',
    warning: 'mdi mdi-alert-circle-outline'
  }
  return (
    <div className={`alert alert-${toast.type}`}>
      <span className={`${icon[toast.type]} text-white text-base`}></span><span className="text-white">{toast.message}</span>
    </div>
  )
}
