import React, { useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db } from "../config/firebase";
import { addDoc, collection, doc, limit } from "firebase/firestore";
import { storage } from "../config/firebase";

export default function NewBoardgameForm({ onSubmitBoardgame }) {
  const [newBoardgameName, setNewBoardgameName] = useState("");
  const [newBoardgameLocation, setNewBoardgameLocation] = useState("");
  const [newBoardgameMinPlayers, setNewBoardgameMinPlayers] = useState(0);
  const [newBoardgameMaxPlayers, setNewBoardgameMaxPlayers] = useState(0);
  const [newBoardgameGamemode, setNewBoardgameGamemode] = useState("");
  const [newBoardgameDuration, setNewBoardgameDuration] = useState("");
  const [isNewBoardgameLuck, setNewBoardgameLuck] = useState(false);
  const [isNewBoardgameSkill, setNewBoardgameSkill] = useState(false);
  const [isNewBoardgameStrategy, setNewBoardgameStrategy] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newBoardgameRating, setNewBoardgameRating] = useState(0);

  const handleImageUpload = async () => {
    if (selectedImage) {
      const imageRef = ref(storage, `${selectedImage.name}`);
      try {
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleSubmit = async () => {
    const imageUrl = await handleImageUpload();

    onSubmitBoardgame({
      name: newBoardgameName,
      location: newBoardgameLocation,
      minPlayers: newBoardgameMinPlayers,
      maxPlayers: newBoardgameMaxPlayers,
      gamemode: newBoardgameGamemode,
      duration: newBoardgameDuration,
      category: {
        luck: isNewBoardgameLuck,
        skill: isNewBoardgameSkill,
        strategy: isNewBoardgameStrategy,
      },
      imageUrl: imageUrl,
      rating: newBoardgameRating,
    });

    // Reset form fields
    setNewBoardgameName("");
    setNewBoardgameLocation("");
    setNewBoardgameMinPlayers(0);
    setNewBoardgameMaxPlayers(0);
    setNewBoardgameGamemode("");
    setNewBoardgameDuration("");
    setNewBoardgameLuck(false);
    setNewBoardgameSkill(false);
    setNewBoardgameStrategy(false);
    setSelectedImage(null);
    setNewBoardgameRating(0);
  };

  const handleRatingChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    const limitedValue = Math.min(Math.max(inputValue, 0), 5);
    setNewBoardgameRating(limitedValue);
  }

  return (
    <div className="text-black">
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
        placeholder="Min Players"
        value={newBoardgameMinPlayers}
        onChange={(e) => setNewBoardgameMinPlayers(e.target.value)}
      />
      <input
        placeholder="Max Players"
        value={newBoardgameMaxPlayers}
        onChange={(e) => setNewBoardgameMaxPlayers(e.target.value)}
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
      <input
        type="file"
        onChange={(e) => setSelectedImage(e.target.files[0])}
        className="text-white"
      />
      <input
        placeholder="Rating"
        value={newBoardgameRating}
        type="number"
        onChange={handleRatingChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}