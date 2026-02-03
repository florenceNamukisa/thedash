import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { shorts } from "../data/newsData";
import { useState } from "react";

export const ShortsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (videoUrl?: string) => {
    if (videoUrl) {
      setSelectedVideo(videoUrl);
    }
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <section className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                News Shorts
              </h2>
              <p className="text-gray-500 mt-2 ml-5">Quick updates from around the globe</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors">
              View All <span className="text-xl">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {shorts.map((short, index) => (
              <motion.div 
                key={short.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer shadow-md"
                onClick={() => handleVideoClick(short.videoUrl)}
              >
                <img 
                  src={short.thumbnail} 
                  alt={short.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Play className="w-5 h-5 text-black fill-black ml-1" />
                  </div>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                    {short.platform}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">{short.title}</h3>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <span>{short.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            >
              ×
            </button>
            <iframe
              src={selectedVideo}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};