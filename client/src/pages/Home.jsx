import ReactPlayer from "react-player/youtube";
import { Button, Card } from "flowbite-react";

import { IoIosArrowForward } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { BiSolidChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomePageScrolling from "../components/HomePageScrolling";

function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col mt-[65px] lg:mt-[70px]">
      {/* Home Banner Section ----> */}
      <div className="bg-[url('/banner-dark.png')] w-full min-h-screen bg-cover flex justify-center items-center py-[30px] md:py-[50px]">
        <div className="w-[90%] max-w-[1200px] flex flex-col lg:flex-row justify-start lg:justify-between items-start">
          <div className="w-full lg:w-[50%]">
            <h1
              className="text-white text-[30px] md:text-[45px] font-[Inter] font-extrabold mb-[20px]"
              style={{ textShadow: "5px 5px 5px #000" }}
            >
              HELPING <span className="text-[#95c121]">FOOTBALL PLAYERS</span>{" "}
              WORLDWIDE
            </h1>
            <p className="text-white text-[17px] md:text-[20px] font-[Inter] font-medium mb-[20px] leading-6">
              Discover Shibaji Sangha Football Club exclusive content curated by
              seasoned coaches. Elevate your game and excel as a player with
              Shibaji Sangha Football Club.
            </p>
            {currentUser ? (
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="font-[Inter] hidden lg:inline mt-[30px]"
              >
                Book Trial
                <BiSolidChevronDown
                  className="ml-2 h-5 w-5 animate-bounce"
                  size="10"
                />
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  type="button"
                  className="font-[Inter] hidden lg:inline mt-[30px]"
                  gradientDuoTone="purpleToPink"
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
          <div className="w-full lg:w-[40%] h-[300px] rounded-xl md:rounded-3xl overflow-hidden">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=zs8o231fe7Y"
              width="100%"
              height="100%"
              controls={true}
              muted
            />
          </div>
          {currentUser ? (
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="font-[Inter] lg:hidden mt-[30px]"
            >
              Book Trial
              <BiSolidChevronDown
                className="ml-2 h-5 w-5 animate-bounce"
                size="10"
              />
            </Button>
          ) : (
            <Link to="/login">
              <Button
                type="button"
                className="font-[Inter] lg:hidden mt-[30px]"
                gradientDuoTone="purpleToPink"
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
      {/* Home Banner Section ----> */}

      {/* Coaching Videos Hub Section ----> */}
      <div className="w-full min-h-screen flex justify-center items-center py-[30px] md:py-[50px]">
        <div className="w-[90%] max-w-[1200px] flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-center">
          <div className="w-full lg:w-[49%]">
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
          <ul className="list-none pl-0 w-full lg:w-[49%] flex justify-center flex-wrap gap-[20px] xl:gap-[50px]">
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
                  CURRICULUMS
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
      <div className="w-full min-h-screen bg-[url('/video-content-banner-2.jpeg')] bg-cover relative">
        <div className="flex justify-center items-center bg-gradient-to-r from-[#333] via-[#333] to-[transparent]">
          <div className="w-[90%] max-w-[1200px] flex items-center">
            <div
              className={`min-h-screen py-[30px] md:py-[50px] w-full md:w-[60%] flex flex-col ${
                !currentUser ? "justify-center" : ""
              }`}
            >
              <div className="flex items-center gap-[10px] mb-[30px]">
                <RxDividerVertical className="text-[#95c121] scale-[4] md:scale-[5]" />
                <h1 className="text-[#fff] text-[30px] md:text-[32px] font-sans font-extrabold">
                  HIGH QUALITY <br />
                  VIDEO CONTENT
                </h1>
              </div>
              <p className="text-[#fff] text-[17px] md:text-[20px] font-sans font-normal md:font-medium mb-[25px] md:mb-[30px]">
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
      <div className="min-h-screen flex justify-center items-center py-[30px]">
        <div className="w-[90%] max-w-[1200px] flex flex-col justify-center items-start sm:items-center">
          <h1 className="text-[#95c121] text-[18px] md:text-[25px] font-sans font-extrabold">
            SHIBAJI SANGHA FOR PLAYERS
          </h1>
          <h1 className="text-[25px] md:text-[30px] font-sans font-extrabold mb-[25px] md:mb-[30px]">
            INDIVIDUAL SKILLS PROGRAM
          </h1>
          <p className="sm:text-center text-[17px] md:text-[20px] font-sans font-normal md:font-medium mb-[25px] md:mb-[30px]">
            Use the individual skills program to improve technical skills in an
            interactive format to accelerate player development. Access hundreds
            of pitch & gym based sessions all on video from our elite
            professional sports scientists.
          </p>
          <div className="mb-[30px] rounded-full overflow-hidden whitespace-nowrap main-slide-container flex items-center">
            <div className="flex items-center gap-2 rounded-full animate-slide">
              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/ball-mastery.svg"
                  alt="ball mastery"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  Ball Mastery
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/1v1.svg"
                  alt="1 v 1 moves"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  1 V 1 MOVES
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/juggling-1.svg"
                  alt="juggling"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  JUGGLING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/dribbling-1.svg"
                  alt="dribbling"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  DRIBBLING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/passing-receiving.svg"
                  alt="passing and receiving"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  PASSING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/finishing-1.svg"
                  alt="finishing"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  FINISHING
                </p>
              </Card>
            </div>
            <div className="flex items-center gap-2 rounded-full animate-slide ml-2">
              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/ball-mastery.svg"
                  alt="ball mastery"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  Ball Mastery
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/1v1.svg"
                  alt="1 v 1 moves"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  1 V 1 MOVES
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/juggling-1.svg"
                  alt="juggling"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  JUGGLING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/dribbling-1.svg"
                  alt="dribbling"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  DRIBBLING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/passing-receiving.svg"
                  alt="passing and receiving"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  PASSING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/finishing-1.svg"
                  alt="finishing"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  FINISHING
                </p>
              </Card>
            </div>
            <div className="flex items-center gap-2 rounded-full animate-slide ml-2">
              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/ball-mastery.svg"
                  alt="ball mastery"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  Ball Mastery
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/1v1.svg"
                  alt="1 v 1 moves"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  1 V 1 MOVES
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/juggling-1.svg"
                  alt="juggling"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  JUGGLING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/dribbling-1.svg"
                  alt="dribbling"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  DRIBBLING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/passing-receiving.svg"
                  alt="passing and receiving"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  PASSING
                </p>
              </Card>

              <Card className="w-[200px] h-[200px] flex flex-col justify-center items-center rounded-full gap-[10px] p-5 hover:shadow-2xl shadow-custom-light-dark cursor-pointer">
                <img
                  src="https://footballdna.co.uk/wp-content/uploads/2023/09/finishing-1.svg"
                  alt="finishing"
                  className="w-[60px] sm:w-[70px]"
                />
                <p className="text-[13px] sm:text-[15px] font-[Inter] font-bold text-center">
                  FINISHING
                </p>
              </Card>
            </div>
          </div>
          {currentUser ? (
            <Button
              type="button"
              gradientDuoTone="pinkToOrange"
              className="font-[Inter] w-[fit-content]"
            >
              Learn More
            </Button>
          ) : (
            <Button
              type="button"
              className="font-[Inter] w-[fit-content]"
              gradientDuoTone="pinkToOrange"
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
