import { AUTHOR, REPO_URL, SOCIALS } from "@/lib/site";

export default function Footer() {
  // Server component, so this is evaluated at build time for a static page —
  // no hydration mismatch, and it replaces a hardcoded "© 2026".
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t px-6 py-14">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-foreground-faint space-y-2 text-sm">
          <p>
            © {year} {AUTHOR}
          </p>
          <p>
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground focus-visible:outline-ring underline underline-offset-4 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground focus-visible:outline-ring underline underline-offset-4 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Tailwind CSS
            </a>
            .{" "}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground focus-visible:outline-ring underline underline-offset-4 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Source
            </a>
          </p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground focus-visible:outline-ring font-mono text-xs tracking-wider uppercase transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
