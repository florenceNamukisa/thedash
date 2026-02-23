import { useMemo, useState } from "react";
import { Post } from "../types";
import { videos as allVideos } from "../data/newsData";

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

      <div className="space-y-8">
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
                title={video.title}
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
    </div>
  );
};
