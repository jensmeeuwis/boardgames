import React, { useState, useEffect, useRef } from "react";
import { IoMdStopwatch } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";

export default function FilterBoardgames({
  boardgamesList,
  setFilteredBoardgames,
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

  return (
    <div className="mx-5 pt-5">
      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <HiOutlineUsers className="w-8 h-8" />
        </label>
        <input
          type="number"
          id="players"
          className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
          placeholder="Enter players..."
          value={players}
          onChange={handlePlayersChange}
        />
      </div>

      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <IoMdStopwatch className="w-8 h-8" />
        </label>
        <input
          type="number"
          id="duration"
          className="block w-1/2 py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
          placeholder="Min."
          value={minDuration}
          onChange={handleMinDurationChange}
        />
        <input
          type="number"
          id="duration"
          className="block w-1/2 py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
          placeholder="Max."
          value={maxDuration}
          onChange={handleMaxDurationChange}
        />
      </div>

      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <BsHouse className="w-8 h-8" />
        </label>
        <select
          id="select"
          data-te-select-init
          multiple
          ref={selectRef}
          onChange={handleLocationChange}
          data-te-class-dropdown="border rounded-b-lg bg-gray-700 border-gray-600"
          data-te-class-no-result="text-white"
          data-te-class-select-option="text-white py-2 pl-5"
          data-te-select-all="false"
          data-te-select-displayed-labels="1"
          data-te-select-options-selected-label="opties geselecteerd"
          data-te-select-placeholder="Locaties"
          data-te-select-visible-options="4"
        >
          {boardgamesList
            .map(({ name, location }) => ({ name, location }))
            .filter(
              (boardgame, index, self) =>
                index ===
                self.findIndex((bg) => bg.location === boardgame.location)
            )
            .sort((a, b) => a.location.localeCompare(b.location))
            .map(({ name, location }) => (
              <option key={name} value={location}>
                {location}
              </option>
            ))}
        </select>
        <label data-te-select-label-ref>Locaties</label>
      </div>

      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <IoGameControllerOutline className="w-8 h-8" />
        </label>
        <select
          id="select"
          data-te-select-init
          multiple
          ref={selectRef}
          onChange={handleGamemodeChange}
          data-te-class-dropdown="border rounded-b-lg bg-gray-700 border-gray-600"
          data-te-class-no-result="text-white"
          data-te-class-select-option="text-white py-2 pl-5"
          data-te-select-all="false"
          data-te-select-displayed-labels="1"
          data-te-select-options-selected-label="opties geselecteerd"
          data-te-select-placeholder="Spelmodus"
          data-te-select-visible-options="4"
        >
          {boardgamesList
            .filter(
              (boardgame, index, self) =>
                index ===
                self.findIndex((bg) => bg.gamemode === boardgame.gamemode)
            )
            .sort((a, b) => a.gamemode.localeCompare(b.gamemode))
            .map((boardgame) => (
              <option key={boardgame.name} value={boardgame.gamemode}>
                {boardgame.gamemode}
              </option>
            ))}
        </select>
        <label data-te-select-label-ref>Spelmodus</label>
      </div>

      <div className="mb-5 flex gap-5">
        <label className="flex justify-center items-center">
          <BiCategory className="w-8 h-8" />
        </label>

        <select
          id="select"
          data-te-select-init
          multiple
          ref={selectRef}
          onChange={handleCategoryChange}
          data-te-class-dropdown="border rounded-b-lg bg-gray-700 border-gray-600"
          data-te-class-no-result="text-white"
          data-te-class-select-option="text-white py-2 pl-5"
          data-te-select-all="false"
          data-te-select-displayed-labels="1"
          data-te-select-options-selected-label="opties geselecteerd"
          data-te-select-placeholder="Categorieën"
          data-te-select-visible-options="4"
        >
          {boardgamesList
            .flatMap(({ name, category }) =>
              category.map((cat) => ({ name, category: cat }))
            )
            .filter(
              (boardgame, index, self) =>
                self.findIndex((bg) => bg.category === boardgame.category) ===
                index
            )
            .sort((a, b) => a.category.localeCompare(b.category))
            .map(({ name, category }) => (
              <option key={name} value={category}>
                {category}
              </option>
            ))}
        </select>
        <label data-te-select-label-ref>Categorieën</label>
      </div>
    </div>
  );
}
