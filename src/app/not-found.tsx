import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-green-300 mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8 max-w-md">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  );
}