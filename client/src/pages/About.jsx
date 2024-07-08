import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { CgCloseR } from "react-icons/cg";

function About() {
  const [videoIsVisible, setVideoIsVisible] = useState(false);
  const [requitmentVideoIsVisible, setRequitmentVideoIsVisible] =
    useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition duration-300 mt-[65px] lg:mt-[70px] p-5 w-full font-[Inter]">
      {/* About Sibaji */}
      <div
        className="py-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto"
        data-aos="fade-up"
      >
        {/* Left Side */}
        <div className="w-full md:w-[50%]" data-aos="fade-up">
          <h1 className="text-2xl md:text-4xl font-bold">
            About Shbaji Sangha
          </h1>
          <p className="text-sm md:text-[20px] mt-5 leading-6">
            Shbaji Sangha is a community dedicated to nurturing and promoting
            the sport of football. Our club is built on the principles of
            inclusivity, passion, and excellence. We believe in providing
            opportunities for everyone to learn and grow in the sport,
            regardless of their background or skill level. Our commitment is to
            foster a supportive environment where players can develop their
            skills and achieve their goals.
          </p>
        </div>
        {/* Left Side */}

        {/* Right Side */}
        <div className="w-full md:w-[45%] h-[350px] rounded-md lg:rounded-2xl mt-5 md:mt-0 relative transition-all duration-500 shadow-custom-light-dark">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/About%20Shibaji.png?alt=media&token=8ba7e01c-311d-4748-9fe1-059240b6b430"
            alt="about club"
            className={`w-full h-full object-cover rounded-md lg:rounded-2xl absolute top-0 left-0 right-0 bottom-0 filter ${
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
                    url="https://youtu.be/jFGK8VNMq_g"
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
        {/* Right Side */}
      </div>

      {/* Our Vision */}
      <div
        className="py-16 px-8 w-full max-w-[1200px] mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg">
          Our vision is to provide total free videos to become a pro footballer
          with proper routine, nutrition, and individual skills. We aim to break
          down the barriers to professional training and make high-quality
          football education accessible to everyone. By offering comprehensive
          training materials, we empower aspiring footballers to pursue their
          dreams with the guidance of expert advice and structured learning
          paths.
        </p>
        <p className="text-lg mt-4">
          We believe that with the right resources and support, every player has
          the potential to reach their highest performance levels. Our vision
          includes creating a vast library of video tutorials covering every
          aspect of the game, from basic techniques to advanced strategies.
          Through our efforts, we hope to inspire a new generation of football
          enthusiasts and contribute to the global football community.
        </p>
      </div>

      {/* Our Mission */}
      <div
        className="py-16 px-8 bg-gray-100 dark:bg-gray-800 w-full max-w-[1200px] mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission is to provide detailed all types of football practices in
          one place. We strive to be the go-to resource for football training,
          offering everything from drills and exercises to nutritional advice
          and mental conditioning. Our mission is to create a one-stop platform
          where players, coaches, and enthusiasts can find all the information
          they need to excel in football.
        </p>
        <p className="text-lg mt-4">
          We are dedicated to delivering content that is both informative and
          engaging, ensuring that our users can easily apply what they learn to
          their training routines. By compiling a wide range of resources, we
          aim to support the development of well-rounded athletes who are
          prepared for the challenges of competitive football. Our commitment to
          excellence drives us to continually update and expand our content,
          keeping pace with the evolving landscape of the sport.
        </p>
      </div>

      {/* Player Requitment */}
      <div
        className="py-16 flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1200px] mx-auto"
        data-aos="fade-up"
      >
        {/* Left Side */}
        <div className="w-full md:w-[45%] h-[350px] rounded-md lg:rounded-2xl mb-5 md:mb-0 relative transition-all duration-500 shadow-custom-light-dark">
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
        <div className="w-full md:w-[50%]" data-aos="fade-up">
          <h1 className="text-2xl md:text-4xl font-bold">Player Requitment</h1>
          <p className="text-sm md:text-[20px] mt-5 leading-6">
            We also recruit players for our football team. Our club is always on
            the lookout for talented individuals who share our passion for
            football and our commitment to excellence. We provide a platform for
            players to showcase their skills and gain valuable experience in a
            competitive environment.
          </p>
          <p className="text-sm md:text-[20px] mt-5 leading-6">
            Joining Shbaji Sangha means becoming part of a community that values
            teamwork, discipline, and continuous improvement. We offer a
            nurturing environment where players can develop both on and off the
            field.
          </p>
        </div>
        {/* Right Side */}
      </div>
    </div>
  );
}

export default About;
