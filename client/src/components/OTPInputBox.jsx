import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  registrationFailure,
  userVerified,
} from "../redux-slice/registerSlice";

// We are putting the default value of length and onOTPSubmit
function OTPInputBox({ length = 4, onOTPSubmit = () => {} }) {
  const { registrationError, registeredUser } = useSelector(
    (state) => state.register
  );
  const [invalidAttempts, setInvalidAttempts] = useState(0);

  const [otp, setOtp] = useState(new Array(length).fill("")); //* 1. ["", "", "", ""] -> We fill the OTP values here.

  const inputRefs = useRef([]); //* 2. Reference to all input fields. (When user registered then first OTP input field is automatically focused. For that we need this reference. Default value is an Array because we're going to refference all of the input fields eg. otp array. It provieds us the exact jsx element.)

  const dispatch = useDispatch();

  //* 2. When ever the component is rendered this useEffect will execute. (Basically as soon as the component load the first input field gets focused)
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //* 3. Handle onChange events in input boxes
  const handleInputValueChange = (e, index) => {
    const value = e.target.value;

    //? We make sure what ever is entered in the input box its a number not any other character.
    if (isNaN(value)) {
      return toast.error("Enter a valid number", {
        theme: "colored",
        position: "bottom-center",
      });
    } // If value is not a number then just return.

    //? If value is a number then
    const newOtp = [...otp];

    //? Allow only one input value. Because user can enter multiple inputs.
    newOtp[index] = value.substring(value.length - 1); // If user type 123 in one in input field we take the latest one eg. 3. When u type 1, then it takes 1. But when u type again 2 then number is 12, but it takes only 2. (substring remove all the characters 0 to last character of the string). For this we are passing the index. Because we are putting value in that index of newOtp array.

    //? We are storing the input field's value in state otp array.
    setOtp(newOtp);

    //? After fill all the input fields we just trigger the onOTPSubmit function
    const combinedOTP = newOtp.join(""); // Here we use (newOTP) not using (otp) because setOtp() function is an async function. It returns the old state value. So otp array is not being updated at this point.

    //? Move the next input if current field is filled. (If perticular input field has it's value and the index of input field is less then the provided (lenth - 1), Means provided length is 4. So, if our current position in input filed is 2 then we can move index 3. Because input field's indexes are [0 1 2 3]. So we can't move [beyond length - 1 eg. 4 - 1 = 3rd index]). AND if the inputRefs array the next index have somthing then we can move forward.
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      // [inputRefs.current[index + 1].focus();] // By this line one bug occurs. Eg -> If input filed'd values are [0, "", 5, ""]. Then if enter value in index 1, then it automatically focus to the next index. But next index is already field. If u want to achieve the cursor is move to the first empty input filed then,
      inputRefs.current[newOtp.indexOf("")].focus(); // By this line cursor move autometically on the next first empty input field. Correct one is this.
    }

    //? If combinedOTP's length is equal to our passing main length then we call the onOTPSubmit function. For passing the OTP.
    if (combinedOTP.length === length) {
      // Call onOTPSubmit function when invalidAttempts is less than 3. (0, 1, 2)
      if (invalidAttempts < 3) {
        onOTPSubmit(combinedOTP);
      }
      setOtp(new Array(length).fill(""));
      inputRefs.current[0].focus();

      // Count the number of attempts
      setInvalidAttempts((prevAttempts) => {
        const newAttempts = prevAttempts + 1;
        return newAttempts;
      });
    }
  };

  //* 4. Handle key down events. (Means we can customise events based on the key pressed on keyboard. We are going to achieve, when user press "Backspace" then cursor is autometically going to pervious one.)
  const handleKeyDown = (index, e) => {
    // When key is Backsapce AND is value not present in current index of otp array AND index must be greater than the first one means 0th index and is somthing present in previous input filed, THEN it should autometically go to the previous one.

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move foucs to the previous input field on Backspace.
      inputRefs.current[index - 1].focus();
    }
  };

  //* 5. Handle onClick on input boxes. (Means when u click on any input box the cursor move to the last position of the value. Means usually is = |6, but we're going to achieve this -> [ 6| ])
  const handleInputBoxClick = (index) => {
    // The "setSelectionRange" method is used to set the start and end positions of the current text selection in an input or textarea element. This method is particularly useful for focusing the cursor at a specific position within an input field, or selecting a range of text within the input field. Means we u click the cursor before the number then cursor autometically set at the end of the number. But you have to set the start and end point are 1, 1. Means only one value. So not chance the type 5 and then 45 or 345, it converts to 4 or 3 only. Latest entered value.
    inputRefs.current[index].setSelectionRange(1, 1);

    // After clicked the existing input field, If previous any input field is empty then move to the first empty field.
    if (index >= 0 && otp[index] && otp.some((field) => field === "")) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  //* Handle too many invalid attempts. (If user enters the worng OTP more than 3 times, then user has to be remove from DB.)
  useEffect(() => {
    const removeUser = async () => {
      try {
        const res = await fetch(`/api/auth/remove-user`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: registeredUser._id }),
        });
        const data = await res.json();

        if (res.status === 403) {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
          dispatch(userVerified());
        }
      } catch (error) {
        toast.error(error.message, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    };
    if (invalidAttempts > 3) {
      removeUser();
    }
  }, [invalidAttempts]);

  return (
    <div className="flex items-center gap-2 my-5">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)} //* -------- 2 (We are passing the input fields in the inputRefs.current index. Means in inputRefs Array looks like [input1, input2, input3, input4] just like this.)
            value={value}
            onChange={(e) => handleInputValueChange(e, index)} //* ---------- 3
            onKeyDown={(e) => handleKeyDown(index, e)} //* ------------------ 4
            onClick={() => handleInputBoxClick(index)} //* ----------------- 5
            className="w-10 h-10 rounded-lg text-center"
          />
        );
      })}
    </div>
  );
}

export default OTPInputBox;
