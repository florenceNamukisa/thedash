import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NewsCardProps {
  post: Post;
  onClick: (post: Post) => void;
  index: number;
}

export const NewsCard = ({ post, onClick, index }: NewsCardProps) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={() => onClick(post)}
      className="flex flex-col sm:flex-row gap-4 group cursor-pointer border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50/50 p-2 -mx-2 rounded-lg transition-colors"
    >
      <div className="sm:w-1/3 overflow-hidden rounded-lg relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={post.image}
          alt={post.title}
          className="w-full h-48 sm:h-32 object-cover"
        />
        {post.isBreaking && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse shadow-sm">
            BREAKING
          </div>
        )}
      </div>
      <div className="sm:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-600 text-xs font-black uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-semibold text-gray-500">By {post.author}</span>
          <motion.div 
            whileHover={{ x: 3 }}
            className="text-orange-500"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};