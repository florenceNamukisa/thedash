import { useState, useEffect } from "react";
import { Post } from "../types";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { formatDate } from "../utils/formatDate";

interface HeroSliderProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95
  })
};

export const HeroSlider = ({ posts, onPostClick }: HeroSliderProps) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [page, isPaused]);

  const paginate = (newDirection: number) => {
    let newPage = page + newDirection;
    if (newPage < 0) newPage = posts.length - 1;
    if (newPage >= posts.length) newPage = 0;
    setPage([newPage, newDirection]);
  };

  const currentPost = posts[page];

  if (!currentPost) return null;

  return (
    <div 
      className="relative w-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* TOP PART: Image Slider */}
      <div className="relative w-full aspect-video md:aspect-[21/9] bg-gray-100 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full cursor-pointer group"
            onClick={() => onPostClick(currentPost)}
          >
            {/* Image */}
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity z-20"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity z-20"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage([idx, idx > page ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === page ? "bg-orange-500 w-6" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM PART: Description/Text (Under the image) */}
      <div className="p-6 md:p-8 bg-white border-t border-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                {currentPost.category}
              </span>
              {currentPost.isBreaking && (
                <span className="bg-red-100 text-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  Breaking
                </span>
              )}
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(currentPost.date)}
              </span>
            </div>
            
            <h1 
              onClick={() => onPostClick(currentPost)}
              className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-3 cursor-pointer hover:text-orange-600 transition-colors"
            >
              {currentPost.title}
            </h1>
            
            <p className="text-gray-600 text-sm md:text-base line-clamp-2 max-w-3xl">
              {currentPost.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-3 md:ml-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <img src={`https://picsum.photos/seed/${currentPost.author}/100/100`} alt={currentPost.author} />
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900">{currentPost.author}</p>
                <p className="text-xs text-gray-500">Staff Writer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};