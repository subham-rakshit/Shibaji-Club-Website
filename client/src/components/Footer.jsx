import { Link } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full py-[30px] bg-[#333] flex justify-center items-center">
      <div className="w-[90%] max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[30px] md:gap-[20px]">
          <div className="flex md:flex-col items-center md:items-start gap-[20px]">
            <Link to="/">
              <img
                src="./logo.png"
                alt="logo"
                className="w-[80px] md:w-[100px] rounded-[50%] cursor-pointer"
              />
            </Link>
            <ul className="list-none pl-0 flex items-center gap-[15px] md:gap-[20px] md:mt-[30px]">
              <li>
                <FaFacebookF
                  size="25"
                  color="#8E8E8E"
                  style={{ cursor: "pointer" }}
                />
              </li>
              <li>
                <FaInstagram
                  size="25"
                  color="#8E8E8E"
                  style={{ cursor: "pointer" }}
                />
              </li>
              <li>
                <FaLinkedin
                  size="25"
                  color="#8E8E8E"
                  style={{ cursor: "pointer" }}
                />
              </li>
              <li>
                <FaGithub
                  size="25"
                  color="#8E8E8E"
                  style={{ cursor: "pointer" }}
                />
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[45%] max-w-[400px] md:max-w-[500px] flex justify-between gap-[20px]">
            <div>
              <h1 className="text-[#fff] text-[17px] font-sans font-medium mb-[15px]">
                EXPLORER
              </h1>
              <ul className="list-none pl-0 flex flex-col gap-[10px]">
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Home
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  About Us
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Blog
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Careers and CVs
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Register
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Contact Us
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Terms and Conditions
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-[#fff] text-[17px] font-sans font-medium mb-[15px]">
                INFO
              </h1>
              <ul className="list-none pl-0 flex flex-col gap-[10px]">
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Practices & Sessions
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Sport Science
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Wellbeing and Nutrition
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Features
                </li>
                <li className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] hover:underline">
                  Individual Skills Program
                </li>
              </ul>
            </div>
          </div>

          <img
            src="./footer-logo.jpg"
            alt="logo"
            className="hidden md:inline w-[150px] rounded-[50%] opacity-[0.3]"
          />
        </div>

        <hr color="#8E8E8E" size="1" className="mt-2 opacity-[0.2]" />
        <p className="text-[#8e8e8e] text-[16px] font-sans font-semibold cursor-pointer hover:text-[#b9b7b7] text-center mt-[20px]">
          Copyright © 2024. Shibaji Sangha Football Club. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
