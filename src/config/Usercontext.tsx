import { ReactNode, useState } from "react";
import { User } from "../@types/types";
import { UserContext } from "./contextsAndHooks";

///this is the user information context
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
