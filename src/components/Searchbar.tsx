import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { Suggestion } from "../../@types/homepage.ts";
import axios, { AxiosResponse } from "axios";
import { backendUrl } from "../config/constants";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop?keyword=${keyword}`);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    try {
      const response: AxiosResponse<Suggestion[]> = await axios.get(
        `${backendUrl}/api/products/autocompletion?query=${keyword}`,
      );
      setSuggestions(response.data);
    } catch {
      return;
    }
  };

  return (
    <form action="" className="space-y-4 flex flex-col">
      <input
        type="text"
        placeholder="What are you looking for 😉"
        className="p-2  rounded box-shadow-black"
        value={keyword}
        onChange={handleChange}
        id="searchInput"
        name="searchInput"
        autoComplete="on"
        list="searchOptions"
      />
      <datalist id="searchOptions">
        {suggestions
          ? suggestions.map((suggestion) => {
              return <option value={suggestion.evname} />;
            })
          : ""}
      </datalist>
      <button
        onClick={handleClick}
        className="p-2 bg-black text-white rounded w-1/2 m-auto box-shadow-white hover:box-shadow-black hover:bg-white hover:text-black transition duration-300"
      >
        SEARCH
      </button>
    </form>
  );
}
