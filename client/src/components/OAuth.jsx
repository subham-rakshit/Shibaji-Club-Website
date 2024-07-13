import { Button } from "flowbite-react";
import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure } from "../redux-slice/userSlice";
import { toast } from "react-toastify";

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
      // console.log(googleResult);
      // console.log(googleResult.user.displayName);
      // console.log(googleResult.user.email);
      // console.log(googleResult.user.photoURL);
      const apiURL = "/api/auth/google";
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
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        dispatch(signInSuccess(data.userDetails));
        navigate("/admin-dashboard?tab=profile");
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
        dispatch(signInFailure(data.extraDetails));
      }
    } catch (error) {
      console.log(error);
      toast.error(data.extraDetails, {
        theme: "colored",
        position: "bottom-center",
      });
      dispatch(signInFailure(data.extraDetails));
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
      <img
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="google"
        className="mr-2"
      />
      Goggle
    </Button>
  );
}

export default OAuth;
