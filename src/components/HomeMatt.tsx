import "../App.css";
import { useUser } from "../utils/hooks";
// import Login from "./Login";
// import SearchBar from "./Searchbar";

function HomeMatt() {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center space-y-8 ">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              SAVR
            </h1>
            <p className="text-xl text-gray-600">Never miss a deal. 💰</p>
          </div>

          {/* <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div> */}

          <div>
            <a
              href={user ? "/track" : "/login"}
              className="inline-block px-6 py-3 text-white bg-teal-600 hover:bg-teal-700 font-medium text-lg rounded-lg shadow-md"
            >
              Start Tracking Now
            </a>
          </div>
          <div>
            <p className=" italic text-gray-700 text-gr">This website is a work in progress — we're continually improving it to support tracking across more websites 👍</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMatt;
