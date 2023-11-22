import React from "react";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";

export default function BoardgameList({ boardgames, onDeleteBoardgame }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
      {boardgames.map((boardgame) => (
        <div
          key={boardgame.id}
          className="border-2 border-gray-300 bg-[#8f7bf561] rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300"
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
            <h1 className="text-xl font-semibold mb-2">{boardgame.name}</h1>
           
            <ul className="flex space-x-2 mb-4">
              {Object.entries(boardgame.category).map(
                ([category, value]) =>
                  value && (
                    <li
                      key={category}
                      className="text-xs bg-blue-200 text-blue-800 py-1 px-2 rounded-full"
                    >
                      {category}
                    </li>
                  )
              )}
            </ul>


            <div className="grid grid-cols-2">
              <div className="text-gray-300 mb-2 flex">
                <HiOutlineUsers className="w-6 h-6" />{" "}
                <p className="ml-2">
                  {boardgame.minPlayers === boardgame.maxPlayers
                    ? boardgame.minPlayers
                    : `${boardgame.minPlayers}-${boardgame.maxPlayers}`}
                </p>
              </div>
              <div className="text-gray-300 mb-2 flex">
                <BsHouse className="w-6 h-6" />
                <p className="ml-2">{boardgame.location}</p>
              </div>

              <div className="text-gray-300 mb-2 flex">
                <IoGameControllerOutline className="w-6 h-6" />
                <p className="ml-2">{boardgame.gamemode}</p>
              </div>
              <div className="text-gray-300 mb-2 flex">
                <IoMdStopwatch className="w-6 h-6" />
                <p className="ml-2">{boardgame.duration}</p>
              </div>
            </div>



            
            {/* <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => onDeleteBoardgame(boardgame.id)}
            >
              Delete
            </button> */}
          </div>
        </div>
      ))}
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
