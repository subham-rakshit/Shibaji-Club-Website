import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Alert, Button, Spinner } from "flowbite-react";
import { Input, OAuth } from "../components";
import { IoMdMail } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  initialRender,
} from "../redux-slice/userSlice";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  console.log(loginDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, currentUser } = useSelector((state) => state.user);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const submitFormHandle = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const apiUrl = "/api/auth/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
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
        setLoginDetails({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        dispatch(signInFailure(data.extraDetails));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(initialRender());

    if (currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex flex-col lg:flex-row justify-center items-center gap-5 md:gap-10 mt-[65px] lg:mt-[76px] font-[Inter]">
      {/* Desktop Image */}
      <img
        src="/login-img-bck-remove.png"
        className="hidden lg:inline mr-0 w-1/2 max-w-96 rounded-full"
        alt="Shibaji Register Logo"
      />
      {/* Desktop Image */}

      {/* Form Content */}
      <div className="lg:p-8 lg:rounded-2xl lg:shadow-2xl dark:shadow-xl dark:shadow-[#374151] w-full max-w-sm">
        {/* Form Header */}
        <div className="w-full max-w-xl flex items-center justify-between mb-2 md:mb-5">
          {/* Form header Left */}
          <div className="flex flex-col justify-center">
            <h1 className="font-bold font-[Inter] text-xl md:text-2xl mb-2">
              Wellcome Back!
            </h1>
          </div>
          {/* Form header Left */}

          {/* Form header Right */}
          <p className="self-center whitespace-nowrap text-xs lg:text-sm font-semibold font-[Inter] dark:text-white ml-0 py-1 lg:hidden">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white">
              Shibaji
            </span>
            Sangha
          </p>

          {/* Form header Right */}
        </div>
        {/* Form Header */}

        {/* Main From */}
        <form className="w-full" onSubmit={submitFormHandle}>
          {/* Phone Number input */}
          <Input
            placeholder="example@example.com"
            icon={IoMdMail}
            labelText="Email"
            name="email"
            value={loginDetails.email}
            onChange={handleInputs}
          />

          {/* Address input */}
          <Input
            placeholder="********"
            labelText="Password"
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={handleInputs}
          />

          <Button
            gradientDuoTone="purpleToPink"
            outline
            className="w-full mt-5 font-[Inter]"
            type="submit"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading ....</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
          <p className="tex-[#333] font-[Inter] font-[500] text-[14px] mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#f00d49] font-bold">
              Sign up
            </Link>
          </p>

          {error && (
            <Alert className="mt-5 font-[Inter] text-xs" color="failure">
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

export default Login;
