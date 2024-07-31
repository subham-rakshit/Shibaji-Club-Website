import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Label, Modal, Spinner } from "flowbite-react";
import { Input, OAuth, VerifyEmail } from "../components";
import { IoMdMail } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  initialRender,
} from "../redux-slice/userSlice";
import AOS from "aos";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function Login() {
  const { loading } = useSelector((state) => state.user);
  const { registeredUser } = useSelector((state) => state.register);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isShown, setIsShown] = useState(false);
  const [isPassModelShown, setIsPassModelShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      if (response.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        dispatch(signInSuccess(data.userDetails));
        setLoginDetails({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
        dispatch(signInFailure(data.extraDetails));
      }
    } catch (error) {
      toast.error(data.extraDetails, {
        theme: "colored",
        position: "bottom-center",
      });
      dispatch(signInFailure(error.message));
    }
  };

  // Password Reset
  const handleResetPassword = async () => {
    if (email.length > 0) {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/forget-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message, {
            theme: "colored",
            position: "bottom-center",
          });
          setIsPassModelShown(false);
          setEmail("");
        } else {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
        }
      } catch (error) {
        toast.error(error.message, {
          theme: "colored",
          position: "bottom-center",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Email is required!", {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    dispatch(initialRender());

    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="w-full min-h-screen py-10 px-5 flex justify-center items-center mt-[65px] lg:mt-[70px] font-[Inter]">
      <div className="flex flex-col md:flex-row w-full max-w-[1024px] shadow-custom-light-dark rounded-xl overflow-hidden min-h-[600px]">
        {/* Form Content */}
        <div
          className={`p-5 lg:p-8 w-full md:w-[50%] order-1 md:order-none flex flex-col justify-center ${
            registeredUser ? "blur-[2px]" : "blur-none"
          }`}
          data-aos="fade-right"
        >
          <h1 className="font-extrabold font-[Inter] text-normal text-2xl sm:text-3xl mb-5">
            Welcome Back!
          </h1>

          {/* Main From */}
          <form className="w-full" onSubmit={submitFormHandle}>
            {/* Email input */}
            <Input
              placeholder="example@example.com"
              icon={IoMdMail}
              labelText="Email"
              name="email"
              value={loginDetails.email}
              onChange={handleInputs}
              disabled={registeredUser}
            />

            {/* Password input */}
            <div className="flex flex-col">
              <div className="mt-2 block">
                <Label
                  htmlFor="loginPassword"
                  value="Password"
                  className="font-semibold font-[Inter] text-xs"
                />
              </div>
              <div
                className={`flex items-center gap-2 rounded-lg shadow-sm bg-[#F9FAFB] dark:bg-[#374151]  border border-[#D1D5DB] dark:border-[#4B5563] focus-within:ring-2 focus-within:ring-cyan-500 overflow-hidden px-3 mt-1 ${
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
                  value={loginDetails.password}
                  onChange={handleInputs}
                  disabled={registeredUser}
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
              <button
                type="button"
                className={`self-end text-xs text-[#0065FF] font-semibold mt-2 ${
                  registeredUser ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={registeredUser}
                onClick={() => setIsPassModelShown(true)}
              >
                Forgot Password?
              </button>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              outline
              className="w-full mt-5 md:mt-8 font-[Inter]"
              disabled={registeredUser}
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
            <div className="flex items-center justify-center gap-3 my-1 md:my-2">
              <hr className="w-full border border-[#9CA3AF] dark:border-[#6B7280] border-dotted" />
              <span className="font-[Inter] text-[#9CA3AF] dark:text-[#6B7280] text-sm font-semibold">
                OR
              </span>
              <hr className="w-full border border-[#9CA3AF] dark:border-[#6B7280] border-dotted" />
            </div>
            <OAuth />
          </form>
          {/* Main From */}
        </div>
        {/* Form Content */}

        {/* SignUp Right Content */}
        <VerifyEmail
          heading="Hello, Friend!"
          para="Enter your personal details and start journey with us."
          btnText="SIGN UP"
        />
        {/* SignUp Right Content */}

        {/* Password Reset Model */}
        <Modal
          show={isPassModelShown}
          size="sm"
          onClose={() => setIsPassModelShown(false)}
          position="bottom-center"
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="flex flex-col">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/forget.png?alt=media&token=92f726ed-ca7d-4c83-9e2c-b462921d7f94"
                alt="forget password"
                className="w-[180px] h-[180px] mx-auto mb-5"
              />
              <h1 className="text-xl font-bold font-[Inter] text-[#172B4D]">
                Forgot Password?
              </h1>
              <p className="text-xs font-[Inter] text-[#172B4D] mb-5 mt-3">
                Don't worry! It happens. Please enter the address associated
                with you account.
              </p>

              <div className="flex items-center my-5">
                <MdOutlineAlternateEmail color="gray" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-t-0 border-r-0 border-l-0 border-gray-300 focus:ring-0 text-xs"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <Button
                type="button"
                color="blue"
                className="font-[Inter]"
                onClick={handleResetPassword}
              >
                {isLoading ? (
                  <>
                    Processing
                    <BeatLoader
                      color="#fff"
                      size={8}
                      className="my-auto ml-2"
                    />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        {/* Password Reset Model */}
      </div>
    </div>
  );
}

export default Login;
