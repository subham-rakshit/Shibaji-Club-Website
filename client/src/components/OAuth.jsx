import { Button } from "flowbite-react";
import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux-slice/userSlice";
import { registrationSuccess } from "../redux-slice/registerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OAuth() {
  //* For authorization we need to get the auth from getAuth() method and pass that app which are created when firbase sdk is initialized. For knowing google who will be requesting in firebase.
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registeredUser } = useSelector((state) => state.register);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    //? When you choose one of your google account for authentication, then in other time when you signIn or signUp the popup window will not come. For that we have to create a custom parameter.
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      //* Result from google by a method called signInWithPopup()
      const googleResult = await signInWithPopup(auth, provider);

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
        // If user data already present in DB
        if (data.userDetails.verified) {
          dispatch(signInSuccess(data.userDetails));
          navigate("/");
        } else {
          // If new user created
          dispatch(registrationSuccess(data.userDetails));
        }
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(data.extraDetails, {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      className="w-full"
      onClick={handleGoogleSignIn}
      disabled={registeredUser}
    >
      <img
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="google"
        className="mr-2"
      />
      Google
    </Button>
  );
}

export default OAuth;
