import { useState, useEffect } from "react";
import { heroSlides } from "../data/newsData";
import { ChevronLeft, ChevronRight, Play, Clock } from "lucide-react";
import { Button } from "./ui/button";

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentIndex];

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden group bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={slide.image} 
          alt={slide.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
        <div className="transform transition-all duration-500 translate-y-0 opacity-100">
          <span className="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4">
            {slide.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg max-w-4xl">
            {slide.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-6 max-w-2xl line-clamp-2">
            {slide.subtitle}
          </p>
          
          <div className="flex items-center gap-4">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-none font-bold tracking-wide">
              Read Full Story
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Play className="w-4 h-4 mr-2 fill-current" /> Watch Video
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          size="icon" 
          variant="ghost" 
          className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          size="icon" 
          variant="ghost" 
          className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 md:right-12 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-orange-500" : "w-2 bg-white/50 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
};