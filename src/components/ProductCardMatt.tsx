interface Product {
    title: string;
    description: string;
    image: string;
}

function ProductCardMatt({product}: {product: Product}){
    return(
        <div className="rounded-md w-80 bg-white flex flex-col gap-4 items-center box-shadow-black p-4 duration-700 hover:scale-105">
            <img className="w-40" src={product.image} alt="" />
            <h3 className="font-bold">{product.title}</h3>
            <p>{product.description}</p>
        </div>
    )
}

export default ProductCardMatt;