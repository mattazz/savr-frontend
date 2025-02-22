import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AccountVerificationPage() {
  const params = useParams();
  useEffect(() => {
    console.log("your params are ", params);
  }, [params]);
  return <div></div>;
}
