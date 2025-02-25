import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";

export default function Auth({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [buttonText, setButtonText] = useState(true);
  const [titleText, setTitleText] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Voorkomt standaard pagina-refresh
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);

    setTimeout(() => {
      setButtonText(!buttonText);
      setTitleText(!titleText);
    }, 200);
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);

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
    <div className="w-full h-screen bg-gradient-to-b from-[#2C2F44] to-[#355EA9] flex items-center justify-center text-white ">
      <div className="bg-[#1E203C] w-2/3 max-w-6xl h-1/2 rounded-3xl flex flex-row items-center">
        <AnimatePresence>
          <motion.form
            onSubmit={showLogin ? handleLogin : handleRegister}
            className="flex flex-col w-1/2 items-center"
            animate={{ x: showLogin ? "0%" : "100%" }}
            transition={{
              duration: 0.6,
              delay: 0,
            }}
          >
            <div className="flex flex-col gap-5 w-1/2">
              <h1 className="text-3xl font-medium">
                {titleText ? "Inloggen" : "Registreren"}
              </h1>
              <div>
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
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Wachtwoord"
                  className="bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="block w-auto py-2 px-5 text-lg border rounded-lg bg-gray-700 border-gray-600"
              >
                {buttonText ? "Login" : "Registreer"}
              </motion.button>
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
      <motion.div
        className="bg-[#2C2F44] w-1/3 max-w-xl h-1/2 absolute flex justify-center items-center max-lg:hidden"
        animate={
          pageLoaded
            ? {
                x: showLogin ? "50%" : "-50%",
                borderTopLeftRadius: showLogin ? "30%" : "4%",
                borderBottomLeftRadius: showLogin ? "30%" : "4%",
                borderTopRightRadius: showLogin ? "4%" : "30%",
                borderBottomRightRadius: showLogin ? "4%" : "30%",
              }
            : {
                x: "50%",
                borderTopLeftRadius: showLogin ? "30%" : "4%",
                borderBottomLeftRadius: showLogin ? "30%" : "4%",
                borderTopRightRadius: showLogin ? "4%" : "30%",
                borderBottomRightRadius: showLogin ? "4%" : "30%",
              }
        }
        transition={
          pageLoaded
            ? {
                duration: 0.6,
                delay: 0,
              }
            : { duration: 0 }
        }
      />
      <AnimatePresence>
        <motion.div
          className="absolute max-lg:hidden"
          key={0}
          animate={
            pageLoaded
              ? {
                  x: showLogin ? "-200%" : "-100%",
                  opacity: showLogin ? 0 : 1,
                }
              : { x: "100%", opacity: 0 }
          }
          transition={
            pageLoaded
              ? {
                  duration: 0.6,
                }
              : { duration: 0 }
          }
        >
          <p>Heb je al een account? Log dan hier in.</p>
          <button
            onClick={toggleForm}
            className="mt-4 py-2 px-4 bg-gray-700 rounded-lg"
            id="login"
          >
            Login
          </button>
        </motion.div>

        <motion.div
          className="absolute max-lg:hidden"
          key={1}
          animate={
            pageLoaded
              ? {
                  x: showLogin ? "100%" : "200%",
                  opacity: showLogin ? 1 : 0,
                }
              : { x: "100%", opacity: 1 }
          }
          transition={
            pageLoaded
              ? {
                  duration: 0.6,
                }
              : { duration: 0 }
          }
        >
          <p>Nog geen account? Registreer dan hier.</p>
          <button
            onClick={toggleForm}
            className="mt-4 py-2 px-4 bg-gray-700 rounded-lg"
            id="register"
          >
            Registreer
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
