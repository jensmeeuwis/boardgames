import React, { useEffect, useState } from "react";
import "./App.css";
import { getBoardgames, addBoardgame, deleteBoardgame } from "./api/boardgames";
import BoardgameList from "./components/BoardgameList";
import NewBoardgameForm from "./components/NewBoardgameForm";
import Auth from "./components/Auth";
import SortBoardgames from "./components/SortBoardgames";
import Logout from "./components/Logout";
import SearchBoardgames from "./components/SearchBoardgames";
import FilterBoardgames from "./components/FilterBoardgames";
import { auth } from "./config/firebase";

export default function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState([]);
  const [searchedBoardgames, setSearchedBoardgames] = useState([]);
  const [filteredBoardgames, setFilteredBoardgames] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const adminUsers = ["hoi@gmail.com", "test@gmail.com"];

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {user ? (
        <div className="flex min-h-screen h-full text-white">
          {/* optie balk */}
          <div className="w-1/5 fixed">
            {/* Website naam */}
            <div className=" w-full bg-[#2C2F44] h-16 flex items-center justify-center  text-center border-b border-gray-600 text-3xl">
              Boardgames
            </div>
            {/* Opties */}
            <div className=" w-full bg-gradient-to-b from-[#2C2F44] to-[#355EA9] h-screen">
              <FilterBoardgames
                boardgamesList={boardgamesList}
                setFilteredBoardgames={setFilteredBoardgames}
              />
            </div>
          </div>
          {/* Bordspellen balk */}
          <div className="w-4/5 translate-x-1/4">
            {/* Zoekbalk */}
            <div className="bg-[#2C2F44] h-16 border-b border-gray-600 flex justify-center items-center">
              <SearchBoardgames
                boardgamesList={filteredBoardgames}
                setSearchedBoardgames={setSearchedBoardgames}
              />
              <SortBoardgames
                boardgamesList={searchedBoardgames} // Toon gesorteerde bordspellen op basis van zoekresultaten
                setSortedBoardgamesList={setSortedBoardgamesList}
              />
              <Logout user={user} setUser={setUser} />

              {adminUsers.includes(auth.currentUser.email) && (
                <button
                  className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-md"
                  onClick={toggleForm}
                >
                  {showForm
                    ? "Verberg formulier"
                    : "Voeg nieuwe boardgame toe"}
                </button>
              )}


            </div>
            {/* bordspellen lijst */}
            <div className="bg-[#1E203C] h-full p-8">
              {/* <NewBoardgameForm onSubmitBoardgame={handleAddBoardgame} /> */}
              <BoardgameList
                boardgames={sortedBoardgamesList}
                onDeleteBoardgame={handleDeleteBoardgame}
              />
            </div>
          </div>
        </div>
      ) : (
        <Auth user={user} setUser={setUser} />
      )}
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
