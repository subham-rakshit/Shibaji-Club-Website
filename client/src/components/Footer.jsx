import { Link } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full py-[30px] bg-[#F9FAFB] dark:bg-[#1F2937] flex flex-col justify-center items-center z-[60] shadow-custom-light-dark dark:shadow-none font-[Inter]">
      <div className="w-[90%] max-w-[1024px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[30px] md:gap-[20px]">
          <div className="flex md:flex-col items-center">
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/newLogoShibaji.png?alt=media&token=0db6f9e7-6304-44e2-bc46-3b9a7cfe6540"
                alt="logo"
                className="cursor-pointer max-w-[250px] object-cover hover:scale-[1.2] transition-all duration-500"
              />
            </Link>
            <ul className="list-none pl-0 flex items-center gap-2 md:gap-[20px] md:mt-[30px]">
              <Link
                to="https://www.facebook.com/profile.php?id=100006629626082"
                target="_blank"
              >
                <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                  <FaFacebookF size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
              <Link
                to="https://www.instagram.com/subham_rakshit_1/"
                target="_blank"
              >
                <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                  <FaInstagram size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
              <Link
                to="https://www.linkedin.com/in/subhamjitu97/"
                target="_blank"
              >
                <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                  <FaLinkedin size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
              <Link to="https://github.com/subham-rakshit" target="_blank">
                <li className="hover:shadow-custom-light-dark dark:shadow-custom-light-dark p-2 rounded-full">
                  <FaGithub size="25" style={{ cursor: "pointer" }} />
                </li>
              </Link>
            </ul>
          </div>
          <div className="w-full md:w-[45%] max-w-[400px] md:max-w-[500px] flex justify-between gap-[20px]">
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
                <Link to="/search?tab=blogs&page=1">
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Blogs
                  </li>
                </Link>
                <Link to="/contact-us">
                  <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                    Contact Us
                  </li>
                </Link>

                {/* TODO ⛔⛔⛔⛔ */}
                <li className="text-[16px] font-semibold cursor-pointer hover:text-[18px] hover:underline transition-all duration-300">
                  Terms and Conditions
                </li>
                {/* TODO ⛔⛔⛔⛔ */}
              </ul>
            </div>

            {/* TODO ⛔⛔⛔⛔ */}
            <div>
              <h1 className="text-[18px] font-bold mb-[15px]">INFO</h1>
              {/* TODO ⛔⛔⛔⛔ */}
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
              {/* TODO ⛔⛔⛔⛔ */}
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
