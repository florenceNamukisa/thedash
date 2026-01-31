import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { ArrowLeft, Clock, User, Share2, Bookmark } from "lucide-react";
import { Button } from "./ui/button";

interface NewsDetailProps {
  post: Post;
  onBack: () => void;
}

export const NewsDetail = ({ post, onBack }: NewsDetailProps) => {
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

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            {post.isBreaking && (
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full animate-pulse">
                Breaking
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                <img src={`https://picsum.photos/seed/${post.author}/100/100`} alt={post.author} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.author}</p>
                <p className="text-xs">Staff Writer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
            Image source: TheDash Africa Media
          </figcaption>
        </figure>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p className="text-xl font-medium text-gray-900 mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-orange-600 first-letter:float-left first-letter:mr-3">
            {post.excerpt}
          </p>
          
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Developments</h3>
          
          <p className="mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-6 bg-gray-50 italic text-gray-700">
            "This represents a paradigm shift in how we approach {post.category} in the modern era. The implications are profound."
          </blockquote>

          <p className="mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What's Next?</h3>
          
          <p className="mb-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
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
      </article>
    </div>
  );
};