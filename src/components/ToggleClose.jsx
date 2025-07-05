import React from "react";
import { motion } from "framer-motion";
import { FiChevronsRight } from "react-icons/fi";

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

export default ToggleClose;
