import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Button } from "flowbite-react";
import { Input } from "../components";
import { IoMdMail } from "react-icons/io";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

    const apiUrl = "http://localhost:5000/api/auth/login";
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
      navigate("/");
    } else {
      alert(data.extraDetails);
    }
  };

  useEffect(() => {
    const token = Cookies.get("jwt_token");

    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex flex-col lg:flex-row justify-center items-center gap-5 md:gap-10">
      {/* Desktop Image */}
      <img
        src="/login-img-bck-remove.png"
        className="hidden lg:inline mr-0 w-1/2 max-w-96 rounded-full"
        alt="Shibaji Register Logo"
      />
      {/* Desktop Image */}

      {/* Form Content */}
      <div className="lg:p-8 lg:rounded-2xl lg:shadow-2xl w-full max-w-sm">
        {/* Form Header */}
        <div className="w-full max-w-xl flex items-center justify-between mb-5 md:mb-8">
          {/* Form header Left */}
          <div className="flex flex-col justify-center">
            <h1 className="text-[#333] font-bold font-sans text-xl md:text-2xl mb-2">
              Wellcome Back!
            </h1>
            <p className="tex-[#333] font-semibold text-[14px] sm:text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#1f3fcf] font-bold">
                Sign up
              </Link>
            </p>
          </div>
          {/* Form header Left */}

          {/* Form header Right */}
          <div className="lg:hidden">
            <img
              src="/logo.png"
              className="mr-0 mb-1 sm:mb-2 h-6 lg:h-9 rounded-full"
              alt="Shibaji logo"
            />
            <p className="self-center whitespace-nowrap text-xs lg:text-sm font-semibold font-sans dark:text-white ml-0 py-1">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white">
                Shibaji
              </span>
              Sangha
            </p>
          </div>
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
            className="w-full sm:w-2/4 mt-8"
            type="submit"
          >
            Sign in
          </Button>
        </form>
        {/* Main From */}
      </div>
      {/* Form Content */}
    </div>
  );
}

export default Login;
