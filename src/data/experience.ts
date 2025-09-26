export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  description?: string;
  achievements?: string[];
  projects: Project[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Aquacodes Technologies Pvt Ltd",
    role: "MEAN Stack Developer",
    duration: "Jan 2024 - Dec 2024",
    location: "Noida, Delhi NCR, UP",
    projects: [
      {
        name: 'Employee Monitoring System',
        description: 'Designed and developed an employee monitoring system with real-time activity tracking, reporting, and multi-tenancy support. Integrated Laravel and Node.js services with PowerShell scripts for automated data collection and management.',
        technologies: ['Node.js', "MySQL", 'Angular', "Laravel", "Multi-tenancy", "Powershell"]
      },
      {
        name: 'Automation Tool - Web Scrapping',
        description: 'Developed a high-performance automation tool for scraping structured data from dynamic websites using Puppeteer. Implemented scheduling, error handling, and data export to ensure consistent and reliable extraction.',
        technologies: ['Node.js', "Puppeteer", "Express", "MySQL", 'TypeORM', 'Angular', 'PrimeNG']
      },
      {
        name: 'E-Commerce',
        description: 'Developed a full-stack e-commerce application with user authentication, product catalog, advanced search and filtering, and order management.',
        technologies: ['Node.js', "Express", "MySQL", 'TypeORM', 'Angular', 'PrimeNG']
      },
    ]
  },
];