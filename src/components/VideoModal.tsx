import { X } from "lucide-react";
import { Button } from "./ui/button";

interface VideoModalProps {
  short: { title: string; thumbnail: string; platform: string };
  onClose: () => void;
}

export const VideoModal = ({ short, onClose }: VideoModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-black rounded-xl overflow-hidden max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Simulated Video Player */}
        <div className="aspect-[9/16] bg-gray-900 relative flex items-center justify-center">
          <img src={short.thumbnail} alt={short.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="text-center z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <span className="text-4xl">▶</span>
            </div>
            <p className="text-white font-bold">Simulated Video Player</p>
            <p className="text-gray-400 text-sm mt-2">Content from {short.platform}</p>
          </div>
          
          {/* Fake Controls */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-1/3"></div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-900">
          <h3 className="text-white font-bold mb-2">{short.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Like</Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Share</Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};