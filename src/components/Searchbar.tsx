import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop?keyword=${keyword}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handling the change of event");
    setKeyword(e.target.value);
  };

  return (
    <form action="" className="space-y-4 flex flex-col">
      <input
        type="text"
        placeholder="What are you looking for 😉"
        className="p-2 border rounded box-shadow-black"
        value={keyword}
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        className="p-2 bg-black text-white rounded w-1/2 m-auto box-shadow-white hover:box-shadow-black hover:bg-white hover:text-black transition duration-300"
      >
        SEARCH
      </button>
    </form>
  );
}
