import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { Clock, ArrowRight, Heart, Share2, Bookmark, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface NewsCardProps {
  post: Post;
  onClick: (post: Post) => void;
  index: number;
}

export const NewsCard = ({ post, onClick, index }: NewsCardProps) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${post.id}`);
    const userLiked = localStorage.getItem(`user_liked_${post.id}`);
    const bookmarked = localStorage.getItem(`bookmarked_${post.id}`);
    
    if (savedLikes) {
      setLikes(parseInt(savedLikes));
    } else {
      const hash = post.id.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
      setLikes(Math.abs(hash % 200) + 15);
    }
    if (userLiked) setHasLiked(true);
    if (bookmarked) setIsBookmarked(true);
  }, [post.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !hasLiked;
    setHasLiked(newLiked);
    const newLikes = newLiked ? likes + 1 : likes - 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${post.id}`, newLikes.toString());
    localStorage.setItem(`user_liked_${post.id}`, newLiked ? "true" : "");
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    localStorage.setItem(`bookmarked_${post.id}`, newBookmarked ? "true" : "");
  };

  const handleShare = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/article/${post.id}`;
    const title = post.title;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const copyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/article/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

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
        
        {/* Action buttons overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                hasLiked ? "bg-orange-100 text-orange-600" : "bg-black/50 text-white hover:bg-orange-500"
              }`}
            >
              <Heart className={`w-3 h-3 ${hasLiked ? "fill-orange-500" : ""}`} />
              <span>{likes}</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative" ref={shareMenuRef}>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowShareMenu(!showShareMenu); }}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-black/50 text-white hover:bg-orange-500 transition-colors"
              >
                <Share2 className="w-3 h-3" />
              </button>
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button onClick={(e) => handleShare("twitter", e)} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2">
                    <span className="text-blue-400 font-bold">𝕏</span> Twitter
                  </button>
                  <button onClick={(e) => handleShare("facebook", e)} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2">
                    <span className="text-blue-600 font-bold">f</span> Facebook
                  </button>
                  <button onClick={(e) => handleShare("linkedin", e)} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2">
                    <span className="text-blue-700 font-bold">in</span> LinkedIn
                  </button>
                  <button onClick={(e) => handleShare("whatsapp", e)} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2">
                    <span className="text-green-500">💬</span> WhatsApp
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button onClick={copyLink} className="w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 flex items-center gap-2">
                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={handleBookmark}
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                isBookmarked ? "bg-orange-500 text-white" : "bg-black/50 text-white hover:bg-orange-500"
              }`}
            >
              <Bookmark className={`w-3 h-3 ${isBookmarked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
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
