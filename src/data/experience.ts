/**
 * Named `ExperienceProject`, not `Project`: `data/projects.ts` exports a
 * differently-shaped `Project`, and two identically-named types one import away
 * from each other is a trap waiting for whoever imports the wrong one.
 */
export interface ExperienceProject {
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
  projects: ExperienceProject[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Paywint",
    role: "Software Engineer",
    duration: "Oct 2025 - Aug 2026",
    location: "Kochi",
    description:
      "Worked across two fintech products — a check payment platform and a financial API service — building production Angular and React frontends, with an emphasis on secure, validation-heavy financial workflows.",
    projects: [
      {
        name: "FiChecks - Check Payment Platform",
        description:
          "Built the Angular frontend for a check payment platform covering check issuance, deposits and payment status tracking. Implemented reactive form flows for payment and payee data with RxJS-driven state management, and a responsive Tailwind CSS interface for the dashboard and transaction views.",
        technologies: ["Angular", "RxJs", "Tailwind CSS"],
      },
      {
        name: "Finogates - FinTech API Provider",
        description:
          "Contributed full-stack to a FinTech API platform that exposes financial data and payment APIs to third-party developers. Built the React console with TanStack Query for server-state handling and caching, and implemented the backing service endpoints in Python with FastAPI.",
        technologies: [
          "React",
          "Tanstack Query",
          "Tailwind CSS",
          "Python",
          "FastAPI",
        ],
      },
    ],
  },
  {
    id: 2,
    company: "Aquacodes Technologies Pvt Ltd",
    role: "MEAN Stack Developer",
    duration: "Jan 2024 - Dec 2024",
    location: "Noida, Delhi NCR, UP",
    description:
      "Delivered internal tooling and customer-facing products as a MEAN stack developer, spanning real-time employee monitoring, browser automation and e-commerce. Owned features end to end across Angular frontends and Node.js/MySQL backends.",
    projects: [
      {
        name: "Employee Monitoring System",
        description:
          "Designed and developed an employee monitoring system with real-time activity tracking, reporting, and multi-tenancy support. Integrated Laravel and Node.js services with PowerShell scripts for automated data collection and management.",
        technologies: [
          "Node.js",
          "MySQL",
          "Angular",
          "Laravel",
          "Multi-tenancy",
          "Powershell",
        ],
      },
      {
        name: "Automation Tool - Web Scrapping",
        description:
          "Developed a high-performance automation tool for scraping structured data from dynamic websites using Puppeteer. Implemented scheduling, error handling, and data export to ensure consistent and reliable extraction.",
        technologies: [
          "Node.js",
          "Puppeteer",
          "Express",
          "MySQL",
          "TypeORM",
          "Angular",
          "PrimeNG",
        ],
      },
      {
        name: "E-Commerce",
        description:
          "Developed a full-stack e-commerce application with user authentication, product catalog, advanced search and filtering, and order management.",
        technologies: [
          "Node.js",
          "Express",
          "MySQL",
          "TypeORM",
          "Angular",
          "PrimeNG",
        ],
      },
    ],
  },
];
