import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { SendHorizonalIcon } from "lucide-react";

export default function ChatComposer({ value, onChange, onSubmit, disabled = false }) {
  const textareaRef = useRef(null);
  const inputId = useId();
  const canSend = Boolean(value.trim()) && !disabled;

  const resizeInput = useCallback(() => {
    const input = textareaRef.current;
    if (!input) return;
    const visibleHeight = window.visualViewport?.height || window.innerHeight;
    const maxHeight = Math.max(48, Math.min(128, visibleHeight * 0.25));
    input.style.height = "0px";
    input.style.maxHeight = `${maxHeight}px`;
    const height = Math.min(input.scrollHeight, maxHeight);
    input.style.height = `${height}px`;
    input.style.overflowY = input.scrollHeight > maxHeight ? "auto" : "hidden";
  }, []);

  useLayoutEffect(() => {
    resizeInput();
  }, [value, resizeInput]);

  useEffect(() => {
    window.addEventListener("resize", resizeInput);
    window.visualViewport?.addEventListener("resize", resizeInput);
    return () => {
      window.removeEventListener("resize", resizeInput);
      window.visualViewport?.removeEventListener("resize", resizeInput);
    };
  }, [resizeInput]);

  const submit = () => {
    if (!canSend) return;
    onSubmit();
    // Keep the same input focused after the first send on mobile.
    textareaRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    const desktopKeyboard = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (desktopKeyboard || event.ctrlKey || event.metaKey) {
      event.preventDefault();
      submit();
    }
    // A phone keyboard's Return key adds a line; the send button submits.
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex min-w-0 items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-sm focus-within:border-zinc-400 sm:p-3"
    >
      <label htmlFor={inputId} className="sr-only">Describe what you need at home</label>
      <textarea
        ref={textareaRef}
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        enterKeyHint="enter"
        autoCapitalize="sentences"
        placeholder="Describe what you need..."
        className="min-h-10 min-w-0 flex-1 resize-none self-center bg-transparent px-2 py-2 text-base leading-6 text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${canSend ? "bg-zinc-900 hover:bg-zinc-800" : "cursor-not-allowed bg-zinc-300"}`}
      >
        <SendHorizonalIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
