import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { experiences } from '@/data/experience';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold gradient-text">
              Fasil Valiyattil
            </h1>
            <h2 className="text-2xl lg:text-3xl text-green-300 font-semibold">
              Full-Stack Developer
            </h2>
            <p className="text-lg text-gray-300 max-w-lg">
              Passionate about creating exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://linkedin.com/in/fasilv843" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/fasilv843" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-green-500 to-lime-500 rounded-full flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">About Me</h2>
          <div className="bg-gradient-to-r from-green-900/30 to-lime-900/30 rounded-2xl p-8 border border-green-500/20">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience building scalable web applications. 
              I specialize in modern JavaScript frameworks, cloud technologies, and creating exceptional user experiences. 
              My journey in tech started with curiosity and has evolved into a deep love for solving complex problems 
              through elegant code and innovative solutions.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date 
              with the latest industry trends and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category) => (
              <div key={category.name} className="bg-gradient-to-br from-green-900/40 to-lime-900/40 rounded-xl p-6 border border-green-500/20">
                <h3 className="text-xl font-semibold text-green-300 mb-4">{category.name}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center space-x-3">
                      <Image
                        src={skill.logo}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span className="text-gray-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-gradient-to-br from-green-900/40 to-lime-900/40 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-green-600 to-lime-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-2">{project.name}</h3>
                <p className="text-sm text-green-400 mb-3">{project.subheading}</p>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-green-800/50 text-green-300 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/projects/${project.id}`}
                  className="text-green-400 hover:text-green-300 transition-colors duration-300"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/projects"
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105"
            >
              Load More Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Work Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-gradient-to-r from-green-900/30 to-lime-900/30 rounded-2xl p-8 border border-green-500/20">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-green-300 mb-2">{exp.role}</h3>
                    <h4 className="text-xl text-green-400 mb-1">{exp.company}</h4>
                    <p className="text-gray-400">{exp.duration} • {exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{exp.description}</p>
                
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-green-300 mb-3">Key Achievements:</h5>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-green-300 mb-3">Projects Worked On:</h5>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exp.projects.map((project, index) => (
                      <div key={index} className="bg-green-800/20 rounded-lg p-4 border border-green-500/10">
                        <h6 className="font-semibold text-green-300 mb-2">{project.name}</h6>
                        <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-green-700/30 text-green-300 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Get In Touch</h2>
          <div className="bg-gradient-to-r from-green-900/30 to-lime-900/30 rounded-2xl p-8 border border-green-500/20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-green-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-green-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-green-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-green-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-green-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-green-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-green-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 John Developer. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}