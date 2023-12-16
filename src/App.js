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
import { IoAdd } from "react-icons/io5";
import { auth } from "./config/firebase";

export default function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState([]);
  const [searchedBoardgames, setSearchedBoardgames] = useState([]);
  const [filteredBoardgames, setFilteredBoardgames] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const adminUsers = ["test@gmail.com", "hoi@gmail.com"];

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
          {showForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <NewBoardgameForm
                handleAddBoardgame={handleAddBoardgame}
                toggleForm={toggleForm}
              />
            </div>
          )}
          {/* optie balk */}
          <div className="w-1/5 fixed">
            {/* Website naam */}
            <div className="w-full bg-[#2C2F44] h-16 flex items-center justify-center  text-center border-b border-gray-600 text-3xl">
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
          <div className="w-4/5 ml-auto ">
            {/* Zoekbalk */}
            <div className="bg-[#2C2F44] h-16 border-b border-gray-600 flex items-center">
              <div className="w-1/6"></div>
              <div className=" justify-center flex w-4/6 ml-5">
                <SearchBoardgames
                  boardgamesList={filteredBoardgames}
                  setSearchedBoardgames={setSearchedBoardgames}
                />
              </div>

              <div className="flex items-center justify-end w-1/6">
                <div className="mr-5">
                  <SortBoardgames
                    boardgamesList={searchedBoardgames} // Toon gesorteerde bordspellen op basis van zoekresultaten
                    setSortedBoardgamesList={setSortedBoardgamesList}
                  />
                </div>
                {adminUsers.includes(auth.currentUser.email) && (
                  <div className="mr-5">
                    <IoAdd
                      className="w-8 h-8 hover:cursor-pointer"
                      onClick={toggleForm}
                    >
                      Nieuw bordspel
                    </IoAdd>
                  </div>
                )}

                <div className="mr-5">
                  <Logout user={user} setUser={setUser} />
                </div>
              </div>
            </div>
            {/* bordspellen lijst */}
            <div className="bg-[#1E203C] h-full p-8">
              {/* <NewBoardgameForm onSubmitBoardgame={handleAddBoardgame} /> */}
              <BoardgameList
                boardgames={sortedBoardgamesList}
                onDeleteBoardgame={handleDeleteBoardgame}
                adminUsers={adminUsers}
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
