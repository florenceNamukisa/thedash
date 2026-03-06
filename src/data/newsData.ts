import { Post, Ad, Short, Video } from "../types";

export const ads: Ad[] = [
  { id: "a1", image: "/ads/nbk-premier-billboard.svg", title: "NBK Premier Solutions Ltd", link: "https://www.nbkpremier.com" },
  { id: "a2", image: "/legacy_pearls_ad.jpg", title: "Legacy Pearls", link: "#" },
  { id: "a3", image: "/legacy_pearls_ad.jpg", title: "Legacy Pearls", link: "#" }
];

export const shorts: Short[] = [
  {
    id: "s1",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=500&fit=crop",
    title: "Rwanda's Economic Miracle: How They Did It",
    views: "1.2M",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/embed/R1otxMESy1Q"
  },
  {
    id: "s2",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=500&fit=crop",
    title: "East Africa Trade: The $50B Opportunity",
    views: "820K",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/embed/Jj0u6yZ-aGk"
  },
  {
    id: "s3",
    thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=300&h=500&fit=crop",
    title: "Uganda Oil Discovery: What It Means for Africa",
    views: "540K",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/embed/8TJnFTY4r4I"
  },
  {
    id: "s4",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=500&fit=crop",
    title: "Nigeria's Tech Boom: The Silicon Valley of Africa",
    views: "920K",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/embedqwerty12345"
  },
  {
    id: "s5",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=500&fit=crop",
    title: "Kenya's Green Energy Revolution",
    views: "450K",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/embed/nLmFQ2A41_0"
  },
  {
    id: "s6",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=500&fit=crop",
    title: "Africa's Youngest Billionaires 2024",
    views: "1.1M",
    platform: "YouTube",
    videoUrl: "https://www.youtube.com/embed/2F1l2gR4WqA"
  }
];

export const videos: Video[] = [
  {
    id: "v1",
    title: "Digital Banking in Africa: What's Changing and Why It Matters",
    category: "Tech",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/P2C5eS-EqZY",
    description: "A full-length breakdown of digital banking trends, regulation, and consumer behavior across African markets. Learn how mobile money, neobanks, and fintech are transforming financial inclusion across the continent."
  },
  {
    id: "v2",
    title: "Entrepreneurship in Africa: The Real Playbook",
    category: "Business",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/1B7tT3F4D6M",
    description: "What makes businesses survive past year one: systems, customers, capital discipline, and execution. Real strategies from successful African entrepreneurs who've built companies that scale."
  },
  {
    id: "v3",
    title: "Energy Projects in East Africa: What Investors Watch",
    category: "Energy & Petrochemicals",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/9GqH1y8t5W2",
    description: "A practical overview of energy project economics, timelines, and risk factors in the region. From oil pipelines to solar farms, discover where the smart money is flowing in East African energy."
  },
  {
    id: "v4",
    title: "The Future of Africa Free Trade: AfCFTA Explained",
    category: "Economy & Trade",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/3K7M5X2P9R1",
    description: "The Africa Continental Free Trade Area represents a $450 billion opportunity. This comprehensive guide breaks down what AfCFTA means for businesses, investors, and workers across the continent."
  },
  {
    id: "v5",
    title: "Mining Boom in the Congo: Inside Africa's Richest Region",
    category: "Industry & Mining",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/6D8Y2Q5M7N3",
    description: "The Democratic Republic of Congo holds 60% of the world's cobalt and massive copper reserves. As electric vehicle demand surges, we examine the opportunities and challenges in Congo's mining sector."
  },
  {
    id: "v6",
    title: "Kenya's Silicon Savannah: Tech Startups Changing Africa",
    category: "Tech",
    channel: "The Dash Africa",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/8B4K3M2P1Q9",
    description: "Nairobi has become the startup hub of Africa. From fintech to agritech, discover the companies that are solving African problems with African solutions and attracting global venture capital."
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
