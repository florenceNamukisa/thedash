import { Post } from "../types";
import { formatDate } from "../utils/formatDate";
import { formatContent } from "../utils/contentFormatter";
import { ArrowLeft, Clock, User, Share2, Bookmark } from "lucide-react";
import { authorData } from "../data/newsData";
import { Button } from "./ui/button";

interface NewsDetailProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

export const NewsDetail = ({ post, allPosts, onBack, onSelectPost }: NewsDetailProps) => {
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

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-brand-blue px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            {post.isBreaking && (
              <span className="bg-brand-red text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full animate-pulse">
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
                <img src={authorData.image} alt={post.author} />
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
          <div className="space-y-6">
            {formatContent(contentToRender)}
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
