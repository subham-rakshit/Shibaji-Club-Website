import { Link } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full py-[30px] bg-[#F9FAFB] dark:bg-[#1F2937] flex flex-col justify-center items-center z-[100] shadow-custom-light-dark dark:shadow-none font-[Inter]">
      <div className="w-[90%] max-w-[1024px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[30px] md:gap-[20px]">
          <div className="flex md:flex-col items-center gap-[20px]">
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/logo.png?alt=media&token=5a2d5ea6-6138-4cd3-9d16-a632d513de2d"
                alt="logo"
                className="w-[80px] md:w-[100px] rounded-[50%] cursor-pointer shadow-custom-light-dark"
              />
            </Link>
            <ul className="list-none pl-0 flex items-center gap-2 md:gap-[20px] md:mt-[30px]">
              <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                <FaFacebookF size="25" style={{ cursor: "pointer" }} />
              </li>
              <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                <FaInstagram size="25" style={{ cursor: "pointer" }} />
              </li>
              <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                <FaLinkedin size="25" style={{ cursor: "pointer" }} />
              </li>
              <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                <FaGithub size="25" style={{ cursor: "pointer" }} />
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[45%] max-w-[400px] md:max-w-[500px] flex justify-between gap-[20px]">
            <div>
              <h1 className="text-[18px] font-bold mb-[15px]">EXPLORER</h1>
              <ul className="list-none pl-0 flex flex-col gap-[10px]">
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Home
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  About Us
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Blog
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Careers and CVs
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Register
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Contact Us
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Terms and Conditions
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-[18px] font-bold mb-[15px]">INFO</h1>
              <ul className="list-none pl-0 flex flex-col gap-[10px]">
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Practices & Sessions
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Sport Science
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Wellbeing and Nutrition
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Features
                </li>
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Individual Skills Program
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-2 border border-gray-300 dark:border-gray-600 w-full" />
      <p className="text-[16px] font-semibold cursor-pointer text-center mt-[20px]">
        Copyright © 2024. Shibaji Sangha Football Club. All Rights Reserved.
      </p>
    </div>
  );
};
export default Footer;
