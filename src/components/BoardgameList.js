import React, { useEffect, useState } from "react";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";
import BoardgameModal from "./BoardgameModal";
import { auth } from "../config/firebase";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineArrowUp } from "react-icons/hi";

export default function BoardgameList({
  boardgames,
  onDeleteBoardgame,
  adminUsers,
  randomBoardgame,
  currentUserRole,
}) {
  const [isResized, setIsResized] = useState(false);
  const [resizedBoardgame, setResizedBoardgame] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const resizeBoardgame = (id) => () => {
    const boardgame = boardgames.find((boardgame) => boardgame.id === id);
    setResizedBoardgame(boardgame);
    setIsResized(!isResized);
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <button
        className="fixed z-40 top-24 right-8 bg-button border border-border hover:bg-border transition duration-300 rounded-full w-16 h-16 flex items-center justify-center"
        onClick={() => goToTop()}
      >
        <HiOutlineArrowUp />
      </button>
      {/* <AnimatePresence initial={false}>
        {isResized && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BoardgameModal
              resizeBoardgame={resizeBoardgame}
              resizedBoardgame={resizedBoardgame}
            />
          </motion.div>
        )}
      </AnimatePresence> */}
      <h1 className="mb-5">Aantal resultaten: {boardgames.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        <AnimatePresence initial={false}>
          {(randomBoardgame.length > 0 ? randomBoardgame : boardgames).map(
            (boardgame) => (
              <motion.div
                key={boardgame.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.05, cursor: "pointer" }}
                layoutId={boardgame.id}
                // onClick={() => setSelectedId(boardgame.id)}
              >
                <div
                  className="rounded-md overflow-hidden shadow-gray-950 shadow-lg duration-300 flex flex-col h-full"
                  // onClick={resizeBoardgame(boardgame.id)}
                >
                  {boardgame.imageUrl && (
                    <div className="aspect-square">
                      <img
                        src={boardgame.imageUrl}
                        alt={boardgame.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4 flex flex-col">
                    <h1 className="text-xl font-semibold mb-4 line-clamp-2">
                      {boardgame.name}
                    </h1>

                    <ul className="flex gap-2 mb-4 flex-wrap">
                      {Object.entries(boardgame.category).map(
                        ([category, value]) =>
                          value && (
                            <li
                              key={category}
                              className="text-xs bg-blue-200 text-blue-800 py-1 px-2 rounded-full"
                            >
                              {value}
                            </li>
                          )
                      )}
                    </ul>

                    <div className="flex-grow"></div>

                    <div className="flex flex-col gap-2 text-gray-300">
                      <div className="flex">
                        <HiOutlineUsers className="w-6 h-6" />
                        <p className="ml-2">
                          {boardgame.minPlayers === boardgame.maxPlayers
                            ? boardgame.minPlayers
                            : `${boardgame.minPlayers}-${boardgame.maxPlayers}`}
                        </p>
                      </div>
                      <div className="flex">
                        <BsHouse className="w-6 h-6" />
                        <p className="ml-2">{boardgame.location}</p>
                      </div>

                      <div className="flex">
                        <IoMdStopwatch className="w-6 h-6" />
                        <p className="ml-2">
                          {boardgame.minDuration === boardgame.maxDuration
                            ? boardgame.minDuration
                            : `${boardgame.minDuration}-${boardgame.maxDuration}`}
                        </p>
                      </div>
                      <div className="flex">
                        <IoGameControllerOutline className="w-6 h-6" />
                        <p className="ml-2">{boardgame.gamemode}</p>
                      </div>
                    </div>
                    {(currentUserRole === "admin" ||
                      auth.currentUser.uid === boardgame.userId) && (
                      <button
                        className="w-full mt-4 text-white text-lg p-2 rounded-lg bg-button hover:bg-border border border-border transition duration-300"
                        onClick={() => onDeleteBoardgame(boardgame.id)}
                      >
                        Verwijder
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
