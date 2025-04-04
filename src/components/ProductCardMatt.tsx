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
      className={`rounded-xl w-full max-w-sm bg-white flex flex-col gap-4 items-center shadow-md hover:shadow-xl p-6 duration-300 transition-all transform hover:-translate-y-1
        ${product.image && product.image.includes("noimage") ? "hidden" : ""}`}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="w-full space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          {product.salePrice !== product.price &&
          product.source == "BestBuy" ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm line-through">
                ${product.price}
              </span>
              <span className="text-teal-600 font-semibold text-lg">
                ${product.salePrice}
              </span>
            </div>
          ) : (
            <span className="text-gray-800 font-semibold text-lg">
              ${product.price}
            </span>
          )}

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition duration-200"
          >
            {product.source}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCardMatt;
