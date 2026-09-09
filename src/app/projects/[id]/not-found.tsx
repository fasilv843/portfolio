import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="gradient-text mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-green-300">
          Project Not Found
        </h2>
        <p className="mb-8 max-w-md text-gray-300">
          The project you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <div className="space-x-4">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-6 py-3 text-white transition-all duration-300 hover:from-green-600 hover:to-lime-600"
          >
            View All Projects
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border-2 border-green-500 px-6 py-3 text-green-400 transition-all duration-300 hover:bg-green-500 hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
