import { useState, useRef } from "react";

const videoAds = [
  { id: 1, video: "/ads/nbk.mp4", title: "NBK Premier Solutions", link: "https://nbkpremier.com" },
  { id: 2, video: "/ads/legacy.mp4", title: "Legacy Pearls", link: "https://legacypearlsafrica.com/" },
  { id: 3, video: "/ads/suavis.mp4", title: "Suavis Radio", link: "https://suavisradio.com/" }
];

export const BillboardAd = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setCurrentAd((prev) => (prev + 1) % videoAds.length);
  };

  const ad = videoAds[currentAd];

  return (
    <div className="w-full bg-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md border border-gray-200 bg-gray-100"
          onClick={() => window.open(ad.link, "_blank")}
        >
          <video
            ref={videoRef}
            key={ad.id}
            className="w-full h-32 md:h-40 lg:h-48 object-cover"
            src={ad.video}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
            SPONSORED
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white font-bold text-lg drop-shadow-lg bg-black/50 px-2 py-1 rounded">
              {ad.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
