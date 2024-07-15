import { Button } from "flowbite-react";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function VerifyEmail({
  heading,
  para,
  btnText,
  handleEmailVerification,
  otpNumber,
  setOtpNumber,
}) {
  const { registeredUser } = useSelector((state) => state.register);
  const [isShown, setIsShown] = useState(false);

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
      {registeredUser && !registeredUser.verified && (
        <div className="flex items-center gap-2 rounded-lg shadow-sm bg-[#F9FAFB] dark:bg-[#374151]  border border-[#D1D5DB] dark:border-[#4B5563] focus-within:ring-2 focus-within:ring-cyan-500 overflow-hidden px-3 my-5">
          <RiLockPasswordFill
            size="30"
            className="text-[#6B7280] dark:text-[#9CA3AF]"
          />
          <input
            type={isShown ? "text" : "password"}
            id="verifyOTP"
            name="otp"
            className="bg-[#F9FAFB] dark:bg-[#374151] border-none outline-none focus:ring-0 w-full text-gray-900 dark:text-white dark:placeholder-gray-400 text-sm px-1 py-[13px]"
            placeholder="****"
            value={otpNumber}
            required={true}
            onChange={(e) => {
              const enteredOTP = e.target.value;
              if (enteredOTP.length <= 4) {
                setOtpNumber(enteredOTP);
              }
            }}
          />
          {isShown ? (
            <FaRegEye
              className="cursor-pointer"
              onClick={() => setIsShown((prev) => !prev)}
            />
          ) : (
            <FaRegEyeSlash
              className="cursor-pointer"
              onClick={() => setIsShown((prev) => !prev)}
            />
          )}
        </div>
      )}
      {registeredUser && !registeredUser.verified ? (
        <Button
          gradientDuoTone="pinkToOrange"
          className="font-bold text-white text-sm shadow-custom-light-dark"
          onClick={() => handleEmailVerification()}
        >
          Verify
        </Button>
      ) : (
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
