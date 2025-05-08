import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../config/constants";
import { useUser } from "@/utils/hooks";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  ShoppingCart,
  Info,
  TrendingUp,
  MoveRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SSEUpdate = {
  message: string;
  data?: any;
  product?: {
    name: string;
    price: number;
    image?: string;
    id?: string;
  };
  oldPrice?: number;
  newPrice?: number;
};

function TrackProductRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasTracked = useRef(false);

  const [trackingStatus, setTrackingStatus] = useState(
    "Connecting to server...",
  );
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trackProduct = async () => {
      if (hasTracked.current) return;
      hasTracked.current = true;

      try {
        const fullPath = location.pathname;
        const productUrl = fullPath.replace(/^\/saveme\//, "");
        if (!productUrl) throw new Error("No product URL found");

        const eventSource = new EventSource(
          `${backendUrl}api/crawl/BC?sse=true&url=${encodeURIComponent(productUrl)}`,
          { withCredentials: true },
        );

        console.log(`Event source: ${eventSource}`);


        eventSource.onopen = () => {
          setTrackingStatus("Connected to server");
          setStatusMessages((prev) => [...prev, "Connected to server"]);
          setProgress(10);
        };

        eventSource.addEventListener("update", (event) => {
          const data: SSEUpdate = JSON.parse(event.data);
          setTrackingStatus(data.message);
          setStatusMessages((prev) => [...prev, data.message]);

          if (data.message.includes("Identifying")) setProgress(20);
          else if (data.message.includes("Fetching")) setProgress(30);
          else if (data.message.includes("Processing")) setProgress(50);
          else if (
            data.message.includes("extracted") ||
            data.message.includes("Saving")
          )
            setProgress(70);
          else if (
            data.message.includes("added") ||
            data.message.includes("saved")
          ) {
            setProgress(90);
            if (data.product) setProduct(data.product);
          }
        });

        eventSource.addEventListener("complete", (event) => {
          const data: SSEUpdate = JSON.parse(event.data);
          setTrackingStatus("Product tracking complete!");
          setStatusMessages((prev) => [...prev, "Product tracking complete!"]);
          setProgress(100);
          if (data.product) setProduct(data.product);
          eventSource.close();
          setTimeout(() => navigate("/track"), 1500);
        });

        eventSource.addEventListener("error", (event: { data: string }) => {
          const data = event.data
            ? JSON.parse(event.data)
            : { message: "Connection error" };
          setError(data.message || "Error tracking product");
          setTrackingStatus("Error occurred");
          setStatusMessages((prev) => [
            ...prev,
            `Error: ${data.message || "Unknown error"}`,
          ]);
          eventSource.close();
        });

        eventSource.onerror = () => {
          setError("Connection to server failed");
          eventSource.close();
          setTimeout(() => navigate("/track?error=connection_failed"), 1500);
        };

        return () => eventSource.close();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        navigate("/track?error=tracking_failed");
      }
    };

    trackProduct();
  }, [location.pathname, navigate]);

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <Card className="w-full max-w-xl p-4 shadow-xl space-y-6">
        {error ? (
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="text-2xl font-semibold text-red-600">
              Tracking Failed
            </h2>
            <p className="text-gray-600">{error}</p>
            <Button onClick={() => navigate("/track")}>
              <MoveRight className="mr-2 h-4 w-4" />
              Go to Tracked Products
            </Button>
          </div>
        ) : (
          <>
            <CardHeader className="text-center">
              {product ? (
                <div className="flex justify-center items-center gap-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <CardTitle className="text-xl">Product Tracked!</CardTitle>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2 text-blue-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <CardTitle className="text-xl">Tracking Product</CardTitle>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-lg font-medium text-center flex items-center justify-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                {trackingStatus}
              </p>

              <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto text-sm space-y-1">
                {statusMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <TrendingUp className="h-4 w-4 text-blue-400 mt-0.5" />
                    <span>{msg}</span>
                  </div>
                ))}
              </div>

              {product && (
                <Card className="bg-muted/50 mt-4 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <ShoppingCart className="h-5 w-5 text-emerald-600" />
                    {product.name}
                  </div>
                  <div className="text-green-600 text-xl font-bold">
                    ${product.price}
                  </div>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mt-3 mx-auto max-h-32 object-contain rounded shadow"
                    />
                  )}
                </Card>
              )}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

export default function TrackProductRedirectIfNotLoggedIn() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !loading) {
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect_uri=${encodeURIComponent(currentPath)}`);
    }
  }, [navigate, user, loading, location]);

  if (!loading && user) {
    return <TrackProductRedirect />;
  } else {
    return (
      <Card className="mx-auto mt-24 max-w-md">
        <CardContent className="text-center p-6 text-muted-foreground text-sm">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
          Just making sure you have an account with us...
        </CardContent>
      </Card>
    );
  }
}
