import { useState, useEffect } from "react";
import { ads } from "../data/newsData";

export const BillboardAd = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const ad = ads[currentAd];

  return (
    <div
      className="w-full bg-gray-100 relative overflow-hidden group cursor-pointer rounded-xl border border-gray-200 shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-shadow"
      onClick={() => window.open(ad.link, "_blank")}
    >
      <img
        src={ad.image}
        alt="Advertisement"
        className="w-full h-24 md:h-32 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
        Sponsored
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
        <p className="text-white font-bold text-sm md:text-lg truncate">{ad.title}</p>
      </div>
    </div>
  );
};
