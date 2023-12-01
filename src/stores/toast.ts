import { makeAutoObservable } from "mobx"
export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success'
}
export type Toast = {
  message: string
  id: number,
  type: ToastType
}
export class Toasts {
  toasts: Toast[] = []
  constructor() {
    makeAutoObservable(this)
  }

  addToast ({ message, type, duration = 5000 }: { message: string, type: ToastType, duration?: number }) {
    const toast: Toast = {
      id: Date.now(),
      message,
      type
    }
    this.toasts.push(toast)
    setTimeout(() => {
      this.popToast()
    }, duration)
  }

  popToast() {
    this.toasts.shift()
  }
}