import { useAuth } from "../../context/AuthContext";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ChatUserAvatar({ onClick }) {
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
      alt={user?.firstName || "My profile"}
      className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-200 cursor-pointer"
      onError={(e) => {
        e.currentTarget.src = defaultAvatar;
      }}
    />
  );
}