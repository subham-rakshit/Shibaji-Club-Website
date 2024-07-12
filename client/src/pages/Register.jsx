import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Label, Select, Spinner } from "flowbite-react";
import { Input, OAuth } from "../components";

import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  initialRender,
} from "../redux-slice/userSlice";
import Cookies from "js-cookie";
import AOS from "aos";
import { toast } from "react-toastify";
import { RiLockPasswordFill } from "react-icons/ri";

function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    category: "General",
  });
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.user);

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
      dispatch(signInStart());
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
        Cookies.set("jwt_token", data.jwt_token, {
          expires: 30,
          path: "/",
        });
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        dispatch(signInSuccess(data.userDetails));
        setNewUser({
          username: "",
          email: "",
          password: "",
          category: "Footballer",
        });
        navigate("/admin-dashboard?tab=profile");
      } else {
        dispatch(signInFailure(data.extraDetails));
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      dispatch(signInFailure(data.extraDetails));
      toast.error(data.extraDetails, {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    dispatch(initialRender());
    if (currentUser) {
      navigate("/");
    }

    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex justify-center items-center mt-[65px] lg:mt-[70px] font-[Inter]">
      <div className="flex flex-col md:flex-row w-full max-w-[1024px] shadow-custom-light-dark rounded-xl overflow-hidden min-h-[600px]">
        {/* SignIn Content */}
        <div
          className="w-full md:w-[50%] p-5 lg:p-8 flex flex-col justify-center items-center border-2 border-red-500 bg-gradient-to-r from-red-500 to-red-700"
          data-aos="fade-right"
        >
          <h1 className="text-white text-center font-extrabold font-[Inter] text-2xl sm:text-3xl mb-3">
            Welcome Back!
          </h1>
          <p className="text-center text-white font-normal font-[Inter] text-normal text-sm mb-5">
            To keep connected with us please login with your personal info
          </p>
          <Link to="/login">
            <Button
              gradientDuoTone="pinkToOrange"
              className="font-bold text-white text-sm shadow-custom-light-dark"
            >
              SIGN IN
            </Button>
          </Link>
        </div>
        {/* SignIn Content */}

        {/* Form Content */}
        <div
          className="p-5 lg:p-8 w-full md:w-[50%] order-1 md:order-none flex flex-col justify-center"
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
            />
            {/* Email input */}
            <Input
              placeholder="example@example.com"
              icon={IoMdMail}
              labelText="Email"
              name="email"
              value={newUser.email}
              onChange={inputHandler}
            />

            {/* Password input */}
            <div className="mt-2 block">
              <Label
                htmlFor="loginPassword"
                value="Password"
                className="font-semibold font-[Inter] text-xs"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg shadow-sm bg-[#F9FAFB] dark:bg-[#374151]  border border-[#D1D5DB] dark:border-[#4B5563] focus-within:ring-2 focus-within:ring-cyan-500 overflow-hidden px-3 mb-2">
              <RiLockPasswordFill
                size="30"
                className="text-[#6B7280] dark:text-[#9CA3AF]"
              />
              <input
                type={isShown ? "text" : "password"}
                id="loginPassword"
                name="password"
                className="bg-[#F9FAFB] dark:bg-[#374151] border-none outline-none focus:ring-0 w-full text-gray-900 dark:text-white dark:placeholder-gray-400 text-sm px-1 py-[13px]"
                placeholder="********"
                value={newUser.password}
                onChange={inputHandler}
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
              >
                <option name="Footballer">Footballer</option>
                <option name="General">General</option>
              </Select>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              outline
              className="w-full mt-5"
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ....</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
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
