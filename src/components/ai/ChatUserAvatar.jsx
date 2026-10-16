import { useAuth } from "../../hooks/useAuth.js";
import defaultAvatar from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

export default function ChatUserAvatar() {
  const { user } = useAuth();

  const avatarSrc =
    user?.image &&
    user.image.trim() !== "" &&
    !user.image.includes("default-profile.png")
      ? user.image
      : defaultAvatar;

  return (
    <Link to="/profile" aria-label="View my profile" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900">
    <img
      src={avatarSrc}
      alt={user?.firstName || "My profile"}
      className="h-9 w-9 rounded-full object-cover ring-1 ring-zinc-200"
      onError={(e) => {
        e.currentTarget.src = defaultAvatar;
      }}
    />
    </Link>
  );
}
