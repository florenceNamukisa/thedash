import { Post, Ad, Short, Video } from "../types";

export const ads: Ad[] = [
  { id: "a1", image: "/ads/nbk-premier-billboard.svg", title: "NBK Premier Solutions Ltd", link: "https://www.nbkpremier.com" },
  { id: "a2", image: "/legacy_pearls_ad.jpg", title: "Legacy Pearls", link: "#" },
  { id: "a3", image: "/ads/nbk-premier-300x600.svg", title: "NBK Premier Solutions", link: "https://www.nbkpremier.com" },
  { id: "a4", image: "/ads/nbk-premier-300x250.svg", title: "NBK Premier Services", link: "https://www.nbkpremier.com" }
];

export const shorts: Short[] = [
  { 
    id: "s1", 
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=500&fit=crop", 
    title: "Rwanda Business News", 
    views: "1.2M", 
    platform: "YouTube",
    videoUrl: ""
  },
  {
    id: "s2",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=500&fit=crop",
    title: "Africa markets: quick update",
    views: "820K",
    platform: "YouTube",
    videoUrl: ""
  },
  {
    id: "s3",
    thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=300&h=500&fit=crop",
    title: "Tech in Africa: 60-second summary",
    views: "540K",
    platform: "YouTube",
    videoUrl: ""
  }
];

export const videos: Video[] = [
  {
    id: "v1",
    title: "Digital Banking in Africa: What’s Changing and Why It Matters",
    category: "Tech",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=450&fit=crop",
    videoUrl: "",
    description: "A full-length breakdown of digital banking trends, regulation, and consumer behavior across African markets."
  },
  {
    id: "v2",
    title: "Entrepreneurship in Africa: The Real Playbook",
    category: "Business",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop",
    videoUrl: "",
    description: "What makes businesses survive past year one: systems, customers, capital discipline, and execution."
  },
  {
    id: "v3",
    title: "Energy Projects in East Africa: What Investors Watch",
    category: "Energy & Petrochemicals",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=450&fit=crop",
    videoUrl: "",
    description: "A practical overview of energy project economics, timelines, and risk factors in the region."
  }
];

export const heroSlides = [
  {
    id: "h1",
    title: "Rwanda and Zimbabwe Strengthen Economic Partnerships",
    subtitle: "Strategic agreements signed to boost bilateral trade and investment",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
    category: "Business"
  }
];

export const posts: Post[] = [
  {
    id: "rwanda-zimbabwe-2021",
    title: "Rwanda and Zimbabwe Sign Land Mark Cooperation Agreements",
    excerpt: "Rwanda and Zimbabwe have signed several Memorandums of Understanding spanning agriculture, ICT, tourism, and e-government.",
    category: "Business",
    author: "Nicholas K. Quest",
    date: new Date("2021-09-28"),
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
    isBreaking: true
  }
];

export const authorData = {
  name: "Nicholas K. Quest",
  role: "Chief Editor & Best Selling Author",
  image: "https://secure.gravatar.com/avatar/2c9dd009be0eb4f4028bf05804676611d3c7d11f399ef801ab2d915a48565c52?s=160&d=mm&r=g",
  bio: "With over a decade of experience in African business journalism, Nicholas brings unparalleled insights into the continent evolving economic landscape.",
  books: [
    {
      id: 1,
      title: "The Digital Horizon",
      price: "$24.99",
      cover: "https://picsum.photos/seed/book1/300/450"
    }
  ]
};
