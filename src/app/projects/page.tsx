import { projects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-4">All Projects</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive showcase of my work, featuring full-stack applications, 
            innovative solutions, and cutting-edge technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gradient-to-br from-green-900/40 to-lime-900/40 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
              <div className="w-full h-48 bg-gradient-to-br from-green-600 to-lime-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl">🚀</span>
              </div>
              
              <h2 className="text-2xl font-semibold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                {project.name}
              </h2>
              
              <p className="text-sm text-green-400 mb-3 font-medium">
                {project.subheading}
              </p>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-green-800/50 text-green-300 text-xs rounded-full border border-green-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link 
                href={`/projects/${project.id}`}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105"
              >
                View Project
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}