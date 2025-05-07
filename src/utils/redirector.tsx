import { ReactNode, useEffect } from "react";
import { useUser } from "./hooks";
import { useNavigate } from "react-router-dom";

/**
 * redirects a user from current component to the home page, if the user is authenticated, example use case, login and register page
 */
export default function RedirectIfLoggedInTo({
  children,
  path = "/",
}: {
  children: ReactNode;
  path: string;
}) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    //if we have a user and its we have already tried to login from cookie, then user shouldn't be on the current page, because you are already loggedin
    if (user && !loading) {
      navigate(path, { replace: true });
    }
  }, [navigate, user, loading]);

  if (loading) return <p>Loading...</p>;

  return <>{!user ? children : null}</>;
}
