import { useMemo, useState } from "react";
import { Post } from "../types";
import { videos as allVideos } from "../data/newsData";
import { Button } from "../components/ui/button";

interface VideosProps {
  allPosts: Post[];
  onSelectPost: (post: Post) => void;
}

export const Videos = ({ allPosts, onSelectPost }: VideosProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = new Set<string>();
    allVideos.forEach((v) => unique.add(v.category));
    return ["All", ...Array.from(unique)];
  }, []);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return allVideos;
    return allVideos.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  const relatedPosts = useMemo(() => {
    if (selectedCategory === "All") return allPosts.slice(0, 6);
    return allPosts.filter((p) => p.category === selectedCategory).slice(0, 6);
  }, [allPosts, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900">Videos</h1>
        <p className="text-gray-500 mt-2">
          Watch full videos about technology, business, society, and Africa-focused topics.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
              selectedCategory === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="w-full aspect-video bg-black">
                <iframe
                  src={video.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                    {video.category}
                  </span>
                  {video.channel && (
                    <span className="text-xs text-gray-500 font-semibold">{video.channel}</span>
                  )}
                </div>
                <h2 className="text-xl font-black text-gray-900 leading-snug">{video.title}</h2>
                {video.description && (
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">{video.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
              About Videos
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              This section curates full-length videos related to the topics covered on The Dash Africa.
              You can browse by category, watch in-page, and then continue reading related stories.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">
              Continue Reading
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Pick a topic above, then open an article to read deeper context.
            </p>
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white"
              onClick={() => {
                // This will be replaced once we wire in related posts data.
                // For now, just scroll to top.
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Explore Articles
            </Button>
          </div>

          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">
                Related Articles
              </h3>
              <div className="space-y-3">
                {relatedPosts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPost(p)}
                    className="w-full text-left p-3 rounded-lg border border-transparent hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-orange-700 transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.excerpt}</p>
                    <span className="mt-2 inline-flex items-center text-[11px] font-semibold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
