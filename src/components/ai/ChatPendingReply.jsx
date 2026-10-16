import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function ChatPendingReply() {
  const [takingLonger, setTakingLonger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTakingLonger(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div role="status" className="space-y-2 py-1 text-sm text-zinc-600">
      <div className="flex items-center gap-2">
        <LoaderCircle aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none" />
        <span>{takingLonger ? "Still working on your reply..." : "Getting your reply..."}</span>
      </div>
      {takingLonger && (
        <p className="text-xs leading-relaxed text-zinc-500">
          The first reply can take longer while the assistant starts. Please keep this page open.
        </p>
      )}
    </div>
  );
}
