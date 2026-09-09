export interface Skill {
  name: string;
  logo: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      // { name: "TypeScript", logo: "/icons/typescript.svg" },
      { name: "Angular", logo: "/icons/angular.svg" },
      { name: "NgRx", logo: "/icons/ngrx.svg" },
      { name: "RxJS", logo: "/icons/rxjs.svg" },
      { name: "Tailwind CSS", logo: "/icons/tailwindcss.svg" },
      { name: "PrimeNG", logo: "/icons/primeng.svg" },
      // { name: "Angular Material", logo: "/icons/angularmaterial.svg" },
      { name: "React", logo: "/icons/react.svg" },
      // { name: "Next.js", logo: "/icons/nextjs.svg" },
      // devicon has no TanStack Query icon, fall back to text-only
      { name: "TanStack Query", logo: "" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", logo: "/icons/nodejs.svg" },
      // { name: "Python", logo: "/icons/python.svg" },
      // { name: "FastAPI", logo: "/icons/fastapi.svg" },
      { name: "Express", logo: "/icons/express.svg" },
      { name: "NestJS", logo: "/icons/nestjs.svg" },
      // { name: "JWT", logo: "" },
      { name: "Socket.IO", logo: "/icons/socketio.svg" },
      { name: "WebRTC", logo: "" },
      { name: "Puppeteer", logo: "/icons/puppeteer.svg" },
      { name: "RabbitMQ", logo: "/icons/rabbitmq.svg" },
      // { name: "Kafka", logo: "/icons/apachekafka.svg" },
      // { name: "gRPC", logo: "/icons/grpc.svg" }
    ],
  },
  {
    name: "Databases & ORM",
    skills: [
      { name: "MongoDB", logo: "/icons/mongodb.svg" },
      { name: "PostgreSQL", logo: "/icons/postgresql.svg" },
      { name: "MySQL", logo: "/icons/mysql.svg" },
      { name: "Redis", logo: "/icons/redis.svg" },
      { name: "TypeORM", logo: "" },
      { name: "Prisma", logo: "/icons/prisma.svg" },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Git", logo: "/icons/git.svg" },
      { name: "Docker", logo: "/icons/docker.svg" },
      { name: "AWS", logo: "/icons/aws.svg" },
      // { name: "Lambda", logo: "" },
      { name: "CI/CD", logo: "" },
      { name: "GitHub Actions", logo: "/icons/github.svg" },
      { name: "Terraform", logo: "/icons/terraform.svg" },
      // { name: "Ansible", logo: "/icons/ansible.svg" },
      // { name: "Prometheus", logo: "/icons/prometheus.svg" },
      // { name: "Loki", logo: "/icons/loki.svg" },
      // { name: "Grafana", logo: "/icons/grafana.svg" },
      // { name: "Kubernetes", logo: "/icons/kubernetes.svg" },
    ],
  },
];
