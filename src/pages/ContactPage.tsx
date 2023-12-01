import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { useState } from "react";
import { ContactContext, ToastsContext } from "../stores/stores"
import { AuthContext } from "../stores/stores"
import validator from 'validator'
import { useMutation } from "@tanstack/react-query";
import { ToastType } from "../stores/toast";

const ContactPage = observer(() => {
  const contact = useContext(ContactContext)
  const auth = useContext(AuthContext)
  const toastStore = useContext(ToastsContext)
  const [name, setName] = useState(auth.user?.display_name || '')
  const [email, setEmail] = useState(auth.user?.email || '')
  const [emailValid, setEmailValid] = useState(true)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
      submitContactForm.mutate()
  }

  const submitContactForm = useMutation({
    mutationFn: () => contact.submitContactForm(name, email, message),
    onSuccess: () => {
      toastStore.addToast({ message: 'Message has been delivered', type: ToastType.SUCCESS })
      setSubmitted(true)
    }, 
    onError: (error) => {
      toastStore.addToast({ message: 'Error: ' + error!.toString(), type: ToastType.ERROR })
    }
  })

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    // Don't set invalid on empty
    if (!email || validator.isEmail(e.currentTarget.value)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  return (
    <>
      <div className="background" >
        <div>
          <p className="text-xl font-bold">Contact</p>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-sm opacity-60">Name</span>
          </label>
          <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} readOnly={submitted} />
          <label className="label mt-2">
            <span className="text-sm opacity-60">Email</span>
          </label>
          <input type="text" className={`${emailValid ? '' : 'p-invalid'} input`} placeholder="Email" value={email} onChange={handleEmailChange} readOnly={submitted} />
          <label className="label mt-2">
            <span className="text-sm opacity-60">Message</span>
          </label>
          <textarea value={message} className="textarea" onChange={(e) => setMessage(e.target.value)} rows={5} cols={30} readOnly={submitted} />
        </div>
        <div className="mt-4">
          <button className="btn action-button text-base font-bold" onClick={handleSubmit} disabled={submitContactForm.isLoading || !email || !message || !emailValid || submitted}>Submit</button>
        </div>
      </div>
    </>
  )
})

export default ContactPage
