import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react"
import { useState } from "react";
import { AuthContext } from "../stores/stores"
import { useMutation } from "@tanstack/react-query";
import UserProfilePhotoPicker from "../components/UserProfilePhotoPIcker";

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
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
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
    onSuccess: () => { navigate('/auth/login'); setShowChangePasswordDialog(false) }, 
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
      {
        auth.isAuthenticated ?
          <div style={{marginTop: '1em'}}>
            <div>
              { toast &&
                <div className={toastClass}>{ toast }</div>
              }
              <h2 className="text-h1">Profile</h2>
              <input type="text" style={{ marginTop: 20 }} value={displayName} placeholder="Display Name" onChange={(e) => setDisplayName(e.target.value)} />
              <button style={{ marginLeft: 5 }} onClick={() => updateDisplayName.mutate()} disabled={updateDisplayName.isLoading || !displayNameChanged}>Save</button>
              <div style={{ marginTop: 20 }}>
                <h4>
                  Change Email
                </h4>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" style={{ marginLeft: 20 }} value={changeEmailPassword} placeholder="Password (Required to Change Email)" onChange={(e) => setChangeEmailPassword(e.target.value)} />
                <button style={{ marginLeft: 5}} onClick={() => changeEmail.mutate()} disabled={changeEmail.isLoading || !emailChanged || !email || !changeEmailPassword}>Save</button>
              </div>
              <div style={{marginTop: 30}}>
                <h4>Profile Picture</h4>
                <UserProfilePhotoPicker />
              </div>
              <div>
                <button style={{ marginTop: 35 }} onClick={() => setShowChangePasswordDialog(true)}>Change Password</button>
                { showChangePasswordDialog &&
                <div>
                  <h3>Change Password</h3>
                  <button style={{ marginTop: 10 }} onClick={() => setShowChangePasswordDialog(false)}>Close</button>
                  <div>
                    <input type="password" value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                  </div>
                  <div>
                    <input type="password" value={newPassword} placeholder="New Password" onKeyUp={(e) => e.key === 'Enter' ? changePassword.mutate() : null} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div>
                  <button style={{ marginTop: 10}} onClick={() => changePassword.mutate()} disabled={changePassword.isLoading}>Save</button>
                  </div>
                </div>
                }
              </div>
              <div style={{ marginTop: 30 }}>
                <h4>Danger Zone</h4>
                <button style={{ marginTop: 5 }} onClick={() => setShowDestroyAccountDialog(true)}>Destroy Account</button>
                { showDestroyAccountDialog &&
                <div>
                  <h3>Destroy Account</h3>
                  <button style={{ marginTop: 10 }} onClick={() => setShowDestroyAccountDialog(false)}>Close</button>
                  <div>
                    <p>
                      Your AppName account and all the data it contains will be permanently destroyed.
                    </p>
                    <input type="password" value={destroyPassword} placeholder="Password" onChange={(e) => setDestroyPassword(e.target.value)} />
                  </div>
                  <div>
                  <button style={{ marginTop: 10}} onClick={() => destroyAccount.mutate()} disabled={destroyAccount.isLoading}>Destroy Account</button>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        : <div></div>
      }
    </>
  )
})

export default ProfilePage
