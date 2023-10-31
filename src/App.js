import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./config/firebase";
import { addDoc, getDocs, collection, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [boardgamesList, setBoardgamesList] = useState([]);

  const boardgamesCollectionRef = collection(db, "Boardgames");

  // new boardgame
  const [newBoardgameName, setNewBoardgameName] = useState("");
  const [newBoardgameLocation, setNewBoardgameLocation] = useState("");
  const [newBoardgamePlayers, setNewBoardgamePlayers] = useState("");
  const [newBoardgameGamemode, setNewBoardgameGamemode] = useState("");
  const [newBoardgameDuration, setNewBoardgameDuration] = useState("");
  const [isNewBoardgameLuck, setNewBoardgameLuck] = useState(false);
  const [isNewBoardgameSkill, setNewBoardgameSkill] = useState(false);
  const [isNewBoardgameStrategy, setNewBoardgameStrategy] = useState(false);

  const getBoardgamesList = async () => {
    try {
      const data = await getDocs(boardgamesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(filteredData);
      setBoardgamesList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitBoardgame = async () => {
    try {
      await addDoc(boardgamesCollectionRef, {
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
      // setNewBoardgameName("");
      // setNewBoardgameLocation("");
      // setNewBoardgamePlayers("");
      // setNewBoardgameGamemode("");
      // setNewBoardgameDuration("");
      // setNewBoardgameLuck(false);
      // setNewBoardgameSkill(false);
      // setNewBoardgameStrategy(false);
      getBoardgamesList();
      
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoardgame = async (id) => {
    const boardgameDocRef = doc(db, "Boardgames", id);
    await deleteDoc(boardgameDocRef);
    getBoardgamesList();
  }

  useEffect(() => {
    getBoardgamesList();
  }, []);

  return (
    <div className="App">
      <div>
        <input
          placeholder="Name"
          onChange={(e) => setNewBoardgameName(e.target.value)}
        />
        <input
          placeholder="Location"
          onChange={(e) => setNewBoardgameLocation(e.target.value)}
        />
        <input
          placeholder="Players"
          onChange={(e) => setNewBoardgamePlayers(e.target.value)}
        />
        <input
          placeholder="Gamemode"
          onChange={(e) => setNewBoardgameGamemode(e.target.value)}
        />
        <input
          placeholder="Duration"
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
        <button onClick={onSubmitBoardgame}>Submit</button>
      </div>
      <div>
        {boardgamesList.map((boardgame) => (
          <div key={boardgame.id}>
            <h1>{boardgame.name}</h1>
            <p>{boardgame.location}</p>
            <p>{boardgame.players}</p>
            <p>{boardgame.gamemode}</p>
            <p>{boardgame.duration}</p>
            {Object.entries(boardgame.category).map(
              ([category, value]) => value && <li key={category}>{category}</li>
            )}
            <button onClick={() => deleteBoardgame(boardgame.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
