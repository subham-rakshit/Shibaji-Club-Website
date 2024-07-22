import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Spinner } from "flowbite-react";

import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";
import AOS from "aos";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const { currentUser } = useSelector((state) => state.user);
  const [contactDetails, setContactDetails] = useState({
    firstName: "",
    lastName: "",
    email: currentUser.email,
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
    console.log(contactDetails);
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = "/api/form/contact-us";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactDetails),
      };

      const res = await fetch(apiUrl, options);

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          theme: "colored",
          position: "bottom-center",
        });
        setContactDetails({
          firstName: "",
          lastName: "",
          email: currentUser.email,
          phone: "",
          address: "",
          message: "",
        });
      } else {
        toast.error(data.extraDetails, {
          theme: "colored",
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        position: "botto-center",
      });
      console.log(`Error :: handleSubmit() in Contact Page :: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="mt-[64px] lg:mt-[76px] w-full min-h-screen flex flex-col justify-center gap-[30px] items-center pt-[30px]">
      <div className="w-[90%] max-w-[1200px] flex flex-col lg:flex-row shadow-custom-light-dark rounded-2xl overflow-hidden">
        {/* Left Info */}
        <div className="w-full lg:w-[40%] px-5 py-5 lg:py-10 bg-gradient-to-br from-[#7E41A1] to-[#252C88] text-white">
          <h1
            className="font-bold font-[Inter] text-xl md:text-2xl mb-5"
            data-aos="zoom-in"
          >
            Contact Information
          </h1>
          <p className="font-[Inter] text-sm mb-5" data-aos="zoom-out">
            Fill up the form and our Team will get back to you within 24 hours
          </p>

          <ul className="flex flex-col pl-0 list-none gap-5 my-10">
            <li className="flex items-center gap-3 font-[Inter]">
              <div
                className="bg-[#FF6A6B] p-2 rounded-full"
                data-aos="fade-right"
              >
                <FaPhoneAlt size="20" className="rounded-full" />
              </div>
              <p className="text-sm flex flex-col" data-aos="fade-left">
                Phone:
                <a
                  href="tel:+917980483206"
                  className="hover:text-[#FF6A6B] text-[13px] sm:text-sm"
                >
                  +917980483206
                </a>
              </p>
            </li>
            <li className="flex items-center gap-3 font-[Inter]">
              <div
                className="bg-[#FF6A6B] p-2 rounded-full"
                data-aos="fade-right"
              >
                <SiMinutemailer size="20" className="rounded-full" />
              </div>
              <p className="text-sm flex flex-col" data-aos="fade-left">
                Email:
                <a
                  href="mailto:subhamrakshit667@gmail.com"
                  className="hover:text-[#FF6A6B] text-[13px] sm:text-sm"
                >
                  subhamrakshit667@gmail.com
                </a>
              </p>
            </li>
          </ul>

          <ul
            className="list-none pl-0 flex items-center lg:justify-center gap-2 md:gap-[20px] my-2"
            data-aos="zoom-out"
          >
            <Link
              to="https://www.facebook.com/profile.php?id=100006629626082"
              target="_blank"
            >
              <li className="hover:shadow-custom-light-dark hover:bg-[#FF6A6B] p-2 rounded-full">
                <FaFacebookF size="25" style={{ cursor: "pointer" }} />
              </li>
            </Link>
            <Link
              to="https://www.instagram.com/subham_rakshit_1/"
              target="_blank"
            >
              <li className="hover:shadow-custom-light-dark hover:bg-[#FF6A6B] p-2 rounded-full">
                <FaInstagram size="25" style={{ cursor: "pointer" }} />
              </li>
            </Link>
            <Link
              to="https://www.linkedin.com/in/subhamjitu97/"
              target="_blank"
            >
              <li className="hover:shadow-custom-light-dark hover:bg-[#FF6A6B] p-2 rounded-full">
                <FaLinkedin size="25" style={{ cursor: "pointer" }} />
              </li>
            </Link>
            <Link to="https://github.com/subham-rakshit" target="_blank">
              <li className="hover:shadow-custom-light-dark hover:bg-[#FF6A6B] p-2 rounded-full">
                <FaGithub size="25" style={{ cursor: "pointer" }} />
              </li>
            </Link>
          </ul>
        </div>
        {/* Left Info */}

        {/* Main From */}
        <form
          className="w-full lg:w-[60%] px-5 py-5 lg:p-10 bg-[#F0ECE1] text-black font-[Inter]"
          onSubmit={handleSubmit}
        >
          <h1
            className="font-bold font-[Inter] text-xl md:text-2xl"
            data-aos="zoom-out"
          >
            Send us a message
          </h1>
          {/* First Name & Last Name */}
          <div className="flex flex-col md:flex-row items-center gap-5 w-full mt-5 mb-5">
            {/* First Name input */}
            <div
              className="w-full rounded-[25px] shadow-custom-inset overflow-hidden"
              data-aos="fade-left"
            >
              <input
                type="text"
                placeholder="First Name"
                value={contactDetails.firstName}
                name="firstName"
                onChange={handleInputs}
                required
                className="border-none outline-none bg-transparent text-[18px] text-[#555] px-[20px] py-[10px] w-full focus:ring-0"
              />
            </div>
            {/* Last Name input */}
            <div
              className="w-full rounded-[25px] shadow-custom-inset overflow-hidden"
              data-aos="fade-right"
            >
              <input
                type="text"
                placeholder="Last Name"
                value={contactDetails.lastName}
                name="lastName"
                onChange={handleInputs}
                required
                className="border-none outline-none bg-transparent text-[18px] text-[#555] px-[20px] py-[10px] w-full focus:ring-0"
              />
            </div>
          </div>

          {/* Email & Phone Number */}
          <div className="flex flex-col md:flex-row items-center gap-5 w-full mb-5">
            {/* Email input */}
            <div
              className="w-full rounded-[25px] shadow-custom-inset overflow-hidden"
              data-aos="fade-left"
            >
              <input
                type="text"
                placeholder="Mail"
                value={contactDetails.email}
                name="email"
                required
                readOnly
                className="border-none outline-none bg-transparent text-[18px] text-[#555] px-[20px] py-[10px] w-full focus:ring-0 cursor-not-allowed"
              />
            </div>
            {/* Phone Number input */}
            <div
              className="w-full rounded-[25px] shadow-custom-inset overflow-hidden"
              data-aos="fade-right"
            >
              <input
                type="text"
                placeholder="Phone"
                value={contactDetails.phone}
                name="phone"
                onChange={handleInputs}
                required
                className="border-none outline-none bg-transparent text-[18px] text-[#555] px-[20px] py-[10px] w-full focus:ring-0"
              />
            </div>
          </div>

          {/* Address input */}
          <div
            className="w-full rounded-[25px] shadow-custom-inset overflow-hidden mb-5"
            data-aos="zoom-in"
          >
            <input
              type="text"
              placeholder="Address"
              value={contactDetails.address}
              name="address"
              onChange={handleInputs}
              required
              className="border-none outline-none bg-transparent text-[18px] text-[#555] px-[20px] py-[10px] w-full focus:ring-0"
            />
          </div>

          {/* Message Input */}
          <div
            className="w-full rounded-[25px] shadow-custom-inset overflow-hidden"
            data-aos="zoom-out"
          >
            <textarea
              placeholder="Write your message"
              value={contactDetails.message}
              name="message"
              onChange={(e) => {
                const msg = e.target.value;
                if (msg.length < 256) {
                  setContactDetails({ ...contactDetails, message: msg });
                }
              }}
              required
              className="border-none outline-none bg-transparent text-[18px] text-[#555] px-[20px] py-[10px] w-full h-[150px] resize-none focus:ring-0"
            />
          </div>
          <p className="text-end pr-2 mt-1 text-xs text-gray-400">
            {255 - contactDetails.message.length} characters left
          </p>

          <Button
            type="submit"
            className="w-full bg-[#FF6A6B] font-[Inter] md:w-2/4 mt-8 mx-auto shadow-custom-light-dark"
            disabled={loading}
            pill
            data-aos="flip-left"
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

        {/* Form Content */}
      </div>

      {/* Map Section */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.236562349494!2d86.89817981006811!3d23.8457320785163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6d8a13eca8625%3A0xa9ee1f35d789136!2sSrilata%20Stadium!5e0!3m2!1sen!2sin!4v1717142654632!5m2!1sen!2sin"
        className="w-full min-h-[400px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        data-aos="zoom-in"
      ></iframe>
    </div>
  );
}

export default Contact;
