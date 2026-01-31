import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { BreakingTicker } from "./components/BreakingTicker";
import { CategoryNavbar } from "./components/CategoryNavbar";
import { WhatsAppButton } from "./components/WhatsAppButton.tsx";
import { HeroSlider } from "./components/HeroSlider"; // Updated import
import { NewsCard } from "./components/NewsCard";
import { Sidebar } from "./components/Sidebar";
import { AdPlaceholder } from "./components/AdPlaceholder";
import { BillboardAd } from "./components/BillboardAd";
import { ShortsSection } from "./components/ShortsSection";
import { NewsDetail } from "./components/NewsDetail";
import { About } from "./pages/About";
import { Careers } from "./pages/Careers";
import { Contact } from "./pages/Contact";
import { allPosts } from "./data/posts";
import { Post } from "./types";
import { Button } from "./components/ui/button.tsx";

const POSTS_PER_PAGE = 6;

// Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Filter posts
  const filteredPosts = selectedCategory === "All"
    ? allPosts
    : allPosts.filter(post => post.category === selectedCategory);

  // Ensure we have enough posts for the slider (take top 5)
  const sliderPosts = filteredPosts.slice(0, 5);
  const feedPosts = filteredPosts.slice(5, visibleCount); // Start feed after slider posts
  const topStories = allPosts.filter(p => p.id !== sliderPosts[0]?.id).slice(0, 10);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && currentPage === "home" && !selectedPost) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + POSTS_PER_PAGE);
            setLoading(false);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, currentPage, selectedPost]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE + 5); // +5 to account for slider posts
    setSelectedPost(null);
  }, [selectedCategory]);

  const renderContent = () => {
    if (selectedPost) {
      return <NewsDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;
    }

    switch (currentPage) {
      case "about": return <About />;
      case "careers": return <Careers />;
      case "contact": return <Contact />;
      default:
        return (
          <motion.div
            key={selectedCategory}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
          >
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

              {/* Left Column */}
              <div className="hidden lg:block lg:col-span-2 space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 sticky top-24 shadow-sm">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-3 text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Trending Shorts
                  </h4>
                  <div className="space-y-4">
                    {filteredPosts.slice(5, 8).map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="cursor-pointer group"
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="relative overflow-hidden rounded-lg mb-2">
                          <img src={post.image} alt="" className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <h5 className="text-xs font-bold leading-tight group-hover:text-orange-600 transition-colors">{post.title}</h5>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column */}
              <div className="lg:col-span-7 space-y-8">
                {/* Hero Slider */}
                {sliderPosts.length > 0 && (
                  <HeroSlider posts={sliderPosts} onPostClick={setSelectedPost} />
                )}

                {/* In-Feed Ad */}
                <div className="flex justify-center my-6">
                  <AdPlaceholder width="100%" maxWidth="728px" height="90px" label="728x90 Ad" />
                </div>

                <div className="space-y-6">
                  {feedPosts.map((post, index) => (
                    <NewsCard key={post.id} post={post} onClick={setSelectedPost} index={index} />
                  ))}
                </div>

                {/* Loading / Sentinel */}
                <div ref={loadMoreRef} className="py-8 text-center">
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : visibleCount < filteredPosts.length ? (
                    <p className="text-gray-400 text-sm animate-pulse">Scroll to load more</p>
                  ) : (
                    <p className="text-gray-400 text-sm">No more stories</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 order-first lg:order-last">
                <Sidebar topStories={topStories} setPage={setCurrentPage} />
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar
        currentPage={currentPage}
        setPage={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BillboardAd />
      <BreakingTicker onHeadlineClick={setSelectedCategory} />
      <CategoryNavbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Full Width Sections */}
      <ShortsSection />

      <footer className="bg-black text-white py-12 mt-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo.png" alt="The Dash Africa" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Delivering the most important stories from around the world. Trusted, accurate, and independent journalism for the digital age.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-brand-blue uppercase tracking-widest text-xs">Sections</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["World", "Politics", "Business", "Technology", "Sports"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-brand-blue uppercase tracking-widest text-xs">Follow Us</h4>
            <div className="flex gap-4">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-brand-red text-sm transition-colors hover:scale-110 duration-200 transform">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2024 The Dash Africa. All rights reserved.
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}

export default App;