import { db } from "../config/firebase";
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const boardgamesCollectionRef = collection(db, "Boardgames");

export const getBoardgames = async () => {
  const boardgames = [];
  try {
    const data = await getDocs(boardgamesCollectionRef);
    data.forEach((doc) => {
      const boardgameData = doc.data();
      boardgames.push({
        id: doc.id,
        ...boardgameData,
      });
    });
    return boardgames;
  } catch (error) {
    console.error("Error getting boardgames: ", error);
  }
};

export const addBoardgame = async (boardgameData) => {
  try {
    await addDoc(boardgamesCollectionRef, boardgameData);
    console.log("Boardgame added successfully!");
  } catch (error) {
    console.error("Error adding boardgame: ", error);
  }
};

export const editBoardgame = async (id) => {
  const boardgameDocRef = doc(db, "Boardgames", id);
  try {
    await updateDoc(boardgameDocRef, {
      name: "30 Seconds",
    });
    console.log("Boardgame updated successfully!");
  } catch (error) {
    console.error("Error updating boardgame: ", error);
  }
};

export const deleteBoardgame = async (id) => {
  const boardgameDocRef = doc(db, "Boardgames", id);
  try {
    await deleteDoc(boardgameDocRef);
    console.log("Boardgame deleted successfully!");
  } catch (error) {
    console.error("Error deleting boardgame: ", error);
  }
};
