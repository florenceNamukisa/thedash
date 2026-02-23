export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: Date;
  image: string;
  isBreaking?: boolean;
  content?: string;
}

export interface Video {
  id: string;
  title: string;
  category: string;
  channel?: string;
  date?: Date;
  thumbnail: string;
  videoUrl: string;
  description?: string;
}

export interface Ad {
  id: string;
  image: string;
  video?: string;
  title: string;
  link: string;
}

export interface Short {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  platform: "YouTube" | "TikTok";
  videoUrl?: string;
}