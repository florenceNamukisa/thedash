import { useState, useEffect } from "react";
import { allPosts } from "../data/posts";
import { Post } from "../types";

interface BreakingTickerProps {
  onHeadlineClick: (post: Post) => void;
}

export const BreakingTicker = ({ onHeadlineClick }: BreakingTickerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the latest 6 articles for the breaking ticker
  const breakingNews = allPosts.slice(0, 6);

  useEffect(() => {
    if (breakingNews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  if (breakingNews.length === 0) return null;

  const currentHeadline = breakingNews[currentIndex];

  return (
    <div className="bg-brand-red text-white overflow-hidden py-2.5 relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <span className="bg-black text-white px-3 py-0.5 text-xs font-bold uppercase tracking-wider shrink-0 animate-pulse">
          Breaking
        </span>
        <div className="overflow-hidden h-5 flex-1 relative">
          <button
            key={currentIndex}
            onClick={() => onHeadlineClick(currentHeadline)}
            className="absolute inset-0 flex items-center text-sm font-medium transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 hover:underline cursor-pointer text-left w-full"
          >
            <span className="mr-2 opacity-75">[{currentHeadline.category}]</span>
            {currentHeadline.title}
          </button>
        </div>
      </div>
    </div>
  );
};
