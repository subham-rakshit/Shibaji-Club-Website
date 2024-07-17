import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Label, Select, Spinner } from "flowbite-react";
import { Input, OAuth, VerifyEmail } from "../components";

import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { initialRender } from "../redux-slice/userSlice";
import {
  registrationInitialRender,
  registrationStart,
  registrationSuccess,
  registrationFailure,
} from "../redux-slice/registerSlice";
import AOS from "aos";
import { toast } from "react-toastify";
import { RiLockPasswordFill } from "react-icons/ri";

function Register() {
  const { currentUser } = useSelector((state) => state.user);
  const { registrationLoading, registeredUser } = useSelector(
    (state) => state.register
  );

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    category: "General",
  });
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerRef = useRef();

  // Input's value handelers
  const inputHandler = (e) => {
    const targetName = e.target.name;
    const value = e.target.value;
    setNewUser({
      ...newUser,
      [targetName]: value,
    });
  };

  // Form submission handeler
  const signUpSumbitHandle = async (e) => {
    e.preventDefault();

    try {
      dispatch(registrationStart());
      const apiUrl = "/api/auth/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };

      const response = await fetch(apiUrl, options);

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        dispatch(registrationSuccess(data.userDetails));
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
    }
  };

  useEffect(() => {
    dispatch(initialRender());
    dispatch(registrationInitialRender());
    if (currentUser) {
      navigate("/");
    }

    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex justify-center items-center mt-[65px] lg:mt-[70px] font-[Inter]">
      <div className="flex flex-col md:flex-row w-full max-w-[1024px] shadow-custom-light-dark rounded-xl overflow-hidden min-h-[600px]">
        {/* SignIn Left Content */}
        <VerifyEmail
          heading="Welcome Back!"
          para="To keep connected with us please login with your personal info."
          btnText="SIGN IN"
          reference={registerRef}
        />
        {/* SignIn Left Content */}

        {/* Form Content */}
        <div
          className={`p-5 lg:p-8 w-full md:w-[50%] order-1 md:order-none flex flex-col justify-center ${
            registeredUser ? "blur-[2px]" : "blur-none"
          }`}
          data-aos="fade-left"
        >
          <h1 className="font-extrabold font-[Inter] text-normal text-2xl sm:text-3xl mb-5">
            Let's Start!
          </h1>

          {/* Main From */}
          <form className="w-full max-w-lg" onSubmit={signUpSumbitHandle}>
            {/* Full Name input */}
            <Input
              placeholder="Enter your name"
              icon={FaUser}
              labelText="Full Name"
              name="username"
              value={newUser.username}
              onChange={inputHandler}
              disabled={registeredUser}
            />
            {/* Email input */}
            <Input
              placeholder="example@example.com"
              icon={IoMdMail}
              labelText="Email"
              name="email"
              value={newUser.email}
              onChange={inputHandler}
              disabled={registeredUser}
            />

            {/* Password input */}
            <div className="mt-2 block">
              <Label
                htmlFor="loginPassword"
                value="Password"
                className="font-semibold font-[Inter] text-xs"
              />
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg shadow-sm bg-[#F9FAFB] dark:bg-[#374151]  border border-[#D1D5DB] dark:border-[#4B5563] focus-within:ring-2 focus-within:ring-cyan-500 overflow-hidden px-3 mb-2 ${
                registeredUser && "opacity-[0.5]"
              }`}
            >
              <RiLockPasswordFill
                size="30"
                className="text-[#6B7280] dark:text-[#9CA3AF]"
              />
              <input
                type={isShown ? "text" : "password"}
                id="loginPassword"
                name="password"
                className={`bg-[#F9FAFB] dark:bg-[#374151] border-none outline-none focus:ring-0 w-full text-gray-900 dark:text-white dark:placeholder-gray-400 text-sm px-1 py-[13px] ${
                  registeredUser && "cursor-not-allowed"
                }`}
                placeholder="********"
                value={newUser.password}
                onChange={inputHandler}
                disabled={registeredUser ? true : false}
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

            {/* Category input */}
            <div className="w-full">
              <div className="mb-1 block">
                <Label
                  htmlFor="category"
                  value="Category"
                  className="font-semibold text-xs"
                />
              </div>
              <Select
                id="category"
                value={newUser.category}
                onChange={inputHandler}
                name="category"
                required
                disabled={registeredUser}
              >
                <option name="Footballer">Footballer</option>
                <option name="General">General</option>
              </Select>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              outline
              className={`w-full mt-5 ${
                registeredUser ? "cursor-not-allowed" : ""
              }`}
              disabled={registeredUser}
              type="submit"
            >
              {registrationLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ....</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="flex items-center justify-center gap-3 my-1 md:my-2">
              <hr className="w-full border border-gray-400 dark:border-gray-700 border-dotted" />
              <span className="font-[Inter] text-gray-400 dark:text-gray-700 text-sm font-semibold">
                OR
              </span>
              <hr className="w-full border border-gray-400 dark:border-gray-700 border-dotted" />
            </div>
            <OAuth />
          </form>
          {/* Main From */}
        </div>
        {/* Form Content */}
      </div>
    </div>
  );
}

export default Register;
