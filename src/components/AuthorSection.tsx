import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Quote } from "lucide-react";
import { authorData } from "../data/newsData";
import { BookModal } from "./BookModal";
import { Button } from "./ui/button";

export const AuthorSection = () => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState<typeof authorData.books[0] | null>(null);

  const nextBook = () => {
    setCurrentBookIndex((prev) => (prev + 1) % authorData.books.length);
  };

  const prevBook = () => {
    setCurrentBookIndex((prev) => (prev === 0 ? authorData.books.length - 1 : prev - 1));
  };

  return (
    <>
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}

      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Author Bio */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src={authorData.image} 
                      alt={authorData.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-orange-600 text-white p-2 rounded-full shadow-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-black text-gray-900 mb-1">{authorData.name}</h2>
                  <p className="text-orange-600 font-bold mb-4">{authorData.role}</p>
                  <div className="flex gap-2">
                    <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">Journalist</span>
                    <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">Author</span>
                    <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">Speaker</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-6 border-l-4 border-orange-500">
                <Quote className="absolute -left-3 top-0 w-6 h-6 text-orange-500 fill-orange-100" />
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  {authorData.bio}
                </p>
              </div>

              <Button className="bg-black text-white hover:bg-gray-800 px-8">
                View Full Profile
              </Button>
            </motion.div>

            {/* Book Carousel */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-10 right-0 text-right">
                <h3 className="text-2xl font-black text-gray-900">Latest Publications</h3>
                <p className="text-gray-500">Click on a book to view details</p>
              </div>

              <div className="relative h-[450px] flex items-center justify-center perspective-1000">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentBookIndex}
                    initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-64 cursor-pointer group"
                    onClick={() => setSelectedBook(authorData.books[currentBookIndex])}
                  >
                    {/* Book Shadow */}
                    <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-xl rounded-[50%] group-hover:bg-orange-500/20 transition-colors" />
                    
                    {/* Book Cover */}
                    <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                      <img 
                        src={authorData.books[currentBookIndex].cover} 
                        alt={authorData.books[currentBookIndex].title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                        <span className="font-bold text-lg mb-2">View Details</span>
                        <span className="text-sm text-gray-300">{authorData.books[currentBookIndex].price}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={prevBook}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-orange-600 hover:text-white text-gray-900 p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextBook}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-orange-600 hover:text-white text-gray-900 p-3 rounded-full shadow-lg transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Book Info Below Carousel */}
              <div className="text-center mt-6">
                <h4 className="text-xl font-bold text-gray-900">{authorData.books[currentBookIndex].title}</h4>
                <p className="text-orange-600 font-bold">{authorData.books[currentBookIndex].price}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};