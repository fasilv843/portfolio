export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  projects: Project[];
}

export const experiences: Experience[] = [
  {
    id: "senior-dev-current",
    company: "TechCorp Solutions",
    role: "Senior Full-Stack Developer",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    description: "Leading development of scalable web applications and mentoring junior developers in modern JavaScript frameworks and cloud technologies.",
    achievements: [
      "Led a team of 5 developers in building a microservices architecture",
      "Improved application performance by 40% through code optimization",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored 3 junior developers who were promoted within 12 months"
    ],
    projects: [
      {
        name: "Enterprise Dashboard Platform",
        description: "Built a comprehensive dashboard for enterprise clients with real-time analytics and customizable widgets",
        technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"]
      },
      {
        name: "API Gateway Service",
        description: "Developed a scalable API gateway handling 10M+ requests daily with authentication and rate limiting",
        technologies: ["Node.js", "Express", "Redis", "JWT", "Kubernetes"]
      },
      {
        name: "Mobile App Backend",
        description: "Created RESTful APIs and WebSocket services for a mobile application with 100K+ active users",
        technologies: ["Node.js", "Socket.io", "MongoDB", "AWS", "Docker"]
      }
    ]
  },
  {
    id: "fullstack-dev-previous",
    company: "InnovateLab",
    role: "Full-Stack Developer",
    duration: "2020 - 2022",
    location: "Austin, TX",
    description: "Developed full-stack web applications using modern frameworks and collaborated with cross-functional teams to deliver high-quality software solutions.",
    achievements: [
      "Built 3 major web applications from concept to deployment",
      "Reduced bug reports by 50% through comprehensive testing",
      "Collaborated with UX/UI designers to improve user experience",
      "Contributed to open-source projects with 500+ GitHub stars"
    ],
    projects: [
      {
        name: "E-Learning Platform",
        description: "Developed a comprehensive e-learning platform with video streaming, quizzes, and progress tracking",
        technologies: ["Vue.js", "Laravel", "MySQL", "AWS S3", "Stripe"]
      },
      {
        name: "Inventory Management System",
        description: "Created a real-time inventory management system with barcode scanning and automated reordering",
        technologies: ["React", "Express", "MongoDB", "Socket.io", "Bootstrap"]
      },
      {
        name: "Social Media Analytics Tool",
        description: "Built analytics dashboard for social media performance tracking across multiple platforms",
        technologies: ["Angular", "Python", "Django", "PostgreSQL", "Chart.js"]
      }
    ]
  },
  {
    id: "junior-dev-first",
    company: "StartupXYZ",
    role: "Junior Frontend Developer",
    duration: "2019 - 2020",
    location: "Seattle, WA",
    description: "Started my professional journey building responsive web interfaces and learning modern development practices in a fast-paced startup environment.",
    achievements: [
      "Developed responsive web interfaces for 5+ client projects",
      "Learned modern JavaScript frameworks and best practices",
      "Contributed to agile development processes and code reviews",
      "Improved page load times by 30% through optimization techniques"
    ],
    projects: [
      {
        name: "Company Website Redesign",
        description: "Redesigned the company website with modern UI/UX and improved accessibility",
        technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery"]
      },
      {
        name: "Client Portal",
        description: "Built a client portal for project management and communication",
        technologies: ["React", "Material-UI", "REST APIs", "Axios"]
      },
      {
        name: "Landing Page Templates",
        description: "Created reusable landing page templates for marketing campaigns",
        technologies: ["HTML5", "CSS3", "JavaScript", "Sass", "Gulp"]
      }
    ]
  }
];