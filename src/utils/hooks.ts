import { useContext } from "react";
import { UserContext } from "../config/contextsAndHooks";

/**
 * returns user, setuser and logout function
 * @example how to use it?
 * const {user, setuser, logout}=useUser()
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("no context is provided");
  }
  return context;
}
