import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-green-300 mb-4">Project Not Found</h2>
        <p className="text-gray-300 mb-8 max-w-md">
          The project you're looking for doesn't exist or may have been moved.
        </p>
        <div className="space-x-4">
          <Link 
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300"
          >
            View All Projects
          </Link>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}