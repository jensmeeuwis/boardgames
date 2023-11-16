import React, { useEffect, useState } from "react";
import "./App.css";
import { getBoardgames, addBoardgame, deleteBoardgame } from "./api/boardgames";
import BoardgameList from "./components/BoardgameList";
import NewBoardgameForm from "./components/NewBoardgameForm";
import Auth from "./components/Auth";
import SortBoardgames from "./components/SortBoardgames";
import Logout from "./components/Logout";
import SearchBoardgames from "./components/SearchBoardgames";

export default function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState([]);
  const [searchedBoardgames, setSearchedBoardgames] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Haal de bordspellen op wanneer de component wordt geladen
    getBoardgames().then((data) => {
      setBoardgamesList(data);
      setSearchedBoardgames(data); // Initialiseer de lijst van gezocht bordspellen met alle bordspellen
    });
  }, []);

  const handleAddBoardgame = async (boardgameData) => {
    // Voeg een nieuw bordspel toe
    await addBoardgame(boardgameData);

    // Haal de bijgewerkte lijst van bordspellen op
    const updatedBoardgames = await getBoardgames();
    setBoardgamesList(updatedBoardgames);
    setSearchedBoardgames(updatedBoardgames); // Update de lijst van gezocht bordspellen na toevoeging
  };

  const handleDeleteBoardgame = async (boardgameId) => {
    // Verwijder een bordspel
    await deleteBoardgame(boardgameId);

    // Haal de bijgewerkte lijst van bordspellen op
    const updatedBoardgames = await getBoardgames();
    setBoardgamesList(updatedBoardgames);
    setSearchedBoardgames(updatedBoardgames); // Update de lijst van gezocht bordspellen na verwijdering
  };

  return (
    <div className="flex min-h-screen h-full text-white">
      {/* optie balk */}
      <div className="w-1/5 bg-[#5E518C]">
        {/* Website naam */}
        <div className="h-16 flex items-center justify-center  text-center border-b border-gray-600 text-3xl">
          Boardgames
        </div>
        {/* Opties */}
        <div>
          <div>Location</div>
          <div>Location</div>
          <div>Location</div>
          <div>Location</div>
          <div>Location</div>
          <div>Location</div>
        </div>
      </div>

      {/* Bordspellen balk */}
      <div className="w-4/5 ">
        {/* Zoekbalk */}
        <div className="bg-[#2C2F44] h-16 border-b border-gray-600 flex justify-center items-center">
          <SearchBoardgames
            boardgamesList={boardgamesList}
            setSearchedBoardgames={setSearchedBoardgames}
          />

          <SortBoardgames
            boardgamesList={searchedBoardgames} // Toon gesorteerde bordspellen op basis van zoekresultaten
            setSortedBoardgamesList={setSortedBoardgamesList}
          />
        </div>

        {/* bordspellen lijst */}
        <div className="bg-[#1E203C] h-full">
          <BoardgameList
            boardgames={sortedBoardgamesList}
            onDeleteBoardgame={handleDeleteBoardgame}
          />
        </div>
      </div>
    </div>
  );
}

//<div>
{
  /* {user ? (
          <div>
            <SearchBoardgames
              boardgamesList={boardgamesList}
              setSearchedBoardgames={setSearchedBoardgames}
            />
            <SortBoardgames
              boardgamesList={searchedBoardgames} // Toon gesorteerde bordspellen op basis van zoekresultaten
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
        )} */
}
//</div>
