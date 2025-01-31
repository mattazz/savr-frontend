import ProductCardMatt from "./ProductCardMatt";

function ShopMatt() {
    return (
        <>
            <div className='flex justify-center border border-red-500'>
                <div className='flex flex-col text-center w-3/4 border border-red-500 '>
                    <h1 className='text-8xl font-bold text-shadow-white'>SAVR</h1>
                    <p className='font-bold'>All the prices in a click.</p>
                    <div className='border-red-500 border p-4 m-4'>
                        <form action="" className=' flex flex-row gap-2 border border-red-500 items-center'>
                            <input type="text" placeholder='What are you looking for 😉' className='p-2 border rounded w-full' />
                            <button className='p-2 bg-black text-white rounded w-1/4 m-auto hover:bg-white hover:text-black transition duration-300'>SEARCH</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Results */}
            <div className="border border-green-400 flex flex-col justify-center items-center m-10 p-5 gap-10">
                <h2 className="text-2xl font-bold">Results</h2>
                <div id="shop-container" className="flex flex-row flex-wrap gap-4">
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />
                    <ProductCardMatt />

                </div>
            </div>

        </>
    )
}

export default ShopMatt;