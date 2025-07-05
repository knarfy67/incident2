import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import DashboardComponent from "./DashboardComponent";
import VolunteersComponent from "./VolunteersComponent";
import ReportsComponent from "./ReportsComponent";
import IncidentComponent from "./IncidentComponent";
import LocationComponent from "./LocationComponent";
import MembersComponent from "./MembersComponent";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import DropDown from "../components/Dropdown";
import { AuthContext } from "../context/AuthContext";

export const RetracingSidebarExample = () => {
  const [open, setOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const { dropdownOpen, dropdownRef } = useContext(AuthContext);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <DashboardComponent open={open} />;
      case "Car Monitor":
        return <VolunteersComponent />;
      case "Reports":
        return <ReportsComponent />;
      case "Incident":
        return <IncidentComponent />;
      case "Locations":
        return <LocationComponent />;
      case "Members":
        return <MembersComponent />;
      default:
        return <DashboardComponent open={open} />;
    }
  };

  return (
    <>
      <motion.div
        layout
        className="flex md:flex-row bg-indigo-50 overflow-x-hidden min-h-screen hide-scrollbar"
      >
        <Sidebar
          open={open}
          setOpen={setOpen}
          setSelectedComponent={setSelectedComponent}
        />
        <motion.div
          layout
          className="w-full h-screen overflow-y-auto dark:bg-slate-800"
        >
          <DropDown dropdownOpen={dropdownOpen} dropdownRef={dropdownRef} />
          <TopBar />
          <motion.div layout className="px-2 sm:px-4 z-20">
            {renderComponent()}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default RetracingSidebarExample;
