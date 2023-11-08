import React from "react";
import { Rating } from "@material-tailwind/react";

export default function BoardgameList({ boardgames, onDeleteBoardgame }) {
  return (
    <div>
      {boardgames.map((boardgame) => (
        <div key={boardgame.id}>
          <h1>Naam: {boardgame.name}</h1>
          <p>Location: {boardgame.location}</p>
          <p>Players: {boardgame.players}</p>
          <p>Gamemode: {boardgame.gamemode}</p>
          <p>Duration: {boardgame.duration}</p>
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
