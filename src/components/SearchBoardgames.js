import React, { useState, useEffect } from 'react';

export default function SearchBoardgames({ boardgamesList, setSearchedBoardgames }) {
  const [searchQuery, setSearchQuery] = useState('');

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
    <div>
      <input
        type="text"
        placeholder="Zoek bordspellen op naam"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
