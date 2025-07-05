import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import Avatar from "../assets/img/Avatar.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import Bell from "../assets/animation/Bell.json";
import Search from "../assets/animation/Search.json";
import Lottie from "lottie-react";

const TopBar = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  const {
    darkMode,
    toggleDarkMode,
    weather,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    userDetails,
  } = useContext(AuthContext);
  const searchRef = useRef(null);
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { weekday: "long", month: "long", day: "numeric" };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = now.toLocaleDateString(undefined, dateOptions);
      const formattedTime = now.toLocaleTimeString(undefined, timeOptions);
      setCurrentDateTime(`${formattedDate} - ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <motion.nav
      layout
      className="sticky z-10 top-0 border-b block  border-slate-300 dark:border-slate-950 dark:bg-slate-900 bg-white p-2.5 pl-5 pr-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-1  items-center">
          <motion.img
            layout
            className="size-6 hidden sm:block rounded-md"
            src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt="Weather Icon"
          />
          <motion.p
            layout
            className="text-xs hidden sm:block pr-2 font-extralight dark:text-white"
          >
            {weather?.main?.temp ? `${Math.round(weather.main.temp)}°C` : "N/A"}
          </motion.p>

          <motion.p
            layout
            className="text-sm font-extralight hidden lg:block  dark:text-white"
          >
            {currentDateTime}
          </motion.p>
        </div>
        <motion.div layout className="relative">
          <div>
            <Lottie
              className="absolute size-8"
              animationData={Search}
              loop={false}
              autoPlay={true}
              lottieRef={searchRef}
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-xs text-sm text-gray-700 dark:text-gray-300 dark:bg-gray-500 bg-gray-200 dark:border-gray-600 border-2 border-gray-200 rounded-md border-opacity-5 
               placeholder-gray-500 dark:placeholder-gray-100 placeholder-opacity-50 pl-8 p-1"
          />
        </motion.div>

        <div>
          <motion.div
            layout
            className="flex flex-row space-x-1  pl-2 items-center"
          >
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              onClick={toggleDarkMode}
              className="flex items-center justify-center rounded-md size-8 dark:bg-slate-600 bg-gray-100"
            >
              {!darkMode ? (
                <CiLight color="black" />
              ) : (
                <FaMoon size={11} color="black"></FaMoon>
              )}
            </motion.div>
            <motion.div style={{ width: 32 }}>
              <Lottie animationData={Bell} loop={false} autoPlay={true} />
            </motion.div>
            <motion.div layout>
              <img
                src={Avatar}
                className="rounded-full border-2 border-spacing-2 dark:border-black border-gray-400"
                style={{ width: 32 }}
              />
            </motion.div>

            <motion.div
              layout
              className=" flex-col hidden lg:block"
              ref={dropdownRef}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from reaching document
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <span className="block text-xs font-semibold dark:text-white ">
                {userDetails.name}
              </span>
              <span className="block font-light text-xs text-slate-500 dark:text-gray-400">
                Admin
              </span>
            </motion.div>
            <motion.div
              layout
              className="lg:pl-5"
              ref={dropdownRef}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from reaching document
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <IoIosArrowDown
                size={12}
                className={`transition-transform dark:text-white text-black ${
                  dropdownOpen && "rotate-180"
                }`}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopBar;
