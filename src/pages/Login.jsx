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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Wrong from "../assets/animation/Wrong.json";
import axios from "axios";
import Car from "../assets/Car.png";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const lottieRef = useRef(null);
  const eyeRef = useRef(null);
  const errorRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [error, setError] = useState("");
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode, toggleDarkMode, setLogin } = useContext(AuthContext);
  const nagivate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutPerson = setTimeout(() => setPlay(true), 1200);
    const timeout = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.pause();
      }
    }, 6000);
    const timeoutEye = setTimeout(() => {
      if (eyeRef.current) {
        eyeRef.current.pause();
      }
    }, 3100);

    return () => {
      clearTimeout(timeoutEye);
      clearTimeout(timeout);
      clearTimeout(timeoutPerson);
    };
  }, []);

  //login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.data.user.role == "admin") {
        localStorage.setItem("userId", JSON.stringify(response.data.user));
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data.token);
        setLogin(localStorage.getItem("userId"));
        console.log("Token saved to localStorage:", response.data.user.token);
        console.log(response.data.user.name);
        nagivate("/Dashboard");
      } else {
        setError("Login failed. Please check your username and password.");
      }
    } catch (err) {
      console.log("Login error response:", err.response);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <CiLight color="black" />
          ) : (
            <FaMoon size={11} color="black"></FaMoon>
          )}
        </motion.div>
        <div className="flex flex-col items-center justify-center md:mt-5">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            <img src={Car} style={{ width: 120 }} />
          </motion.div>

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-2xl font-md dark:text-white ">Account Login</p>
            <p className="text-md font-light dark:text-white">
              Hey, Enter your details to get sign in to your account
            </p>
          </motion.div>
          {/* username */}

          <form onSubmit={handleSubmit}>
            <div className="space-x-5 space-y-8 md:space-x-2">
              {error && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-row  items-center bg-red-600 h-12 w-md p-2  text-gray-200 dark:text-gray-200 rounded-md mb-6 text-md"
                >
                  <Lottie
                    className="size-10 pr-1"
                    animationData={Wrong}
                    loop={false}
                    autoPlay={true}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {error}
                  </motion.p>
                </motion.div>
              )}
              <motion.div
                layout
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
                    required
                    value={email}
                    placeholder=""
                    disabled={loading}
                    onChange={(e) => setName(e.target.value)}
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
                layout
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
                    required
                    value={password}
                    type={hidePassword ? "text" : "password"}
                    disabled={loading}
                    placeholder=""
                    className="h-12 w-md text-sm text-gray-700 bg-gray-200 border-b-gray-500 border-2 rounded-lg border-opacity-5 
                  placeholder-gray-300 placeholder-opacity-0 transition duration-200 pl-12"
                    onChange={(e) => setPassword(e.target.value)}
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
                layout
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
              >
                <motion.span
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
                >
                  {loading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </motion.span>
              </motion.button>
            </div>
          </form>
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
