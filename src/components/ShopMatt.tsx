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
          `http://localhost:3000/api/scrape/scrape?keyword=${keyword}`,
        );
        const data = await response.json();
        
        const combinedProducts = [
          ...(data.bestBuy ? data.bestBuy.map((product: Product, index: number) => ({
            ...product,
            id: `bestBuy-${index}`,
            source: 'BestBuy',
          })) : []),
          ...(data.giantTiger ? data.giantTiger.map((product: Product, index: number) => ({
            ...product,
            id: `giantTiger-${index}`,
            source: 'GiantTiger',
          })) : []),
          ...(data.cadTire ? data.cadTire.map((product: Product, index: number) => ({
            ...product,
            id: `cadTire-${index}`,
            source: 'CadTire',
          })) : []),
        ];
        
        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [keyword]);
  return (
    <>
      <div className="flex justify-center  ">
        <div className="flex flex-col text-center w-3/4   ">
          <h1 className="text-8xl font-bold text-shadow-white">SAVR</h1>
          <p className="font-bold">All the prices in a click.</p>
          <div className=" p-4 m-4">
            <SearchBar />
          </div>
        </div>
      </div>
      {/* Results */}
      <div className=" flex flex-col justify-center items-center m-10 p-5 gap-10">
        <h2 className="text-2xl font-bold">Results</h2>
        <div id="shop-container" className="flex flex-row flex-wrap gap-6">
          {products.map((product) => (
            <ProductCardMatt key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ShopMatt;

