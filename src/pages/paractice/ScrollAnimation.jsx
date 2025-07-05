import { useScroll, motion, useSpring, useTransform } from 'motion/react'
import React from 'react'

const ScrollAnimation = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress)
  const background = useTransform(scrollYProgress,
    [0, 0.25, 1],
    ["rgb,(86, 1, 245)",  "rgb(10, 100, 13)", "rgb(1, 245, 13)"]
  )
  return (
    <>
    <motion.div style={{
      scaleX,
      //background:"blue",
      background,
      transformOrigin:"left",
      position:"sticky",
      top: 0,
      width:"100%",
      height:"20px"
    }} /> 
    <motion.div className="flex flex-col items-center justify-center min-h-screen mx-10"><p>ScrollAnimation</p>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, 
    at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla 
    quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
     porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, 
    at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla 
    quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
     porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>

    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, 
    at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla 
    quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
     porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis, at dictum libero dapibus. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
    </p>
    </motion.div>
    </>
    
  )
}

export default ScrollAnimation