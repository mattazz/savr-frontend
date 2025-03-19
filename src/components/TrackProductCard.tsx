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
}


//  TODO Add URL into props for link clicking
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
    customerRatingCount }: TrackProductCardProps) {

    const handleDelete = () => {
        // TODO  -> I think need the object ID and the user ID in order to delete the product from MongoDB 
    }
    return (
        <li
            key={index}
            className="p-4 border bg-white rounded-lg w-1/4 flex flex-col items-center shadow-2xl hover:scale-105 transition-all duration-500  "
        >
            <h4 className="text-lg font-bold text-center">{name}</h4>
            <p className="text-gray-600">Brand: {brandName}</p>
            <img src={additionalImages[0]} alt="" className="w-40 h-40 object-cover rounded-md mb-2" />
            {isOnSale ?
                <p>
                    <span className="text-red-600 line-through mr-2">${regularPrice}</span>
                    <span className="text-black font-bold">${priceWithoutEhf}</span>
                </p> :
                <p className="text-black font-bold">${regularPrice}</p>}
            {/* <p>Current Price: <span className="font-bold">${priceWithoutEhf}</span></p>
            <p className="text-gray-500 line-through">Regular Price: ${regularPrice}</p> */}
            <p className={`text-sm font-semibold ${isOnSale ? "text-green-600" : "text-red-600"}`}>
                {isOnSale ? <p className="font-bold">On sale and saving ${saving}</p> : ""}
            </p>
            {/* {isOnSale ?
                <p className="text-yellow-500">Saving: ${saving}</p>
                : ""} */}
            <p className="text-sm text-gray-700">
                Customer Rating: ⭐ {customerRating} ({customerRatingCount} reviews)
            </p>
            <button className=" text-white rounded-2xl mt-4 p-2 bg-blue-500 hover:bg-blue-600 transition-all ">View Chart History</button>
            <button onClick={handleDelete} className="bg-red-500 text-white rounded-2xl p-2 mt-1 hover:bg-red-600 transition-all">Delete Product</button>
            <a href={url} className=" text-white rounded-2xl mt-1 p-2 bg-green-500 hover:bg-green-600 transition-all ">Buy Now</a>

        </li>

    )
}