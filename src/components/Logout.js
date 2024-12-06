import React, { useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";

export default function Logout({ setUser }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div>
      <IoLogOutOutline
        className="w-8 h-8 hover:cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </IoLogOutOutline>
    </div>
  );
}
