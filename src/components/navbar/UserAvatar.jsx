// import { useAuth } from "../../context/AuthContext";

// export default function UserAvatar({ onClick }) {
//   const { user } = useAuth();

//   const DEFAULT_IMAGE =
//     "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

//   const avatarSrc =
//     user?.image &&
//     user.image.trim() !== "" &&
//     !user.image.includes("default-profile.png")
//       ? user.image
//       : DEFAULT_IMAGE;

//   return (
//     <img
//       onClick={onClick}
//       src={avatarSrc}
//       alt="avatar"
//       className="w-10 h-10 rounded-full object-cover cursor-pointer border"
//       onError={(e) => {
//         e.target.src = DEFAULT_IMAGE;
//       }}
//     />
//   );
// }

import { useAuth } from "../../context/AuthContext";
import defaultAvatar from "../../assets/images/avatar.png";

export default function UserAvatar({ onClick }) {
  const { user } = useAuth();

  const avatarSrc =
    user?.image &&
    user.image.trim() !== "" &&
    !user.image.includes("default-profile.png")
      ? user.image
      : defaultAvatar;

  return (
    <img
      onClick={onClick}
      src={avatarSrc}
      alt="avatar"
      className="w-10 h-10 rounded-full object-cover cursor-pointer border"
      onError={(e) => {
        e.target.src = defaultAvatar;
      }}
    />
  );
}