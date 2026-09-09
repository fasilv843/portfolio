export default function Loading() {
  return (
    <div
      className="flex min-h-svh items-center justify-center px-6"
      role="status"
      aria-label="Loading"
    >
      <p className="text-foreground-faint font-mono text-xs tracking-[0.2em] uppercase">
        Loading
      </p>
    </div>
  );
}
