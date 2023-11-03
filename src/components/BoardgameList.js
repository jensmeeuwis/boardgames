import React from "react";
import { Rating } from "@material-tailwind/react";

function BoardgameList({ boardgames, onDeleteBoardgame }) {
  return (
    <div>
      {boardgames.map((boardgame) => (
        <div key={boardgame.id}>
          <h1>{boardgame.name}</h1>
          <p>{boardgame.location}</p>
          <p>{boardgame.players}</p>
          <p>{boardgame.gamemode}</p>
          <p>{boardgame.duration}</p>
          {Object.entries(boardgame.category).map(
            ([category, value]) => value && <li key={category}>{category}</li>
          )}
          {boardgame.imageUrl && (
            <img
              src={boardgame.imageUrl}
              alt={boardgame.name}
              style={{ maxWidth: "400px" }}
            />
          )}
          <Rating className="w-10" value={boardgame.rating} readonly />
          <button onClick={() => onDeleteBoardgame(boardgame.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BoardgameList;
