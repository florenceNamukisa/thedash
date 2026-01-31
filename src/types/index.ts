export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: Date;
  image: string;
  isBreaking?: boolean;
}

export interface Ad {
  id: string;
  image: string;
  title: string;
  link: string;
}

export interface Short {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  platform: "YouTube" | "TikTok";
}