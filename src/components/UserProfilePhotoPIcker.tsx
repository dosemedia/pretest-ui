import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { AuthContext } from "../stores/stores"
import { useMutation } from "@tanstack/react-query"
import MessageAlert from "./MessageAlert"

const UserProfilePhotoPicker = observer(() => {
  const auth = useContext(AuthContext)
  const [image64, setImage64] = useState<string | null>(null)
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [toast, setToast] = useState('')
  const [toastClass, setToastClass] = useState('')

  function photoCleared () {
    setImage64(null)
    setProfilePic(null)
  }

  const save = useMutation({
    mutationFn: () => auth.updateProfilePicture(profilePic!),
    onSuccess: () => {
      setToast('You have successfully added a profile picture')
      setToastClass('toastSuccess')
    },
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
    }
  })
  const removePhoto = useMutation({
    mutationFn: () => auth.removeProfilePicture(),
    onSuccess: () =>  { 
      setToast('You have successfully removed your profile picture')
      setToastClass('toastSuccess')
    },
    onError: (error) => {
      setToast('Error: ' + error!.toString())
      setToastClass('toastError')
    }
  })

  function resetPhoto () {
    photoCleared()
  }

  const photoSelected  = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0]
      setProfilePic(file)
      setImage64(await getBase64(file))
    } else {
      photoCleared()
    }
  }

  function getBase64 (file: File) : Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }
  return (
    <>
      { toast &&
        <div className={toastClass}>{ toast }</div>
      }
      {
        auth.user && auth.user.avatar_file_key && !image64 && 
        <div>
          <div className="avatar" style={{ marginTop: 10 }}>
            <div className="w-32 rounded-full">
              <img  src={auth.userAvatarKeyToUrl(auth.user.avatar_file_key)} alt="Image"  />
            </div>
          </div>
        </div>
      }
      {
        !auth.user?.avatar_file_key && !image64 &&
        <div className="avatar" style={{ marginTop: 10 }}>
          <div className="w-32 rounded-full">
            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
          </div>
        </div>
      }
      {
        image64 &&
        <div className="avatar" style={{ marginTop: 10 }}>
          <div className="w-32 rounded-full">
            <img src={image64} />
          </div>
        </div>
      }
      {
        !image64 && !auth.user?.avatar_file_key && <div><input type="file" style={{ marginTop: 10 }} accept="image/*" multiple={false} onChange={photoSelected} /></div>
      }
      {
        profilePic &&
        <div>
          <button className="btn action-button text-base font-bold w-28 mt-2" style={{ marginRight: 10 }} onClick={() => save.mutate()}>Save</button>
          <button className="btn btn-info rounded-full text-white text-base font-bold w-28 mt-2" style={{ textTransform: 'none' }} disabled={save.isLoading} onClick={resetPhoto}>Reset</button>
        </div>
      }
      {
        auth.user?.avatar_file_key && <button style={{ backgroundColor: 'var(--red-500)', marginTop: 5 }} disabled={removePhoto.isLoading} onClick={() => removePhoto.mutate() }>Remove</button>
      }
    </>
  )
})
export default UserProfilePhotoPicker