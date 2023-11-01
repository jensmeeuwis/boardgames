import React from "react";

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
          <button onClick={() => onDeleteBoardgame(boardgame.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BoardgameList;
