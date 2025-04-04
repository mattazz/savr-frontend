import { useEffect, useState, } from "react";
import axios from "axios";
import { backendUrl } from "../config/constants";
import TrackProductsCard from "../components/TrackProductCard";
import { useUser } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

interface Product {
	name: string;
	brandName: string;
	priceWithoutEhf: number;
	regularPrice: number;
	isOnSale: boolean;
	saving: number;
	customerRating: number;
	customerRatingCount: number;
	additionalImages: string[];
	url: string;
	_id: string;
}

export default function TrackProductPage() {
	const [productUrl, setProductUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	const { user, loading } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !user) {
			//send to login page
			navigate("/login");
		} else if (user) {
			async function loadData() {
				try {
					const response = await axios.get(
						`${backendUrl}api/user/getSavedProducts`,
						{ withCredentials: true },
					);
					const userSavedProducts: Product[] = response.data.products;

					if (userSavedProducts.length > 0) {
						setProducts([...userSavedProducts]);
					}
				} catch (e) {
					console.log(e);
				}
			}
			loadData();
		}
	}, [user, loading, navigate]);

	const handleTrackProduct = async () => {
		if (!productUrl.trim()) return;

		setIsLoading(true);

		try {
			const response = await axios.get(
				`${backendUrl}api/crawl/BB?url=${productUrl}`,
				{ withCredentials: true },
			);

			const resProduct = response.data.product;
			if (resProduct) {
				const productExists = products.some(
					(product) => product.url === resProduct.url,
				);
				if (!productExists) {
					setProducts((prevProducts) => [...prevProducts, resProduct]);
				} else {
					console.warn("Product already exists in the list.");
				}
			}
		} catch (error) {
			console.error("Error tracking product:", error);
		} finally {
			setIsLoading(false);
			setProductUrl("");
		}
	};

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${backendUrl}api/user/deleteTrackedProduct`, {
        data: { userId: user!.id, productId },
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
				<div className="animate-pulse text-gray-500">Loading user data...</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
			<div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md my-4">
				<h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
					Track a Product
				</h2>

				<input
					type="text"
					className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 text-gray-700 placeholder-gray-400"
					placeholder="Enter product URL (e.g., Walmart, Amazon)"
					value={productUrl}
					onChange={(e) => setProductUrl(e.target.value)}
				/>

				<button
					type="button"
					onClick={handleTrackProduct}
					className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
					disabled={isLoading}
				>
					{isLoading ? "Tracking..." : "Track Product"}
				</button>
			</div>
			{products.length > 0 && (
				<div className="w-full max-w-7xl mx-auto">
					<h3 className="text-xl font-bold text-gray-900 mb-4 text-center mt-4">
						Saved Products
					</h3>
					<ul className="w-full flex flex-wrap gap-4 justify-center">
						{products.map((product, index) => (
							<TrackProductsCard
								productId={product._id}
								key={product.url}
								index={index}
								name={product.name}
								brandName={product.brandName}
								additionalImages={product.additionalImages}
								priceWithoutEhf={product.priceWithoutEhf}
								regularPrice={product.regularPrice}
								isOnSale={product.isOnSale}
								saving={product.saving}
								customerRating={product.customerRating}
								customerRatingCount={product.customerRatingCount}
								url={product.url}
								onDelete={() => handleDeleteProduct(product._id)}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
