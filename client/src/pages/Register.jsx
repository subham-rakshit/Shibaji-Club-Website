import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Label, Select, Spinner } from "flowbite-react";
import { Input } from "../components";

import { FaUser, FaPhoneAlt, FaAddressBook } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    category: "Footballer",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    setLoading(true);

    try {
      const apiUrl = "http://localhost:5000/api/auth/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };

      const response = await fetch(apiUrl, options);
      // console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.ok === true) {
        Cookies.set("jwt_token", data.jwt_token, {
          expires: 30,
          path: "/",
        });
        alert(data.message);
        setLoading(false);
        navigate("/");
        setNewUser({
          username: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          category: "Footballer",
        });
      } else {
        alert(data.extraDetails);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error :: signUpSumbitHandle() in Register Page :: ${error}`);
    }
  };

  useEffect(() => {
    const token = Cookies.get("jwt_token");

    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-20 mt-[65px] lg:mt-[76px]">
      {/* Desktop Image */}
      <img
        src="/signUp-img-bck-remove.png"
        className="hidden lg:inline mr-0 w-1/2 max-w-96 rounded-full"
        alt="Shibaji Register Logo"
      />
      {/* Desktop Image */}

      {/* Form Content */}
      <div className="lg:p-8 lg:rounded-2xl lg:shadow-2xl w-full max-w-lg">
        {/* Form Header */}
        <div className="w-full max-w-xl flex items-center justify-between mb-5 md:mb-8">
          {/* Form header Left */}

          <div className="flex flex-col justify-center">
            <h1 className="text-[#333] font-bold font-sans text-xl md:text-2xl mb-2">
              Let's Start!
            </h1>
            <p className="tex-[#333] font-semibold text-[14px] md:text-sm">
              Have an account?{" "}
              <Link to="/login" className="text-[#1f3fcf] font-bold pl-1">
                Sign in
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
        <form className="w-full max-w-lg" onSubmit={signUpSumbitHandle}>
          <div className="flex items-center gap-2 w-full">
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

          {/* Phone Number input */}
          <Input
            placeholder="+91 0000000000"
            icon={FaPhoneAlt}
            labelText="Phone Number"
            name="phone"
            value={newUser.phone}
            onChange={inputHandler}
          />

          {/* Address input */}
          <Input
            placeholder="Enter your address"
            icon={FaAddressBook}
            labelText="Address"
            name="address"
            value={newUser.address}
            onChange={inputHandler}
          />

          <div className="flex items-center gap-2 w-full">
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
                  className="text-[#333] font-semibold text-xs"
                />
              </div>
              <Select
                id="category"
                value={newUser.category}
                onChange={inputHandler}
                required
              >
                <option name="Footballer">Footballer</option>
                <option name="General">General</option>
              </Select>
            </div>
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            className="w-full sm:w-2/4 mt-8"
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
        </form>
        {/* Main From */}
      </div>
      {/* Form Content */}
    </div>
  );
}

export default Register;
