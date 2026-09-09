import socialIcons from "@/components/ui/SocialIcon";
import { AUTHOR, SOCIALS } from "@/lib/site";

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
            .
          </p>
        </div>

        <nav aria-label="Social links">
          {/* Icons, not labels: five words of mono text competed with the
              copyright line for the eye. The 36px targets supply their own
              spacing, so the gap is much tighter than the text version's. */}
          <ul className="-mx-2 flex flex-wrap items-center gap-1">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="text-foreground-faint hover:text-foreground hover:bg-surface-raised focus-visible:outline-ring inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {socialIcons[social.label]}
                  <span className="sr-only">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
