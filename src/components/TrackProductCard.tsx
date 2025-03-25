interface TrackProductCardProps {
  index: number;
  name: string;
  brandName: string;
  additionalImages: string[];
  priceWithoutEhf: number;
  regularPrice: number;
  isOnSale: boolean;
  saving: number;
  customerRating: number;
  customerRatingCount: number;
  url: string;
  onDelete: () => void;
}

export default function TrackProductsCard({
  index,
  name,
  brandName,
  additionalImages,
  priceWithoutEhf,
  regularPrice,
  isOnSale,
  saving,
  customerRating,
  url,
  customerRatingCount,
  onDelete,
}: TrackProductCardProps) {
  const handleDelete = () => {
    // TODO  -> I think need the object ID and the user ID in order to delete the product from MongoDB
    onDelete();
  };

  return (
    <li
      key={index}
      className="p-6 border bg-white rounded-3xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <h4 className="text-xl font-bold text-center mb-2">{name}</h4>
      <p className="text-gray-500 mb-2">Brand: {brandName}</p>
      <img
        src={additionalImages[0]}
        alt=""
        className="w-40 h-40 object-cover rounded-lg mb-4"
      />
      {isOnSale ? (
        <p className="mb-2">
          <span className="text-red-500 line-through mr-2">
            ${regularPrice}
          </span>
          <span className="text-black font-bold">${priceWithoutEhf}</span>
        </p>
      ) : (
        <p className="text-black font-bold mb-2">${regularPrice}</p>
      )}
      {isOnSale && (
        <p className="text-sm font-semibold text-green-500 mb-2">
          On sale and saving ${saving}
        </p>
      )}
      <p className="text-sm text-gray-700 mb-4">
        Customer Rating: ⭐ {customerRating} ({customerRatingCount} reviews)
      </p>
      <div className="flex flex-col gap-2 w-full">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all">
          View Chart History
        </button>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Delete Product
        </button>
        <a
          href={url}
          className="w-full bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition-all"
        >
          Buy Now
        </a>
      </div>
    </li>
  );
}
