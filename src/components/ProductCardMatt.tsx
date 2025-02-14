interface Product {
    name: string;
    regularPrice: number;
    salePrice: number;
    highResImage: string;
}

function ProductCardMatt({product}: {product: Product}){
    return(
        <div className="rounded-md w-80 bg-white flex flex-col gap-4 items-center box-shadow-black p-4 duration-700 hover:scale-105">
            <img className="w-40" src={product.highResImage} alt="" />
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.regularPrice}</p>
            <p>{product.salePrice}</p>
            <p className="bg-black text-white p-2 rounded-md">BestBuy</p>
        </div>
    )
}

export default ProductCardMatt;