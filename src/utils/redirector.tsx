import { ReactNode, useEffect, useState } from "react";
import { useUser } from "./hooks";
import { useNavigate } from "react-router-dom";

export default function RedirectIfLoggedIn({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate, user]);
  if (isLoading) return <p></p>;
  return <>{!user && children}</>;
}
