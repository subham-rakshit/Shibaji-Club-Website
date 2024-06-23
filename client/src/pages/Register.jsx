import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Label, Select, Spinner } from "flowbite-react";
import { Input, OAuth } from "../components";

import { FaUser } from "react-icons/fa";
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

function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    category: "Footballer",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);

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

      if (response.ok === true) {
        Cookies.set("jwt_token", data.jwt_token, {
          expires: 30,
          path: "/",
        });
        alert(data.message);
        dispatch(signInSuccess(data.userDetails));
        setNewUser({
          username: "",
          email: "",
          password: "",
          category: "Footballer",
        });
        navigate("/");
      } else {
        dispatch(signInFailure(data.extraDetails));
      }
    } catch (error) {
      dispatch(signInFailure(data.extraDetails));
    }
  };

  useEffect(() => {
    dispatch(initialRender());
    if (currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-20 mt-[65px] lg:mt-[76px] font-[Inter]">
      {/* Desktop Image */}
      <img
        src="/signUp-img-bck-remove.png"
        className="hidden lg:inline mr-0 w-1/2 max-w-96 rounded-full"
        alt="Shibaji Register Logo"
      />
      {/* Desktop Image */}

      {/* Form Content */}
      <div className="p-5 lg:p-8 rounded-2xl shadow-2xl dark:shadow-xl dark:shadow-[#374151] w-full max-w-sm">
        {/* Form Header */}
        <div className="w-full max-w-xl flex items-center justify-between mb-2 lg:mb-5">
          {/* Form header Left */}

          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-xl md:text-2xl mb-2">Let's Start!</h1>
          </div>

          {/* Form header Left */}

          {/* Form header Right */}

          <p className="self-center whitespace-nowrap text-xs font-semibold  dark:text-white ml-0 py-1 lg:hidden">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white">
              Shibaji
            </span>
            Sangha
          </p>

          {/* Form header Right */}
        </div>
        {/* Form Header */}

        {/* Main From */}
        <form className="w-full max-w-lg" onSubmit={signUpSumbitHandle}>
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-2 lg:gap-0 w-full">
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
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-2 lg:gap-0 w-full">
            {/* Password input */}
            <Input
              placeholder="********"
              labelText="Password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={inputHandler}
            />

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
          <p className="font-[500] text-[14px] mt-2">
            Have an account?{" "}
            <Link to="/login" className="text-[#f00d49] font-bold pl-1">
              Sign in
            </Link>
          </p>

          {error && (
            <Alert className="mt-5 text-xs" color="failure">
              * {error}
            </Alert>
          )}
        </form>
        {/* Main From */}
      </div>
      {/* Form Content */}
    </div>
  );
}

export default Register;
