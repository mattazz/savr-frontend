// filepath: /Users/mattazada/Desktop/savr-fullstack/savr-frontend/src/components/ShopMatt.tsx
import ProductCardMatt from "./ProductCardMatt";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./Searchbar";

interface Product {
  id: number;
  title: string;
  price: number;
  salePrice: number;
  image: string;
  url: string;
  source: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShopMatt() {
  const [products, setProducts] = useState<Product[]>([]);
  const query = useQuery();
  const keyword = query.get("keyword") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/scrape/scrape?keyword=${keyword}`
        );
        const data = await response.json();

        const combinedProducts = [
          ...(data.bestBuy
            ? data.bestBuy.map((product: Product, index: number) => ({
                ...product,
                id: `bestBuy-${index}`,
                source: "BestBuy",
              }))
            : []),
          ...(data.giantTiger
            ? data.giantTiger.map((product: Product, index: number) => ({
                ...product,
                id: `giantTiger-${index}`,
                source: "GiantTiger",
              }))
            : []),
          ...(data.cadTire
            ? data.cadTire.map((product: Product, index: number) => ({
                ...product,
                id: `cadTire-${index}`,
                source: "CadTire",
              }))
            : []),
        ];

        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              SAVR
            </h1>
            <p className="text-lg text-gray-600">All the prices in a click.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Search Results
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No products found. Try a different search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCardMatt key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopMatt;
