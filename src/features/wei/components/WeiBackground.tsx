import { useEffect, useRef } from "react";
import weiBackground from "@/assets/videos/video_fond_wei_debit_reduit.mp4";
import cn from "@/shared/utils/cn";

type WeiBackgroundProps = {
  className?: string
};

export default function WeiBackground({ className }: WeiBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <video
        ref={videoRef}
        src={weiBackground}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="h-full w-full scale-110 object-cover blur-sm"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
