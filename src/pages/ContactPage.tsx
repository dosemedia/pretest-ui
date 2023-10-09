import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { useState } from "react";
import { ContactContext } from "../stores/stores"
import { AuthContext } from "../stores/stores"
import validator from 'validator'
import { useMutation } from "@tanstack/react-query";

const ContactPage = observer(() => {
  const contact = useContext(ContactContext)
  const auth = useContext(AuthContext)
  const [toast, setToast] = useState('')
  const [toastClass, setToastClass] = useState('')
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
      setToast('Your message has been delivered!')
      setToastClass('toastSuccess')
      setSubmitted(true)
    }, 
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
        { toast &&
          <div className={toastClass}>{ toast }</div>
        }
        <div>
          <h1>Contact</h1>
        </div>

        <div style={{marginTop: '1em'}}></div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} readOnly={submitted} />

        <div style={{marginTop: '1em'}}></div>
        <input type="text" className={emailValid ? '' : 'p-invalid'} placeholder="Email" value={email} onChange={handleEmailChange} readOnly={submitted} />

        <div style={{marginTop: '1em'}}></div>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} cols={30} readOnly={submitted} />

        <div style={{marginTop: '1em'}}>
          <button onClick={handleSubmit} disabled={submitContactForm.isLoading || !email || !message || !emailValid || submitted}>Submit</button>
        </div>

      </div>
    </>
  )
})

export default ContactPage
