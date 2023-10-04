// import { Link }  from "react-router-dom"

import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react"
import { useState, useRef } from "react";
import { AuthContext } from "../stores/stores"
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

{/* <q-page v-if="authStore.user">
    <div class="q-pa-md text-center">
      <h4>Profile</h4>
    </div>
    <div class="q-pa-md">
      <q-input
        filled
        v-model="authStore.user.id"
        type="text"
        label="User Id"
        readonly
        />
    </div>
</q-page> */}
const ProfilePage = observer(() => {
  const auth = useContext(AuthContext)
  const toast = useRef<Toast>(null);
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState(auth.user?.display_name || '')
  const [email, setEmail] = useState('')
  const [changeEmailPassword, setChangeEmailPassword] = useState('')
  const [updateDisplayNameWait, setUpdateDisplayNameWait] = useState(false)
  const [displayNameChanged, setDisplayNameChanged] = useState(false)
  const [updateEmailWait, setUpdateEmailWait] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [changePasswordWait, setChangePasswordWait] = useState(false)

  useEffect(() => {
    setDisplayNameChanged(displayName !== auth.user?.display_name)
  }, [ displayName, auth.user?.display_name ])

  useEffect(() => {
    setEmailChanged(email !== auth.user?.email)
  }, [ email, auth.user?.email ])

  async function updateDisplayName () {
    try {
      setUpdateDisplayNameWait(true)
      await auth.updateDisplayName(displayName)
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'You have successfully updated your display name' });
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error as string });
    } finally {
      setUpdateDisplayNameWait(false)
    }
  }

  async function changePassword () {
    try {
      setChangePasswordWait(true)
      await auth.changePassword(oldPassword, newPassword)
      setShowChangePasswordDialog(false)
      navigate('/auth/login')
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error as string });
    } finally {
      setChangePasswordWait(false)
    }
  }

  async function changeEmail () {
    try {
      setUpdateEmailWait(true)
      await auth.changeEmail(email, changeEmailPassword)
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'You have successfully changed your email' });
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error as string });
    } finally {
      setUpdateEmailWait(false)
    }
  }
  return (
    <>
      {
        auth.isAuthenticated ?
          <div style={{marginTop: '1em'}}>
            <div>
            <Toast ref={toast} position="top-center" />
              <h2 className="text-h1">Profile</h2>
              <InputText style={{ marginTop: 20 }} value={displayName} placeholder="Display Name" onChange={(e) => setDisplayName(e.target.value)} />
              <Button style={{backgroundColor: 'var(--primary-color)', marginLeft: 5 }} label="Save" loading={updateDisplayNameWait} onClick={updateDisplayName} disabled={updateDisplayNameWait || !displayNameChanged} />
              <div style={{ marginTop: 20 }}>
                <h4>
                  Change Email
                </h4>
                <InputText value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Password style={{ marginLeft: 20 }} value={changeEmailPassword} placeholder="Password (Required to Change Email)" onChange={(e) => setChangeEmailPassword(e.target.value)} />
                <Button style={{backgroundColor: 'var(--primary-color)', marginLeft: 5}} label="Save" onClick={changeEmail} loading={updateEmailWait} disabled={updateEmailWait || !emailChanged || !email || !changeEmailPassword} />
              </div>
              <div>
              <Button style={{backgroundColor: 'var(--primary-color)', marginTop: 20 }} label="Change Password" onClick={() => setShowChangePasswordDialog(true)} />
              <Dialog header="Change Password" visible={showChangePasswordDialog} style={{ width: '50vw' }} onHide={() => setShowChangePasswordDialog(false)} dismissableMask={true}>
                  <div>
                    <Password value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} toggleMask />
                    <Password value={newPassword} style={{ marginLeft: 5 }} placeholder="New Password" onKeyUp={(e) => e.key === 'Enter' ? changePassword() : null} onChange={(e) => setNewPassword(e.target.value)} toggleMask />
                  </div>
                  <div>
                  <Button style={{backgroundColor: 'var(--primary-color)', marginTop: 10}} label="Save" onClick={changePassword} loading={changePasswordWait} disabled={changePasswordWait} />
                  </div>
              </Dialog>
              
              </div>
            </div>
          </div>
        : <div></div>
      }
    </>
  )
})

export default ProfilePage
