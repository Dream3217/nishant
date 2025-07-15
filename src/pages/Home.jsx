export default function Dashboard() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-b from-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build and ship software on a single, collaborative platform
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Join the world’s most widely adopted AI‑powered developer platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l-md text-gray-900 w-full max-w-md"
            />
            <button className="px-6 py-3 bg-green-600 rounded-md hover:bg-green-700">
              Sign up for GitHub
            </button>
            <button className="px-6 py-3 border border-white rounded-md hover:bg-white hover:text-gray-900">
              Try GitHub Copilot
            </button>
          </div>
        </div>
      </section>

      {/* Image / Code Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <img
            src="https://via.placeholder.com/1200x600?text=Code+Screenshot"
            alt="Code screenshot"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Feature Tabs Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex border border-gray-600 rounded-lg p-1 overflow-hidden">
            {['Code','Plan','Collaborate','Automate','Secure'].map((tab, i) => (
              <button
                key={i}
                className={`px-4 py-2 ${i === 0 ? 'bg-gray-900' : 'hover:bg-gray-700'} rounded-lg`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="mt-4 text-gray-400">
            Build code quickly and more securely with GitHub Copilot embedded throughout your workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 items-center">
            {['figma','duolingo','nyt','mercadolibre','american airlines','ford','mercedes'].map((logo, i) => (
              <div key={i} className="opacity-60 hover:opacity-100">
                <img src={`https://via.placeholder.com/120x40?text=${logo}`} alt={logo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Automation */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Automate any workflow</h2>
            <p className="text-gray-300 mb-6">
              Optimize your process with simple and secured CI/CD.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Discover GitHub Actions →
            </a>
          </div>
          <img
            src="https://via.placeholder.com/600x400?text=Workflow+Screenshot"
            alt="Workflow screenshot"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://via.placeholder.com/600x400?text=Security+Screenshot"
            alt="Security screenshot"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Built-in application security where found means fixed
            </h2>
            <p className="text-gray-300 mb-6">
              Use AI to find and fix vulnerabilities — freeing your teams to ship more secure software faster.
            </p>
            <a href="#" className="text-blue-500 hover:underline">
              Explore GitHub Advanced Security →
            </a>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Work together, achieve more</h2>
            <p className="text-gray-300 mb-6">
              Collaborate with your teams, sync projects and code from anywhere — all on a single, integrated platform.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/600x400?text=Project+Management+Screenshot"
            alt="Project screenshot"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-gray-400">
          <div>
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-8 mb-4"/>
            <p className="text-sm">Subscribe to our developer newsletter</p>
            <button className="mt-2 px-4 py-2 border rounded-md hover:bg-gray-700">
              Subscribe
            </button>
          </div>
          {['Product', 'Platform', 'Support', 'Company'].map((col, idx) => (
            <div key={idx}>
              <h3 className="font-semibold mb-2 text-white">{col}</h3>
              <ul className="space-y-1 text-sm">
                {Array(6).fill('Link text').map((l, i) => <li key={i}><a href="#" className="hover:underline">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
