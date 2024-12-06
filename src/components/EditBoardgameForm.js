import React, { useState } from "react";

const EditBoardgameForm = ({ boardgame, onEditBoardgame }) => {
  const [editedName, setEditedName] = useState(boardgame.name);

  const handleEdit = () => {
    const editedBoardgame = {
      ...boardgame,
      name: editedName,
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
      <button onClick={handleEdit}>Bewerken</button>
    </div>
  );
};

export default EditBoardgameForm;
