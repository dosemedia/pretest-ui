import { makeAutoObservable } from "mobx"
export type Toast = {
  message: string
  id: number,
  type: string

}
export class Toasts {
  toasts: Toast[] = []
  constructor() {
    makeAutoObservable(this)
  }

  addToast ({ message, type, duration = 5000 }: { message: string, type: string, duration?: number }) {
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