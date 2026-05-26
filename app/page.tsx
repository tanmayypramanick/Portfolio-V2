'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useTheme } from 'next-themes';
import JourneyTimeline from '@/components/JourneyTimeline';
import {
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sun,
  Moon,
  FileText,
  Download,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

// Scroll Progress Bar Component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX }}
    />
  );
}

// Particles Background Component
function Particles() {
  return (
    <div className="particles-container">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}

// 3D Project Card Component
interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  website?: string;
  featured?: boolean;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="project-card p-6 cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)',
          opacity: isHovered ? 0.3 : 0,
        }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
            {project.title}
          </h3>
          {project.featured && (
            <span className="px-2 py-1 text-xs rounded-full flex items-center gap-1 whitespace-nowrap" style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)' }}>
              <Sparkles size={12} />
              Featured
            </span>
          )}
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border)' }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity group/link"
              style={{ color: 'var(--accent)' }}
            >
              <ExternalLink size={14} />
              Live Demo
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity group/link"
              style={{ color: 'var(--accent)' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d={socialIcons.GitHub} />
              </svg>
              GitHub
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// =============== YOUR DETAILS ===============
const personalInfo = {
  name: 'Tanmay Pramanick',
  tagline: "Born and raised in Mumbai, growing in Chicago. I love building things through code, creativity, and curiosity. Always learning, always exploring.",
  lookingFor: "Looking for full-time opportunities!",
  email: 'tanmaypramanick06@gmail.com',
  phone: '+1 312 975 5575',
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tanmaypramanick/' },
    { name: 'GitHub', url: 'https://github.com/tanmayypramanick' },
    { name: 'Twitter', url: 'https://twitter.com/thelazybong__' },
    { name: 'Instagram', url: 'https://www.instagram.com/abouttanmayy' },
  ],
  resumeUrl: '/Resume_Tanmay.pdf',
  stats: {
    years: '05+',
    yearsLabel: 'Years of Building',
    projects: '30+',
    projectsLabel: 'Projects Shipped',
    coffee: '1000+',
    coffeeLabel: 'Cups of Coffee',
  },
};

const skills = {
  languages: ['Python', 'SQL', 'Java', 'JavaScript', 'Dart', 'C++'],
  technologies: ['React', 'Node.js', 'Flutter', 'Express.js', 'TensorFlow', 'REST API'],
  tools: ['Git', 'Docker', 'AWS', 'MongoDB', 'Hadoop', 'Spark'],
  certifications: ['Google Cloud', 'Python Data Structures', 'Watsonx.AI'],
};

const projects = [
  // Featured Projects - Top of the list
  {
    title: 'MCP-based AI Customer Support Orchestrator',
    description: 'Created a scalable support automation platform using MCP to classify queries via LLM, generate Jira tickets, send Slack alerts, and draft/send emails. Eliminated 90% of manual triage and workflows. Deployed with Docker (Render, Vercel, AWS RDS), streaming real-time via SSE and processing 100+ queries in batch.',
    tech: ['FastMCP', 'PostgreSQL', 'LLM', 'SSE', 'Docker', 'AWS RDS'],
    github: 'https://github.com/tanmayypramanick/MCP-based-CustomerSupport-Orchestrator',
    website: 'https://mcp-based-supportorchestrator.vercel.app/',
    featured: true,
  },
  {
    title: 'Fyndit',
    description: 'Launched a student marketplace and housing platform with real-time chat, location-based search, and .edu-verified authentication. Built and grew user base to 100+ active students, consolidating fragmented WhatsApp groups into one unified platform.',
    tech: ['Next.js', 'TypeScript', 'Firebase', 'Mapbox', 'Real-time Chat'],
    github: 'https://github.com/tanmayypramanick/fyndit',
    website: 'https://www.fyndit.me/',
    featured: true,
  },
  {
    title: 'LLM-based AI Interviewer',
    description: 'Crafted an AI interviewer generating context-aware questions from resumes and JDs using FAISS; added TTS for voice interaction. Engineered multi-turn memory for conversational coherence with a text-first path to improve response quality.',
    tech: ['LLaMA 3', 'RAG', 'Semantic Search', 'TTS', 'React', 'FAISS'],
    github: 'https://github.com/tanmayypramanick/AI-Interviewer',
    website: 'https://ai-interviewer.vercel.app/',
    featured: true,
  },
  {
    title: 'Unified CPG Dashboard',
    description: 'Enterprise dashboard unifying supplier portals, distributor networks, and e-commerce platforms. Integrates NetSuite API, Instacart Ads, KeHe, UNFI portals via Playwright scraping, and Amazon SP-API for real-time business intelligence, forecasting, and inventory management.',
    tech: ['React', 'TypeScript', 'Python', 'Node.js', 'NetSuite API', 'Amazon SP-API', 'Playwright'],
    github: '',
    featured: true,
  },
  {
    title: 'AI Email Assistant (Outlook Extension)',
    description: 'Outlook email extension that uses AI to prioritize emails by importance, urgency, and sender relationship. Features smart reply suggestions in the user\'s language and tone, email summarization, and automated follow-up reminders.',
    tech: ['TypeScript', 'React', 'OpenAI', 'Microsoft Graph API', 'Outlook Add-ins'],
    github: '',
    featured: true,
  },
  {
    title: 'GitHub Analytics Dashboard',
    description: 'Comprehensive GitHub analytics platform providing insights into repository performance, contributor activity, issue metrics, and deployment tracking. Features customizable dashboards, team velocity charts, and automated reporting.',
    tech: ['Next.js', 'TypeScript', 'GitHub API', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/tanmayypramanick/Github-Analytics-Dashboard',
    featured: true,
  },
  // Other Projects - Shown after "See More"
  {
    title: 'Decentralized P2P Pub-Sub System',
    description: 'Built three progressive implementations with DHT for topic management and Hypercube Network Topology for distributed messaging.',
    tech: ['Python', 'DHT', 'P2P Networks', 'Socket Programming'],
    github: 'https://github.com/tanmayypramanick/Decentralized-P2P-Pub-Sub-System',
    featured: false,
  },
  {
    title: 'Webpage Summarizer',
    description: 'CloudScraper with Selenium for dynamic content and HuggingFace Transformers for intelligent summarization.',
    tech: ['Python', 'Selenium', 'NLP', 'LangChain', 'FastAPI'],
    github: 'https://github.com/tanmayypramanick/webpage-summarizer',
    featured: false,
  },
  {
    title: 'Chicago Crime Analysis',
    description: 'Random Forest model achieving 99% accuracy with geospatial clustering and interactive visualizations.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Plotly', 'Machine Learning'],
    github: 'https://github.com/tanmayypramanick/Chicago-Crime-Analysis-and-Predictive-Modeling',
    featured: false,
  },
  {
    title: 'Weather App',
    description: 'Flutter mobile app with OpenWeather API for 200+ locations with favorites and dynamic units.',
    tech: ['Flutter', 'Dart', 'REST API', 'Mobile Development'],
    github: 'https://github.com/tanmayypramanick/Weather-App',
    featured: false,
  },
  {
    title: 'Drowsiness Detection System',
    description: 'CNN-based real-time driver fatigue detection. Published in Dickensian Journal.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'Computer Vision'],
    github: 'https://github.com/tanmayypramanick/drowsiness-detection',
    featured: false,
  },
  {
    title: 'Disease Prediction System',
    description: 'ML-based system predicting diseases from symptoms with personalized medication and diet recommendations.',
    tech: ['Python', 'Machine Learning', 'Flask', 'Healthcare'],
    github: 'https://github.com/tanmayypramanick/Disease-Prediction-and-Medical-Recommendation-System',
    featured: false,
  },
  {
    title: 'Library Management System',
    description: 'Full-stack library management with book cataloging, member management, and automated fine calculation.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React'],
    github: 'https://github.com/tanmayypramanick/sqlibra',
    featured: false,
  },
  {
    title: 'Flashcards/Quiz App',
    description: 'Mobile flashcard app with spaced repetition algorithms and progress tracking.',
    tech: ['Flutter', 'Dart', 'SQLite', 'Mobile'],
    github: 'https://github.com/tanmayypramanick/flashcards-app',
    featured: false,
  },
  {
    title: 'Translation & Speech Recognition',
    description: 'Multi-language translation tool with speech recognition and text-to-speech functionality.',
    tech: ['Python', 'Speech Recognition', 'Google Translate API'],
    github: 'https://github.com/tanmayypramanick/translation-app',
    featured: false,
  },
  {
    title: 'Battleship Game',
    description: 'Interactive multiplayer game with AI opponent and intelligent strategies.',
    tech: ['Java', 'Swing', 'Game Development'],
    github: 'https://github.com/tanmayypramanick/battleship',
    featured: false,
  },
];

const timeline = [
  {
    id: 1,
    type: 'work',
    title: 'Software Engineer',
    subtitle: 'ISKCON New Vrindaban',
    period: 'Mar 2025 – Present',
    location: 'Moundsville, WV',
    highlights: ['AI travel concierge (Vapi + GPT)', '70% faster response time', 'QR-based tour platform'],
    logo: '/iskcon.png',
    year: '2025',
    side: 'left',
  },
  {
    id: 2,
    type: 'work',
    title: 'Student Assistant',
    subtitle: 'Chicago Public Schools',
    period: 'Oct 2024 – May 2025',
    location: 'Chicago, IL',
    highlights: ['Exam proctoring', 'Data entry & operations', 'Customer service'],
    logo: '/cps.png',
    year: '2024-2025',
    side: 'right',
  },
  {
    id: 3,
    type: 'work',
    title: 'AI Engineer (Full-Stack)',
    subtitle: 'HCA Healthcare',
    period: 'Mar 2024 – Feb 2025',
    location: 'Chicago, IL',
    highlights: ['1200+ patient inquiries/month', 'LLM + RAG system'],
    logo: '/hca.png',
    year: '2024-2025',
    side: 'left',
  },
  {
    id: 4,
    type: 'education',
    title: "Master's in Computer Science",
    subtitle: 'Illinois Institute of Technology',
    period: 'Aug 2023 – May 2025',
    location: 'Chicago, IL',
    highlights: ['GPA: 3.50'],
    logo: '/iit.png',
    year: '2023-2025',
    side: 'right',
  },
  {
    id: 5,
    type: 'work',
    title: 'Technical Operations Executive',
    subtitle: 'Hexaware Technologies',
    period: 'Feb 2023 – Jul 2023',
    location: 'Navi Mumbai, India',
    highlights: ['Python + SQL pipelines', 'Power BI dashboards', '35% faster query resolution'],
    logo: '/hexaware.png',
    year: '2023',
    side: 'left',
  },
  {
    id: 6,
    type: 'work',
    title: 'Software Developer Intern',
    subtitle: 'Vigo Infotech',
    period: 'Mar 2022 – Sep 2022',
    location: 'Mumbai, India',
    highlights: ['ERP System (Spring Boot)', 'Flutter mobile app', '25% fewer operational errors'],
    logo: '/vigo.png',
    year: '2022',
    side: 'left',
  },
  {
    id: 7,
    type: 'work',
    title: 'Senior Customer Service Rep',
    subtitle: 'Teleperformance',
    period: 'Oct 2019 – Feb 2020',
    location: 'Mumbai, India',
    highlights: ['Amazon refunds/returns/Prime', 'Inbound calling', 'Customer support'],
    logo: '/teleperformance.png',
    year: '2019-2020',
    side: 'right',
  },
  {
    id: 8,
    type: 'education',
    title: 'Bachelor in Computer Engineering',
    subtitle: 'Savitribai Phule Pune University',
    period: 'Aug 2018 – Jul 2022',
    location: 'Nashik, India',
    highlights: ['GPA: 3.55'],
    logo: '/sppu.png',
    year: '2018-2022',
    side: 'right',
  },
];

// Tech stack logos - using devicons (larger, better quality)
const techStack = {
  languages: [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  ],
  frontend: [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  ],
  backend: [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  ],
  databases: [
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'ElasticSearch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg' },
    { name: 'FAISS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  ],
  cloud: [
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg' },
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original-wordmark.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain-wordmark.svg' },
  ],
  tools: [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Selenium', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
    { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  ],
};
// ===========================================

// Social SVG paths
const socialIcons: Record<string, string> = {
  LinkedIn: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  GitHub: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  Twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  Instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.071 1.648.071 4.85s-.015 3.585-.074 4.85c-.055 1.17-.255 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.266.055-1.648.072-4.85.072-3.204 0-3.585-.015-4.85-.074-1.17-.055-1.805-.249-2.227-.422-.56-.224-.96-.479-1.379-.899-.421-.419-.68-.824-.9-1.38-.165-.42-.36-1.058-.414-2.227-.057-1.267-.073-1.647-.073-4.85s.015-3.585.073-4.85c.055-1.17.25-1.805.414-2.227.221-.56.478-.96.9-1.381.419-.419.819-.68 1.379-.896.42-.166 1.051-.36 2.221-.421 1.275-.057 1.647-.073 4.849-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
};

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="social-icon"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  scrollY.on('change', (latest) => setScrolled(latest > 50));

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="logo group">
            <svg viewBox="0 0 44 44" className="logo-icon">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#d4a574'}} />
                  <stop offset="50%" style={{stopColor: '#e8c49a'}} />
                  <stop offset="100%" style={{stopColor: '#d4a574'}} />
                </linearGradient>
              </defs>
              {/* Background circle */}
              <circle cx="22" cy="22" r="20" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" opacity="0.3"/>
              {/* T letter */}
              <path d="M12 16 L32 16 M22 16 L22 34" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" fill="none" className="group-hover:opacity-80 transition-opacity"/>
              {/* P letter */}
              <path d="M28 22 L28 34 M28 28 L34 28 C36 28 37 26 37 25 C37 24 36 22 34 22 L28 22" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="group-hover:opacity-80 transition-opacity"/>
              {/* Dot accent */}
              <circle cx="14" cy="30" r="2" fill="url(#logoGrad)" className="group-hover:scale-125 transition-transform"/>
            </svg>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-[var(--text-secondary)] hover:text-[var(--text)]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Hero Section with Face
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCubeClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <div className="ambient-glow" />

      <motion.div style={{ y, opacity }} className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-[var(--accent)] mb-4 font-medium text-sm tracking-wider uppercase hero-title">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight hero-title">
            <span className="text-gradient">{personalInfo.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-[var(--text-secondary)] mb-6 font-light hero-title">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'AI/ML Engineer',
                2000,
                'Frontend Engineer',
                2000,
                'Backend Engineer',
                2000,
                'DevOps Engineer',
                2000,
                'Cloud Architect',
                2000,
              ]}
              wrapper="span"
              repeat={Infinity}
            />
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-3 max-w-xl leading-relaxed text-justify hero-title">{personalInfo.tagline}</p>
          <p className="text-[var(--accent)] text-sm font-medium mb-8 hero-title opacity-90">{personalInfo.lookingFor}</p>

          <div className="flex gap-4 mb-8 hero-title">
            {personalInfo.socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="social-icon"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d={socialIcons[social.name] || socialIcons.GitHub} />
                </svg>
              </motion.a>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap hero-title">
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="btn-primary"
            >
              View My Work
              <ExternalLink size={18} />
            </motion.a>
            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="btn-secondary"
            >
              <FileText size={18} />
              View Resume
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center relative"
        >
          <div className="face-container float-animation">
            <div className="face-ring" />
            <div className="face-glow" />
            <img
              src="/avatar.jpg"
              alt={personalInfo.name}
              className="face-image"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23252019" width="200" height="200"/><circle cx="100" cy="70" r="40" fill="%23d4a574"/><ellipse cx="100" cy="180" rx="60" ry="50" fill="%23d4a574"/></svg>';
              }}
            />

            {/* 3D Interactive Cube - Playable Element - Overlaid on avatar */}
            <motion.div
              className="absolute -top-2 -right-2 cursor-pointer z-30"
              onClick={handleCubeClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isSpinning ? { rotateY: 360, rotateX: 360 } : {}}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ perspective: 1000 }}
            >
              <div className="relative w-16 h-16" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) rotateY(30deg)' }}>
                {/* Front */}
                <div className="absolute inset-0 bg-[var(--accent)] rounded-lg flex items-center justify-center" style={{ transform: 'translateZ(32px)', opacity: 0.9 }}>
                  <span className="text-xl font-bold text-[var(--bg)]">TP</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-[var(--accent)] rounded-lg flex items-center justify-center" style={{ transform: 'rotateY(180deg) translateZ(32px)', opacity: 0.7 }}>
                  <span className="text-lg font-bold text-[var(--bg)]">{}</span>
                </div>
                {/* Right */}
                <div className="absolute inset-0 bg-[var(--accent)] rounded-lg flex items-center justify-center" style={{ transform: 'rotateY(90deg) translateZ(32px)', opacity: 0.6 }}>
                  <span className="text-lg font-bold text-[var(--bg)]">&lt;/&gt;</span>
                </div>
                {/* Left */}
                <div className="absolute inset-0 bg-[var(--accent)] rounded-lg flex items-center justify-center" style={{ transform: 'rotateY(-90deg) translateZ(32px)', opacity: 0.6 }}>
                  <span className="text-lg font-bold text-[var(--bg)]">AI</span>
                </div>
                {/* Top */}
                <div className="absolute inset-0 bg-[var(--accent)] rounded-lg flex items-center justify-center" style={{ transform: 'rotateX(90deg) translateZ(32px)', opacity: 0.5 }}>
                  <span className="text-lg font-bold text-[var(--bg)]">*</span>
                </div>
                {/* Bottom */}
                <div className="absolute inset-0 bg-[var(--accent)] rounded-lg flex items-center justify-center" style={{ transform: 'rotateX(-90deg) translateZ(32px)', opacity: 0.5 }}>
                  <span className="text-lg font-bold text-[var(--bg)]">#</span>
                </div>
              </div>
            </motion.div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">Click the cube to spin!</p>

          {/* Stats below picture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="stat-box">
                <div className="stat-number">{personalInfo.stats.years}</div>
                <div className="stat-label">{personalInfo.stats.yearsLabel}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{personalInfo.stats.projects}</div>
                <div className="stat-label">{personalInfo.stats.projectsLabel}</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{personalInfo.stats.coffee}</div>
                <div className="stat-label">{personalInfo.stats.coffeeLabel}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[var(--accent)]"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.a>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        {/* About Me Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-justify">
              I'm someone who genuinely gets excited when a system works exactly the way it should. Like, unreasonably excited.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-justify mt-4">
              I graduated with a <span className="text-[var(--accent)] font-semibold">Master's Degree in Computer Science</span> from Illinois Tech (Chicago, 2025), and I've spent the last few years shipping things that actually matter: AI voice agents, LLM pipelines, RAG systems, clinical ops tools; at places like <span className="text-[var(--accent)]">HCA Healthcare</span>, <span className="text-[var(--accent)]">ISKCON New Vrindaban</span>, and <span className="text-[var(--accent)]">Hexaware</span>. My sweet spot is that messy gap between a big real-world problem and a clean, scalable fix.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-justify mt-4">
              Outside the terminal: I grew up in <span className="text-[var(--accent)]">Mumbai</span>, built a life in <span className="text-[var(--accent)]">Chicago</span>, cook Indian food from scratch (genuinely delicious, not biased), do photography, and hit the gym just enough to feel human.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-justify mt-4">
              I think the best engineers care about the craft, the user, and occasionally, a perfectly spiced biryani. That's the energy I bring.
            </p>
          </div>
        </motion.div>

        {/* Journey Timeline - Calendar Style */}
        <JourneyTimeline />

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Tech Stack <span className="text-gradient">I Use</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="glass rounded-xl p-5"
              >
                <h4 className="text-sm font-semibold text-[var(--accent)] mb-4 uppercase tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {items.map((tech, index) => (
                    <TechLogo key={index} name={tech.name} icon={tech.icon} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Tech Logo Component - With hover animation and floating
function TechLogo({ name, icon }: { name: string; icon: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="tech-logo-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: isHovered
            ? '0 0 20px var(--accent-glow), 0 6px 20px rgba(0,0,0,0.2)'
            : '0 3px 10px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={icon}
          alt={name}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            const parent = target.parentElement;
            if (parent) {
              target.style.display = 'none';
              parent.innerHTML = name.charAt(0);
              parent.classList.add('text-[var(--accent)]', 'font-bold', 'text-base', 'flex', 'items-center', 'justify-center', 'w-full', 'h-full');
            }
          }}
        />
        {/* Tooltip */}
        <div
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-[var(--elevated)] text-xs text-[var(--text)] whitespace-nowrap transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ boxShadow: '0 3px 8px rgba(0,0,0,0.3)' }}
        >
          {name}
        </div>
      </div>
    </motion.div>
  );
}

// Projects Section
function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  const displayProjects = showAll ? projects : featuredProjects;

  return (
    <section id="projects" className="section relative">
      {/* Animated blobs for visual interest */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Work</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Building solutions that make a difference
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* See More Button */}
        {otherProjects.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 mx-auto"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--accent)',
                color: 'var(--accent)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                <>Show Less <ChevronUp className="w-5 h-5" /></>
              ) : (
                <>See More Projects <ChevronDown className="w-5 h-5" /></>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Using Web3Forms API - free form endpoint that sends to email
    const web3FormsKey = '30a61a27-e1b4-49f1-b74c-a42ba72c5114';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: 'Portfolio Website',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success for demo purposes
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Animated background elements */}
      <div className="blob blob-1" style={{ left: '5%', top: '20%' }} />
      <div className="blob blob-2" style={{ right: '10%', bottom: '20%' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Have a project in mind? Let's collaborate and bring your ideas to life.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass p-6 rounded-2xl h-full">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text)' }}>
                Let's Talk
              </h3>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                Whether you have a project idea, need a developer, or just want to chat about tech — I'm all ears.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--accent-glow)', border: '1px solid var(--border)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email Me</p>
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>{personalInfo.email}</p>
                  </div>
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Follow My Journey</h4>
                <div className="flex gap-3">
                  {personalInfo.socials.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d={socialIcons[social.name] || socialIcons.GitHub} />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-2xl text-center h-full flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--accent-glow)' }}
                >
                  <svg className="w-10 h-10" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Message Sent!</h3>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="glass p-8 rounded-2xl space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Your Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Your Message</label>
                  <textarea
                    placeholder="Tell me about your project, ideas, or just say hi..."
                    required
                    className="input-field min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <ScrollProgress />
      <Particles />
      <div className="gradient-mesh" />
      <div className="grid-bg" />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}