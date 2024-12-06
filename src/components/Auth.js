import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Auth({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="w-full flex text-white">
      <div className="w-1/2">
        <div>
          <img className="h-screen object-cover" src="login.jpg" />
        </div>
      </div>
      <div className="bg-[#1E203C] w-1/2 flex items-center justify-center">
        <div className="w-1/2">
          <h1 className="text-3xl mb-4 font-medium">Boardgames</h1>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              placeholder="naam@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">Wachtwoord</label>
            <input
              type="password"
              id="password"
              className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="block w-1/4 p-2 text-lg border rounded-lg bg-gray-700 border-gray-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
