import React from 'react'
import { useEffect, useRef } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion';

const ViewBaseAnimation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref,{once: true})

    useEffect(() => {
        console.log("is in view", isInView)
    },[isInView])

  return (
    <>
    <div style={{ height: "150vh"}} />
        <motion.div style={{ height:'100vh', background: 'black'}} 
        initial={{ opacity: 0}}
        whileInView={{opacity: 1}} 
        transition={{ duration: 1 }}
        />
        <div ref={ref}
        style={{
            height: "100vh",
            background: isInView ? "red": "blue",
            transition:"1s background"
        }}/>
    </>
  )
}

export default ViewBaseAnimation