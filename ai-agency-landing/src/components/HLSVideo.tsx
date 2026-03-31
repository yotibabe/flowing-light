import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export const HLSVideo: React.FC<HLSVideoProps> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari fallback
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} {...props} />;
};