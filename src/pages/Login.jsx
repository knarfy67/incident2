import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Barangay from "../assets/img/Barangay.png";
import Person from "../assets/animation/Person.json";
import Password from "../assets/animation/Password.json";
import Report from "../assets/animation/Report.json";
import sit from "../assets/img/sit.png";
import Eyes from "../assets/animation/Eyes.json";
import { FaMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const lottieRef = useRef(null);
  const eyeRef = useRef(null);
  const [play, setPlay] = useState(false);
  const { setLogin, darkMode, toggleDarkMode } = useContext(AuthContext);

  useEffect(() => {
    const timeoutPerson = setTimeout(() => setPlay(true), 1200);
    const timeout = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.pause(); // Pause animation after 6 seconds
      }
    }, 6000);
    const timeoutEye = setTimeout(() => {
      if (eyeRef.current) {
        eyeRef.current.pause(); // Pause animation after 6 seconds
      }
    }, 3100);

    return () => {
      clearTimeout(timeoutEye);
      clearTimeout(timeout);
      clearTimeout(timeoutPerson);
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 dark:bg-slate-950 bg-white h-screen w-full">
      <div className="mx-20">
        <motion.div
          initial={{ opacity: 0 }} // Start fully invisible
          animate={{ opacity: 1 }} // Fade in to full opacity
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          onClick={toggleDarkMode}
          className="flex items-center justify-center rounded-md size-10 dark:bg-slate-800 bg-gray-300 mt-10"
        >
          {!darkMode ? (
            <CiLight color="white" />
          ) : (
            <FaMoon size={11} color="black"></FaMoon>
          )}
        </motion.div>
        <div className="flex flex-col items-center justify-center mt-10 md:mt-5">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            <img src={Barangay} style={{ width: 120 }} />
          </motion.div>

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-2xl font-md dark:text-white ">Account Login</p>
            <p className="text-md font-light dark:text-white">
              Hey, Enter your details to get sign in to your account
            </p>
          </motion.div>
          {/* username */}
          <div className="space-x-5 space-y-8 md:space-x-2">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
            >
              <label className="relative cursor-pointer flex items-center">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10">
                  {play ? (
                    <Lottie
                      animationData={Person}
                      loop={false}
                      autoPlay={true}
                    />
                  ) : null}
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="h-12 w-md text-sm text-gray-700 bg-gray-200 border-b-gray-500 border-2 rounded-lg border-opacity-5 
               placeholder-gray-300 placeholder-opacity-0 transition duration-200 pl-12"
                />
                <span className="text-md font-light text-gray-900 text-opacity-80 absolute left-12 top-3 px-2 transition duration-200 input-text">
                  Username
                </span>
              </label>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            >
              <label className="relative cursor-pointer flex items-center">
                <div className="absolute  top-1/2 transform -translate-y-1/2 h-14 w-14">
                  <Lottie
                    animationData={Password}
                    loop={false}
                    autoPlay={true}
                    lottieRef={lottieRef}
                  />
                </div>

                <div className="absolute  top-1/2 right-2  transform -translate-y-1/2 h-10 w-10">
                  <Lottie
                    animationData={Eyes}
                    loop={false}
                    autoPlay={true}
                    lottieRef={eyeRef}
                    onClick={() => setHidePassword(!hidePassword)}
                    style={{
                      filter: hidePassword ? "none" : "grayscale(100%)",
                      cursor: "pointer",
                    }}
                  />
                  {!hidePassword && (
                    <div
                      className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-500 rotate-45"
                      style={{ transform: "translateY(-50%)" }}
                    />
                  )}
                </div>
                <input
                  type={hidePassword ? "text" : "password"}
                  placeholder=""
                  className="h-12 w-md text-sm text-gray-700 bg-gray-200 border-b-gray-500 border-2 rounded-lg border-opacity-5 
               placeholder-gray-300 placeholder-opacity-0 transition duration-200 pl-12"
                />

                <span className="text-md font-light text-gray-900 text-opacity-80 absolute left-12 top-3 px-2 transition duration-200 input-text input-password">
                  Password
                </span>
              </label>
              <p className="dark:text-white flex justify-end font-light">
                Forgot Password?
              </p>
            </motion.div>
            <motion.button
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
              whileHover={{
                y: -2,
                transition: { ease: "easeInOut" },
              }}
              onMouseLeave={() => ({ y: 0 })}
              type="Submit"
              placeholder="Login"
              className="h-12 w-md text-md font-medium text-white rounded-md bg-lime-600 hover:bg-lime-500"
              onClick={() => {
                setLogin(true);
              }}
            >
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
              >
                Login
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
      {/* Hide the image on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
        className="hidden md:flex justify-center items-center relative"
      >
        <img
          src={sit}
          className="w-full h-screen object-cover hidden md:block rounded-md "
        />
        <div className="absolute inset-0 bg-green-700 opacity-70 rounded-md"></div>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="absolute top-25 text-3xl font-light text-white"
        >
          "Great power comes with great responsibility"
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }} // Start fully invisible
          animate={{ opacity: 1 }} // Fade in to full opacity
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
          className="flex absolute "
        >
          <Lottie animationData={Report} loop={true} autoPlay={true} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
