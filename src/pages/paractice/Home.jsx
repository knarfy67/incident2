import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Home() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        layout
        className="bg-sky-500 mb-2 rounded-2xl px-4 text-white"
      >
        show/hide
      </motion.button>
      <AnimatePresence mode="popLayout">
        {isVisible && (
          <motion.div
            initial={{
              rotate: '0deg',
              scale: 0,
              y: 0,
            }}
            animate={{
              rotate: '180deg',
              scale: 1,
              y: [0, 150, -150, -150, 0], // Corrected values
            }}
            exit={{
              rotate: '0deg',
              scale: 0,
              y: 0,
            }}
            transition={{
              duration: 1,
              type: 'spring',
              ease: 'backInOut',
              times: [0, 0.25, 0.5, 0.85, 1],
            }}
            className="w-32 h-32 bg-amber-300"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
