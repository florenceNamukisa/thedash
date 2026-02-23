import { useState, useRef } from "react";

const inFeedAds = [
  { id: 1, video: "/ads/buziniro.mp4", title: "Buziniro" },
  { id: 2, video: "/ads/agrimax.mp4", title: "Agrimax" }
];

export const InFeedAd = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setCurrentAd((prev) => (prev + 1) % inFeedAds.length);
  };

  const ad = inFeedAds[currentAd];

  return (
    <div className="flex justify-center my-6">
      <div className="w-full max-w-[728px] bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <video
          ref={videoRef}
          key={ad.id}
          className="w-full h-auto object-contain"
          src={ad.video}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  );
};
