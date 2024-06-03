import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";

function Auth() {
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ promt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      console.log(resultsFromGoogle.user);
      console.log(resultsFromGoogle.user.displayName); //👍
      console.log(resultsFromGoogle.user.email); //👍
      console.log(resultsFromGoogle.user.phoneNumber); //👍
      console.log(resultsFromGoogle.user.photoURL); //👍
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      outline
      gradientDuoTone="pinkToOrange"
      className="mt-5 w-full"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default Auth;
