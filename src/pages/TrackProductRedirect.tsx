import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config/constants";
import { useUser } from "@/utils/hooks";
import { CreditCard } from "lucide-react";
import { CardContent } from "@/components/ui/card";

function TrackProductRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasTracked = useRef(false);

  useEffect(() => {
    const trackProduct = async () => {
      if (hasTracked.current) return;
      hasTracked.current = true;
      try {
        const fullPath = location.pathname;

        console.log(`[TrackProductRedirect] - fullPath == ${fullPath}`);
        const productUrl = fullPath.replace(/^\/saveme\//, "");

        console.log(
          `[TrackProductRedirect] - fullPath (replace saveMe) == ${productUrl}`,
        );

        if (!productUrl) throw new Error("No product URL found");

        console.log("Parsed product URL:", productUrl);

        const response = await axios.get(
          `${backendUrl}api/crawl/BB?url=${encodeURIComponent(productUrl)}`,
          { withCredentials: true },
        );

        const resProduct = response.data.product;
        console.log(`[TrackProductRedirect] - resProduct == ${resProduct}`);

        if (resProduct) {
          console.log(
            `[TrackedProductRedirect] - Product successfully tracked and saved`,
            resProduct,
          );
          navigate("/track");
        } else {
          console.error(
            `[TrackedProductRedirect] - Failed to track or save product.`,
          );
          navigate("/track?error=tracking_failed");
        }

        navigate("/track");
      } catch (err) {
        console.error("Error tracking product:", err);
        navigate("/track?error=tracking_failed");
      }
    };

    trackProduct();
  }, [location.pathname, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.5rem",
        color: "#555",
      }}
    >
      <p>🔄 Tracking product... Please wait.</p>
    </div>
  );
}

/**
 * This is the main component displayed in saveme route, wrapped by logic to redirect if the user is not logged in and with any required enhancements
 */
export default function TrackProductRedirectIfNotLoggedIn() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    debugger;
    //if the user is not authenticated, and the check for authentication is not loading either
    if (!user && !loading) {
      //we would navigate the user to the login page with redirect_url with redirect on login to this page
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect_uri=${encodeURIComponent(currentPath)}`);
    }
  }, [navigate, user, loading, location]);

  //if loggedin then mount the track product redirect page
  if (!loading && user) {
    return (
      <>
        <TrackProductRedirect />;
      </>
    );
  } else
    return (
      <CreditCard className="mx-auto mt-10 max-w-md shadow-md">
        <CardContent className="text-center text-muted-foreground text-sm p-6">
          Just making sure you have an account with us...
        </CardContent>
      </CreditCard>
    );
}
