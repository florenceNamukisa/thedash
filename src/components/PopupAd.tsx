import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export const PopupAd = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    // Don't show again if closed in this session (simple simulation)
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 text-center text-white">
          <span className="inline-block bg-white/20 px-2 py-1 rounded text-xs font-bold mb-2">SPECIAL OFFER</span>
          <h2 className="text-2xl font-black mb-1">Don't Miss Out!</h2>
          <p className="text-sm opacity-90">Subscribe today and get 50% off your annual membership.</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
              Unlimited access to premium content
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
              Ad-free browsing experience
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
              Early access to breaking news
            </div>
          </div>
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3">
            Claim Offer Now
          </Button>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
};