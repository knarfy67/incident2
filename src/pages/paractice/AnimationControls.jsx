import React from "react";
import { motion, useAnimationControls } from "framer-motion";

function AnimationControls() {
  const controls = useAnimationControls();

  const handleClick = () => {
    controls.start("flip");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.button
        onClick={handleClick}
        className="bg-sky-500 mb-2 rounded-2xl px-4 py-2 text-white"
      >
        show/hide
      </motion.button>

      <motion.div
        variants={{
          initial: {
            rotate: "0deg",
          },
          flip: {
            rotate: "360deg",
          },
        }}
        initial="initial"
        animate={controls} // Link the controls here
        className="w-32 h-32 bg-amber-300"
      ></motion.div>
    </div>
  );
}

export default AnimationControls;
