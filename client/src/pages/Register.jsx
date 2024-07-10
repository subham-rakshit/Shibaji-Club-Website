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
import AOS from "aos";

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
    </div>
  );
}

export default Register;
