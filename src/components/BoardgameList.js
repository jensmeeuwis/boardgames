import React from "react";
// import { Rating } from "@material-tailwind/react";
import Rating from "@mui/material/Rating";

export default function BoardgameList({ boardgames, onDeleteBoardgame }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {boardgames.map((boardgame) => (
        <div
          key={boardgame.id}
          className="border-2 border-gray-300 bg-[#8f7bf561] rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300"
        >
          {boardgame.imageUrl && (
            <div className=" aspect-video">
              <img
                src={boardgame.imageUrl}
                alt={boardgame.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">{boardgame.name}</h1>
            <p className="text-gray-300 mb-2">Location: {boardgame.location}</p>
            <p className="text-gray-300 mb-2">
              Players:{" "}
              {boardgame.minPlayers === boardgame.maxPlayers
                ? boardgame.minPlayers
                : `${boardgame.minPlayers}-${boardgame.maxPlayers}`}
            </p>
            <p className="text-gray-300 mb-2">Gamemode: {boardgame.gamemode}</p>
            <p className="text-gray-300 mb-2">Duration: {boardgame.duration}</p>
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
            <div className="flex items-center mb-2">
              <Rating className="" name="read-only" value={boardgame.rating} readOnly />
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => onDeleteBoardgame(boardgame.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// import React from "react";
// import { Rating } from "@material-tailwind/react";

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
//             <div className="flex items-center mb-2">
//               <Rating className="w-10 text-yellow-500" value={boardgame.rating} readonly />
//             </div>
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
