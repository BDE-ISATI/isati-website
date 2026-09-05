
import Lottie from "lottie-react";
import isatiAnimation from "@/assets/animations/isatiAnimationRed.json"

export default function LottieAnimation({ 
  loop = true, 
  autoplay = true, 
  style = { width: 300, height: 300 } 
}) {
  return (
    <Lottie
      animationData={isatiAnimation}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
}
