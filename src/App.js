import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { getBoardgames, addBoardgame, deleteBoardgame } from "./api/boardgames";
import BoardgameList from "./components/BoardgameList";
import NewBoardgameForm from "./components/NewBoardgameForm";
import Auth from "./components/Auth";
import SortBoardgames from "./components/SortBoardgames";

export default function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState([]);
  const [searchedBoardgames, setSearchedBoardgames] = useState([]);

  useEffect(() => {
    // Haal de bordspellen op wanneer de component wordt geladen
    getBoardgames().then((data) => {
      setBoardgamesList(data);
    });
  }, []);

  const handleAddBoardgame = async (boardgameData) => {
    // Voeg een nieuw bordspel toe
    await addBoardgame(boardgameData);

    // Haal de bijgewerkte lijst van bordspellen op
    const updatedBoardgames = await getBoardgames();
    setBoardgamesList(updatedBoardgames);
  };

  const handleDeleteBoardgame = async (boardgameId) => {
    // Verwijder een bordspel
    await deleteBoardgame(boardgameId);

    // Haal de bijgewerkte lijst van bordspellen op
    const updatedBoardgames = await getBoardgames();
    setBoardgamesList(updatedBoardgames);
  };

  return (
    <div className="App">
      {/* <Header/> */}
      <SortBoardgames boardgamesList={boardgamesList} setSortedBoardgamesList={setSortedBoardgamesList}/>
      <BoardgameList
        boardgames={sortedBoardgamesList}
        onDeleteBoardgame={handleDeleteBoardgame}
      />
      <Auth />
      <h1>Boardgames List</h1>
      <NewBoardgameForm onSubmitBoardgame={handleAddBoardgame} />
    </div>
  );
}