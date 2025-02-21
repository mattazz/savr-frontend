interface Product {
    title: string;
    price: number;
    salePrice: number;
    image: string;
    url: string;
    source: string;
}

function ProductCardMatt({product}: {product: Product}){
    return(
        <div className="rounded-md w-80 bg-white flex flex-col gap-4 items-center box-shadow-black p-4 duration-700 hover:scale-105">
            <img className="w-40" src={product.image} alt="" />
            <h3 className="font-bold">{product.title}</h3>
            <p>{product.price}</p>
            {/* <p>{<p>{product.salePrice != null && `${product.salePrice}`}</p>}</p> */}
            <p className="bg-black text-white p-2 rounded-md">{product.source}</p>
        </div>
    )
}

export default ProductCardMatt;