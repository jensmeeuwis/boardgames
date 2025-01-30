import React, { useEffect, useState } from "react";
import "./App.css";
import { getBoardgames, addBoardgame, deleteBoardgame } from "./api/boardgames";
import BoardgameList from "./components/BoardgameList";
import NewBoardgameForm from "./components/NewBoardgameForm";
import Auth from "./components/Auth";
import SortBoardgames from "./components/SortBoardgames";
import Logout from "./components/Logout";
import SearchBoardgames from "./components/SearchBoardgames";
import FilterBoardgames from "./components/Filter/FilterBoardgames";
import { IoAdd, IoFilter } from "react-icons/io5";
import { auth } from "./config/firebase";

export default function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);
  const [sortedBoardgamesList, setSortedBoardgamesList] = useState([]);
  const [searchedBoardgames, setSearchedBoardgames] = useState([]);
  const [filteredBoardgames, setFilteredBoardgames] = useState([]);
  const [randomBoardgame, setRandomBoardgame] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [onMobile, setOnMobile] = useState(false);
  const adminUsers = ["jensmeeuwis@gmail.com"];

  useEffect(() => {
    getBoardgames().then((data) => {
      setBoardgamesList(data);
      setSearchedBoardgames(data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023 && showFilter) {
        setShowFilter(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showFilter]);

  const handleAddBoardgame = async (boardgameData) => {
    await addBoardgame(boardgameData);

    const updatedBoardgames = await getBoardgames();
    setBoardgamesList(updatedBoardgames);
    setSearchedBoardgames(updatedBoardgames);
  };

  const handleDeleteBoardgame = async (boardgameId) => {
    await deleteBoardgame(boardgameId);

    const updatedBoardgames = await getBoardgames();
    setBoardgamesList(updatedBoardgames);
    setSearchedBoardgames(updatedBoardgames);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
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
          <div className="w-1/5 fixed max-lg:hidden">
            {/* Website naam */}
            <div className="w-full bg-[#2C2F44] h-16 flex items-center justify-center  text-center border-b border-gray-600 text-3xl">
              Boardgames
            </div>
            {/* Opties */}
            <div className=" w-full bg-gradient-to-b from-[#2C2F44] to-[#355EA9] h-screen">
              <FilterBoardgames
                boardgamesList={boardgamesList}
                sortedBoardgamesList={sortedBoardgamesList}
                setFilteredBoardgames={setFilteredBoardgames}
                randomBoardgame={randomBoardgame}
                setRandomBoardgame={setRandomBoardgame}
              />
            </div>
          </div>
          {/* Bordspellen balk */}
          <div className="w-full lg:w-4/5 ml-auto">
            {/* Zoekbalk */}
            <div className="bg-[#2C2F44] h-16 border-b border-gray-600 flex items-center fixed w-full lg:w-4/5 z-40">
              <div className="w-3/12 flex items-center justify-center">
                <IoFilter
                  className="w-8 h-8 hover:cursor-pointer lg:hidden"
                  onClick={() => {
                    toggleFilter();
                    setOnMobile(!onMobile);
                  }}
                />
              </div>
              <div className="justify-center flex w-1/2">
                <SearchBoardgames
                  boardgamesList={filteredBoardgames}
                  setSearchedBoardgames={setSearchedBoardgames}
                />
              </div>

              <div className="flex items-center justify-between w-3/12 px-1 sm:px-4 md:px-8 lg:px-14">
                <SortBoardgames
                  boardgamesList={searchedBoardgames}
                  setSortedBoardgamesList={setSortedBoardgamesList}
                />
                {adminUsers.includes(auth.currentUser.email) && (
                  <IoAdd
                    className="w-8 h-8 hover:cursor-pointer"
                    onClick={toggleForm}
                  />
                )}
                <Logout user={user} setUser={setUser} />
              </div>
            </div>
            {/* bordspellen lijst */}
            <div className="bg-[#1E203C] h-[calc(100%-4rem)] p-8 mt-16">
              <div className={`${showFilter ? "" : "hidden"}`}>
                <FilterBoardgames
                  boardgamesList={boardgamesList}
                  sortedBoardgamesList={sortedBoardgamesList}
                  setFilteredBoardgames={setFilteredBoardgames}
                  randomBoardgame={randomBoardgame}
                  setRandomBoardgame={setRandomBoardgame}
                />
              </div>
              <BoardgameList
                boardgames={sortedBoardgamesList}
                randomBoardgame={randomBoardgame}
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
