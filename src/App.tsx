import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUp } from "lucide-react";
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
import { Subscription } from "./pages/Subscription";
import { Videos } from "./pages/Videos";
import { allPosts } from "./data/posts";
import { latestArticles, localArticles, popularArticles, regionalArticles } from "./data/featuredArticles";
import { formatDate } from "./utils/formatDate";
import { Post } from "./types";

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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleSetPage = (page: string) => {
    setSelectedPost(null);
    setCurrentPage(page);
  };

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

  // Floating back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger email notifications when new articles appear (auto, no manual setup)
  useEffect(() => {
    try {
      const key = "thedash_notify_ping";
      const now = Date.now();
      const last = Number(localStorage.getItem(key) || 0);
      if (now - last < 15 * 60 * 1000) return;
      localStorage.setItem(key, String(now));
      fetch("/api/notify.php", { method: "POST" }).catch(() => {});
    } catch {
      fetch("/api/notify.php", { method: "POST" }).catch(() => {});
    }
  }, []);

  const PageLayout = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left Column: Trending Shorts */}
      <div className="order-last lg:order-none lg:col-span-2 space-y-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 lg:sticky lg:top-24 shadow-sm">
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
        {children}
      </div>

      {/* Right Column */}
      <div className="lg:col-span-3 order-last lg:order-none space-y-6">
        <Sidebar topStories={topStories} setPage={handleSetPage} />

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">
            Local Articles
          </h3>
          <div className="space-y-3">
            {localArticles.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="w-full text-left p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(post.date)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">
            Regional Articles
          </h3>
          <div className="space-y-3">
            {regionalArticles.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="w-full text-left p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(post.date)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedPost) {
      return (
        <PageLayout>
          <NewsDetail
            post={selectedPost}
            allPosts={allPosts}
            onBack={() => setSelectedPost(null)}
            onSelectPost={setSelectedPost}
          />
        </PageLayout>
      );
    }

    switch (currentPage) {
      case "about":
        return (
          <PageLayout>
            <About onBack={() => handleSetPage("home")} />
          </PageLayout>
        );
      case "careers":
        return (
          <PageLayout>
            <Careers />
          </PageLayout>
        );
      case "contact":
        return (
          <PageLayout>
            <Contact />
          </PageLayout>
        );
      case "subscribe":
        return (
          <PageLayout>
            <Subscription />
          </PageLayout>
        );
      case "videos":
        return (
          <PageLayout>
            <Videos allPosts={allPosts} onSelectPost={setSelectedPost} />
          </PageLayout>
        );
      default:
        return (
          <motion.div
            key={selectedCategory}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
          >
            <PageLayout>
              {/* Hero Slider */}
              {sliderPosts.length > 0 && (
                <HeroSlider posts={sliderPosts} onPostClick={setSelectedPost} />
              )}

              {/* Latest Articles */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-black uppercase tracking-wide">Latest Articles</h3>
                  <span className="text-xs font-semibold text-gray-400">Latest coverage</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {latestArticles.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group flex gap-3 rounded-xl border border-gray-100 p-3 text-left hover:shadow-md transition-shadow"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                          {post.category}
                        </span>
                        <h4 className="font-bold text-gray-900 leading-snug mt-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(post.date)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-black uppercase tracking-wide">Popular Articles</h3>
                  <span className="text-xs font-semibold text-gray-400">Most read</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularArticles.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group flex gap-3 rounded-xl border border-gray-100 p-3 text-left hover:shadow-md transition-shadow"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                          {post.category}
                        </span>
                        <h4 className="font-bold text-gray-900 leading-snug mt-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(post.date)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

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
            </PageLayout>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar
        currentPage={currentPage}
        setPage={handleSetPage}
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
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo.png" alt="The Dash Africa" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Delivering the most important stories from around the world. Trusted, accurate, and independent journalism for the digital age.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-brand-blue uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: "About Us", page: "about" },
                { label: "Careers", page: "careers" },
                { label: "Contact", page: "contact" },
                { label: "Subscribe", page: "subscribe" },
                { label: "Videos", page: "videos" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    className="hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-2 duration-200"
                    onClick={() => {
                      handleSetPage(item.page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-brand-blue uppercase tracking-widest text-xs">Sections</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["World", "Politics", "Business", "Technology", "Sports"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block duration-200">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-bold mb-4 text-brand-blue uppercase tracking-widest text-xs">Follow Us</h4>
            <div className="flex gap-4">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-brand-red text-sm transition-colors hover:scale-110 duration-200 transform">
                  {social}
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                handleSetPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="self-start inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:border-white transition-colors"
            >
              Back to Top
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2024 The Dash Africa. All rights reserved.
        </div>
      </footer>
      {showBackToTop && (
        <button
          onClick={() => {
            handleSetPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-6 right-24 z-40 inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-3 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
          Top
        </button>
      )}
      <WhatsAppButton />
    </div>
  );
}

export default App;
