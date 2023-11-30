import React, { useState, useEffect } from "react";

export default function FilterBoardgames({
  boardgamesList,
  setFilteredBoardgames,
}) {
  const [players, setPlayers] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedGameModes, setSelectedGameModes] = useState([]);

  useEffect(() => {
    const filteredBoardgames = boardgamesList.filter((boardgame) => {
      const meetsPlayerCriteria =
        players === "" ||
        (boardgame.minPlayers <= parseInt(players, 10) &&
          parseInt(players, 10) <= boardgame.maxPlayers);

      const meetsDurationCriteria =
        duration === "" || 
        (parseInt(duration, 10) - 10 <= boardgame.duration &&
          parseInt(duration, 10) + 10 >= boardgame.duration);

      const meetsLocationCriteria =
        selectedLocations.length === 0 ||
        selectedLocations.includes(boardgame.location);

      const meetsGamemodeCriteria =
        selectedGameModes.length === 0 ||
        selectedGameModes.includes(boardgame.gamemode);

      return (
        meetsGamemodeCriteria && meetsPlayerCriteria && meetsLocationCriteria && meetsDurationCriteria
      );
    });

    setFilteredBoardgames(filteredBoardgames);
  }, [
    players,
    duration,
    selectedLocations,
    selectedGameModes,
    boardgamesList,
    setFilteredBoardgames,
  ]);

  const handlePlayersChange = (event) => {
    setPlayers(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleLocationChange = (location) => {
    const updatedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((loc) => loc !== location)
      : [...selectedLocations, location];

    setSelectedLocations(updatedLocations);
  };

  const handleGamemodeChange = (gamemode) => {
    const updatedGameModes = selectedGameModes.includes(gamemode)
      ? selectedGameModes.filter((mode) => mode !== gamemode)
      : [...selectedGameModes, gamemode];

    setSelectedGameModes(updatedGameModes);
  };

  return (
    <form className="mb-4">
      <label className="">Spelers:</label>
      <input
        type="number"
        id="players"
        className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
        placeholder="Enter players..."
        value={players}
        onChange={handlePlayersChange}
      />

      <label className="">Locaties:</label>
      <div>
        <input
          type="checkbox"
          id="locationSophia"
          checked={selectedLocations.includes("Sophia")}
          onChange={() => handleLocationChange("Sophia")}
        />
        <label className="">Sophia</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="locationJens"
          checked={selectedLocations.includes("Jens")}
          onChange={() => handleLocationChange("Jens")}
        />
        <label className="">Jens</label>
      </div>

      <label className="">Gamemodes:</label>
      <div>
        <input
          type="checkbox"
          id="gamemodePvP"
          checked={selectedGameModes.includes("PvP")}
          onChange={() => handleGamemodeChange("PvP")}
        />
        <label className="">PvP</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="gamemodeCooperative"
          checked={selectedGameModes.includes("Coöperatief")}
          onChange={() => handleGamemodeChange("Coöperatief")}
        />
        <label className="">Coöperatief</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="gamemodeTeams"
          checked={selectedGameModes.includes("Teams")}
          onChange={() => handleGamemodeChange("Teams")}
        />
        <label className="">Teams</label>
      </div>

      <label className="">Duur:</label>
      <input
        type="number"
        id="duration"
        className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
        placeholder="Tijd ofzo"
        value={duration}
        onChange={handleDurationChange}
      />
    </form>
  );
}
