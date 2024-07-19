import { Link, useLocation } from "react-router-dom";
import AOS from "aos";

import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  return (
    <div
      className={`w-full py-[30px] bg-[#F9FAFB] dark:bg-[#1F2937] flex flex-col justify-center items-center z-[60] shadow-custom-light-dark dark:shadow-none font-[Inter] ${
        location.pathname === "/reset-password" && "hidden"
      }`}
    >
      <div className="w-[90%] max-w-[1024px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[30px] md:gap-[20px]">
          {/* Footer Logo and Socials */}
          <div
            className="flex flex-col items-center w-full md:w-[fit-content]"
            data-aos="fade-right"
          >
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/bgRemoveWebLogo.png?alt=media&token=4d742d92-7d25-42dd-8835-1951c710c18b"
                alt="logo"
                className="cursor-pointer w-[180px] md:w-[200px] object-cover hover:scale-[1.2] transition-all duration-500"
              />
            </Link>
            <ul className="list-none pl-0 flex items-center gap-2 md:gap-[20px] my-2">
              <Link
                to="https://www.facebook.com/profile.php?id=100006629626082"
                target="_blank"
              >
                <li className="hover:shadow-custom-light-dark p-2 rounded-full">
                  <FaFacebookF size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
              <Link
                to="https://www.instagram.com/subham_rakshit_1/"
                target="_blank"
              >
                <li className="hover:shadow-custom-light-dark p-2 rounded-full">
                  <FaInstagram size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
              <Link
                to="https://www.linkedin.com/in/subhamjitu97/"
                target="_blank"
              >
                <li className="hover:shadow-custom-light-dark p-2 rounded-full">
                  <FaLinkedin size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
              <Link to="https://github.com/subham-rakshit" target="_blank">
                <li className="hover:shadow-custom-light-dark p-2 rounded-full">
                  <FaGithub size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
            </ul>
          </div>
          {/* Footer Logo and Socials */}

          {/* Explore & Info Sections */}
          <div
            className="w-full md:w-[45%] max-w-[400px] md:max-w-[500px] flex justify-between gap-[20px]"
            data-aos="fade-left"
          >
            {/* Explore */}
            <div>
              <h1 className="text-[18px] font-bold mb-[15px]">EXPLORER</h1>
              <ul className="list-none pl-0 flex flex-col gap-[10px]">
                <Link to="/">
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Home
                  </li>
                </Link>
                <Link to="/about">
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    About Us
                  </li>
                </Link>
                <Link
                  to={`${currentUser ? "/search?tab=blogs&page=1" : "/login"}`}
                >
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Blogs
                  </li>
                </Link>
                <Link to={`${currentUser ? "/contact-us" : "/login"}`}>
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Contact Us
                  </li>
                </Link>

                <Link to={`${currentUser ? "/book-trials" : "/login"}`}>
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Book Trials
                  </li>
                </Link>
              </ul>
            </div>
            {/* Explore */}

            {/* Info */}
            <div>
              <h1 className="text-[18px] font-bold mb-[15px]">INFO</h1>
              <ul className="list-none pl-0 flex flex-col gap-[10px]">
                <Link
                  to={`${
                    currentUser ? "/search?tab=practices&page=1" : "/login"
                  }`}
                >
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Practices & Sessions
                  </li>
                </Link>
                <Link
                  to={`${
                    currentUser
                      ? "/search?tab=practices&category=matches&page=1"
                      : "/login"
                  }`}
                >
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Matches
                  </li>
                </Link>
                {/* 🖐️ TODO */}
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Nutrition
                </li>
                {/* 🖐️ TODO */}
                <Link
                  to={`${
                    currentUser
                      ? "/search?tab=practices&category=club%20insides&page=1"
                      : "/login"
                  }`}
                >
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Individual Skills Program
                  </li>
                </Link>
              </ul>
              {/* TODO ⛔⛔⛔⛔ */}
            </div>
            {/* Info */}
          </div>
          {/* Explore & Info Sections */}
        </div>
      </div>
      <hr className="mt-2 border border-gray-300 dark:border-gray-600 w-full" />
      <p className="text-[16px] font-semibold cursor-pointer text-center mt-[20px] px-2">
        Copyright © 2024. Shibaji Sangha Football Club. All Rights Reserved.
      </p>
    </div>
  );
};
export default Footer;
