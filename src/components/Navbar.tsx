import { useState, useRef, useEffect } from "react";
import { Menu, Search, X, ChevronDown, Globe, Home } from "lucide-react";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { mainCategories, otherCategories } from "../data/posts";

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar = ({
  currentPage,
  setPage,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  selectedCategory,
  setSelectedCategory
}: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setPage("home");
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setPage("home");
    setSelectedCategory("All"); // Reset to All
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={handleHomeClick}
          >
            <img
              src="/logo.png"
              alt="The Dash Africa"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${currentPage === "home" && selectedCategory === "All"
              ? "bg-blue-50 text-brand-blue"
              : "text-gray-600 hover:bg-gray-50 hover:text-brand-blue"
              }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>

          {/* Main Categories */}
          {mainCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-2 text-sm font-bold rounded-md transition-all ${selectedCategory === cat && currentPage === "home"
                ? "bg-blue-50 text-brand-blue"
                : "text-gray-600 hover:bg-gray-50 hover:text-brand-blue"
                }`}
            >
              {cat}
            </button>
          ))}

          {/* "Others" Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              className={`text-sm font-bold rounded-md flex items-center gap-1 ${otherCategories.includes(selectedCategory) && currentPage === "home"
                ? "bg-blue-50 text-brand-blue"
                : "text-gray-600 hover:bg-gray-50 hover:text-brand-blue"
                }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Globe className="w-4 h-4" />
              Others
              <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200 max-h-[80vh] overflow-y-auto z-50">
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-white border-b border-gray-100">
                  More Sectors
                </div>
                {otherCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-brand-blue transition-colors flex items-center justify-between group ${selectedCategory === cat ? "bg-blue-50 text-brand-blue font-bold" : "text-gray-700"
                      }`}
                  >
                    {cat}
                    {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            {isSearchOpen && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-200 mr-2">
                <Input
                  type="text"
                  placeholder="Search news..."
                  className="w-48 md:w-64 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={isSearchOpen ? "text-brand-blue" : ""}
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
          <Button
            onClick={() => setPage("subscribe")}
            className="bg-black hover:bg-gray-800 text-white hidden sm:flex text-sm px-5 font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4 space-y-1 animate-in slide-in-from-top-2">
          <button
            onClick={handleHomeClick}
            className={`w-full text-left px-4 py-3 text-sm font-bold rounded-md flex items-center justify-between ${currentPage === "home" && selectedCategory === "All"
              ? "bg-blue-50 text-brand-blue"
              : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </div>
            {currentPage === "home" && selectedCategory === "All" && <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />}
          </button>

          {/* Mobile Categories List */}
          <div className="pt-4 border-t mt-2">
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Browse Categories
            </div>
            <div className="max-h-60 overflow-y-auto">
              {[...mainCategories, ...otherCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${selectedCategory === cat ? "text-brand-blue font-bold" : "text-gray-600"
                    }`}
                >
                  {cat}
                  {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-brand-blue rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t mt-2">
            <Button
              onClick={() => { setPage("subscribe"); setIsMobileMenuOpen(false); }}
              className="w-full bg-brand-red hover:opacity-90 text-white"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};