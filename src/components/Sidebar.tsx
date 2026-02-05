import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { TrendingUp, Info, Briefcase, Mail, ChevronRight, Facebook, Twitter, Instagram, ExternalLink, BookOpen, Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { ads } from "../data/newsData";

interface SidebarProps {
  topStories: Post[];
  setPage: (page: string) => void;
}

const books = [
  { id: 1, title: "The Digital Horizon", price: "$24.99", image: "https://picsum.photos/seed/book1/150/200" },
  { id: 2, title: "Code of Silence", price: "$19.99", image: "https://picsum.photos/seed/book2/150/200" },
  { id: 3, title: "Future Proof", price: "$22.50", image: "https://picsum.photos/seed/book3/150/200" },
  { id: 4, title: "Algorithm's Heart", price: "$21.00", image: "https://picsum.photos/seed/book4/150/200" },
];

export const Sidebar = ({ topStories, setPage }: SidebarProps) => {
  const menuItems = [
    { id: "about", label: "About Us", icon: Info },
    { id: "careers", label: "Careers", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <aside className="space-y-8">
      {/* Navigation Links */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-4 px-1">
          Company
        </h3>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                {item.label}
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 text-orange-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Nicholas K. Quest Sponsored Ad */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative group cursor-pointer"
        onClick={() => window.open("https://new.nicholaskquest.com/books/", "_blank")}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full flex flex-col items-center text-center">
          <div className="absolute top-2 right-2 bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">
            SPONSORED
          </div>

          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-orange-400 to-red-500 mb-3">
            <img src="https://secure.gravatar.com/avatar/2c9dd009be0eb4f4028bf05804676611d3c7d11f399ef801ab2d915a48565c52?s=160&d=mm&r=g" alt="Nicholas K. Quest" className="w-full h-full object-cover rounded-full border-2 border-white" />
          </div>

          <h3 className="font-black text-lg text-gray-900 leading-tight mb-1">Nicholas K. Quest</h3>
          <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">Best Selling Author</p>

          <p className="text-gray-500 text-xs mb-4 line-clamp-2">
            Discover the future of tech and society through his award-winning books.
          </p>

          <button className="w-full bg-black hover:bg-gray-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:scale-105 duration-200">
            <ShoppingCart className="w-3 h-3" />
            Get His Books
          </button>
        </div>
      </motion.div>

      {/* Featured Books Ad Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-500" />
            Featured Books
          </h3>
          <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">AD</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {books.map((book) => (
            <a
              key={book.id}
              href="#"
              className="group block relative rounded-lg overflow-hidden border border-gray-100 hover:border-orange-300 transition-all hover:shadow-md"
            >
              <div className="aspect-[2/3] overflow-hidden bg-gray-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-2 bg-white">
                <h4 className="text-[10px] font-bold text-gray-900 leading-tight mb-1 truncate">{book.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-orange-600">{book.price}</span>
                  <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Social Follow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 rounded-xl p-5 border border-gray-100"
      >
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-500 mb-4">
          Connect With Us
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "Facebook", icon: Facebook, color: "bg-blue-600" },
            { name: "Twitter", icon: Twitter, color: "bg-sky-500" },
            { name: "Instagram", icon: Instagram, color: "bg-pink-600" },
          ].map((social) => (
            <a
              key={social.name}
              href="#"
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <social.icon className={`w-5 h-5 ${social.color} mb-1 group-hover:scale-110 transition-transform`} />
              <span className="text-[10px] font-bold text-gray-600">{social.name}</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Ad Slot 1 - Video */}
      <div className="group">
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-shadow duration-300">
          <video
            className="w-full h-48 object-cover"
            src="/ads/nbk.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/ads/nbk_premier_ad.png"
          />
          <div className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm tracking-wider uppercase">Ad</div>
        </div>
      </div>

      {/* Top Stories */}
      <div>
        <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold uppercase tracking-wide">Trending</h3>
        </div>
        <div className="space-y-4">
          {topStories.slice(0, 5).map((post, index) => (
            <motion.a
              key={post.id}
              href="#"
              className="block group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex gap-3">
                <span className="text-2xl font-black text-gray-200 group-hover:text-orange-200 transition-colors leading-none">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {formatDate(post.date)}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Ad Slot 2 */}
      <div className="cursor-pointer group" onClick={() => window.open(ads[2].link, '_blank')}>
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-shadow duration-300">
          <img src={ads[2].image} alt="Ad" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 left-2 bg-gray-900/80 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm tracking-wider uppercase">Ad</div>
          <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold drop-shadow-sm">
            {ads[2].title}
          </div>
        </div>
      </div>
    </aside>
  );
};
