
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  category: string;
  // Extended Case Study Fields
  client?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
}

export interface Venture {
  id: number;
  name: string;
  role: string;
  description: string;
  longDescription: string;
  logoUrl: string; // Or icon name
  coverUrl: string;
  website: string;
  status: string; // e.g., "Active", "Acquired", "Scaling"
  stats: {
    label: string;
    value: string;
  }[];
  contact: {
    email: string;
    location: string;
    handle: string;
  };
}

export interface SkillData {
  subject: string;
  A: number; // Proficiency level (0-100)
  fullMark: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum MessageSender {
  User = 'user',
  Bot = 'bot'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
}