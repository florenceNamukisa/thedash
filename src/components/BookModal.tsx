import { useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface Book {
  id: number;
  title: string;
  price: string;
  cover: string;
}

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

export const BookModal = ({ book, onClose }: BookModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-black hover:text-white rounded-full p-2 transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-orange-600 font-bold text-sm uppercase tracking-wider mb-2">Bestseller</span>
          <h2 className="text-3xl font-black text-gray-900 mb-4">{book.title}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Dive deep into the insights and analysis that has shaped a generation. This book offers a unique perspective on the subject matter, backed by years of research and field experience.
          </p>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-gray-900">{book.price}</span>
            <span className="text-gray-400 line-through">$29.99</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">20% OFF</span>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg">
              Buy Now
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};