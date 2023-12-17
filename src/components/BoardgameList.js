import React, { useState } from "react";

import BoardgameModal from "./BoardgameModal";
import { auth } from "../config/firebase";
import Card from "./Card";

export default function BoardgameList({
  boardgames,
  adminUsers,
  onDeleteBoardgame,
}) {
  const [isResized, setIsResized] = useState(false);
  const [resizedBoardgame, setResizedBoardgame] = useState(null);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {boardgames.map((boardgame) => (
          <Card
            key={boardgame.id}
            boardgame={boardgame}
            resizeBoardgame={resizeBoardgame}
            adminUsers={adminUsers}
            onDeleteBoardgame={onDeleteBoardgame}
            auth={auth}
          />
        ))}
      </div>
    </div>
  );
}
