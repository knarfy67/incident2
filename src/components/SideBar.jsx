import React, { useState, useRef, useReducer } from "react";
import ToggleClose from "../components/ToggleClose";
import Home from "../assets/animation/Home.json";
import Volunteers from "../assets/animation/Volunteers.json";
import Reports from "../assets/animation/Reports.json";
import Incident from "../assets/animation/Incident.json";
import Locations from "../assets/animation/Locations.json";
import Members from "../assets/animation/Members.json";
import { motion } from "framer-motion";
import LottieIcon from "../components/LottieIcon";
import HomePng from "../assets/img/Home.png";
import ReportsPng from "../assets/img/Reports.png";
import IncidentPng from "../assets/img/incident.png";
import PeoplePng from "../assets/img/People.png";
import Option from "../components/Option";
import TitleSection from "../components/TittleSection";

const Sidebar = ({ open, setOpen, setSelectedComponent }) => {
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
    setSelectedComponent(title);
  };

  return (
    <motion.nav
      layout
      className="sticky top-0  shrink-0 border-r border-slate-300 dark:border-slate-950 dark:bg-slate-900 bg-white p-2"
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
              size="size-12"
              lottieRef={volunteersRef}
              animationData={Volunteers}
              play={selected === "Car Monitor"}
            />
          )}
          title="Car Monitor"
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
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

export default Sidebar;
