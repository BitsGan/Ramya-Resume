export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'mobile' | 'web' | 'ai';
  technologies: string[];
  period: string;
  description: string[];
  keyHighlights: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  hasInteractiveDemo: boolean;
  demoType: 'math-matrix' | 'bits-website' | 'gesture-ai';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    proficiency: number; // 0-100
    experience: string;
    snippet?: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  scoreType: 'CGPA' | 'Percentage';
  score: string;
  maxScore: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  badgeType: 'Networking' | 'Frontend' | 'Scripting' | 'Mobile';
  description: string;
  date: string;
}

export interface HonorItem {
  title: string;
  event: string;
  achievement: string;
  description: string;
}

export interface SocialAccount {
  name: string;
  handle: string;
  url: string;
  icon: string;
  description: string;
  directAction?: string;
}
