import { Button } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux-slice/userSlice";
import {
  registrationFailure,
  userVerified,
} from "../redux-slice/registerSlice";
import { toast } from "react-toastify";
import OTPInputBox from "./OTPInputBox";

function VerifyEmail({ heading, para, btnText }) {
  const { registeredUser } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle OTP submission
  const onOTPSubmit = async (otpNumber) => {
    try {
      const res = await fetch(`/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: registeredUser._id, otp: otpNumber }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data.userDetails));
        dispatch(userVerified());
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        navigate("/");
      } else {
        dispatch(registrationFailure(data.extraDetails));
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      dispatch(registrationFailure(data.extraDetails));
      toast.error(data.extraDetails, {
        theme: "colored",
        position: "bottom-center",
      });
      console.log(error.message);
    }
  };

  return (
    <div
      className="w-full md:w-[50%] p-5 lg:p-8 flex flex-col justify-center items-center border-2 border-red-500 bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300"
      data-aos={btnText === "SIGN IN" ? "fade-right" : "fade-left"}
    >
      <h1 className="text-white text-center font-extrabold font-[Inter] text-2xl sm:text-3xl mb-3 transition-all duration-300">
        {registeredUser && !registeredUser.verified
          ? "Verify Email Address"
          : heading}
      </h1>
      <p className="text-center text-white font-normal font-[Inter] text-normal text-sm mb-5 transition-all duration-300">
        {registeredUser && !registeredUser.verified
          ? `Please enter the OTP we've send to ${registeredUser.email}`
          : para}
      </p>

      {/* OTP Input Element */}
      {registeredUser && !registeredUser.verified && (
        <OTPInputBox length={4} onOTPSubmit={onOTPSubmit} />
      )}
      {/* OTP Input Element */}

      {!registeredUser && (
        <Link to={btnText === "SIGN UP" ? "/register" : "/login"}>
          <Button
            gradientDuoTone="pinkToOrange"
            className="font-bold text-white text-sm shadow-custom-light-dark"
          >
            {btnText}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default VerifyEmail;
