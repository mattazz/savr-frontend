import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config/constants";
import { Suggestion } from "../@types/types";
import { Search, TrendingUp } from "lucide-react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop?keyword=${keyword}`);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);

    if (value.trim()) {
      try {
        const response = await axios.get(
          `${backendUrl}api/products/autocompletion?query=${value}`
        );
        setSuggestions(response.data.suggestions);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setKeyword(suggestion.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    navigate(`/shop?keyword=${suggestion.name}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleClick(e);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div ref={searchRef} className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleClick}>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="What are you looking for? 😉"
              className="w-full focus:outline-none pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 text-gray-700 placeholder-gray-400"
              value={keyword}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              id="searchInput"
              name="searchInput"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200 whitespace-nowrap"
          >
            <Search className="h-5 w-5 mr-2" />
            Find
          </button>
        </div>
      </form>

      {/* Custom Suggestions List */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          <ul ref={listRef} className="py-1">
            {suggestions.map((suggestion, index) => (
              <li key={suggestion._id}>
                <button
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-3 text-left transition duration-150 flex items-center gap-3 group
                    ${index === selectedIndex
                      ? "bg-teal-50 text-teal-700"
                      : "hover:bg-gray-50 text-gray-700 hover:text-teal-600"
                    }`}
                >
                  <TrendingUp
                    className={`h-5 w-5 transition-colors ${index === selectedIndex
                      ? "text-teal-500"
                      : "text-gray-400 group-hover:text-teal-500"
                      }`}
                  />
                  <span className="truncate">{suggestion.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
