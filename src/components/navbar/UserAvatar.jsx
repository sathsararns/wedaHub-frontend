import { useAuth } from "../../context/AuthContext";

export default function UserAvatar({ onClick }) {
  const { user } = useAuth();

  const fallback =
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  const avatarSrc =
    user?.image && user.image !== ""
      ? user.image
      : fallback;

  return (
    <img
      onClick={onClick}
      src={avatarSrc}
      className="w-10 h-10 rounded-full object-cover cursor-pointer"
      alt="avatar"
      onError={(e) => {
        e.target.src = fallback; // 🔥 extra safety
      }}
    />
  );
}