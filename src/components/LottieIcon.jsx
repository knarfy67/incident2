import { useEffect } from "react";
import Lottie from "lottie-react";

const LottieIcon = ({ animationData, lottieRef, size, play }) => {
  useEffect(() => {
    if (lottieRef.current) {
      if (play) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [play, lottieRef]);

  return (
    <div className={size}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoPlay={play}
      />
    </div>
  );
};

export default LottieIcon;
