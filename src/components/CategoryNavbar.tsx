import { ChevronRight } from "lucide-react";
import { mainCategories } from "../data/posts";

interface CategoryNavbarProps {
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
}

export const CategoryNavbar = ({
    selectedCategory,
    setSelectedCategory
}: CategoryNavbarProps) => {
    return (
        <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center h-12 overflow-x-auto no-scrollbar scroll-smooth">
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap ${selectedCategory === "All"
                                ? "bg-brand-blue text-white shadow-md shadow-blue-200"
                                : "text-gray-600 hover:text-brand-blue hover:bg-blue-50"
                                }`}
                        >
                            All Stories
                        </button>
                        <div className="h-4 w-[1px] bg-gray-300 mx-2" />
                    </div>

                    <nav className="flex items-center gap-1 py-1">
                        {mainCategories.map((cat, index) => (
                            <div key={cat} className="flex items-center">
                                <button
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                        }`}
                                >
                                    {cat}
                                </button>
                                {index < mainCategories.length - 1 && (
                                    <ChevronRight className="w-3 h-3 text-gray-300 mx-1 shrink-0" />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Fading effect for scroll hint */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none lg:hidden" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </div>
    );
};
