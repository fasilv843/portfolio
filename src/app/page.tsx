import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/Button";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="flex min-h-screen scroll-mt-20 items-center justify-center px-4 py-20"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 space-y-7 text-center lg:order-1 lg:text-left">
            <div>
              <p className="text-foreground/60 pl-1 text-base italic lg:text-lg">
                Hey there, I&apos;m
              </p>
              <h1
                className="text-5xl font-bold lg:text-7xl"
                style={{ letterSpacing: "0.5px" }}
              >
                Fasil Valiyattil
              </h1>
            </div>
            <h2 className="text-foreground/80 text-2xl font-semibold lg:text-3xl">
              Full-Stack Developer
            </h2>
            <p className="text-foreground/70 max-w-lg text-lg">
              Passionate about creating exceptional digital experiences with
              modern web technologies.
            </p>
            <div className="flex justify-center space-x-6 lg:justify-start">
              <a
                href="https://linkedin.com/in/fasilv843"
                target="_blank"
                rel="noopener noreferrer"
                className="transform rounded-lg bg-[var(--primary)] px-6 py-3 text-black transition-all duration-300 hover:scale-105 hover:brightness-110"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/fasilv843"
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-foreground rounded-lg border-2 px-6 py-3 transition-all duration-300 hover:border-[var(--border)] hover:bg-[var(--muted)]"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            <div className="flex h-80 w-80 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--muted),black_10%)]">
              <span className="text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold">About Me</h2>
          <div className="rounded-2xl p-8">
            <p className="text-foreground/80 text-lg leading-relaxed">
              I&apos;m a full-stack developer who builds reliable, scalable
              systems across the stack — Angular and React on the front end,
              Node.js on the back. Most recently I&apos;ve worked on fintech
              products, where correctness and careful handling of edge cases
              matter as much as the features themselves.
            </p>
            <p className="text-foreground/80 mt-4 text-lg leading-relaxed">
              Beyond coding, I like diving into challenges that push me to think
              differently, explore new tools, and refine my problem-solving
              skills. Curiosity drives me to keep learning and improving as I
              grow as a developer.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Skills & Technologies
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category) => (
              <div
                key={category.name}
                className="gradient-border rounded-xl border p-6"
              >
                <h3 className="text-foreground mb-4 text-xl font-semibold">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center space-x-3"
                    >
                      {skill.logo && (
                        // Plain <img>: these are static local SVGs, and next/image
                        // refuses image/svg unless dangerouslyAllowSVG is set.
                        // alt="" because the adjacent span already names the skill.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={skill.logo}
                          alt=""
                          width={24}
                          height={24}
                          loading="lazy"
                          decoding="async"
                          className="h-6 w-6"
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
      <section id="projects" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Featured Projects
          </h2>
          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      <section id="experience" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Work Experience
          </h2>
          <div className="relative">
            <div
              className="absolute top-0 bottom-0 left-4 w-px bg-[var(--border)]/60"
              aria-hidden
            />
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-14">
                  <div
                    className="absolute top-2 left-4 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--primary)] shadow-[0_0_0_4px] shadow-[color-mix(in_oklab,var(--background),white_4%)]"
                    aria-hidden
                  />
                  <div className="rounded-2xl border border-[var(--border)]/50 bg-[color-mix(in_oklab,var(--background),white_3%)] p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2">
                          <span className="text-foreground/70 rounded border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_6%)] px-2 py-0.5 text-sm">
                            {exp.duration}
                          </span>
                          <span className="text-foreground/70 rounded border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_6%)] px-2 py-0.5 text-sm">
                            {exp.location}
                          </span>
                        </div>
                        <h3 className="text-foreground mt-2 text-xl font-semibold md:text-2xl">
                          {exp.role}
                        </h3>
                        <p className="text-foreground/80">{exp.company}</p>
                      </div>
                      {/* <div className="hidden md:block text-sm text-foreground/60 mt-1">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</div> */}
                    </div>
                    <p className="text-foreground/80 mt-4">{exp.description}</p>
                    <div className="mt-6 grid gap-4">
                      {exp.achievements && (
                        <div>
                          <h5 className="text-foreground mb-2 text-sm font-semibold">
                            Key Achievements
                          </h5>
                          <ul className="text-foreground/80 list-inside list-disc space-y-2">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <h5 className="text-foreground mb-2 text-sm font-semibold">
                          Projects
                        </h5>
                        <div className="space-y-3">
                          {exp.projects.map((project, index) => (
                            <div
                              key={index}
                              className="rounded-lg border border-[var(--border)]/40 bg-[color-mix(in_oklab,var(--background),white_4%)] p-3"
                            >
                              <div className="flex items-center justify-between">
                                <h6 className="text-foreground font-semibold">
                                  {project.name}
                                </h6>
                              </div>
                              <p className="text-foreground/80 mt-1 text-sm">
                                {project.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-foreground/80 border-border/30 rounded border bg-[color-mix(in_oklab,var(--background),white_6%)] px-2 py-0.5 text-xs"
                                  >
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

      <section id="contact" className="scroll-mt-20 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold">Get In Touch</h2>
          <p className="text-foreground/70 mb-10 text-lg">
            Have a project in mind, a question, or just want to say hello?{" "}
            <br />
            I’d love to hear from you.
          </p>
          <Button href="mailto:fasilv.in@gmail.com" label="Contact Me" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border/30 border-t px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-foreground/60">
            © 2026 Fasil Valiyattil. All rights reserved. Built with Next.js and
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
