import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config/constants";

export default function TrackProductRedirect() {
    const location = useLocation();
    const navigate = useNavigate();
    const hasTracked = useRef(false);

    useEffect(() => {
        const trackProduct = async () => {
            if (hasTracked.current) return;
            hasTracked.current = true;
            try {
                const fullPath = location.pathname;

                const productUrl = fullPath.replace(/^\/saveme\//, '');

                if (!productUrl) throw new Error("No product URL found");

                console.log("Parsed product URL:", productUrl);

                const response = await axios.get(
                    `${backendUrl}api/crawl/BB?url=${encodeURIComponent(productUrl)}`,
                    { withCredentials: true }
                );

                const resProduct = response.data.product;

                if (resProduct) {
                    await axios.post(
                        `${backendUrl}api/user/saveProduct`,
                        { product: resProduct },
                        { withCredentials: true }
                    );
                }

                navigate("/track");
            } catch (err) {
                console.error("Error tracking product:", err);
                navigate("/track?error=tracking_failed");
            }
        };

        trackProduct();
    }, [location.pathname, navigate]);

    return <div>Tracking product...</div>;
}
