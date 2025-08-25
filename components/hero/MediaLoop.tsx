import React from 'react';

interface MediaLoopProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function MediaLoop({ src, poster, className }: MediaLoopProps) {
  return (
    <video
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
