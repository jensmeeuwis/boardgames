import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { getBoardgames, addBoardgame, deleteBoardgame } from "./api/boardgames";
import BoardgameList from "./components/BoardgameList";
import NewBoardgameForm from "./components/NewBoardgameForm";
import Auth from "./components/Auth";
import SortBoardgames from "./components/SortBoardgames";
import Logout from "./components/Logout";

export default function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState([]);
  const [searchedBoardgames, setSearchedBoardgames] = useState([]);
  const [user, setUser] = useState(null);

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
      <div>
        {user ? (
          <div>
            <SortBoardgames
              boardgamesList={boardgamesList}
              setSortedBoardgamesList={setSortedBoardgamesList}
            />
            <BoardgameList
              boardgames={sortedBoardgamesList}
              onDeleteBoardgame={handleDeleteBoardgame}
            />
            <NewBoardgameForm onSubmitBoardgame={handleAddBoardgame} />
            <Logout />
          </div>
        ) : (
          <Auth user={user} setUser={setUser} />
        )}
      </div>

      {/* <Header/> */}
    </div>
  );
}
