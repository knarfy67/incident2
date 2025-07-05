import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

const ReportsComponent = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  return (
    <>
      <div className="flex">
        <div className=" w-full"></div>
      </div>
    </>
  );
};

export default ReportsComponent;
