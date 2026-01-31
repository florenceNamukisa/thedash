import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react";
import { Button } from "./ui/button";

const books = [
  {
    id: 1,
    title: "The Digital Horizon",
    cover: "https://picsum.photos/seed/book1/300/450",
    rating: 4.8,
    price: "$24.99",
    description: "Exploring the frontiers of technology and human connection."
  },
  {
    id: 2,
    title: "Code of Silence",
    cover: "https://picsum.photos/seed/book2/300/450",
    rating: 4.9,
    price: "$19.99",
    description: "A thrilling dive into the world of cybersecurity espionage."
  },
  {
    id: 3,
    title: "Future Proof",
    cover: "https://picsum.photos/seed/book3/300/450",
    rating: 4.7,
    price: "$22.50",
    description: "Strategies for navigating an ever-changing economic landscape."
  },
  {
    id: 4,
    title: "The Algorithm's Heart",
    cover: "https://picsum.photos/seed/book4/300/450",
    rating: 4.6,
    price: "$21.00",
    description: "Can AI truly feel? A philosophical journey."
  },
  {
    id: 5,
    title: "Echoes of Data",
    cover: "https://picsum.photos/seed/book5/300/450",
    rating: 4.8,
    price: "$18.99",
    description: "Big data's impact on privacy and society."
  }
];

export const NicholasQuestSection = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxScroll = books.length - 3; // Show 3 books at a time on desktop

  const scrollLeft = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => Math.min(maxScroll, prev + 1));
  };

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs">NQ</div>
              <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">Featured Author</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Nicholas K. Quest</h2>
            <p className="text-gray-600 mt-2 max-w-xl">
              Award-winning tech journalist and author. Dive into his latest collection of books exploring the intersection of technology, society, and the future.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollLeft}
              disabled={scrollIndex === 0}
              className="rounded-full border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollRight}
              disabled={scrollIndex === maxScroll}
              className="rounded-full border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Books Slider */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ transform: `translateX(-${scrollIndex * (100 / 3)}%)` }}
          >
            {books.map((book) => (
              <div 
                key={book.id} 
                className="min-w-[100%] md:min-w-[calc(33.333%-16px)] group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                  <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-bold">{book.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                      {book.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-lg font-black text-gray-900">{book.price}</span>
                      <Button size="sm" className="bg-black hover:bg-gray-800 text-white rounded-full px-4">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};