import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";
import "./card.css";

export default function Card({
  boardgame,
  resizeBoardgame,
  adminUsers,
  onDeleteBoardgame,
  auth,
}) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-inner">
          <div
            className="hover:scale-110 hover:cursor-pointer border-2 border-gray-500 rounded-md card-front"
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
              <h1 className="text-xl font-semibold mb-2">{boardgame.name}</h1>

              <ul className="flex space-x-2 mb-4">
                {Object.entries(boardgame.category).map(
                  ([category, value]) =>
                    value && (
                      <li
                        key={category}
                        className="text-xs bg-blue-200 text-blue-800 py-1 px-2 rounded-full"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
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
          <div className="card-back">
            <div className="p-4">
              <h1 className="text-xl font-semibold mb-2">{boardgame.name}</h1>
              <p>{boardgame.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
