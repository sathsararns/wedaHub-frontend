import { useContext } from "react";
import { AuthContext } from "../context/authState.js";

export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
