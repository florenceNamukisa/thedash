import { Post } from "../types";

// Split categories into Main Navbar and "Others" Dropdown
export const mainCategories = [
  "Tech",
  "Business",
  "World",
  "Sports",
  "Parastatals (Uganda)",
  "Society & Lifestyle"
];

export const otherCategories = [
  "Transportation & Logistics",
  "Tourism & Hospitality",
  "Real Estate & Construction",
  "Telecommunication",
  "Agriculture",
  "Economy & Trade",
  "Education",
  "Engineering & Construction",
  "Energy & Petrochemicals",
  "Industry & Mining",
  "Legal & Consulting",
  "Hygiene & Homes",
  "Military & Security"
];

export const categoryList = [...mainCategories, ...otherCategories];

const authors = ["Sarah Jenkins", "Mike Ross", "Emily Chen", "David Kim", "Anna Smith", "John Doe", "Jane Doe"];

const generatePosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => {
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];
    return {
      id: `post-${i}`,
      title: `${category}: Major developments shake up the industry as new trends emerge globally`,
      excerpt: "In a surprising turn of events, experts are weighing in on the implications of recent data. The impact could be far-reaching for consumers and businesses alike. This comprehensive analysis covers the key factors driving the current market shifts.",
      category,
      author: authors[Math.floor(Math.random() * authors.length)],
      date: new Date(Date.now() - Math.random() * 1000000000),
      image: `https://picsum.photos/seed/${i + 100}/800/450`, // 16:9 aspect ratio for slider
      isBreaking: Math.random() > 0.8,
    };
  });
};

export const allPosts = generatePosts(50);