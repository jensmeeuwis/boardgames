import React, { useState, useEffect, useRef } from "react";
import { IoMdStopwatch } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import FilterSelect from "./FilterSelect";
import FilterInput from "./FilterInput";

export default function FilterBoardgames({
  boardgamesList,
  sortedBoardgamesList,
  setFilteredBoardgames,
  randomBoardgame,
  setRandomBoardgame,
}) {
  const [players, setPlayers] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedGamemodes, setSelectedGamemodes] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");

  const selectRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { Select, initTE } = await import("tw-elements");
      initTE({ Select }, { allowReinits: true });
    };

    init();
  }, []);

  useEffect(() => {
    const filteredBoardgames = boardgamesList.filter((boardgame) => {
      const meetsPlayerCriteria =
        players === "" ||
        (boardgame.minPlayers <= parseInt(players, 10) &&
          parseInt(players, 10) <= boardgame.maxPlayers);

      const meetsDurationCriteria =
        (minDuration === "" &&
          boardgame.maxDuration <= parseInt(maxDuration, 10)) ||
        (maxDuration === "" &&
          boardgame.minDuration >= parseInt(minDuration, 10)) ||
        (minDuration === "" && maxDuration === "") ||
        (boardgame.minDuration >= parseInt(minDuration, 10) &&
          boardgame.maxDuration <= parseInt(maxDuration, 10));

      const meetsLocationCriteria =
        selectedLocations.length === 0 ||
        selectedLocations.includes(boardgame.location);

      const meetsGamemodeCriteria =
        selectedGamemodes.length === 0 ||
        selectedGamemodes.includes(boardgame.gamemode);

      const meetsCategoryCriteria =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          boardgame.category.includes(category)
        );

      return (
        meetsGamemodeCriteria &&
        meetsPlayerCriteria &&
        meetsLocationCriteria &&
        meetsDurationCriteria &&
        meetsCategoryCriteria
      );
    });

    setFilteredBoardgames(filteredBoardgames);
  }, [
    players,
    minDuration,
    maxDuration,
    selectedLocations,
    selectedGamemodes,
    selectedCategories,
    boardgamesList,
    setFilteredBoardgames,
  ]);

  const handlePlayersChange = (event) => {
    setPlayers(event.target.value);
  };

  const handleMinDurationChange = (event) => {
    setMinDuration(event.target.value);
  };

  const handleMaxDurationChange = (event) => {
    setMaxDuration(event.target.value);
  };

  const handleLocationChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );

    setSelectedLocations(selectedOptions);
  };

  const handleGamemodeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );

    setSelectedGamemodes(selectedOptions);
  };

  const handleCategoryChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );

    setSelectedCategories(selectedOptions);
  };

  const locationOptions = [
    ...new Set(boardgamesList.map(({ location }) => location)),
  ]
    .sort()
    .map((location) => ({ value: location, label: location }));

  const gamemodeOptions = [
    ...new Set(boardgamesList.map(({ gamemode }) => gamemode)),
  ]
    .sort()
    .map((gamemode) => ({ value: gamemode, label: gamemode }));

  const categoryOptions = [
    ...new Set(boardgamesList.flatMap(({ category }) => category)),
  ]
    .sort()
    .map((category) => ({ value: category, label: category }));

  const random = () => {
    const randomIndex = Math.floor(Math.random() * sortedBoardgamesList.length);
    const randomBoardgame = [sortedBoardgamesList[randomIndex]];
    setRandomBoardgame(randomBoardgame);
  };

  const list = () => {
    setRandomBoardgame([]);
  };

  const clear = () => {
    setRandomBoardgame([]);
    setPlayers("");
    setMinDuration("");
    setMaxDuration("");
    // setSelectedLocations([]);
    // setSelectedGamemodes([]);
    // setSelectedCategories([]);
  };

  return (
    <div className="mx-5 py-5">
      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <HiOutlineUsers className="w-8 h-8" />
        </label>
        <FilterInput
          type="number"
          id="players"
          placeholder="Aantal spelers..."
          value={players}
          onChange={handlePlayersChange}
        />
      </div>

      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <IoMdStopwatch className="w-8 h-8" />
        </label>

        <FilterInput
          type="number"
          id="duration"
          placeholder="Min."
          value={minDuration}
          onChange={handleMinDurationChange}
        />
        <FilterInput
          type="number"
          id="duration"
          placeholder="Max."
          value={maxDuration}
          onChange={handleMaxDurationChange}
        />
      </div>

      <FilterSelect
        icon={BsHouse}
        options={locationOptions}
        selectedOptions={selectedLocations}
        onChange={handleLocationChange}
        placeholder="Locaties"
        label="Locaties"
      />

      <FilterSelect
        icon={IoGameControllerOutline}
        options={gamemodeOptions}
        selectedOptions={selectedGamemodes}
        onChange={handleGamemodeChange}
        placeholder="Spelmodus"
        label="Spelmodus"
      />

      <FilterSelect
        icon={BiCategory}
        options={categoryOptions}
        selectedOptions={selectedCategories}
        onChange={handleCategoryChange}
        placeholder="Categorieën"
        label="Categorieën"
      />

      <button
        className="w-full mt-4 text-white text-lg p-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600  transition duration-300"
        onClick={() => random()}
      >
        Random
      </button>
      {randomBoardgame.length > 0 && (
        <button
          className="w-full mt-4 text-white text-lg p-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600  transition duration-300"
          onClick={() => list()}
        >
          Lijst
        </button>
      )}
      <button
        className="w-full mt-4 text-white text-lg p-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600  transition duration-300"
        onClick={() => clear()}
      >
        Clear
      </button>
    </div>
  );
}
