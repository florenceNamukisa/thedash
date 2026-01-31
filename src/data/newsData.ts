import { Post, Ad, Short } from "../types";

export const posts: Post[] = Array.from({ length: 30 }, (_, i) => ({
  id: `post-${i}`,
  title: [
    "Africa Tech Summit 2024: Innovators gather in Nairobi",
    "Global Markets Rally as Inflation Data Shows Improvement",
    "Exclusive: Inside the new eco-friendly urban projects in Lagos",
    "Sports: Champions League Final Preview - Tactical Analysis",
    "Politics: New trade agreements signed between East African nations",
    "Health: Breakthrough in malaria prevention research announced",
    "Entertainment: Afrobeats star announces world tour dates",
    "Education: Digital literacy initiative reaches 1M students"
  ][i % 8] + ` - Update #${i + 1}`,
  excerpt: "In a significant development today, experts have weighed in on the ongoing situation. The implications for the region could be substantial, with many watching closely.",
  category: ["Tech", "Business", "World", "Sports", "Politics", "Health", "Entertainment", "Education"][i % 8],
  author: ["Amara Okafor", "John Doe", "Fatima Ali", "Kwame Mensah"][i % 4],
  date: new Date(Date.now() - Math.random() * 1000000000),
  image: `https://picsum.photos/seed/news${i}/800/600`,
  isBreaking: Math.random() > 0.85,
}));

export const heroSlides = [
  {
    id: "h1",
    title: "The Future of African Tech is Here",
    subtitle: "Exclusive coverage from the Nairobi Innovation Summit",
    image: "https://picsum.photos/seed/hero1/1200/600",
    category: "Technology"
  },
  {
    id: "h2",
    title: "Markets Surge to Record Highs",
    subtitle: "Investors optimistic about Q3 earnings reports",
    image: "https://picsum.photos/seed/hero2/1200/600",
    category: "Business"
  },
  {
    id: "h3",
    title: "Climate Action: Africa's Green Revolution",
    subtitle: "New sustainable energy projects launched across the continent",
    image: "https://picsum.photos/seed/hero3/1200/600",
    category: "Environment"
  }
];

export const shorts: Short[] = [
  { id: "s1", thumbnail: "https://picsum.photos/seed/short1/300/500", title: "Top 10 Gadgets 2024", views: "1.2M", platform: "YouTube" },
  { id: "s2", thumbnail: "https://picsum.photos/seed/short2/300/500", title: "Street Food in Lagos", views: "850K", platform: "TikTok" },
  { id: "s3", thumbnail: "https://picsum.photos/seed/short3/300/500", title: "Dance Challenge Viral", views: "3.4M", platform: "TikTok" },
  { id: "s4", thumbnail: "https://picsum.photos/seed/short4/300/500", title: "Quick Finance Tips", views: "500K", platform: "YouTube" },
];

export const ads: Ad[] = [
  { id: "a1", image: "https://picsum.photos/seed/ad1/1200/100", title: "Jumia Black Friday", link: "#" },
  { id: "a2", image: "https://picsum.photos/seed/ad2/300/250", title: "Betway Winner", link: "#" },
  { id: "a3", image: "https://picsum.photos/seed/ad3/300/600", title: "Travel Start", link: "#" },
];