import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function Auth({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Gebruiker is ingelogd, update de gebruikerstaat in de hoofdcomponent
        setUser(authUser);
      } else {
        // Gebruiker is niet ingelogd, zet de gebruikerstaat naar null in de hoofdcomponent
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div>
      <h1>{user?.email}</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
