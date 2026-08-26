import { createContext, useContext } from "react";
import useAIChat from "../hooks/useAIChat";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const chat = useAIChat();

  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}