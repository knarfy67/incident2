import React from 'react'
import { motion, MotionConfig } from "motion/react"

function Gestures() {
  return (
    <div>
        <MotionConfig
         transition={{
            duration: 0.125,
            ease: "easeInOut",
          }}>
        <div className="flex flex-col space-y-1 items-center justify-center min-h-screen">
          <motion.button whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95, rotate: '2.5deg'}}
          
          className='bg-sky-500 text-white px-2 rounded text-2xl'>Click me!</motion.button>
         <motion.button whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95, rotate: '2.5deg'}}

          className='bg-lime-500 text-white px-2 rounded text-2xl'>Click me!</motion.button>
        </div>
        </MotionConfig>
        
    </div>
  )
}

export default Gestures