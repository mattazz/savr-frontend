import "../App.css";
import { useUser } from "../utils/hooks";
import SearchBar from "./Searchbar";

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
            <p className="text-xl text-gray-600">All the prices in a click.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>

          {!user && (
            <div className="pt-8">
              <p className="text-gray-600">
                <a
                  href="/login"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Login
                </a>{" "}
                to save your products ❤️
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeMatt;
