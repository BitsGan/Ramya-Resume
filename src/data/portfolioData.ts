export interface ProjectItem {
  id: string;
  title: string;
  description?: string[];
  technologies: string[];
  githubUrl: string;
  screenshot: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gradeLabel: string;
  gradeValue: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
}

export const PERSONAL_INFO = {
  name: 'Anthati Ramya',
  title: 'Full Stack Java Developer',
  email: 'ramyaanthati123@gmail.com',
  phone: '6300799934',
  formattedPhone: '+91 6300799934',
  location: 'Borlagudem, Bhupalpally, Telangana, India.',
  githubUrl: 'https://github.com/bitsramya',
  linkedinUrl: 'https://www.linkedin.com/in/anthati-ramya',
  resumePdfUrl: '/Anthati_Ramya_Resume.pdf',
  fallbackPdfUrl: '/Accelor-hackerresume.pdf',
  profileImage: '/profile.jpg',
  intro:
    'I am a Computer Science and Engineering student interested in software development, full-stack technologies, mobile application development, and problem-solving. I enjoy building practical applications and exploring new technologies to develop useful solutions.'
};

export const EDUCATION_LIST: EducationEntry[] = [
  {
    degree: 'B.Tech – Computer Science and Engineering',
    institution: 'Balaji Institute of Technology and Science, Narsampet',
    location: 'Narsampet, Warangal',
    period: 'August 2023 – May 2027',
    gradeLabel: 'CGPA',
    gradeValue: '8.79'
  },
  {
    degree: 'Intermediate – Full-time',
    institution: 'TS Model Junior College, Jayashankar Bhupalpally',
    location: 'Jayashankar Bhupalpally, Telangana, India',
    period: 'June 2021 – May 2023',
    gradeLabel: 'Percentage',
    gradeValue: '91%'
  },
  {
    degree: 'SSC',
    institution: 'TS Model School, Jayashankar Bhupalpally',
    location: 'Jayashankar Bhupalpally, Telangana, India',
    period: 'June 2019 – May 2021',
    gradeLabel: 'CGPA',
    gradeValue: '10.0'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    skills: ['C', 'Python', 'Java', 'Dart', 'HTML', 'CSS', 'JavaScript']
  },
  {
    category: 'Frameworks and Libraries',
    skills: ['Flutter', 'React']
  },
  {
    category: 'Tools and Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Cisco Packet Tracer']
  },
  {
    category: 'Database',
    skills: ['MySQL']
  },
  {
    category: 'Other Skills',
    skills: ['Web Development', 'Problem Solving']
  }
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'math-matrix',
    title: 'Math Matrix (Flutter App)',
    description: [
      'A mathematics gaming application built using Flutter and Dart.',
      'Firebase is used as the backend.',
      'An interesting mathematics learning game helpful for students.'
    ],
    technologies: ['Flutter', 'Dart', 'Gradle', 'Android Studio', 'Firebase'],
    githubUrl: 'https://github.com/bitsramya',
    screenshot: '/projects/math_matrix.jpg'
  },
  {
    id: 'bits-college-website',
    title: 'BITS College Website',
    description: [
      'Developed a college website using HTML tags to create its basic structure.',
      'Styled the website using CSS at different levels.',
      'Validated and made the website responsive, gaining practical web development experience.'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    githubUrl: 'https://github.com/bitsramya',
    screenshot: '/projects/bits_college.jpg'
  },
  {
    id: 'gesture-ai',
    title: 'AI-Based Virtual Mouse and Keyboard Using Hand Gestures',
    description: [],
    technologies: ['Python', 'Computer Vision', 'Gesture Recognition'],
    githubUrl: 'https://github.com/bitsramya',
    screenshot: '/projects/gesture_ai.jpg'
  }
];

export const CERTIFICATIONS_LIST: CertificationEntry[] = [
  {
    title: 'HTML Essentials',
    issuer: 'NetAcad Academy'
  },
  {
    title: 'CSS Essentials',
    issuer: 'Cisco NetAcad Academy'
  },
  {
    title: 'Certification on Completing Scripting Languages',
    issuer: 'CodeTantra'
  },
  {
    title: 'Android Development Virtual Internship',
    issuer: 'EduSkills'
  }
];

export const HONORS_LIST: string[] = [
  'Hackathon Febgenesis – Reached up to Round 2.',
  'Active participant in coding competitions and hackathons.',
  'Strong interest in Networking, Cybersecurity, AI, and Software Development.'
];
