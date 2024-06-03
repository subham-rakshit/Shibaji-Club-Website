import React, { useState } from "react";

import { Button, Textarea, Label, Alert, Spinner } from "flowbite-react";
import { Input } from "../components";

import { FaUser, FaPhoneAlt, FaAddressBook } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Contact() {
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContactDetails({
      ...contactDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "http://localhost:5000/api/form/contact-us";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactDetails),
      };

      const response = await fetch(apiUrl, options);
      // console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.ok === true) {
        alert(data.message);
        setContactDetails({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        setLoading(false);
      } else {
        alert(data.extraDetails);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error :: handleSubmit() in Contact Page :: ${error}`);
    }
  };

  return (
    <div className="mt-[64px] lg:mt-[76px] w-full min-h-screen flex flex-col justify-center gap-[30px] items-center pt-[30px]">
      <div className="w-[90%] max-w-[1200px] flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-20">
        {/* Desktop Image */}
        <img
          src="/contact.png"
          className="hidden lg:inline mr-0 w-1/2 max-w-80  rounded-full"
          alt="Shibaji Register Logo"
        />
        {/* Desktop Image */}

        {/* Form Content */}
        <div className="lg:p-8 lg:rounded-2xl lg:shadow-2xl w-full max-w-lg">
          {/* Form Header */}
          <div className="w-full max-w-xl flex items-center justify-between gap-5 mb-5 md:mb-8">
            {/* Form header Left */}

            <div className="flex flex-col justify-center">
              <h1 className="text-[#333] font-bold font-[Inter] text-xl md:text-2xl mb-2">
                Contact Support
              </h1>
              <p className="hidden sm:inline tex-[#333] font-[Inter] font-semibold text-[14px]">
                Need assistance or information? Send us a message to our team
                now
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
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              {/* First Name input */}
              <Input
                placeholder="Enter your first name"
                icon={FaUser}
                labelText="First Name"
                value={contactDetails.firstName}
                name="firstName"
                onChange={handleInputs}
              />
              {/* Last Name input */}
              <Input
                placeholder="Enter your last name"
                icon={FaUser}
                labelText="Last Name"
                value={contactDetails.lastName}
                name="lastName"
                onChange={handleInputs}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              {/* Email input */}
              <Input
                placeholder="example@exampl.com"
                icon={IoMdMail}
                labelText="Email"
                value={contactDetails.email}
                name="email"
                onChange={handleInputs}
              />
              {/* Phone Number input */}
              <Input
                placeholder="+91 0000000000"
                icon={FaPhoneAlt}
                labelText="Phone Number"
                value={contactDetails.phone}
                name="phone"
                onChange={handleInputs}
              />
            </div>

            {/* Address input */}
            <Input
              placeholder="Enter your address"
              icon={FaAddressBook}
              labelText="Address"
              value={contactDetails.address}
              name="address"
              onChange={handleInputs}
            />

            {/* Message Input */}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="comment"
                  value="Message"
                  className="text-[#333] font-[Inter] font-semibold text-xs"
                />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave your message..."
                value={contactDetails.message}
                name="message"
                onChange={handleInputs}
                required
                rows={4}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              className="w-full font-[Inter] sm:w-2/4 mt-8"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading ....</span>
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
          {/* Main From */}
        </div>
        {/* Form Content */}
      </div>

      {/* Map Section */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.236562349494!2d86.89817981006811!3d23.8457320785163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6d8a13eca8625%3A0xa9ee1f35d789136!2sSrilata%20Stadium!5e0!3m2!1sen!2sin!4v1717142654632!5m2!1sen!2sin"
        className="w-full min-h-[400px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Contact;
