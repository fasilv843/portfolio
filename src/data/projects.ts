export interface Project {
  id: string;
  name: string;
  subheading: string;
  logo: string;
  image?: string;
  description: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  liveLink?: string;
  sourceCode?: string;
}

export const projects: Project[] = [
  {
    id: "cinesnap",
    name: "CineSnap",
    subheading: "A Movie Booking Website",
    logo: "/api/placeholder/300/200",
    description:
      "CineSnap is a full-featured movie booking platform that simplifies ticket purchases while providing real-time updates and a seamless user experience.",
    technologies: [
      "Angular",
      "TypeScript",
      "MongoDB",
      "Node",
      "Express",
      "AWS",
      "Github Actions",
      "Docker",
    ],
    features: [
      "Devised location-based theater recommendations to improve booking relevance for users",
      "Applied debouncing for search functionality, reducing API calls by up to 80% during rapid input, optimizing perceived performance.",
      "Incorporated Geopify's address auto-fill for enhanced user experience during form completion.",
      "Formulated a seat categorization strategy to optimize theater pricing and enhance revenue management.",
      "Designed an admin-controlled theater approval process to reduce unnecessary registrations.",
      "Automated invoice generation and email delivery using Puppeteer and EJS to streamline administrative tasks.",
      "Implemented real-time communication features using Socket.IO, increasing customer support efficiency.",
      "Structured a backend system with 70+ modular API routes, applying Clean Architecture principles using Node.js, Express.js, and MongoDB.",
      "Developed a responsive UI with Angular, NgRx and TailwindCSS, ensuring compatibility across devices.",
      "Architected an in-app wallet, streamlining transactions and reducing booking time by an estimated 25% for repeat customers.",
      "Dockerized application with multi-stage builds, removing development dependencies and build cache for production, cutting image size from 600MB+ to 200MB and improving deployment speed and resource efficiency",
      "Implemented automated CI/CD pipelines with GitHub Actions to push updated Docker images to GitHub Container Registry and deploy to AWS EC2 with minimal downtime.",
      "Hosted frontend on AWS S3 with CloudFront and automated sync workflow, ensuring fast content delivery and continuous updates on code push.",
      "Configured AWS production infrastructure including EC2 setup, security groups, Elastic IP, Route 53 custom domains, and ACM SSL certificates for secure, scalable, and highly available access.",
    ],
    // demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    liveLink: "https://cinesnap.fasilv.in",
    sourceCode: "https://github.com/fasilv843/CineSnap-BackEnd",
    // image: 'https://media.istockphoto.com/id/1163541604/photo/close-up-back-rear-behind-photo-handsome-he-him-his-guy-typing-writing-keyboard-development.jpg?s=1024x1024&w=is&k=20&c=8BmEEIsNoF87omt613I3OJjk9U_armpjn8s4KYSIe_E='
  },
  {
    id: "gentsgarage",
    name: "Gents Garage",
    subheading: "An E-Commerce Platform for Gent's Accessories",
    logo: "/api/placeholder/300/200",
    description:
      "Gents Garage is a modern e-commerce platform for men's accessories, designed to offer smooth browsing, reliable payments, and efficient order management.",
    technologies: ["Node", "Express", "MongoDB", "EJS", "Bootstrap"],
    features: [
      "Built a secure and scalable e-commerce platform utilizing MongoDB, Node.js, Express.js, and AWS technologies to accommodate future growth.",
      "Deployed product image zoom functionality for detailed product inspection.",
      "Integrated Razorpay and multiple payment methods (COD, wallet), supporting 100% of user checkout preferences and improving transaction reliability.",
      "Simplified the admin panel to provide more insightful sales and analytics reports for improved business decisions.",
      "Designed a coupon and offers system to enhance profitability by targeting promotions effectively.",
      "Enabled an intuitive cart and wishlist system, allowing users to save items and streamline the checkout process.",
    ],
    // demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    liveLink: "https://gentsgarage.fasilv.in",
    sourceCode: "https://github.com/fasilv843/Gents-Garage",
    // image: 'https://media.istockphoto.com/id/1163541604/photo/close-up-back-rear-behind-photo-handsome-he-him-his-guy-typing-writing-keyboard-development.jpg?s=1024x1024&w=is&k=20&c=8BmEEIsNoF87omt613I3OJjk9U_armpjn8s4KYSIe_E='
  },
  {
    id: "passerby",
    name: "Passerby",
    subheading: "A peer-to-peer real time video call app",
    logo: "/api/placeholder/300/200",
    description:
      "Passerby is a peer-to-peer real-time video chat application that enables seamless communication with dynamic room management and low-latency connections.",
    technologies: [
      "Node",
      "Socket.io",
      "WebRTC",
      "React",
      "TypeScript",
      "Redis",
    ],
    features: [
      "Developed a full-stack real-time video chat application using Node.js, TypeScript, Socket.IO, WebRTC, and React, enabling peer-to-peer communication with dynamic room management.",
      "Implemented Redis caching and Socket.IO Redis adapter to support distributed services, ensuring horizontal scalability and consistent room synchronization across multiple instances.",
      "Enhanced user experience by optimizing signaling flows, reducing connection setup latency, and ensuring efficient resource cleanup during frequent peer transitions.",
      "Improved system observability by adding Loki logging, Prometheus metrics, and Grafana dashboards, enabling performance monitoring, error tracking, and proactive debugging across the stack.",
    ],
    // demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    liveLink: "https://passerby.fasilv.in",
    sourceCode: "https://github.com/fasilv843/passerby",
    // image: 'https://media.istockphoto.com/id/1163541604/photo/close-up-back-rear-behind-photo-handsome-he-him-his-guy-typing-writing-keyboard-development.jpg?s=1024x1024&w=is&k=20&c=8BmEEIsNoF87omt613I3OJjk9U_armpjn8s4KYSIe_E='
  },
  {
    id: "trace53",
    name: "Trace53",
    subheading: "An Authoritative DNS Server",
    logo: "/api/placeholder/300/200",
    description:
      "Trace53 is a custom DNS server built for accuracy, speed, and robust handling of complex domain queries.",
    technologies: ["Node", "TypeScript"],
    features: [
      "Developed a custom DNS server using Node.js and the dgram module to handle high-performance UDP-based DNS queries and responses.",
      "Implemented zone-based record resolution logic, supporting multiple DNS record types including A, AAAA, MX, CNAME, TXT, NS, SRV, and PTR.",
      "Handled edge cases including NXDOMAIN, NOTIMP, and other response codes, ensuring proper DNS protocol error handling.",
      "Integrated the dns-packet npm library to encode and decode DNS binary packets, ensuring protocol-compliant communication.",
      "Deployed the DNS server on port 53 and tested query resolution for multiple domains and subdomains using dig, ensuring accurate and protocol-compliant responses.",
    ],
    // demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceCode: "https://github.com/fasilv843/Trace53",
  },
  {
    id: "microservice-sample",
    name: "Microservice Demo",
    subheading: "A Sample microservice social media backend",
    logo: "/api/placeholder/300/200",
    description:
      "A sample microservices backend demonstrating scalable, modular architecture with event-driven communication and centralized logging for social media applications.",
    technologies: ["Node", "Express", "Redis", "Docker", "RabbitMQ", "Winston"],
    features: [
      "Designed and implemented a microservices architecture with Node.js and Express, splitting core functionality into API Gateway, Identity, Post, Media, and Search services.",
      "Developed and integrated API Gateway with rate limiting using express-rate-limit and Redis to protect against abuse and ensure high availability of sensitive endpoints.",
      "Implemented inter-service communication with RabbitMQ to enable scalable, decoupled event-driven workflows.",
      "Optimized performance by introducing Redis caching layer, reducing database load and improving response times.",
      "Built a centralized logging system using Winston for monitoring, troubleshooting, and auditing.",
      "Containerized microservices with Docker and orchestrated them using Docker Compose, enabling seamless local deployment and consistent development environments.",
    ],
    // demoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sourceCode: "https://github.com/fasilv843/microservice-social-media",
  },
];
