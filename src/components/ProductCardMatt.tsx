interface Product {
  title: string;
  price: number;
  salePrice: number;
  image: string;
  url: string;
  source: string;
}

function ProductCardMatt({ product }: { product: Product }) {
  return (
    <div
      className={`rounded-lg w-80 bg-white flex flex-col gap-4 items-center shadow-lg p-6 duration-700 hover:scale-105 
        ${product.image && product.image.includes("noimage") ? "hidden" : ""}`}
    >
      <img
        className="w-40 h-40 object-cover rounded-md"
        src={product.image}
        alt={product.title}
      />
      <h3 className="font-bold text-xl text-gray-800">{product.title}</h3>
      {product.salePrice !== product.price && product.source == "BestBuy" ? (
        <p className="text-lg">
          <span className="text-red-500 font-bold line-through mr-3">
            ${product.price}
          </span>
          <span className="text-green-500 font-bold">${product.salePrice}</span>
        </p>
      ) : (
        <p className="text-lg font-bold text-gray-800">${product.price}</p>
      )}
      <a href={product.url} className="mt-4">
        <p className="bg-black text-white p-2 rounded-md hover:bg-gray-800">
          {product.source}
        </p>
      </a>
    </div>
  );
}

export default ProductCardMatt;
