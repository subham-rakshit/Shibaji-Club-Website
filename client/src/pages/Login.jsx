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
import AOS from "aos";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, currentUser } = useSelector((state) => state.user);

  // Input Handles
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  // Form Submition
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

    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex justify-center items-center mt-[65px] lg:mt-[70px] font-[Inter]">
      <div className="flex flex-col md:flex-row w-full max-w-[1024px] shadow-custom-light-dark rounded-xl overflow-hidden min-h-[600px]">
        {/* Form Content */}
        <div
          className="p-5 lg:p-8 w-full md:w-[50%] order-1 md:order-none flex flex-col justify-center"
          data-aos="fade-right"
        >
          <h1 className="font-extrabold font-[Inter] text-normal text-2xl sm:text-3xl mb-5">
            Wellcome Back!
          </h1>

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
              className="w-full mt-10 font-[Inter]"
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

            {error && (
              <Alert className="mt-5 font-[Inter] text-xs" color="failure">
                * {error}
              </Alert>
            )}
          </form>
          {/* Main From */}
        </div>
        {/* Form Content */}

        {/* SignUp Content */}
        <div
          className="w-full md:w-[50%] p-5 lg:p-8 flex flex-col justify-center items-center border-2 border-red-500 bg-gradient-to-r from-red-500 to-red-700"
          data-aos="fade-left"
        >
          <h1 className="text-white text-center font-extrabold font-[Inter] text-2xl sm:text-3xl mb-3">
            Hello, Friend!
          </h1>
          <p className="text-center text-white font-normal font-[Inter] text-normal text-sm mb-5">
            Enter your personal details and start journey with us
          </p>
          <Link to="/register">
            <Button
              gradientDuoTone="pinkToOrange"
              className="font-bold text-white text-sm shadow-custom-light-dark"
            >
              SIGN UP
            </Button>
          </Link>
        </div>
        {/* SignUp Content */}
      </div>
    </div>
  );
}

export default Login;
