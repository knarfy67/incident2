import React from "react";
import { motion } from "framer-motion";
import Barangay from "../assets/img/Barangay.png";
import Car from "../assets/Car.png";

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md "
    >
      <img src={Car} style={{ width: 24 }} />
    </motion.div>
  );
};

export default Logo;
