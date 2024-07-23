import { Button, Label } from "flowbite-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";

function ResetPassword() {
  const [newUser, setNewUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
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

  // Handle on submit
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    const tokenURL = urlParams.get("token");
    const idURL = urlParams.get("id");

    if (!newUser.password || !newUser.confirmPassword) {
      return toast.error("Fill the input properly!", {
        theme: "colored",
        position: "top-right",
      });
    }
    if (newUser.password !== newUser.confirmPassword) {
      return toast.error("Passwords doesn't match!", {
        theme: "colored",
        position: "top-right",
      });
    }
    if (
      newUser.password.trim().length < 8 ||
      newUser.password.trim().length > 20
    ) {
      return toast.error("Password must be at least 8 to 20 characters long!", {
        theme: "colored",
        position: "top-right",
      });
    }

    // Handle the actual password reset logic here
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/auth/reset-password?token=${tokenURL}&id=${idURL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ confirmPassword: newUser.confirmPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "top-right",
        });
        navigate("/login");
      } else {
        if (
          data.message === "Token expired or not register yet" ||
          data.message === "Invalid token" ||
          data.message === "User not authenticated" ||
          data.message === "Invalid user ID"
        ) {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "top-right",
          });
          navigate("/login");
        } else {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "top-right",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        theme: "colored",
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center font-[Inter]">
      <form
        className="w-[90%] max-w-[500px]"
        onSubmit={handleResetPasswordSubmit}
      >
        <h1 className="font-[Inter] text-2xl md:text-3xl font-bold">
          Create new password
        </h1>
        <p className="font-[Inter] text-sm mt-3">
          Your new password must be different from perious used password
        </p>
        {/* Password input */}
        <div className="my-5">
          <Label
            htmlFor="resetPassword"
            value="New Password"
            className="font-semibold font-[Inter] text-sm text-[#6C7888]"
          />

          <div
            className={`flex items-center gap-2 rounded-lg shadow-sm bg-[#F9FAFB] dark:bg-[#374151]  border border-[#D1D5DB] dark:border-[#4B5563] focus-within:ring-1 focus-within:ring-cyan-500 overflow-hidden px-3 mt-3`}
          >
            <input
              type={isShown ? "text" : "password"}
              id="resetPassword"
              name="password"
              className={`bg-[#F9FAFB] dark:bg-[#374151] border-none outline-none focus:ring-0 w-full text-gray-900 dark:text-white dark:placeholder-gray-400 text-sm px-1 py-[13px]`}
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
          <p className="text-xs font-[Inter] text-[#98A7BB] mt-1">
            Must be at least 8 characters.
          </p>
        </div>
        {/* Confirm Password Input */}
        <div>
          <Label
            htmlFor="confirmPassword"
            value="Confirm Password"
            className="font-semibold font-[Inter] text-sm text-[#6C7888]"
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`rounded-lg shadow-sm bg-[#F9FAFB] dark:bg-[#374151]  border border-[#D1D5DB] dark:border-[#4B5563] focus-within:ring-1 focus-within:ring-cyan-500 overflow-hidden px-3 mt-3 w-full`}
            placeholder="********"
            value={newUser.confirmPassword}
            onChange={inputHandler}
          />
        </div>

        {/* Button */}
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="font-[Inter] w-full mt-10"
        >
          {isLoading ? (
            <>
              Processing
              <BeatLoader color="#fff" size={8} className="my-auto ml-2" />
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;
