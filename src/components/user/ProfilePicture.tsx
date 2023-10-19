import { observer } from "mobx-react-lite";
import { AuthContext } from "../../stores/stores";
import { useContext } from "react";

const ProfilePicture: React.FC<{ width?: string }> = observer(({ width = '50px' }) => {
  const auth = useContext(AuthContext)
  return (
    <>
      <div className="avatar">
        <div className="rounded-full" style={{ width }}>
          <img src={auth.user.avatar_file_key ? auth.userAvatarKeyToUrl(auth.user.avatar_file_key) : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="Image"  />
        </div>
      </div>
    </>
  )
})

export default ProfilePicture