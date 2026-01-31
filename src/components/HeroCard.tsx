import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { Calendar, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroCardProps {
  post: Post;
  onClick: () => void;
}

export const HeroCard = ({ post, onClick }: HeroCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden shadow-lg mb-4">
        <motion.img 
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="bg-orange-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md shadow-lg">
            {post.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
          <div className="flex items-center gap-4 text-white/80 text-xs md:text-sm mb-3 font-medium">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              {formatDate(post.date)}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 group-hover:text-orange-400 transition-colors">
            {post.title}
          </h1>
          
          <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
            {post.excerpt}
          </p>

          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-white font-bold text-sm md:text-base bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
          >
            Read Full Story <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};