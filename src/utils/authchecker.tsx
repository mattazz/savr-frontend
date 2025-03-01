import { ReactNode, useEffect } from "react";
import { useUser } from "./hooks";
import { useNavigate } from "react-router-dom";

export default function AuthenticatedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [navigate, user, loading]);
  if (loading) return <p>loading...</p>;
  return <>{children}</>;
}
