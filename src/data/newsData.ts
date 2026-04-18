import { Post, Ad, Short } from "../types";

export const ads: Ad[] = [
  { id: "a1", image: "/ads/nbk-premier-billboard.svg", title: "NBK Premier Solutions Ltd", link: "https://www.nbkpremier.com" },
  { id: "a2", image: "/legacy_pearls_ad.jpg", title: "Legacy Pearls", link: "#" },
  { id: "a3", image: "/legacy_pearls_ad.jpg", title: "Legacy Pearls", link: "#" }
]

export const heroSlides = [
  {
    id: "fintech-uganda-2026",
    title: "Fintech Revolution in Uganda: How Mobile Money is Reshaping Financial Inclusion",
    subtitle: "Uganda's mobile money ecosystem has evolved into a powerful engine of economic transformation, bridging the gap between traditional banking and the unbanked majority.",
    image: "/images/fintech-investmen.avif",
    category: "Tech"
  },
  {
    id: "digital-banking-uganda-2026",
    title: "Why Digital Banking Is No Longer Optional for Ugandans",
    subtitle: "The world is not waiting—and neither is the future of banking. Digital banking is reshaping how Ugandans interact with their money.",
    image: "/images/sea-banking-meta.png",
    category: "Tech"
  },
  {
    id: "ai-uganda-2026",
    title: "Artificial Intelligence in Uganda: Transforming Industries and Creating Practical Opportunities",
    subtitle: "As Uganda steadily deepens its digital footprint, AI is no longer an abstract, futuristic idea—it is quietly becoming a practical tool solving everyday Ugandan problems.",
    image: "/images/airobot.webp",
    category: "Tech"
  },
  {
    id: "cybersecurity-uganda-2026",
    title: "Cybersecurity in Uganda: Protecting Digital Assets in a Connected World",
    subtitle: "As Uganda accelerates toward a digitally driven economy, cybersecurity is no longer a technical afterthought—it is a foundational pillar of national development.",
    image: "/images/Cybersecurity_certiprof.webp",
    category: "Tech"
  },
  {
    id: "africa-energy-revolution-2024",
    title: "Uganda, TotalEnergies & CNOOC Sign a $10 Billion Mega Oil Deal",
    subtitle: "Historic agreement marks a major milestone in Uganda's energy sector development and Africa's oil industry transformation.",
    image: "/images/Uganda-FID-1.jpg",
    category: "Energy & Petrochemicals"
  },
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
      cover: "https://picsum.photos/seed/book1/300/450",
      amazonLink: "https://www.amazon.com/dp/B0EXAMPLE"
    }
  ]
};
