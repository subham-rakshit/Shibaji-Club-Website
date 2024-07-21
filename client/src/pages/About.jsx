import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { CgCloseR } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { BiSolidChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";

function About() {
  const [aboutVideoIsVisible, setAboutVideoIsVisible] = useState(false);
  const [requitmentVideoIsVisible, setRequitmentVideoIsVisible] =
    useState(false);
  const [howToUseVideoIsVisible, setHowToUseVideoIsVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition duration-300 mt-[60px] sm:mt-[70px] p-5 w-full font-[Inter]">
        {/* About Sibaji */}
        <div className="my-10 md:my-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto">
          {/* Left Side */}
          <div className="w-full md:w-[50%]" data-aos="fade-right">
            <h1 className="text-2xl md:text-4xl font-bold">
              About Shibaji Sangha
            </h1>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              Shibaji Sangha is a community devoted to nurturing and promoting
              the sport of football. Our club stands on the pillars of
              inclusivity, passion, and excellence. We are committed to
              providing opportunities for everyone to learn and grow in
              football, irrespective of their background or skill level. Our
              goal is to create a supportive environment where players can hone
              their skills and reach their full potential.
            </p>
          </div>
          {/* Left Side */}

          {/* Right Side */}
          <div
            className="w-full md:w-[45%] h-[350px] rounded-md lg:rounded-2xl mt-5 md:mt-0 relative transition-all duration-500 shadow-custom-light-dark"
            data-aos="fade-left"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/About%20Shibaji.png?alt=media&token=8ba7e01c-311d-4748-9fe1-059240b6b430"
              alt="about club"
              className={`w-full h-full object-cover rounded-md lg:rounded-2xl absolute top-0 left-0 right-0 bottom-0 filter ${
                aboutVideoIsVisible ? "blur-[3px]" : "blur-0"
              }`}
            />
            {aboutVideoIsVisible ? (
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-[85%] h-[90%] max-w-[450px] max-h-[300px] flex flex-col gap-3">
                  <CgCloseR
                    size="30"
                    className="self-end cursor-pointer text-white hover:text-red-500 hover:scale-[1.2] transition-all duration-300"
                    onClick={() => setAboutVideoIsVisible(false)}
                  />
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <ReactPlayer
                      url="https://youtu.be/jFGK8VNMq_g"
                      className="react-player"
                      playing
                      controls
                      width="100%"
                      height="100%"
                      onEnded={() => setAboutVideoIsVisible(false)} // Hide video after playback ends
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span
                className="absolute flex h-[fit-content] w-[fit-content] top-[40%] left-[43%] cursor-pointer hover:scale-[1.2] transition-all duration-300"
                onClick={() => setAboutVideoIsVisible(true)}
              >
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative rounded-full h-[fit-content] w-[fit-content] bg-red-300 bg-opacity-50 backdrop-blur-sm p-3 flex items-center justify-center">
                  <FaPlay size="30" color="red" />
                </span>
              </span>
            )}
          </div>
          {/* Right Side */}
        </div>

        {/* Our Vision */}
        <div className="my-10 md:my-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto">
          {/* Left */}
          <div
            data-aos="fade-right"
            className="order-1 md:order-none w-full md:w-[40%] mt-10 md:mt-0"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/vision.png?alt=media&token=8216a6db-8901-4f24-a1a1-ca357db4dc55"
              alt="vision"
              className="mx-auto md:mr-auto"
            />
          </div>

          {/* Right */}
          <div className="w-full md:w-[60%]" data-aos="fade-left">
            <h2 className="text-2xl md:text-4xl font-bold">Our Vision</h2>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              Our vision is to provide total free videos to become a pro
              footballer with proper routine, nutrition, and individual skills.
              We aim to break down the barriers to professional training and
              make high-quality football education accessible to everyone. By
              offering comprehensive training materials, we empower aspiring
              footballers to pursue their dreams with the guidance of expert
              advice and structured learning paths.
            </p>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              We believe that with the right resources and support, every player
              has the potential to reach their highest performance levels. Our
              vision includes creating a vast library of video tutorials
              covering every aspect of the game, from basic techniques to
              advanced strategies. Through our efforts, we hope to inspire a new
              generation of football enthusiasts and contribute to the global
              football community.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="my-10 md:my-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto">
          {/* Left */}
          <div className="w-full md:w-[60%]" data-aos="fade-right">
            <h2 className="text-2xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              Our mission is to provide detailed all types of football practices
              in one place. We strive to be the go-to resource for football
              training, offering everything from drills and exercises to
              nutritional advice and mental conditioning. Our mission is to
              create a one-stop platform where players, coaches, and enthusiasts
              can find all the information they need to excel in football.
            </p>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              We are dedicated to delivering content that is both informative
              and engaging, ensuring that our users can easily apply what they
              learn to their training routines. By compiling a wide range of
              resources, we aim to support the development of well-rounded
              athletes who are prepared for the challenges of competitive
              football. Our commitment to excellence drives us to continually
              update and expand our content, keeping pace with the evolving
              landscape of the sport.
            </p>
          </div>

          {/* Right */}
          <div data-aos="fade-left" className="w-full md:w-[40%] mt-10 md:mt-0">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/mission.png?alt=media&token=8422b50b-7ccf-4dea-80ba-404d9f00fc7c"
              alt="mission"
              className="mx-auto md:ml-auto"
            />
          </div>
        </div>

        {/* Player Requitment */}
        <div className="my-10 md:my-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto">
          {/* Left Side */}
          <div
            className="w-full md:w-[45%] h-[350px] rounded-md lg:rounded-2xl mb-5 md:mb-0 relative transition-all duration-500 shadow-custom-light-dark order-1 md:order-none mt-10 md:mt-0"
            data-aos="fade-right"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Book%20trials.png?alt=media&token=00feeb9b-1a5e-4033-9a80-9e96d655bb41"
              alt="player requitment"
              className={`w-full h-full object-cover rounded-md lg:rounded-2xl absolute top-0 left-0 right-0 bottom-0 filter ${
                requitmentVideoIsVisible ? "blur-[3px]" : "blur-0"
              }`}
            />
            {requitmentVideoIsVisible ? (
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-[85%] h-[90%] max-w-[450px] max-h-[300px] flex flex-col gap-3">
                  <CgCloseR
                    size="30"
                    className="self-end cursor-pointer text-white hover:text-red-500 hover:scale-[1.2] transition-all duration-300"
                    onClick={() => setRequitmentVideoIsVisible(false)}
                  />
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <ReactPlayer
                      url="https://youtu.be/JkuSrbb8aH8"
                      className="react-player"
                      playing
                      controls
                      width="100%"
                      height="100%"
                      onEnded={() => setRequitmentVideoIsVisible(false)} // Hide video after playback ends
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span
                className="absolute flex h-[fit-content] w-[fit-content] top-[40%] left-[43%] cursor-pointer hover:scale-[1.2] transition-all duration-300"
                onClick={() => setRequitmentVideoIsVisible(true)}
              >
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative rounded-full h-[fit-content] w-[fit-content] bg-red-300 bg-opacity-50 backdrop-blur-sm p-3 flex items-center justify-center">
                  <FaPlay size="30" color="red" />
                </span>
              </span>
            )}
          </div>
          {/* Left Side */}

          {/* Right Side */}
          <div className="w-full md:w-[50%]" data-aos="fade-left">
            <h1 className="text-2xl md:text-4xl font-bold">
              Player Requitment
            </h1>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              We also recruit players for our football team. Our club is always
              on the lookout for talented individuals who share our passion for
              football and our commitment to excellence. We provide a platform
              for players to showcase their skills and gain valuable experience
              in a competitive environment.
            </p>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              Joining Shbaji Sangha means becoming part of a community that
              values teamwork, discipline, and continuous improvement. We offer
              a nurturing environment where players can develop both on and off
              the field.
            </p>
            <Link to={currentUser ? "/book-trials" : "/login"}>
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                outline
                className="font-[Inter] mt-[30px]"
                data-aos="flip-left"
              >
                Book Trial
                <BiSolidChevronDown
                  className="ml-2 h-5 w-5 animate-bounce"
                  size="10"
                />
              </Button>
            </Link>
          </div>
          {/* Right Side */}
        </div>

        {/* How to use */}
        <div className="my-10 md:my-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto">
          {/* Left Side */}
          <div className="w-full md:w-[50%]" data-aos="fade-right">
            <h1 className="text-2xl md:text-4xl font-bold">How To Use</h1>
            <p className="text-sm md:text-[20px] mt-5 leading-6">
              You can easily navigate our website to maximize your training
              experience. Start by creating an account to access our extensive
              video library. Explore videos on routines, nutrition, and
              individual skills, all designed to help you improve. Follow our
              structured training videos to progress step by step, and bookmark
              your favorite videos for quick access. Reach out to our support
              team if you need any assistance.
              <Link
                to="/contact-us"
                className="text-blue-400 font-bold underline ml-2"
              >
                Contact Us
              </Link>
            </p>
          </div>
          {/* Left Side */}

          {/* Right Side */}
          <div
            className="w-full md:w-[45%] h-[350px] rounded-md lg:rounded-2xl mt-5 md:mt-0 relative transition-all duration-500 shadow-custom-light-dark"
            data-aos="fade-left"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/How%20to%20use.png?alt=media&token=65c95374-2159-4ce2-b30d-fdbee8997536"
              alt="how to use"
              className={`w-full h-full object-cover rounded-md lg:rounded-2xl absolute top-0 left-0 right-0 bottom-0 filter ${
                howToUseVideoIsVisible ? "blur-[3px]" : "blur-0"
              }`}
            />
            {howToUseVideoIsVisible ? (
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-[85%] h-[90%] max-w-[450px] max-h-[300px] flex flex-col gap-3">
                  <CgCloseR
                    size="30"
                    className="self-end cursor-pointer text-white hover:text-red-500 hover:scale-[1.2] transition-all duration-300"
                    onClick={() => setHowToUseVideoIsVisible(false)}
                  />
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <ReactPlayer
                      url="https://youtu.be/jFGK8VNMq_g"
                      className="react-player"
                      playing
                      controls
                      width="100%"
                      height="100%"
                      onEnded={() => setHowToUseVideoIsVisible(false)} // Hide video after playback ends
                    />
                  </div>
                </div>
              </div>
            ) : (
              <span
                className="absolute flex h-[fit-content] w-[fit-content] top-[40%] left-[43%] cursor-pointer hover:scale-[1.2] transition-all duration-300"
                onClick={() => setHowToUseVideoIsVisible(true)}
              >
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative rounded-full h-[fit-content] w-[fit-content] bg-red-300 bg-opacity-50 backdrop-blur-sm p-3 flex items-center justify-center">
                  <FaPlay size="30" color="red" />
                </span>
              </span>
            )}
          </div>
          {/* Right Side */}
        </div>
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
    </>
  );
}

export default About;
