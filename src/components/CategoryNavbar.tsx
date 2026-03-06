import { ChevronRight } from "lucide-react";
import { mainCategories } from "../data/posts";

interface CategoryNavbarProps {
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    setPage?: (page: string) => void;
}

const pageLinks = [
  { label: "About Us", page: "about" },
  { label: "Careers", page: "careers" },
  { label: "Contact", page: "contact" },
  { label: "Subscribe", page: "subscription" },
];

export const CategoryNavbar = ({
    selectedCategory,
    setSelectedCategory,
    setPage
}: CategoryNavbarProps) => {
    return (
        <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-12">
                    {/* Categories scrollable section */}
                    <div className="flex items-center flex-1 overflow-x-auto no-scrollbar scroll-smooth min-w-0">
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
                    </div>

                    {/* Page links — right side */}
                    {setPage && (
                        <div className="hidden md:flex items-center gap-1 ml-4 shrink-0 border-l border-gray-200 pl-4">
                            {pageLinks.map((link) => (
                                <button
                                    key={link.page}
                                    onClick={() => setPage(link.page)}
                                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all whitespace-nowrap"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    )}
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
