import { db } from "../config/firebase";
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const rolesCollectionRef = collection(db, "Roles");

export const getRoles = async () => {
  const roles = [];
  try {
    const data = await getDocs(rolesCollectionRef);
    data.forEach((doc) => {
      const rolesData = doc.data();
      roles.push({
        id: doc.id,
        ...rolesData,
      });
    });
    return roles;
  } catch (error) {
    console.error("Error getting roles: ", error);
  }
};

export const addRole = async (rolesData) => {
  try {
    await addDoc(rolesCollectionRef, rolesData);
    console.log("Role added successfully!");
  } catch (error) {
    console.error("Error adding role: ", error);
  }
};
