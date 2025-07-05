import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const ModalDetails = () => {
  const { setShowModal } = useContext(AuthContext);

  return (
    <motion.div
      className="fixed inset-0  bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white  dark:bg-slate-800 p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Car Details
        </h2>
        <p className="text-sm dark:text-white">Model: Honda Civic</p>
        <p className="text-sm dark:text-white">Rental Duration: 2 days</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded "
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default ModalDetails;
