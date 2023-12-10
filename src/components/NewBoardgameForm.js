import React, { useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db } from "../config/firebase";
import { addDoc, collection, doc, limit } from "firebase/firestore";
import { storage } from "../config/firebase";
import { IoMdClose } from "react-icons/io";

export default function NewBoardgameForm({ handleAddBoardgame, toggleForm }) {
  const [newBoardgameName, setNewBoardgameName] = useState("");
  const [newBoardgameLocation, setNewBoardgameLocation] = useState("");
  const [newBoardgameMinPlayers, setNewBoardgameMinPlayers] = useState(0);
  const [newBoardgameMaxPlayers, setNewBoardgameMaxPlayers] = useState(0);
  const [newBoardgameGamemode, setNewBoardgameGamemode] = useState("");
  const [newBoardgameDuration, setNewBoardgameDuration] = useState("");
  const [newBoardgameDescription, setNewBoardgameDescription] = useState("");
  const [isNewBoardgameLuck, setNewBoardgameLuck] = useState(false);
  const [isNewBoardgameSkill, setNewBoardgameSkill] = useState(false);
  const [isNewBoardgameStrategy, setNewBoardgameStrategy] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    const imageUrl = await handleImageUpload();

    handleAddBoardgame({
      name: newBoardgameName,
      location: newBoardgameLocation,
      minPlayers: newBoardgameMinPlayers,
      maxPlayers: newBoardgameMaxPlayers,
      gamemode: newBoardgameGamemode,
      duration: newBoardgameDuration,
      description: newBoardgameDescription,
      category: {
        luck: isNewBoardgameLuck,
        skill: isNewBoardgameSkill,
        strategy: isNewBoardgameStrategy,
      },
      imageUrl: imageUrl,
    });

    // Reset form fields
    setNewBoardgameName("");
    setNewBoardgameLocation("");
    setNewBoardgameMinPlayers(0);
    setNewBoardgameMaxPlayers(0);
    setNewBoardgameGamemode("");
    setNewBoardgameDuration("");
    setNewBoardgameDescription("");
    setNewBoardgameLuck(false);
    setNewBoardgameSkill(false);
    setNewBoardgameStrategy(false);
    setSelectedImage(null);
  };

  return (
    <div className="text-white bg-[#1E203C] w-1/3 flex items-center justify-center rounded-lg p-5" >
      <div className="w-full ">
        <div className="flex mb-5">
          <h1 className="text-3xl font-medium">Nieuw bordspel</h1>
          <button className="text-3xl  ml-auto" onClick={toggleForm}>
            <IoMdClose />
          </button>
        </div>

        <div className="flex justify-between gap-5 mb-5">
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium">Naam</label>
            <input
              type="text"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              placeholder="Beverbende"
              value={newBoardgameName}
              onChange={(e) => setNewBoardgameName(e.target.value)}
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium">Locatie</label>
            <input
              type="text"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              placeholder="Jens"
              value={newBoardgameLocation}
              onChange={(e) => setNewBoardgameLocation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-5 mb-5">
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium">
              Minimale spelers
            </label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              placeholder="1 speler"
              value={newBoardgameMinPlayers}
              onChange={(e) => setNewBoardgameMinPlayers(e.target.value)}
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium">
              Maximale spelers
            </label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              placeholder="4 spelers"
              value={newBoardgameMaxPlayers}
              onChange={(e) => setNewBoardgameMaxPlayers(e.target.value)}
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-2 text-sm font-medium">Tijd</label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              placeholder="30 minuten"
              value={newBoardgameDuration}
              onChange={(e) => setNewBoardgameDuration(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Gamemode</label>
          <input
            type="text"
            id="name"
            className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="Coöperatief"
            value={newBoardgameGamemode}
            onChange={(e) => setNewBoardgameGamemode(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Beschrijving</label>
          <input
            type="text"
            id="name"
            className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="Dit bordspel is leuk..."
            value={newBoardgameDescription}
            onChange={(e) => setNewBoardgameDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Categorie</label>
          <div className="flex gap-5">
            <div>
              <label>Luck</label>
              <input
                type="checkbox"
                checked={isNewBoardgameLuck}
                onChange={(e) => setNewBoardgameLuck(e.target.checked)}
              />
            </div>
            <div>
              <label>Skill</label>
              <input
                type="checkbox"
                checked={isNewBoardgameSkill}
                onChange={(e) => setNewBoardgameSkill(e.target.checked)}
              />
            </div>
            <div>
              <label>Strategy</label>
              <input
                type="checkbox"
                checked={isNewBoardgameStrategy}
                onChange={(e) => setNewBoardgameStrategy(e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Foto</label>
          <input
            type="file"
            id="name"
            className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            
          />
        </div>

        <button
          type="submit"
          className="block w-full p-2 text-lg border rounded-lg bg-gray-700 border-gray-600"
          onClick={handleSubmit}
        >
          Maak bordspel aan
        </button>
      </div>
    </div>
  );
}
