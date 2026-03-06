import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { formatContent } from "../utils/contentFormatter";
import { ArrowLeft, Clock, User, Share2, Bookmark, Heart, Copy, Check } from "lucide-react";
import { authorData } from "../data/newsData";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";

interface NewsDetailProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

export const NewsDetail = ({ post, allPosts, onBack, onSelectPost }: NewsDetailProps) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load likes and bookmark from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${post.id}`);
    const userLiked = localStorage.getItem(`user_liked_${post.id}`);
    const bookmarked = localStorage.getItem(`bookmarked_${post.id}`);
    
    if (savedLikes) {
      setLikes(parseInt(savedLikes));
    } else {
      // Generate random initial likes based on article ID
      const hash = post.id.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
      const initialLikes = Math.abs(hash % 200) + 15;
      setLikes(initialLikes);
    }
    if (userLiked) setHasLiked(true);
    if (bookmarked) setIsBookmarked(true);
  }, [post.id]);

  const handleLike = () => {
    const newLiked = !hasLiked;
    setHasLiked(newLiked);
    const newLikes = newLiked ? likes + 1 : likes - 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${post.id}`, newLikes.toString());
    localStorage.setItem(`user_liked_${post.id}`, newLiked ? "true" : "");
  };

  const handleBookmark = () => {
    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    localStorage.setItem(`bookmarked_${post.id}`, newBookmarked ? "true" : "");
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .filter((p) => p.category === post.category)
    .slice(0, 6);

  const buildDefaultContent = () => {
    return [
      `**Overview**`,
      `${post.excerpt} The story highlights the latest developments shaping ${post.category.toLowerCase()} and the wider regional market.`,
      `**Why it matters**`,
      `Stakeholders across Africa and the Middle East are watching this space for signals on growth, capital flows, and policy direction. The implications reach investors, operators, and regulators who need clear signals amid shifting global conditions.`,
      `**Key takeaways**`,
      `• Momentum is building around ${post.category.toLowerCase()} with measurable shifts in investment appetite and execution.`,
      `• Policy choices and delivery timelines are becoming the main determinants of near-term performance.`,
      `• Regional integration and cross-border capital are likely to shape the next phase of activity.`,
      `**Quote**`,
      `"The next growth cycle will reward institutions that execute early and manage risk with discipline."`,
      `**What to watch**`,
      `The next quarter should clarify whether the momentum is sustainable, especially as policymakers and industry leaders move from announcements to implementation.`
    ].join("\n\n");
  };

  const contentToRender = post.content && post.content.length > 400
    ? post.content
    : `${post.content ? `${post.content}\n\n` : ""}${buildDefaultContent()}`;

  return (
    <div className="animate-in fade-in duration-300">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 pl-0 hover:bg-transparent text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to News
      </Button>

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 text-xs font-extrabold uppercase tracking-widest rounded-full">
              {post.category}
            </span>
            {post.isBreaking && (
              <span className="bg-brand-red text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full animate-pulse">
                Breaking
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-[2.6rem] font-black text-gray-950 leading-[1.15] mb-5 tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-normal border-l-4 border-orange-400 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 border-y border-gray-100 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden ring-2 ring-orange-200">
                <img src={authorData.image} alt={post.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{post.author}</p>
                <p className="text-xs text-gray-400">Staff Writer · TheDash Africa</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  hasLiked
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100 text-gray-500 hover:text-orange-600"
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? "fill-orange-500" : ""}`} />
                <span className="text-xs font-medium">{likes}</span>
              </button>
              
              {/* Share Button */}
              <div className="relative" ref={shareMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:text-orange-600"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                
                {/* Share Dropdown */}
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <span className="text-blue-400">𝕏</span> Twitter / X
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <span className="text-blue-600">f</span> Facebook
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <span className="text-blue-700">in</span> LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      <span className="text-green-500">💬</span> WhatsApp
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={copyLink}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Bookmark Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${isBookmarked ? "text-orange-600" : "hover:text-orange-600"}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-orange-500" : ""}`} />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="mb-10 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] md:h-[460px] object-cover"
          />
          <figcaption className="text-center text-xs text-gray-400 mt-3 italic">
            📷 Image: TheDash Africa Media
          </figcaption>
        </figure>

        {/* Content */}
        <div className="article-body font-['Georgia',serif]">
          {formatContent(contentToRender)}
        </div>

        {/* Like & Share Buttons Below Article */}
        <div className="mt-10 py-6 border-y border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                hasLiked
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              <Heart className={`w-5 h-5 ${hasLiked ? "fill-orange-500" : ""}`} />
              {hasLiked ? "Liked" : "Like Article"}
              <span className="ml-1 opacity-70">({likes})</span>
            </button>
            
            <div className="relative" ref={shareMenuRef}>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-orange-600 transition-colors"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <Share2 className="w-5 h-5" />
                Share Article
              </button>
              
              {showShareMenu && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button onClick={() => handleShare("twitter")} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3">
                    <span className="text-blue-400 font-bold">𝕏</span> Share on Twitter / X
                  </button>
                  <button onClick={() => handleShare("facebook")} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3">
                    <span className="text-blue-600 font-bold">f</span> Share on Facebook
                  </button>
                  <button onClick={() => handleShare("linkedin")} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3">
                    <span className="text-blue-700 font-bold">in</span> Share on LinkedIn
                  </button>
                  <button onClick={() => handleShare("whatsapp")} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3">
                    <span className="text-green-500">💬</span> Share on WhatsApp
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button onClick={copyLink} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Link Copied!" : "Copy Article Link"}
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                isBookmarked
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {["News", "Update", post.category, "Africa", "Analysis"].map((tag) => (
              <span key={tag} className="bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Related Articles</h4>
              <span className="text-xs text-gray-400">More in {post.category}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPost(p)}
                  className="text-left group rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-black text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors">
                      {p.title}
                    </h5>
                    <p className="text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
