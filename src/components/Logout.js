import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function Logout({}) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
