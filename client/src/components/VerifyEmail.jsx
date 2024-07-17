import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux-slice/userSlice";
import {
  registrationFailure,
  userVerified,
} from "../redux-slice/registerSlice";
import { toast } from "react-toastify";
import OTPInputBox from "./OTPInputBox";
import {
  decrementExpirationTime,
  resetExpirationTime,
  restartExpirationTime,
  setExpirationTime,
} from "../redux-slice/otpSlice";

function VerifyEmail({ heading, para, btnText }) {
  const { registeredUser } = useSelector((state) => state.register);
  const { expirationTime } = useSelector((state) => state.otp);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle OTP Submission API
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
        if (data.message === "Token removed.") {
          dispatch(userVerified());
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
          return;
        }
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

  // Handle Resend OTP API
  const handleResendOTP = async () => {
    console.log("Resend");
    try {
      const res = await fetch(`/api/auth/resend-token`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: registeredUser._id,
          email: registeredUser.email,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
      } else {
        if (data.message === "Token removed.") {
          dispatch(userVerified());
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
          return;
        }
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  // Resend OTP Countdown
  useEffect(() => {
    let interval;

    if (registeredUser) {
      if (expirationTime > 0) {
        interval = setInterval(() => {
          dispatch(decrementExpirationTime());
        }, 1000);
      } else {
        dispatch(resetExpirationTime());
      }
    } else {
      dispatch(restartExpirationTime());
    }
    return () => clearInterval(interval);
  }, [expirationTime, dispatch, registeredUser]);

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

      {/* Resend OTP Btn */}
      {registeredUser && (
        <Button
          type="button"
          gradientDuoTone="pinkToOrange"
          disabled={expirationTime > 0}
          onClick={() => {
            dispatch(restartExpirationTime());
            {
              handleResendOTP();
            }
          }}
        >
          {expirationTime > 0
            ? `00:${
                expirationTime < 10 ? `0${expirationTime}` : expirationTime
              }`
            : "Resend OTP"}
        </Button>
      )}
      {/* Resend OTP Btn */}

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
