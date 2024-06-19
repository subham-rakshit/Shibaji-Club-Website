import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux-slice/userSlice";
import Cookies from "js-cookie";

function OAuth() {
  //* For authorization we need to get the auth from getAuth() method and pass that app which are created when firbase sdk is initialized. For knowing google who will be requesting in firebase.
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    //? When you choose one of your google account for authentication, then in other time when you signIn or signUp the popup window will not come. For that we have to create a custom parameter.
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      //* Result from google by a method called signInWithPopup()
      const googleResult = await signInWithPopup(auth, provider);
      console.log(googleResult);
      console.log(googleResult.user.displayName);
      console.log(googleResult.user.email);
      console.log(googleResult.user.photoURL);
      const apiURL = "http://localhost:5000/api/auth/google";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: googleResult.user.displayName,
          email: googleResult.user.email,
          googleProfilePhotoURL: googleResult.user.photoURL,
        }),
      };
      const response = await fetch(apiURL, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("jwt_token", data.jwt_token, {
          expires: 30,
          path: "/",
        });
        alert(data.message);
        dispatch(signInSuccess(data.userDetails));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      className="w-full mt-3"
      onClick={handleGoogleSignIn}
    >
      <AiFillGoogleCircle className="w-5 h-5 mr-1" />
      Continue with Goggle
    </Button>
  );
}

export default OAuth;
