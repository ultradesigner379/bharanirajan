export type SkillGroup = {
  title: string
  icon: string
  accent: 'teal' | 'rose' | 'amber'
  skills: string[]
}

export type Project = {
  id: string
  title: string
  category: string
  image: string
  summary: string
  description: string
  tools: string[]
  highlights: string[]
}

export type EducationItem = {
  degree: string
  institution: string
  period: string
  detail: string
  status?: string
}

export const profile = {
  name: 'S. Bharani Rajan',
  brand: 'Ultra Designer',
  brandShort: 'UD',
  headline: '3D Animator, Graphic Designer & AI Enthusiast',
  tagline: 'Bridging visual storytelling and modern technology.',
  summary:
    'Final-year B.Sc. Animation student and freelance graphic designer behind Ultra Designer (UD). I bridge visual storytelling and modern technology—combining 3D modeling, UI/UX, and brand identity with Generative AI, prompt engineering, and web development to build engaging digital experiences.',
  location: 'Chennai, Tamil Nadu, India',
  phone: '+91 6369010630',
  phoneHref: 'tel:+916369010630',
  email: 'bharanirajan360@gmail.com',
  emailHref: 'mailto:bharanirajan360@gmail.com',
  github: 'https://github.com/',
  githubLabel: 'github.com/bharanirajan',
  linkedin: 'https://www.linkedin.com/',
  linkedinLabel: 'LinkedIn',
  behance: 'https://www.behance.net/',
  behanceLabel: 'Behance',
}

export const stats = [
  { value: '4+', label: 'Years Crafting' },
  { value: '50+', label: 'Designs Delivered' },
  { value: '12+', label: 'Tools Mastered' },
  { value: '2027', label: 'Graduating' },
]

export const education: EducationItem[] = [
  {
    degree: 'B.Sc. in Animation',
    institution: 'Alagappa University',
    period: '2024 — 2027',
    detail:
      'Final year. Specializing in 3D animation, modeling, visual effects, and digital storytelling.',
    status: 'Final Year',
  },
  {
    degree: 'Higher Secondary Certificate (HSC — Bio Maths)',
    institution: 'Pullur Higher Secondary School',
    period: '2024',
    detail:
      'Completed with a focus on Biology and Mathematics — building analytical and creative foundations.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: '3D & Animation',
    icon: 'cube',
    accent: 'teal',
    skills: ['Autodesk Maya', 'Blender'],
  },
  {
    title: 'Design & UI/UX',
    icon: 'palette',
    accent: 'rose',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'CorelDRAW', 'Figma', 'Canva'],
  },
  {
    title: 'Tech & AI',
    icon: 'cpu',
    accent: 'amber',
    skills: [
      'Generative AI',
      'Prompt Engineering',
      'Python',
      'SQL',
      'HTML',
      'CSS',
      'JavaScript',
      'Flask',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'ud-brand',
    title: 'Ultra Designer (UD) Brand & Freelance Portfolio',
    category: 'Brand Identity',
    image: '/portfolio/project-ud.png',
    summary:
      'Complete brand identity, custom UD monogram, client onboarding workflows, and commercial promotional designs.',
    description:
      'A full-stack freelance design studio identity. Includes the custom UD monogram, brand guidelines, client onboarding workflows, and a portfolio of commercial promotional designs — featuring AEROdrone & ROBO Tech Fest 2026 posters and corporate campaigns.',
    tools: ['Illustrator', 'Photoshop', 'CorelDRAW', 'Canva'],
    highlights: [
      'Custom UD monogram & brand guidelines',
      'AEROdrone & ROBO Tech Fest 2026 posters',
      'Corporate promotional campaigns',
      'Client onboarding workflow design',
    ],
  },
  {
    id: 'resume-ai',
    title: 'Resume Builder AI Bot',
    category: 'AI Web App',
    image: '/portfolio/project-resume.png',
    summary:
      'An AI-powered web application designed to help students and job seekers generate tailored, professional resumes dynamically.',
    description:
      'A full-stack AI web app that generates tailored, professional resumes dynamically. Users input their background, and the AI produces polished, role-specific resume content — making job applications faster and more effective for students and job seekers.',
    tools: ['Generative AI', 'HTML', 'CSS', 'JavaScript', 'Python'],
    highlights: [
      'Dynamic AI-driven resume generation',
      'Role-specific content tailoring',
      'Clean, export-ready resume templates',
      'Built with a lightweight Flask backend',
    ],
  },
  {
    id: 'jewelry',
    title: 'Bespoke Jewelry Concept & Technical Sheets',
    category: '3D Design',
    image: '/portfolio/project-jewelry.png',
    summary:
      'High-detail jewelry design concepts and technical specification sheets featuring custom chains, interlocking pendants, and gemstone layouts.',
    description:
      'High-detail jewelry design concepts and technical specification sheets. The work features custom chains, interlocking pendant mechanisms, and precise gemstone layouts — engineered for manufacturing with clear technical documentation.',
    tools: ['3D Modeling', 'Digital Illustration', 'Photoshop'],
    highlights: [
      'Custom chain & interlocking pendant concepts',
      'Precise gemstone layout sheets',
      'Manufacturing-ready technical specs',
      'Photoreal 3D material studies',
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX Prototyping & Digital Art',
    category: 'UI/UX & Illustration',
    image: '/portfolio/project-uiux.png',
    summary:
      'Interactive app/web prototypes alongside hand-drawn pencil art converted into clean digital illustrations and logos.',
    description:
      'A dual-track creative practice: interactive app and web prototypes built in Figma, alongside hand-drawn pencil artwork converted into clean vector digital illustrations and logos. Bridges traditional art skills with modern digital workflows.',
    tools: ['Figma', 'Blender', 'Photoshop'],
    highlights: [
      'Interactive Figma app & web prototypes',
      'Pencil-to-vector illustration pipeline',
      'Custom logo design system',
      '3D-enhanced digital artwork',
    ],
  },
]

export const certificates = [
  {
    title: 'Magic Bus AI Certification',
    issuer: 'Magic Bus',
    detail: 'Certified in Generative AI and foundational AI workflows.',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]
