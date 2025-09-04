export interface Project {
  id: string;
  name: string;
  subheading: string;
  logo: string;
  description: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    subheading: "Full-stack e-commerce solution with modern UI/UX",
    logo: "/api/placeholder/300/200",
    description: "A comprehensive e-commerce platform built with Next.js, featuring user authentication, payment processing, inventory management, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    features: [
      "User authentication and authorization system",
      "Product catalog with search and filtering",
      "Shopping cart and checkout process",
      "Payment integration with Stripe",
      "Admin dashboard for inventory management",
      "Order tracking and email notifications",
      "Responsive design for all devices"
    ],
    demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "task-management-app",
    name: "Task Management App",
    subheading: "Collaborative project management tool",
    logo: "/api/placeholder/300/200",
    description: "A modern task management application that helps teams organize, track, and collaborate on projects with real-time updates and intuitive interface.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"],
    features: [
      "Real-time collaboration with WebSocket",
      "Drag-and-drop task organization",
      "Team member assignment and notifications",
      "Project timeline and deadline tracking",
      "File attachment and comment system",
      "Progress analytics and reporting",
      "Mobile-responsive design"
    ],
    demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "weather-dashboard",
    name: "Weather Dashboard",
    subheading: "Real-time weather monitoring and forecasting",
    logo: "/api/placeholder/300/200",
    description: "An interactive weather dashboard that provides current conditions, forecasts, and historical data with beautiful visualizations and location-based services.",
    technologies: ["Vue.js", "D3.js", "OpenWeather API", "PWA", "Service Workers", "CSS Grid"],
    features: [
      "Current weather conditions and forecasts",
      "Interactive maps with weather overlays",
      "Historical weather data visualization",
      "Location-based weather alerts",
      "Offline functionality with PWA",
      "Customizable dashboard widgets",
      "Multi-language support"
    ],
    demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "social-media-analytics",
    name: "Social Media Analytics",
    subheading: "Comprehensive social media performance tracking",
    logo: "/api/placeholder/300/200",
    description: "A powerful analytics platform that tracks social media performance across multiple platforms, providing insights and recommendations for content optimization.",
    technologies: ["Angular", "Python", "Django", "Redis", "Chart.js", "Docker"],
    features: [
      "Multi-platform social media integration",
      "Real-time engagement metrics",
      "Content performance analysis",
      "Audience demographics and insights",
      "Competitor analysis and benchmarking",
      "Automated reporting and alerts",
      "Custom dashboard creation"
    ],
    demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "fitness-tracker",
    name: "Fitness Tracker",
    subheading: "Personal health and fitness monitoring app",
    logo: "/api/placeholder/300/200",
    description: "A comprehensive fitness tracking application that monitors workouts, nutrition, and health metrics with gamification elements and social features.",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "HealthKit", "Google Fit"],
    features: [
      "Workout tracking and exercise library",
      "Nutrition logging and meal planning",
      "Health metrics monitoring",
      "Goal setting and progress tracking",
      "Social challenges and leaderboards",
      "Wearable device integration",
      "Personalized recommendations"
    ],
    demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "crypto-portfolio",
    name: "Crypto Portfolio Tracker",
    subheading: "Cryptocurrency portfolio management and analysis",
    logo: "/api/placeholder/300/200",
    description: "A sophisticated cryptocurrency portfolio tracker that provides real-time price monitoring, portfolio analysis, and trading insights with advanced charting capabilities.",
    technologies: ["Next.js", "TypeScript", "WebSocket", "CoinGecko API", "Recharts", "Framer Motion"],
    features: [
      "Real-time cryptocurrency price tracking",
      "Portfolio performance analytics",
      "Advanced charting and technical analysis",
      "Price alerts and notifications",
      "Tax reporting and transaction history",
      "DeFi protocol integration",
      "Mobile app with offline support"
    ],
    demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];