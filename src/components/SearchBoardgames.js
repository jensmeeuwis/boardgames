import React, { useState } from "react";

export default function SearchBoardgames({ boardgamesList, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Zoek bordspel op naam"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Zoeken</button>
    </div>
  );
}
