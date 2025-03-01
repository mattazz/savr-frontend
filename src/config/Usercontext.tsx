import { ReactNode, useEffect, useState } from "react";
import { User } from "../@types/types";
import { UserContext } from "./contextsAndHooks";
import axios from "axios";
import { backendUrl } from "./constants";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    (async function fetchSession() {
      try {
        const response = await axios.get(
          `${backendUrl}api/user/check-session`,
          {
            withCredentials: true,
            timeout: 5000,
          },
        );

        setUser(response.data.user);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Session check failed:",
            error.response?.data || error.message,
          );
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}
