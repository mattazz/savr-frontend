import "../App.css";
import SearchBar from "./Searchbar";

function HomeMatt() {
  return (
    <>
      <div className="full-page-centered">
        <div className="flex flex-col text-center w-1/2">
          <h1 className="h1-custom">SAVR</h1>
          <p className="font-bold">All the prices in a click.</p>
          <div className=" p-4 m-4">
            <SearchBar />
            <div className="m-10">
              <p>
                <a href="/login">LOGIN</a> to save your products ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeMatt;
