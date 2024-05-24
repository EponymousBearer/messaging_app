import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { useState } from "react";

const cookies = new Cookies();

export const Auth = ({ setIsInChat }) => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="auth">
      {!isAuth ? (
        <div>
          <button onClick={signInWithGoogle}> Sign In </button>
        </div>
      ) : (
        <div>
          <button>Account</button>
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};
