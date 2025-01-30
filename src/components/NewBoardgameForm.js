import React, { useState, useEffect, useRef } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase";
import { IoMdClose } from "react-icons/io";
import { getAuth } from "firebase/auth";

export default function NewBoardgameForm({ handleAddBoardgame, toggleForm }) {
  const [newBoardgameName, setNewBoardgameName] = useState("");
  const [newBoardgameLocation, setNewBoardgameLocation] = useState("");
  const [newBoardgameMinPlayers, setNewBoardgameMinPlayers] = useState(0);
  const [newBoardgameMaxPlayers, setNewBoardgameMaxPlayers] = useState(0);
  const [newBoardgameGamemode, setNewBoardgameGamemode] = useState("");
  const [newBoardgameMinDuration, setNewBoardgameMinDuration] = useState(0);
  const [newBoardgameMaxDuration, setNewBoardgameMaxDuration] = useState(0);
  const [newBoardgameDescription, setNewBoardgameDescription] = useState("");
  const [newBoardgameCategory, setNewBoardgameCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  
  const auth = getAuth()
  const [userId, setUserId] = useState(auth.currentUser.uid)

  const selectRef = useRef(null);

  const handleSelectGamemode = (event) => {
    const selectedValue = event.target.value;
    setNewBoardgameGamemode(selectedValue);
  };

  const handleSelectCategory = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );

    setNewBoardgameCategory(selectedOptions);
  };

  useEffect(() => {
    const init = async () => {
      const { Select, initTE } = await import("tw-elements");
      initTE({ Select }, { allowReinits: true });
    };

    init();
  }, []);

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
      minDuration: newBoardgameMinDuration,
      maxDuration: newBoardgameMaxDuration,
      description: newBoardgameDescription,
      category: newBoardgameCategory,
      imageUrl: imageUrl,
      userId: userId,
    });

    setNewBoardgameName("");
    setNewBoardgameLocation("");
    setNewBoardgameMinPlayers(0);
    setNewBoardgameMaxPlayers(0);
    setNewBoardgameGamemode("");
    setNewBoardgameMinDuration(0);
    setNewBoardgameMaxDuration(0);
    setNewBoardgameDescription("");
    setNewBoardgameCategory(null); // needs to be fixed
    setSelectedImage(null);
  };

  return (
    <div className="text-white bg-[#1E203C] w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex items-center justify-center rounded-lg p-5">
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

        <div className="grid grid-cols-2 justify-between gap-5 mb-5">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium">
              Min. spelers
            </label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              value={newBoardgameMinPlayers}
              onChange={(e) => setNewBoardgameMinPlayers(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium">
              Max. spelers
            </label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              value={newBoardgameMaxPlayers}
              onChange={(e) => setNewBoardgameMaxPlayers(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium">Min. Tijd</label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              value={newBoardgameMinDuration}
              onChange={(e) => setNewBoardgameMinDuration(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium">Max. Tijd</label>
            <input
              type="number"
              id="name"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              value={newBoardgameMaxDuration}
              onChange={(e) => setNewBoardgameMaxDuration(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <select
            id="select"
            data-te-select-init
            ref={selectRef}
            onChange={handleSelectGamemode}
            data-te-class-dropdown="border rounded-b-lg bg-gray-700 border-gray-600"
            data-te-class-no-result="text-white"
            data-te-class-select-option="text-white py-2 pl-5"
            data-te-select-all="false"
            data-te-select-placeholder="Spelmodus"
            data-te-select-visible-options="4"
          >
            <option value="Coöperatief">Coöperatief</option>
            <option value="PvP">PvP</option>
            <option value="Teams">Teams</option>
          </select>
          <label data-te-select-label-ref>Spelmodus</label>
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
          <select
            id="select"
            data-te-select-init
            multiple
            ref={selectRef}
            onChange={handleSelectCategory}
            data-te-class-dropdown="border rounded-b-lg bg-gray-700 border-gray-600"
            data-te-class-no-result="text-white"
            data-te-class-select-option="text-white py-2 pl-5"
            data-te-select-all="false"
            data-te-select-displayed-labels="3"
            data-te-select-options-selected-label="opties geselecteerd"
            data-te-select-placeholder="Locaties"
            data-te-select-visible-options="4"
          >
            <option value="Behendigheid">Behendigheid</option>
            <option value="Bluf">Bluf</option>
            <option value="Cijfermatig">Cijfermatig</option>
            <option value="Communicatie">Communicatie</option>
            <option value="Geheugen">Geheugen</option>
            <option value="Geluk">Geluk</option>
            <option value="Gokken">Gokken</option>
            <option value="Humor">Humor</option>
            <option value="Inzicht">Inzicht</option>
            <option value="Kennis">Kennis</option>
            <option value="Logica">Logica</option>
            <option value="Mensenkennis">Mensenkennis</option>
            <option value="Nauwkeurigheid">Nauwkeurigheid</option>
            <option value="Planning">Planning</option>
            <option value="Puzzelen">Puzzelen</option>
            <option value="Reactievermogen">Reactievermogen</option>
            <option value="Risico">Risico</option>
            <option value="Strategie">Strategie</option>
            <option value="Symboliek">Symboliek</option>
            <option value="Taalkundig">Taalkundig</option>
            <option value="Tactiek">Tactiek</option>
            <option value="Vaardigheid">Vaardigheid</option>
          </select>
          <label data-te-select-label-ref>Categorieën</label>
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
