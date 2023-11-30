import React, { useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

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
        // Gebruiker is uitgelogd, update de gebruikerstaat in de hoofdcomponent naar null
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div>
      <button className="block w-full p-2 text-lg border rounded-lg bg-gray-700 border-gray-600" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
