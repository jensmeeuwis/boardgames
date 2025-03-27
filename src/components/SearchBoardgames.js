import React, { useState, useEffect } from "react";

export default function SearchBoardgames({
  boardgamesList,
  setSearchedBoardgames,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredBoardgames = boardgamesList.filter((boardgame) =>
      boardgame.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedBoardgames(filteredBoardgames);
  }, [searchQuery, boardgamesList, setSearchedBoardgames]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          className="block w-full py-2 ps-10 text-xl border rounded-lg bg-button border-border "
          placeholder="Zoeken..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </form>
  );
}
