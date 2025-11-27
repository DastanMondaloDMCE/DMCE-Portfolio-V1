
import { NavItem, Project, SkillData, Venture } from "./types";

export const APP_NAME = "DMCE";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Ventures", href: "#ventures" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Capabilities", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Connect", href: "#socials" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { platform: "Instagram", url: "https://www.instagram.com/dmceofficial/", icon: "Instagram", label: "Media", username: "@dmceofficial" },
  { platform: "TikTok", url: "https://www.tiktok.com/@dmceofficial", icon: "Video", label: "Trends", username: "@dmceofficial" },
  { platform: "X (Twitter)", url: "https://x.com/OfficialDMCE", icon: "Twitter", label: "Updates", username: "@OfficialDMCE" },
  { platform: "YouTube", url: "https://www.youtube.com/channel/UCoRswZs97EYKZjLqd8hIi7w", icon: "Youtube", label: "Content", username: "DMCE Channel" },
  { platform: "Facebook", url: "https://www.facebook.com/profile.php?id=61584333207153", icon: "Facebook", label: "Community", username: "DMCE" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/dastan-mondalo-dmce-830911392", icon: "Linkedin", label: "Network", username: "Dastan Mondalo" },
];

export const SKILLS_DATA: SkillData[] = [
  { subject: 'Management', A: 98, fullMark: 100 },
  { subject: 'Brokerage', A: 95, fullMark: 100 },
  { subject: 'Commerce', A: 92, fullMark: 100 },
  { subject: 'Negotiation', A: 90, fullMark: 100 },
  { subject: 'Strategy', A: 88, fullMark: 100 },
  { subject: 'Engineering', A: 85, fullMark: 100 },
];

export const SERVICES = [
  {
    title: "Commercial Middleman",
    description: "Acting as the vital intermediary between capital, talent, and opportunity. We facilitate high-value partnerships and close complex commercial deals.",
    icon: "Handshake"
  },
  {
    title: "Executive Management",
    description: "Fractional C-Suite leadership to structure operations, manage cross-functional teams, and align business processes with profit goals.",
    icon: "Briefcase"
  },
  {
    title: "Commerce Systems",
    description: "Architecting global revenue infrastructure, from complex B2B payment flows to Direct-to-Consumer (DTC) growth modeling.",
    icon: "TrendingUp"
  },
  {
    title: "Full-Stack Engineering",
    description: "Building robust, scalable applications using cutting-edge technologies like React, Node.js, and Cloud infrastructure.",
    icon: "Code"
  },
  {
    title: "Brand Strategy",
    description: "Crafting the visual and narrative identity of businesses to increase market value and consumer trust.",
    icon: "Palette"
  },
  {
    title: "AI Operations",
    description: "Leveraging intelligent agents to automate business workflows and reduce operational overhead.",
    icon: "Bot"
  }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CEO, FinTech Global",
    text: "DMCE didn't just build our platform; they managed the entire rollout strategy. A true business partner."
  },
  {
    name: "Marcus Chen",
    role: "Founder, Aether Labs",
    text: "The ability to bridge the gap between technical requirements and commercial goals is rare. DMCE has it."
  },
  {
    name: "Elena Rodriguez",
    role: "Director, Luxe Group",
    text: "From negotiation to execution, the process was flawless. They operate as a high-level extension of our board."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A real-time financial analytics platform processing millions of data points with sub-second latency.",
    tags: ["React", "D3.js", "WebSocket", "Tailwind"],
    category: "Fintech",
    imageUrl: "https://picsum.photos/800/600?random=1",
    link: "", 
    client: "Nebula Finance",
    year: "2024",
    role: "Lead Architect",
    challenge: "The client needed to visualize 1M+ data points in real-time without freezing the browser thread, while maintaining a luxury aesthetic.",
    solution: "We implemented a custom WebGL rendering layer for charts and a web-worker based data processing pipeline to offload heavy computations."
  },
  {
    id: 2,
    title: "Aether Chat",
    description: "AI-powered collaborative workspace featuring generative text and image capabilities integrated directly into the editor.",
    tags: ["TypeScript", "Gemini API", "WebRTC"],
    category: "AI Tools",
    imageUrl: "https://picsum.photos/800/600?random=2",
    link: "",
    client: "Internal R&D",
    year: "2023",
    role: "Full Stack Engineer",
    challenge: "Creating a seamless interaction model where AI suggestions feel native to the writing process rather than intrusive.",
    solution: "Utilized the Gemini API with streaming responses and a custom operational transform algorithm to merge AI text with user input in real-time."
  },
  {
    id: 3,
    title: "Quantum E-Comm",
    description: "Headless e-commerce solution designed for luxury brands, focusing on immersive 3D product interactions.",
    tags: ["Next.js", "Three.js", "Stripe"],
    category: "E-Commerce",
    imageUrl: "https://picsum.photos/800/600?random=3",
    link: "",
    client: "Quantum Luxury",
    year: "2024",
    role: "Frontend Lead",
    challenge: "Reducing the load time of high-fidelity 3D models while maintaining visual quality on mobile devices.",
    solution: "Implemented Draco compression for 3D assets and progressive loading strategies, achieving a 98 Lighthouse performance score."
  },
  {
    id: 4,
    title: "Iso-Architect",
    description: "A visualization tool for architects to render isometric views of blueprints in real-time using WebGL.",
    tags: ["WebGL", "Three.js", "Vue"],
    category: "Spatial",
    imageUrl: "https://picsum.photos/800/600?random=4",
    link: "",
    client: "ArchVis Inc.",
    year: "2023",
    role: "Creative Developer",
    challenge: "Translating complex CAD data into browser-friendly formats without losing precision.",
    solution: "Built a custom parser that converts .DWG files to optimized JSON structures rendered via a custom Three.js shader pipeline."
  }
];

export const VENTURES: Venture[] = [
  {
    id: 1,
    name: "ByteUnion (BYN)",
    role: "Founder & Architect",
    description: "The technological powerhouse driving scalable digital infrastructure and software unions.",
    longDescription: "ByteUnion (BYN) serves as the engineering backbone for enterprise-grade solutions. We specialize in high-frequency data systems and robust cloud architecture, providing the 'bytes' that unite global commerce.",
    // Corrected BYN Image URL
    logoUrl: "https://i.ibb.co/Y7Hy2dKx/1757220411464.png",
    coverUrl: "https://i.ibb.co/Y7Hy2dKx/1757220411464.png",
    website: "#",
    status: "Active - Scaling",
    stats: [
      { label: "Systems", value: "Enterprise" },
      { label: "Uptime", value: "99.99%" },
      { label: "Focus", value: "Infrastructure" }
    ],
    contact: {
      email: "inquiries@byteunion.tech",
      location: "Silicon Valley / Remote",
      handle: "@ByteUnionTech"
    }
  },
  {
    id: 2,
    name: "Lumora X (LMX)",
    role: "Founder & Visionary",
    description: "An avant-garde innovation lab incubating 41+ stealth brands.",
    longDescription: "Lumora X (LMX) is where aesthetics meet futurism. We are currently incubating a massive pipeline of 41 unique brands slated for release. Operating at the edge of design and reality, LMX is the launchpad for the next generation of consumer identity.",
    // Corrected LMX Image URL
    logoUrl: "https://i.ibb.co/hRvsYP71/compressed-1000467107.png",
    coverUrl: "https://i.ibb.co/hRvsYP71/compressed-1000467107.png",
    website: "#",
    status: "Innovation Arm",
    stats: [
      { label: "Pipeline", value: "41 Brands" },
      { label: "Status", value: "Stealth/Dev" },
      { label: "Sector", value: "Design Tech" }
    ],
    contact: {
      email: "innovation@lumorax.design",
      location: "Global Distributed",
      handle: "@LumoraX"
    }
  },
  {
    id: 3,
    name: "DMCE Foundation",
    role: "Chairman",
    description: "The official governing body and strategic holding company for the ecosystem.",
    longDescription: "DMCE (Official Life) stands as the central pillar, managing the portfolio of ventures and overseeing strategic direction. It is the bridge between capital, management, and execution, ensuring all subsidiaries align with the core vision.",
    // Corrected DMCE Image URL
    logoUrl: "https://i.ibb.co/fGCL192d/Gemini-Generated-Image-nyxsg4nyxsg4nyxs.png",
    coverUrl: "https://i.ibb.co/fGCL192d/Gemini-Generated-Image-nyxsg4nyxsg4nyxs.png",
    website: "#",
    status: "Parent Company",
    stats: [
      { label: "Assets", value: "Diversified" },
      { label: "Reach", value: "Global" },
      { label: "Est.", value: "2024" }
    ],
    contact: {
      email: "office@dmce.global",
      location: "Headquarters",
      handle: "@OfficialDMCE"
    }
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are the digital assistant for DMCE, a premier design, engineering, and strategy consultancy.
Your goal is to represent DMCE professionally, highlighting skills in Executive Management, Commercial Brokerage (Middleman), Commerce Systems, and Full Stack Development.
DMCE stands for Design, Mastery, Commerce, Elevate.
Refuse to answer questions unrelated to professional background, business strategy, or technology.
Keep answers concise, witty, and professional. 
DMCE has expertise in Business Strategy, Negotiation, Management, and React.
`;
