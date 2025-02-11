import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronsRight } from "react-icons/fi";
import Home from "../assets/animation/Home.json";
import Volunteers from "../assets/animation/Volunteers.json";
import Reports from "../assets/animation/Reports.json";
import Incident from "../assets/animation/Incident.json";
import Locations from "../assets/animation/Locations.json";
import Members from "../assets/animation/Members.json";
import { motion } from "framer-motion";
import Barangay from "../assets/img/Barangay.png";
import Lottie from "lottie-react";
import Person from "../assets/animation/Person.json";
import Password from "../assets/animation/Password.json";
import { GoPeople } from "react-icons/go";
import HomePng from "../assets/img/Home.png";
import ReportsPng from "../assets/img/Reports.png";
import IncidentPng from "../assets/img/incident.png";
import PeoplePng from "../assets/img/People.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { CiLight } from "react-icons/ci";

export const RetracingSidebarExample = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <motion.div layout className="flex bg-indigo-50 ">
        <Sidebar open={open} setOpen={setOpen} />
        <ExampleContent />
      </motion.div>
    </>
  );
};

const TopBar = () => {
  const { darkMode, toggleDarkMode } = useContext(AuthContext);

  return (
    <motion.nav
      layout
      className="sticky top-0 border-b border-slate-300 dark:border-slate-950 dark:bg-slate-900 bg-white p-2.5"
    >
      <div className="flex flex-col justify-between">
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          onClick={toggleDarkMode}
          className="flex items-center justify-center rounded-md size-8 dark:bg-slate-700 bg-gray-300"
        >
          {!darkMode ? (
            <CiLight color="white" />
          ) : (
            <FaMoon size={11} color="black"></FaMoon>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const dashboardRef = useRef(null);
  const volunteersRef = useRef(null);
  const reportsRef = useRef(null);
  const incidentRef = useRef(null);
  const locationsRef = useRef(null);
  const membersRef = useRef(null);

  const [selected, setSelected] = useState("Dashboard");
  const [notifications, setNotifications] = useState({
    Sales: 3,
  });
  const handleSelect = (title) => {
    setSelected(title);
    setNotifications((prev) => ({ ...prev, [title]: null }));
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 dark:border-slate-950 dark:bg-slate-900 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={() =>
            selected === "Dashboard" ? (
              <LottieIcon
                size="size-6"
                lottieRef={dashboardRef}
                animationData={Home}
                play={selected === "Dashboard"}
              />
            ) : (
              <img src={HomePng} className="size-7" />
            )
          }
          title="Dashboard"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={() => (
            <LottieIcon
              lottieRef={volunteersRef}
              animationData={Volunteers}
              play={selected === "Volunteers"}
            />
          )}
          title="Volunteers"
          selected={selected}
          setSelected={handleSelect}
          open={open}
          notifs={notifications["Sales"]}
        />
        <Option
          Icon={() =>
            selected === "Reports" ? (
              <LottieIcon
                size="size-8"
                lottieRef={reportsRef}
                animationData={Reports}
                play={selected === "Reports"}
              />
            ) : (
              <img src={ReportsPng} className="size-7" />
            )
          }
          title="Reports"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={() =>
            selected === "Incident" ? (
              <LottieIcon
                size="size-8"
                lottieRef={incidentRef}
                animationData={Incident}
                play={selected === "Incident"}
              />
            ) : (
              <img src={IncidentPng} className="size-7" />
            )
          }
          title="Incident"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={() => (
            <LottieIcon
              lottieRef={locationsRef}
              animationData={Locations}
              play={selected === "Locations"}
            />
          )}
          title="Locations"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
        <Option
          Icon={() =>
            selected === "Members" ? (
              <LottieIcon
                size="size-8"
                lottieRef={membersRef}
                animationData={Members}
                play={selected === "Members"}
              />
            ) : (
              <img src={PeoplePng} className="size-8" />
            )
          }
          title="Members"
          selected={selected}
          setSelected={handleSelect}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-slate-100  dark:text-gray-100 dark:bg-slate-700"
          : "text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-600"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-green-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}

      {notifs && !open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute -top-0.2 -right-1 size-4 rounded bg-green-500 text-xs text-white flex items-center justify-center"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 dark:border-slate-950 pb-1">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold dark:text-white dark:hover:text-slate-600">
                Barangay Igpit
              </span>
              <span className="block font-light text-xs text-slate-500 dark:text-gray-400">
                Admin Dashboard
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md "
    >
      <img src={Barangay} style={{ width: 24 }} />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t dark:border-slate-950 border-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-500"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform dark:text-white ${
              open && "rotate-180"
            }`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium dark:text-white"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => {
  return (
    <motion.div layout className="h-[100vh] w-full dark:bg-slate-800">
      <TopBar />
    </motion.div>
  );
};

const LottieIcon = ({ animationData, lottieRef, size, play }) => {
  useEffect(() => {
    if (lottieRef.current) {
      if (play) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [play, lottieRef]);

  return (
    <div className={size}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoPlay={play}
      />
    </div>
  );
};

export default RetracingSidebarExample;
