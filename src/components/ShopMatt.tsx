// filepath: /Users/mattazada/Desktop/savr-fullstack/savr-frontend/src/components/ShopMatt.tsx
import ProductCardMatt from "./ProductCardMatt";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    regularPrice: number;
    salePrice: number;
    highResImage: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShopMatt() {
    const [products, setProducts] = useState<Product[]>([]);
    const query = useQuery();
    const keyword = query.get('keyword') || '';
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/bestbuy/scrape?keyword=${keyword}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [keyword]);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        navigate(`/shop?keyword=${searchKeyword}`);
    };

    return (
        <>
            <div className='flex justify-center border border-red-500'>
                <div className='flex flex-col text-center w-3/4 border border-red-500 '>
                    <h1 className='text-8xl font-bold text-shadow-white'>SAVR</h1>
                    <p className='font-bold'>All the prices in a click.</p>
                    <div className='border-red-500 border p-4 m-4'>
                        <form onSubmit={handleSearch} className='flex flex-row gap-2 border border-red-500 items-center'>
                            <input
                                type="text"
                                placeholder='What are you looking for 😉'
                                className='p-2 border rounded w-full'
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <button type="submit" className='p-2 bg-black text-white rounded w-1/4 m-auto hover:bg-white hover:text-black transition duration-300'>SEARCH</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Results */}
            <div className="border border-green-400 flex flex-col justify-center items-center m-10 p-5 gap-10">
                <h2 className="text-2xl font-bold">Results</h2>
                <div id="shop-container" className="flex flex-row flex-wrap gap-6">
                    {products.map(product => (
                        <ProductCardMatt key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ShopMatt;