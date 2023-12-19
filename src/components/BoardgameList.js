import React, { useEffect, useState } from "react";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";
import BoardgameModal from "./BoardgameModal";
import { auth } from "../config/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function BoardgameList({
  boardgames,
  onDeleteBoardgame,
  adminUsers,
  loadedCards,
  setLoadedCards,
}) {
  const [isResized, setIsResized] = useState(false);
  const [resizedBoardgame, setResizedBoardgame] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const resizeBoardgame = (id) => () => {
    const boardgame = boardgames.find((boardgame) => boardgame.id === id);
    setResizedBoardgame(boardgame);
    setIsResized(!isResized);
  };

  return (
    <div>
      {isResized && (
        <BoardgameModal
          resizeBoardgame={resizeBoardgame}
          resizedBoardgame={resizedBoardgame}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <AnimatePresence initial={false}>
          {boardgames.map((boardgame) => (
            <motion.div
              key={boardgame.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              layoutId={boardgame.id}
              onClick={() => setSelectedId(boardgame.id)}
            >
              <AnimatePresence>
                {selectedId && (
                  <motion.div layoutId={selectedId}>
                    <motion.h5>{boardgame.title}</motion.h5>
                    <motion.h2>{boardgame.description}</motion.h2>
                    <motion.button onClick={() => setSelectedId(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                key={boardgame.id}
                className=" rounded-md overflow-hidden shadow-gray-950 shadow-lg duration-300 boardgame-card"
                onClick={resizeBoardgame(boardgame.id)}
              >
                {boardgame.imageUrl && (
                  <div className=" aspect-square">
                    <img
                      src={boardgame.imageUrl}
                      alt={boardgame.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h1 className="text-xl font-semibold mb-2">
                    {boardgame.name}
                  </h1>

                  <ul className="flex space-x-2 mb-4">
                    {Object.entries(boardgame.category).map(
                      ([category, value]) =>
                        value && (
                          <li
                            key={category}
                            className="text-xs bg-blue-200 text-blue-800 py-1 px-2 rounded-full"
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </li>
                        )
                    )}
                  </ul>

                  <div className="grid grid-cols-2 text-gray-300">
                    <div className="mb-2 flex">
                      <HiOutlineUsers className="w-6 h-6" />
                      <p className="ml-2">
                        {boardgame.minPlayers === boardgame.maxPlayers
                          ? boardgame.minPlayers
                          : `${boardgame.minPlayers}-${boardgame.maxPlayers}`}
                      </p>
                    </div>
                    <div className="mb-2 flex">
                      <BsHouse className="w-6 h-6" />
                      <p className="ml-2">{boardgame.location}</p>
                    </div>

                    <div className="mb-2 flex">
                      <IoMdStopwatch className="w-6 h-6" />
                      <p className="ml-2">{boardgame.duration}</p>
                    </div>
                    <div className="mb-2 flex">
                      <IoGameControllerOutline className="w-6 h-6" />
                      <p className="ml-2">{boardgame.gamemode}</p>
                    </div>
                  </div>
                  {adminUsers.includes(auth.currentUser.email) && (
                    <button
                      className="w-full text-white text-lg p-2 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600  transition duration-300"
                      onClick={() => onDeleteBoardgame(boardgame.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// import React from "react";

// export default function BoardgameList({ boardgames, onDeleteBoardgame }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {boardgames.map((boardgame) => (
//         <div
//           key={boardgame.id}
//           className="border-2 border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300"
//         >
//           {boardgame.imageUrl && (
//             <div className=" aspect-square">
//               <img
//                 src={boardgame.imageUrl}
//                 alt={boardgame.name}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           )}
//           <div className="p-4">
//             <h1 className="text-xl font-semibold mb-2">{boardgame.name}</h1>
//             <p className="text-gray-600 mb-2">Location: {boardgame.location}</p>
//             <p className="text-gray-600 mb-2">Players: {boardgame.players}</p>
//             <p className="text-gray-600 mb-2">Gamemode: {boardgame.gamemode}</p>
//             <p className="text-gray-600 mb-2">Duration: {boardgame.duration}</p>
//             <ul className="flex space-x-2 mb-4">
//               {Object.entries(boardgame.category).map(
//                 ([category, value]) =>
//                   value && (
//                     <li
//                       key={category}
//                       className="text-xs bg-blue-200 text-blue-800 py-1 px-2 rounded-full"
//                     >
//                       {category}
//                     </li>
//                   )
//               )}
//             </ul>
//             <button
//               className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
//               onClick={() => onDeleteBoardgame(boardgame.id)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
