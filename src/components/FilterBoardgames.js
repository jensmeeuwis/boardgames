import React, { useState, useEffect } from "react";

export default function FilterBoardgames({
  boardgamesList,
  setFilteredBoardgames,
}) {
  const [players, setPlayers] = useState("");
  const [locationSophia, setLocationSophia] = useState(false);
  const [gamemodePvP, setGamemodePvP] = useState(false);

  useEffect(() => {
    const filteredBoardgames = boardgamesList.filter((boardgame) => {
      const meetsPlayerCriteria =
        !players ||
        (boardgame.minPlayers <= parseInt(players, 10) &&
          parseInt(players, 10) <= boardgame.maxPlayers);

      const meetsLocationCriteria =
        !locationSophia || boardgame.location === "Sophia";

        const meetsGamemodeCriteria =
        !gamemodePvP || boardgame.gamemode === "PvP";

      return meetsPlayerCriteria && meetsLocationCriteria && meetsGamemodeCriteria;
    });

    setFilteredBoardgames(filteredBoardgames);
  }, [players, locationSophia, gamemodePvP, boardgamesList, setFilteredBoardgames]);

  const handlePlayersChange = (event) => {
    setPlayers(event.target.value);
  };

  const handleLocationChange = () => {
    setLocationSophia(!locationSophia);
  };

  const handleGamemodeChange = () => {
    setGamemodePvP(!gamemodePvP);
  };

  return (
    <form className="mb-4">
      <label htmlFor="min-players" className="text-white">
        Spelers:
      </label>
      <input
        type="number"
        id="min-players"
        className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
        placeholder="Enter players..."
        value={players}
        onChange={handlePlayersChange}
      />
      <label htmlFor="min-players" className="text-white">
        Sophia:
      </label>
      <input
        type="checkbox"
        id="locationSophia"
        className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
        checked={locationSophia}
        onChange={handleLocationChange}
      />

      <label htmlFor="min-players" className="text-white">
        PvP:
      </label>
      <input
        type="checkbox"
        id="gamemodePvP"
        className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
        checked={gamemodePvP}
        onChange={handleGamemodeChange}
      />
    </form>
  );
}
