// EditBoardgameForm.js

import React, { useState } from "react";

const EditBoardgameForm = ({ boardgame, onEditBoardgame }) => {
  const [editedName, setEditedName] = useState(boardgame.name); // Voeg hier de andere eigenschappen toe

  const handleEdit = () => {
    const editedBoardgame = {
      ...boardgame,
      name: editedName,
      // Voeg hier de andere eigenschappen toe
    };

    onEditBoardgame(editedBoardgame);
  };

  return (
    <div className="text-black">
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      {/* Voeg hier andere bewerkbare velden toe */}
      <button onClick={handleEdit}>Bewerken</button>
    </div>
  );
};

export default EditBoardgameForm;
