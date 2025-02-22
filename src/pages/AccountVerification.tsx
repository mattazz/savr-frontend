import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../config/constants";

export default function AccountVerificationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      console.log("Missing parameters");
      return;
    }

    setIsLoading(true);

    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    (async () => {
      try {
        // Send the PUT request with the data
        const response = await axios.put(`${backendUrl}api/user/verify/ep`, {
          email,
          token,
        });

        if (response.data.success) {
          setVerified(true);
        } else {
          console.log("Verification failed");
        }
      } catch (e) {
        console.error("Verification failed", e);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => clearInterval(intervalId);
  }, [searchParams, countdown, setSearchParams]);

  useEffect(() => {
    if (verified && countdown === 0) {
      navigate("/"); // Redirect after countdown reaches 0
    }
  }, [countdown, verified, navigate]);

  return (
    <div>
      {isLoading ? (
        <p>Verifying your account...</p>
      ) : verified ? (
        <div>
          <p>
            Your account has been verified! You will be redirected to the
            homepage in {countdown} seconds.
          </p>
          <p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Click here to go now
            </a>
          </p>
        </div>
      ) : (
        <p>
          Verification failed. Please check your token or request a new
          verification email.
        </p>
      )}
    </div>
  );
}
