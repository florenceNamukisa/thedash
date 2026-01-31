import { useState, useEffect } from "react";

const headlines = [
  { id: 1, text: "Markets hit record highs amid economic optimism", category: "Business" },
  { id: 2, text: "Tech giant announces revolutionary AI product launch", category: "Tech" },
  { id: 3, text: "Global climate summit reaches historic agreement in Geneva", category: "World" },
  { id: 4, text: "Sports: Championship finals set for this weekend", category: "Sports" },
  { id: 5, text: "Breaking: Major policy shift expected next week", category: "Politics" },
  { id: 6, text: "Weather: Severe storm warning issued for coastal regions", category: "Environment" }
];

interface BreakingTickerProps {
  onHeadlineClick: (category: string) => void;
}

export const BreakingTicker = ({ onHeadlineClick }: BreakingTickerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentHeadline = headlines[currentIndex];

  return (
    <div className="bg-brand-red text-white overflow-hidden py-2.5 relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <span className="bg-black text-white px-3 py-0.5 text-xs font-bold uppercase tracking-wider shrink-0 animate-pulse">
          Breaking
        </span>
        <div className="overflow-hidden h-5 flex-1 relative">
          <button
            key={currentIndex}
            onClick={() => onHeadlineClick(currentHeadline.category)}
            className="absolute inset-0 flex items-center text-sm font-medium transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 hover:underline cursor-pointer text-left w-full"
          >
            <span className="mr-2 opacity-75">[{currentHeadline.category}]</span>
            {currentHeadline.text}
          </button>
        </div>
      </div>
    </div>
  );
};