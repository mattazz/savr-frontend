import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config/constants";
import { Suggestion } from "../../@types/homepage";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState<Suggestion[]>();

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop?keyword=${keyword}`);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    try {
      const response = await axios.get(
        `${backendUrl}api/products/autocompletion?query=${keyword}`,
      );
      setSuggestions(response.data.suggestions);
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
        list="searchOptions"
      />
      <datalist id="searchOptions">
        {suggestions
          ? suggestions.map((suggestion) => {
              return <option key={suggestion._id}>{suggestion.name}</option>;
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
