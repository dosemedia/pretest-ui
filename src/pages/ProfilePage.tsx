import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react"
import { useState } from "react";
import { AuthContext } from "../stores/stores"
import { useMutation } from "@tanstack/react-query";
import UserProfilePhotoPicker from "../components/UserProfilePhotoPIcker";
import { SpinningLoading } from "../components/lib/SpinningLoading";

const ProfilePage = observer(() => {
  const auth = useContext(AuthContext)
  const [toast, setToast] = useState('')
  const [toastClass, setToastClass] = useState('')
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState(auth.user?.display_name || '')
  const [email, setEmail] = useState('')
  const [changeEmailPassword, setChangeEmailPassword] = useState('')
  const [displayNameChanged, setDisplayNameChanged] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [showDestroyAccountDialog, setShowDestroyAccountDialog] = useState(false)
  const [destroyPassword, setDestroyPassword] = useState('')

  useEffect(() => {
    setDisplayNameChanged(displayName !== auth.user?.display_name)
  }, [ displayName, auth.user?.display_name ])

  useEffect(() => {
    setEmailChanged(email !== auth.user?.email)
  }, [ email, auth.user?.email ])

  const destroyAccount = useMutation({
    mutationFn: () => auth.destroyUser(destroyPassword),
    onSuccess: () => navigate('/'), 
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
    }
  })

  const updateDisplayName = useMutation({
    mutationFn: () =>  auth.updateDisplayName(displayName),
    onSuccess: () => {
      setToast('You have successfully updated your display name')
      setToastClass('toastSuccess')
    },
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
    }
  })

  const changePassword = useMutation({
    mutationFn: () =>  auth.changePassword(oldPassword, newPassword),
    onSuccess: () => { navigate('/auth/login') }, 
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
    }
  })

  const changeEmail = useMutation({
    mutationFn: () => auth.changeEmail(email, changeEmailPassword),
    onSuccess: () => {
      setToast('You have successfully changed your email')
      setToastClass('toastSuccess')
    },
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
    }
  })

  return (
    <>
      {/* <Toast /> */}
      <div className="auth-background">
        <div className="container mx-auto p-2 md:p-0">
          <div className="flex justify-center">
            <div className="w-11/12 md:w-1/2">
              {
                auth.isAuthenticated ?
                  <div style={{ paddingTop: 40 }}>
                    <div>
                      { toast &&
                        <div className={toastClass}>{ toast }</div>
                      }
                      <p className="text-lg font-bold">Profile</p>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-sm opacity-60">Display Name</span>
                        </label>
                        <input type="text" className="input" value={displayName} placeholder="Display Name" onChange={(e) => setDisplayName(e.target.value)} />
                      </div>
                      <button className="btn action-button text-base font-bold mt-2" onClick={() => updateDisplayName.mutate()} disabled={updateDisplayName.isLoading || !displayNameChanged}>Save <SpinningLoading isLoading={updateDisplayName.isLoading} /></button>
                      <div style={{ marginTop: 30 }} className="form-control">
                        <p className="text-lg font-bold">
                          Change Email
                        </p>
                        <label className="label">
                          <span className="text-sm opacity-60">Email</span>
                        </label>
                        <input className="input" type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <label className="label">
                          <span className="text-sm opacity-60">Display Name</span>
                        </label>
                        <input className="input" type="password" value={changeEmailPassword} placeholder="Password (Required to Change Email)" onChange={(e) => setChangeEmailPassword(e.target.value)} />
                      </div>
                      <button className="btn action-button text-base font-bold mt-2" onClick={() => changeEmail.mutate()} disabled={changeEmail.isLoading || !emailChanged || !email || !changeEmailPassword}>Save <SpinningLoading isLoading={changeEmail.isLoading} /></button>
                      <div style={{marginTop: 30}}>
                        <p className="text-lg font-bold">Profile Picture</p>
                        <UserProfilePhotoPicker />
                      </div>
                      <div>
                        <button style={{ marginTop: 30 }} className="btn action-button text-base font-bold" onClick={() => (document.getElementById('show_change_password') as HTMLDialogElement).showModal()}>Change Password</button>
                        <dialog id="show_change_password" className="modal">
                          <div className="modal-box">
                            <p className="text-lg font-bold mb-6">Change Password</p>
                            <div className="form-control"> 
                              <label className="label">
                                <span className="text-sm opacity-60">Old Password</span>
                              </label>
                              <input className="input" type="password" value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                              <label className="label" style={{ marginTop: 10 }}>
                                  <span className="text-sm opacity-60">New Password</span>
                              </label>
                              <input className="input" type="password" value={newPassword} placeholder="New Password" onKeyUp={(e) => e.key === 'Enter' ? changePassword.mutate() : null} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="modal-action" style={{ float: 'left' }}>
                              <button className="btn action-button text-base font-bold" style={{ marginTop: 10}} onClick={() => changePassword.mutate()} disabled={changePassword.isLoading}>Save <SpinningLoading isLoading={changePassword.isLoading} /></button>
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </div>
                      <div style={{ marginTop: 30 }}>
                        <p className="text-lg font-bold">Danger Zone</p>
                        <button className="btn action-button text-base font-bold" style={{ marginTop: 5 }} onClick={() => (document.getElementById('destroy_account') as HTMLDialogElement).showModal()}>Destroy Account</button>
                      
                        <dialog className="modal" id="destroy_account">
                          <div className="modal-box">
                            <p className="text-lg font-bold">Destroy Account</p>
                            <div className="form-control">
                              <p style={{ marginTop: 10 }}>
                                Your AppName account and all the data it contains will be permanently destroyed.
                              </p>
                              <label className="label" style={{ marginTop: 10 }}>
                                <span className="text-sm opacity-60">Password</span>
                              </label>
                              <input className="input" type="password" value={destroyPassword} placeholder="Password" onChange={(e) => setDestroyPassword(e.target.value)} />
                            </div>
                            <div className="modal-action" style={{ float: 'left' }}>
                              <button className="btn action-button text-base font-bold" style={{ marginTop: 10 }} onClick={() => destroyAccount.mutate()} disabled={destroyAccount.isLoading}>Destroy Account <SpinningLoading isLoading={destroyAccount.isLoading} /></button>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
                : <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ProfilePage
