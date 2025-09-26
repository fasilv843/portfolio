import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { experiences } from '@/data/experience';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7 text-center lg:text-left order-2 lg:order-1">
            <div>
              <p className="text-base lg:text-lg text-foreground/60 italic pl-1">
                Hey there, I&apos;m
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold" style={{ letterSpacing: "0.5px" }}>
                Fasil Valiyattil
              </h1>
            </div>
            <h2 className="text-2xl lg:text-3xl text-foreground/80 font-semibold">
              Full-Stack Developer
            </h2>
            <p className="text-lg text-foreground/70 max-w-lg">
              Passionate about creating exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex justify-center lg:justify-start space-x-6">
              <a 
                href="https://linkedin.com/in/fasilv843" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--primary)] text-black rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/fasilv843" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-border text-foreground rounded-lg hover:bg-[var(--muted)] hover:border-[var(--border)] transition-all duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2">
            <div className="w-80 h-80 bg-[color-mix(in_oklab,var(--muted),black_10%)] rounded-full flex items-center justify-center border border-[var(--border)]">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="rounded-2xl p-8">
          <p className="text-lg text-foreground/80 leading-relaxed">
            I&apos;m a MEAN stack developer with a strong focus on backend development and building reliable, 
            scalable systems. I enjoy working on the logic and structure that power applications, 
            ensuring performance and maintainability behind the scenes.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mt-4">
            Beyond coding, I like diving into challenges that push me to think differently, explore new tools, 
            and refine my problem-solving skills. Curiosity drives me to keep learning and improving as I grow 
            as a developer.
          </p>
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category) => (
              <div key={category.name} className="rounded-xl p-6 border gradient-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">{category.name}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center space-x-3">
                      {skill.logo && (
                        <Image
                          src={skill.logo}
                          alt={skill.name}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      )}
                      <span className="text-foreground/80">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center">
            <Button href="/projects" label="Load More Projects" />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)]/60" aria-hidden />
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-14">
                  <div className="absolute left-4 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[var(--primary)] shadow-[0_0_0_4px] shadow-[color-mix(in_oklab,var(--background),white_4%)] border border-[var(--border)]" aria-hidden />
                  <div className="rounded-2xl border border-[var(--border)]/50 bg-[color-mix(in_oklab,var(--background),white_3%)] p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2">
                          <span className="text-sm px-2 py-0.5 rounded bg-[color-mix(in_oklab,var(--background),white_6%)] border border-[var(--border)]/40 text-foreground/70">{exp.duration}</span>
                          <span className="text-sm px-2 py-0.5 rounded bg-[color-mix(in_oklab,var(--background),white_6%)] border border-[var(--border)]/40 text-foreground/70">{exp.location}</span>
                        </div>
                        <h3 className="mt-2 text-xl md:text-2xl font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-foreground/80">{exp.company}</p>
                      </div>
                      {/* <div className="hidden md:block text-sm text-foreground/60 mt-1">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div> */}
                    </div>
                    <p className="text-foreground/80 mt-4">{exp.description}</p>
                    <div className="mt-6 grid gap-4">
                      {exp.achievements && 
                        <div>
                          <h5 className="text-sm font-semibold text-foreground mb-2">Key Achievements</h5>
                          <ul className="space-y-2 text-foreground/80 list-disc list-inside">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      }
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-2">Projects</h5>
                        <div className="space-y-3">
                          {exp.projects.map((project, index) => (
                            <div key={index} className="rounded-lg p-3 border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_4%)]">
                              <div className="flex items-center justify-between">
                                <h6 className="font-semibold text-foreground">{project.name}</h6>
                              </div>
                              <p className="text-sm text-foreground/80 mt-1">{project.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => (
                                  <span key={tech} className="px-2 py-0.5 bg-[color-mix(in_oklab,var(--background),white_6%)] text-foreground/80 text-xs rounded border border-border/30">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contact" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="rounded-2xl p-8 border gradient-border">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-[color-mix(in_oklab,var(--background),white_4%)] border border-border/40 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-border focus:ring-2 focus:ring-[color-mix(in_oklab,var(--primary),white_20%)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-[color-mix(in_oklab,var(--background),white_4%)] border border-border/40 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-border focus:ring-2 focus:ring-[color-mix(in_oklab,var(--primary),white_20%)]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-[color-mix(in_oklab,var(--background),white_4%)] border border-border/40 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-border focus:ring-2 focus:ring-[color-mix(in_oklab,var(--primary),white_20%)]"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-[color-mix(in_oklab,var(--background),white_4%)] border border-border/40 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-border focus:ring-2 focus:ring-[color-mix(in_oklab,var(--primary),white_20%)]"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-[var(--primary)] text-black rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section> */}

      <section id="contact" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-foreground/70 mb-10">
            Have a project in mind, a question, or just want to say hello? <br/>
            I’d love to hear from you.
          </p>
          <Button href="mailto:fasilv.in@gmail.com" label="Contact Me" />
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60">
            © 2025 Fasil Valiyattil. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}