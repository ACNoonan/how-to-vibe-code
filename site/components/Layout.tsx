import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-bold text-xl">
              How to Vibe Code
            </Link>
            <a 
              href="https://github.com/ACNoonan/how-to-vibe-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <nav className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/introduction" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Introduction
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Core Modules</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/dev-environment-setup" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Dev Environment Setup
                  </Link>
                </li>
                <li>
                  <Link href="/planning-worksheet" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Planning Worksheet
                  </Link>
                </li>
                <li>
                  <Link href="/build-with-ai-flow" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Build with AI Flow
                  </Link>
                </li>
                <li>
                  <Link href="/troubleshooting" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Troubleshooting
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/advanced/cli-services" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    CLI Services
                  </Link>
                </li>
                <li>
                  <Link href="/advanced/self-hosting-101" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
                    Self-Hosting 101
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} How to Vibe Code
          </p>
        </div>
      </footer>
    </div>
  )
}

