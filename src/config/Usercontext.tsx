import { ReactNode, useEffect, useState } from "react";
import { User } from "../@types/types";
import { UserContext } from "./contextsAndHooks";
import axios from "axios";
import { backendUrl } from "./constants";

///this is the user information context
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  //to handle auth persistance in full page reload
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${backendUrl}api/user/check-session`,
          { withCredentials: true },
        );
        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
