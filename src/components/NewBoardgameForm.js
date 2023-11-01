import React, { useState } from "react";

function NewBoardgameForm({ onSubmitBoardgame }) {
  const [newBoardgameName, setNewBoardgameName] = useState("");
  const [newBoardgameLocation, setNewBoardgameLocation] = useState("");
  const [newBoardgamePlayers, setNewBoardgamePlayers] = useState("");
  const [newBoardgameGamemode, setNewBoardgameGamemode] = useState("");
  const [newBoardgameDuration, setNewBoardgameDuration] = useState("");
  const [isNewBoardgameLuck, setNewBoardgameLuck] = useState(false);
  const [isNewBoardgameSkill, setNewBoardgameSkill] = useState(false);
  const [isNewBoardgameStrategy, setNewBoardgameStrategy] = useState(false);

  const handleSubmit = () => {
    onSubmitBoardgame({
      name: newBoardgameName,
      location: newBoardgameLocation,
      players: newBoardgamePlayers,
      gamemode: newBoardgameGamemode,
      duration: newBoardgameDuration,
      category: {
        luck: isNewBoardgameLuck,
        skill: isNewBoardgameSkill,
        strategy: isNewBoardgameStrategy,
      },
    });

    // Reset form fields
    setNewBoardgameName("");
    setNewBoardgameLocation("");
    setNewBoardgamePlayers("");
    setNewBoardgameGamemode("");
    setNewBoardgameDuration("");
    setNewBoardgameLuck(false);
    setNewBoardgameSkill(false);
    setNewBoardgameStrategy(false);
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={newBoardgameName}
        onChange={(e) => setNewBoardgameName(e.target.value)}
      />
      <input
        placeholder="Location"
        value={newBoardgameLocation}
        onChange={(e) => setNewBoardgameLocation(e.target.value)}
      />
      <input
        placeholder="Players"
        value={newBoardgamePlayers}
        onChange={(e) => setNewBoardgamePlayers(e.target.value)}
      />
      <input
        placeholder="Gamemode"
        value={newBoardgameGamemode}
        onChange={(e) => setNewBoardgameGamemode(e.target.value)}
      />
      <input
        placeholder="Duration"
        value={newBoardgameDuration}
        onChange={(e) => setNewBoardgameDuration(e.target.value)}
      />
      <label>Luck</label>
      <input
        type="checkbox"
        checked={isNewBoardgameLuck}
        onChange={(e) => setNewBoardgameLuck(e.target.checked)}
      />
      <label>Skill</label>
      <input
        type="checkbox"
        checked={isNewBoardgameSkill}
        onChange={(e) => setNewBoardgameSkill(e.target.checked)}
      />
      <label>Strategy</label>
      <input
        type="checkbox"
        checked={isNewBoardgameStrategy}
        onChange={(e) => setNewBoardgameStrategy(e.target.checked)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default NewBoardgameForm;
