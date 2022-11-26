import React, { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";
import { auth, provider } from "./firebase-config";

const Signin = ({ setisAuth, setloggedIn }: any) => {
  const first = useContext(AppContext);
  let navigate = useNavigate();

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      localStorage.setItem("isAuth", "true");
      first.setisAuth("true");
      navigate("/");
    });
  };
  return (
    <div>
      <button onClick={signIn}>SIGN IN</button>
    </div>
  );
};

export default Signin;
