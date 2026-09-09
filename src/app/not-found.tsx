import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="gradient-text mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-green-300">
          Page Not Found
        </h2>
        <p className="mb-8 max-w-md text-gray-300">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-6 py-3 text-white transition-all duration-300 hover:from-green-600 hover:to-lime-600"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
