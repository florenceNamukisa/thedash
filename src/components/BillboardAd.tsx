import { useState, useRef } from "react";

const videoAds = [
  { id: 1, video: "/ads/nbk.mp4", title: "NBK Premier Solutions", link: "https://nbkpremier.com" },
  { id: 2, video: "/ads/legacy.mp4", title: "Legacy Pearls", link: "https://legacypearlsafrica.com/" },
  { id: 3, video: "/ads/suavis.mp4", title: "Suavis Radio", link: "https://suavisradio.com/" }
];

const staticAd = {
  image: "/image.png",
  title: "Advertise With Us",
  subtitle: "Reach thousands of readers across East Africa",
  link: "https://wa.me/256704597816?text=Hello%2C%20I%20would%20like%20to%20advertise%20with%20Dash%20Africa"
};

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
        <div className="flex gap-3 items-stretch">
          {/* Video Ad — takes ~75% width */}
          <div
            className="relative flex-[3] group cursor-pointer rounded-lg overflow-hidden shadow-md border border-gray-200 bg-black min-w-0"
            onClick={() => window.open(ad.link, "_blank")}
          >
            <video
              ref={videoRef}
              key={ad.id}
              className="w-full h-48 md:h-60 object-contain"
              src={ad.video}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              SPONSORED
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white font-bold text-sm drop-shadow-lg bg-black/50 px-2 py-1 rounded">
                {ad.title}
              </p>
            </div>
          </div>

          {/* Static Ad — takes ~25% width */}
          <div
            className="relative flex-1 group cursor-pointer rounded-lg overflow-hidden shadow-md border border-gray-200 bg-gradient-to-br from-orange-500 to-red-600 min-w-0 hidden sm:flex flex-col items-center justify-center text-center p-2"
            onClick={() => window.open(staticAd.link, "_blank")}
          >
            <img
              src={staticAd.image}
              alt={staticAd.title}
              className="w-full h-full absolute inset-0 object-cover opacity-20"
            />
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded shadow mb-1">AD</span>
              <p className="text-white font-extrabold text-sm md:text-base leading-tight drop-shadow">
                {staticAd.title}
              </p>
              <p className="text-orange-100 text-xs leading-snug hidden md:block">
                {staticAd.subtitle}
              </p>
              <span className="mt-2 bg-white text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow hover:bg-orange-50 transition">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
