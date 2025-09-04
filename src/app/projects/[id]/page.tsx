import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/projects"
            className="inline-flex items-center px-4 py-2 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">{project.name}</h1>
          <p className="text-2xl text-green-400 mb-6">{project.subheading}</p>
          
          <div className="w-full max-w-2xl mx-auto h-64 bg-gradient-to-br from-green-600 to-lime-600 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-6xl">🚀</span>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-gradient-to-r from-green-900/30 to-lime-900/30 rounded-2xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-semibold text-green-300 mb-4">Project Overview</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-r from-green-900/30 to-lime-900/30 rounded-2xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-semibold text-green-300 mb-6">Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo Video */}
            {project.demoUrl && (
              <div className="bg-gradient-to-r from-green-900/30 to-lime-900/30 rounded-2xl p-8 border border-green-500/20">
                <h2 className="text-2xl font-semibold text-green-300 mb-6">Project Demo</h2>
                <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
                  <iframe
                    src={project.demoUrl}
                    title={`${project.name} Demo`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="bg-gradient-to-br from-green-900/40 to-lime-900/40 rounded-2xl p-6 border border-green-500/20">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Technologies Used</h3>
              <div className="space-y-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-lime-500 rounded-full"></div>
                    <span className="text-gray-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-gradient-to-br from-green-900/40 to-lime-900/40 rounded-2xl p-6 border border-green-500/20">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Project Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-green-400 font-medium">Category</span>
                  <p className="text-gray-300">Full-Stack Application</p>
                </div>
                <div>
                  <span className="text-sm text-green-400 font-medium">Status</span>
                  <p className="text-gray-300">Completed</p>
                </div>
                <div>
                  <span className="text-sm text-green-400 font-medium">Year</span>
                  <p className="text-gray-300">2024</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105">
                View Live Demo
              </button>
              <button className="w-full px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300">
                View Source Code
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex justify-between">
          <Link 
            href="/projects"
            className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Projects
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}