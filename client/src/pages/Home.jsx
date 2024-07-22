import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ReactPlayer from "react-player/youtube";
import { Button, Card } from "flowbite-react";
import { Typewriter } from "react-simple-typewriter";

import { IoIosArrowForward } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { BiSolidChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomePageScrolling from "../components/HomePageScrolling";
import { FaPlay } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [videoIsVisible, setVideoIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="flex flex-col mt-[60px] sm:mt-[70px]">
      {/* Home Banner Section ----> */}
      <div className="bg-[url('/banner-dark.png')] w-full min-h-screen bg-cover flex justify-center items-center py-[30px] md:py-[50px]">
        <div className="w-[90%] max-w-[1200px] flex flex-col lg:flex-row justify-start lg:justify-between items-start">
          <div className="w-full lg:w-[50%]" data-aos="fade-right">
            <h1
              className="text-white text-[30px] md:text-[35px] font-[Inter] font-extrabold mb-[20px]"
              style={{ textShadow: "5px 5px 5px #000" }}
            >
              HELPING{" "}
              <span className="text-[#95c121] text-[25px] md:text-[28px] banner-section-moving-text">
                <Typewriter
                  words={[
                    "GLOBAL TALENT",
                    "SOCCER STARS",
                    "SKILLFUL ATHLETES",
                    "FUTURE STARS",
                    "FOOTBALL PLAYERS",
                    "GAME CHANGERS",
                    "RISING TALENT",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  cursorColor="white"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p className="text-white text-[17px] md:text-[20px] font-[Inter] font-medium mb-[20px] leading-6">
              Discover Shibaji Sangha Football Club exclusive content curated by
              seasoned coaches. Elevate your game and excel as a player with
              Shibaji Sangha Football Club.
            </p>
            {/* Desktop Button */}
            {currentUser ? (
              <Link to="/book-trials">
                <Button
                  type="button"
                  gradientDuoTone="purpleToPink"
                  className="font-[Inter] hidden lg:inline mt-[30px]"
                  data-aos="flip-left"
                >
                  Book Trial
                  <BiSolidChevronDown
                    className="ml-2 h-5 w-5 animate-bounce"
                    size="10"
                  />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  type="button"
                  className="font-[Inter] hidden lg:inline mt-[30px]"
                  gradientDuoTone="purpleToPink"
                  data-aos="flip-right"
                >
                  Sign in
                  <BiSolidChevronDown
                    className="ml-2 h-5 w-5 animate-bounce"
                    size="10"
                  />
                </Button>
              </Link>
            )}
            {/* Desktop Button */}
          </div>

          {/* Banner Video */}
          <div
            className="w-full lg:w-[45%] h-[350px] rounded-md lg:rounded-xl mt-5 md:mt-0 relative transition-all duration-500 shadow-custom-light-dark overflow-hidden"
            data-aos="zoom-in"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Welcome%20Banner%20Thumbnail.jpg?alt=media&token=9b6c0ad9-43e4-425b-9e4b-03ac0f6b21b7"
              alt="welcome shibaji sangha"
              className={`w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 filter ${
                videoIsVisible ? "blur-[3px]" : "blur-0"
              }`}
            />
            {videoIsVisible ? (
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-[85%] h-[90%] max-w-[450px] max-h-[300px] flex flex-col gap-3">
                  <CgCloseR
                    size="30"
                    className="self-end cursor-pointer text-white hover:text-red-500 hover:scale-[1.2] transition-all duration-300"
                    onClick={() => setVideoIsVisible(false)}
                  />
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <ReactPlayer
                      url="https://youtu.be/UsZWkvVuz-c"
                      className="react-player"
                      playing
                      controls
                      width="100%"
                      height="100%"
                      onEnded={() => setVideoIsVisible(false)} // Hide video after playback ends
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span
                className="absolute flex h-[fit-content] w-[fit-content] top-[40%] left-[43%] cursor-pointer hover:scale-[1.2] transition-all duration-300"
                onClick={() => setVideoIsVisible(true)}
              >
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative rounded-full h-[fit-content] w-[fit-content] bg-red-300 bg-opacity-50 backdrop-blur-sm p-3 flex items-center justify-center">
                  <FaPlay size="30" color="red" />
                </span>
              </span>
            )}
          </div>
          {/* Banner Video */}

          {/* Mobile Button */}
          {currentUser ? (
            <Link to="/book-trials">
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="font-[Inter] lg:hidden mt-[30px]"
                data-aos="flip-right"
              >
                Book Trial
                <BiSolidChevronDown
                  className="ml-2 h-5 w-5 animate-bounce"
                  size="10"
                />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                type="button"
                className="font-[Inter] lg:hidden mt-[30px]"
                gradientDuoTone="purpleToPink"
                data-aos="flip-left"
              >
                Sign in
                <BiSolidChevronDown
                  className="ml-2 h-5 w-5 animate-bounce"
                  size="10"
                />
              </Button>
            </Link>
          )}
          {/* Mobile Button */}
        </div>
      </div>
      {/* Home Banner Section ----> */}

      {/* Coaching Videos Hub Section ----> */}
      <div
        className="w-full min-h-screen flex justify-center items-center py-[30px] md:py-[50px]"
        data-aos="fade-up"
      >
        <div className="w-[90%] max-w-[1200px] flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-center">
          <div className="w-full lg:w-[49%]" data-aos="fade-right">
            <h1 className="text-[#95c121] text-[18px] md:text-[25px] font-[Inter] font-extrabold mb-5">
              COACHING VIDEO HUB
            </h1>
            <p className="text-[25px] md:text-[30px] font-[Inter] font-extrabold mb-[25px] md:mb-[30px]">
              EXPLORE PRACTICE & SESSIONS
            </p>
            <p className="text-[17px] md:text-[20px] font-[Inter] font-normal md:font-medium mb-[25px] md:mb-[30px]">
              Easily search through filter over many videos on the platform to
              find practice resources from all the way through to senior
              football.
            </p>
            {/* Desktop See All Videos button */}
            {currentUser ? (
              <Link to="/search?tab=practices&page=1">
                <Button
                  outline
                  gradientDuoTone="pinkToOrange"
                  className="hidden lg:inline font-[Inter]"
                >
                  See All Practices
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  type="button"
                  className="hidden lg:inline font-[Inter]"
                  outline
                  gradientDuoTone="pinkToOrange"
                >
                  Sign in
                  <BiSolidChevronDown
                    className="ml-2 h-5 w-5 animate-bounce"
                    size="10"
                  />
                </Button>
              </Link>
            )}
            {/* Desktop See All Videos button */}
          </div>
          <ul
            className="list-none pl-0 w-full lg:w-[49%] flex lg:justify-center flex-wrap gap-[20px] xl:gap-[50px]"
            data-aos="fade-left"
          >
            {/* Outfield */}
            <Link
              to={`${
                currentUser
                  ? "/search?tab=practices&category=outfield&page=1"
                  : "/login"
              }`}
              className="w-full sm:w-[45%]"
            >
              <li className="w-full flex justify-between items-center gap-[10px] rounded-[15px] pr-[10px] cursor-pointer overflow-hidden shadow-custom-light-dark">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/outfield-1.svg"
                  alt="outfield"
                  className="bg-[#95c121] w-[80px] h-[70px]"
                />
                <p className="text-[14px] md:text-[16px] font-[Inter] font-bold">
                  OUTFIELD
                </p>
                <IoIosArrowForward size="16" />
              </li>
            </Link>
            {/* Goalkeepers */}
            <Link
              to={`${
                currentUser
                  ? "/search?tab=practices&category=goalkeepers&page=1"
                  : "/login"
              }`}
              className="w-full sm:w-[45%]"
            >
              <li className="w-full flex justify-between items-center gap-[10px] rounded-[15px] pr-[10px] cursor-pointer overflow-hidden shadow-custom-light-dark">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/goalkeepers-1.svg"
                  alt="goalkeepers"
                  className="bg-[#95c121] w-[80px] h-[70px]"
                />
                <p className="text-[14px] md:text-[16px] font-[Inter] font-bold">
                  GOALKEEPERS
                </p>
                <IoIosArrowForward size="16" />
              </li>
            </Link>
            {/* One to One */}
            <Link
              to={`${
                currentUser
                  ? "/search?tab=practices&category=one%20to%20one&page=1"
                  : "/login"
              }`}
              className="w-full sm:w-[45%]"
            >
              <li className="w-full flex justify-between items-center gap-[10px] rounded-[15px] pr-[10px] cursor-pointer overflow-hidden shadow-custom-light-dark">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/onetoone-1.svg"
                  alt="on to one"
                  className="bg-[#95c121] w-[80px] h-[70px]"
                />
                <p className="text-[14px] md:text-[16px] font-[Inter] font-bold">
                  ONE TO ONE
                </p>
                <IoIosArrowForward size="16" />
              </li>
            </Link>
            {/* Tutorials */}
            <Link
              to={`${
                currentUser
                  ? "/search?tab=practices&category=tutorials&page=1"
                  : "/login"
              }`}
              className="w-full sm:w-[45%]"
            >
              <li className="w-full flex justify-between items-center gap-[10px] rounded-[15px] pr-[10px] cursor-pointer overflow-hidden shadow-custom-light-dark">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/tutorials-1.svg"
                  alt="tutorials"
                  className="bg-[#95c121] w-[80px] h-[70px]"
                />
                <p className="text-[14px] md:text-[16px] font-[Inter] font-bold">
                  TUTORIALS
                </p>
                <IoIosArrowForward size="16" />
              </li>
            </Link>
            {/* SAQ */}
            <Link
              to={`${
                currentUser
                  ? "/search?tab=practices&category=saq&page=1"
                  : "/login"
              }`}
              className="w-full sm:w-[45%]"
            >
              <li className="w-full flex justify-between items-center gap-[10px] rounded-[15px] pr-[10px] cursor-pointer overflow-hidden shadow-custom-light-dark">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/SAQ-1.svg"
                  alt="saq"
                  className="bg-[#95c121] w-[80px] h-[70px]"
                />
                <p className="text-[14px] md:text-[16px] font-[Inter] font-bold">
                  SAQ
                </p>
                <IoIosArrowForward size="16" />
              </li>
            </Link>
            {/* Youth Curriculums */}
            <Link
              to={`${
                currentUser
                  ? "/search?tab=practices&category=youth%20curriculums&page=1"
                  : "/login"
              }`}
              className="w-full sm:w-[45%]"
            >
              <li className="w-full flex justify-between items-center gap-[10px] rounded-[15px] pr-[10px] cursor-pointer overflow-hidden shadow-custom-light-dark">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/curriculums-1.svg"
                  alt="curriculums"
                  className="bg-[#95c121] w-[80px] h-[70px]"
                />
                <p className="text-[14px] md:text-[16px] font-[Inter] font-bold">
                  Youth U-15
                </p>
                <IoIosArrowForward size="16" />
              </li>
            </Link>
          </ul>
          {/* Mobile See All Videos button */}
          {currentUser ? (
            <Link to="/search?tab=practices&page=1">
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                className="lg:hidden font-[Inter] mt-[30px]"
              >
                See All Practices
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                type="button"
                className="lg:hidden font-[Inter] mt-[30px]"
                outline
                gradientDuoTone="pinkToOrange"
              >
                Sign in
                <BiSolidChevronDown
                  className="ml-2 h-5 w-5 animate-bounce"
                  size="10"
                />
              </Button>
            </Link>
          )}
          {/* Mobile See All Videos button */}
        </div>
      </div>
      {/* Coaching Videos Hub Section ----> */}

      {/* High Quality Video Content Section ----> */}
      <div
        className="w-full min-h-screen bg-[url('/video-content-banner-2.jpeg')] bg-cover relative"
        data-aos="fade-up"
      >
        <div className="flex justify-center items-center bg-gradient-to-r from-[#333] via-[#333] to-[transparent]">
          <div className="w-[90%] max-w-[1200px] flex items-center">
            <div
              className={`min-h-screen py-[30px] md:py-[50px] w-full md:w-[60%] flex flex-col ${
                !currentUser ? "justify-center" : ""
              }`}
            >
              <div
                className="flex items-center gap-[10px] mb-[30px]"
                data-aos="fade-down"
              >
                <RxDividerVertical className="text-[#95c121] scale-[4] md:scale-[5]" />
                <h1 className="text-[#fff] text-[30px] md:text-[32px] font-[Inter] font-extrabold">
                  HIGH QUALITY <br />
                  VIDEO CONTENT
                </h1>
              </div>
              <p className="text-[#fff] text-[17px] md:text-[20px] font-[Inter] font-normal md:font-medium mb-[25px] md:mb-[30px]">
                Watch, use & adapt hundreds of videos to enhance and develop
                individual games. Develop individuals, groups & teams with our
                extensive range of content covering all areas of the game. Each
                practice & session is in video format for you to watch &
                understand easily.
              </p>
              {currentUser ? (
                <div className="w-full absolute bottom-0 left-0 z-[90]">
                  <HomePageScrolling />
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    type="button"
                    className="font-[Inter] mt-[30px]"
                    gradientDuoTone="redToYellow"
                  >
                    Sign in
                    <BiSolidChevronDown
                      className="ml-2 h-5 w-5 animate-bounce"
                      size="10"
                    />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* High Quality Video Content Section ----> */}

      {/* Individual Skills Sections */}
      <div
        className="min-h-screen flex justify-center items-center py-[30px]"
        data-aos="fade-up"
      >
        <div className="w-[90%] max-w-[1200px] flex flex-col justify-center items-start sm:items-center">
          <h1
            className="text-[#95c121] text-[18px] md:text-[25px] font-[Inter] font-extrabold"
            data-aos="fade-right"
          >
            SHIBAJI SANGHA FOR PLAYERS
          </h1>
          <h1
            className="text-[25px] md:text-[30px] font-[Inter] font-extrabold mb-[25px] md:mb-[30px]"
            data-aos="fade-left"
          >
            A DEEP DIVE INTO OUR TRAINING REGIMEN
          </h1>
          <p
            className="sm:text-center text-[17px] md:text-[20px] font-[Inter] font-normal md:font-medium mb-[25px] md:mb-[30px]"
            data-aos="zoom-in"
          >
            A deep dive into our training regimen reveals the meticulous
            preparation required to excel on the football field. From dawn till
            dusk, our players immerse themselves in a rigorous routine that
            combines technical drills, tactical simulations, and physical
            conditioning. Each session is finely tuned to enhance agility,
            endurance, and strategic prowess, ensuring every player is primed to
            perform at peak levels during crucial moments on match day. This
            commitment to excellence not only fosters individual skill
            development but also cultivates a cohesive team dynamic that is
            vital for achieving victory on the pitch.
          </p>
          <div className="mb-[30px] rounded-full overflow-hidden whitespace-nowrap main-slide-container-two py-5">
            <div className="flex items-center gap-2 rounded-full animate-slide-right">
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=ball%20mastery&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/ball-mastery.svg"
                    alt="ball mastery"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    Ball Mastery
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=1%20v1%20moves&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/1v1.svg"
                    alt="1 v 1 moves"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    1 V 1 MOVES
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=juggling&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/juggling-1.svg"
                    alt="juggling"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    JUGGLING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=dribbling&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/dribbling-1.svg"
                    alt="dribbling"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    DRIBBLING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=passing&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/passing-receiving.svg"
                    alt="passing and receiving"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    PASSING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=finishing&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/finishing-1.svg"
                    alt="finishing"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    FINISHING
                  </p>
                </Card>
              </Link>
            </div>
            <div className="flex items-center gap-2 rounded-full animate-slide-right ml-2">
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=ball%20mastery&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/ball-mastery.svg"
                    alt="ball mastery"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    Ball Mastery
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=1%20v1%20moves&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/1v1.svg"
                    alt="1 v 1 moves"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    1 V 1 MOVES
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=juggling&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/juggling-1.svg"
                    alt="juggling"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    JUGGLING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=dribbling&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/dribbling-1.svg"
                    alt="dribbling"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    DRIBBLING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=passing&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/passing-receiving.svg"
                    alt="passing and receiving"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    PASSING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=finishing&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/finishing-1.svg"
                    alt="finishing"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    FINISHING
                  </p>
                </Card>
              </Link>
            </div>
            <div className="flex items-center gap-2 rounded-full animate-slide-right ml-2">
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=ball%20mastery&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/ball-mastery.svg"
                    alt="ball mastery"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    Ball Mastery
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=1%20v1%20moves&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/1v1.svg"
                    alt="1 v 1 moves"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    1 V 1 MOVES
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=juggling&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/juggling-1.svg"
                    alt="juggling"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    JUGGLING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=dribbling&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/dribbling-1.svg"
                    alt="dribbling"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    DRIBBLING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=passing&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/passing-receiving.svg"
                    alt="passing and receiving"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    PASSING
                  </p>
                </Card>
              </Link>
              <Link
                to={`${
                  currentUser
                    ? "/search?tab=practices&category=club%20insides&searchItem=finishing&page=1"
                    : "/login"
                }`}
              >
                <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-custom-light-dark cursor-pointer">
                  <img
                    src="https://footballdna.co.uk/wp-content/uploads/2023/09/finishing-1.svg"
                    alt="finishing"
                    className="w-[60px] sm:w-[70px]"
                  />
                  <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                    FINISHING
                  </p>
                </Card>
              </Link>
            </div>
          </div>
          {currentUser ? (
            <Link to="/search?tab=practices&page=1">
              <Button
                type="button"
                gradientDuoTone="pinkToOrange"
                outline
                className="font-[Inter] w-[fit-content]"
                data-aos="flip-right"
              >
                Learn More
              </Button>
            </Link>
          ) : (
            <Button
              type="button"
              className="font-[Inter] w-[fit-content]"
              gradientDuoTone="pinkToOrange"
              outline
              data-aos="flip-left"
            >
              <Link to="/login">Sign in</Link>
              <BiSolidChevronDown
                className="ml-2 h-5 w-5 animate-bounce"
                size="10"
              />
            </Button>
          )}
        </div>
      </div>
      {/* Individual Skills Sections */}
    </div>
  );
}

export default Home;
