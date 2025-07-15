export default function About() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Project</h1>
          <p className="text-lg md:text-xl opacity-80">
            Empowering developers to build, collaborate, and innovate — all in one place.
          </p>
        </div>
      </section>

      {/* About Details */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            We are on a mission to simplify development by creating an intuitive, modern platform that lets developers
            collaborate, deploy, and scale faster. From student projects to enterprise-grade software, we provide the
            infrastructure and tools to turn ideas into reality.
          </p>
        </div>
        <img
          src="https://illustrations.popsy.co/white/developer.svg"
          alt="Developer working"
          className="rounded-lg shadow-xl"
        />
      </section>

      {/* Highlights Grid */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            A platform that grows with your ideas.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Modern UI/UX",
              desc: "Designed with simplicity and elegance for the best experience.",
              icon: "https://cdn-icons-png.flaticon.com/512/1828/1828961.png"
            },
            {
              title: "Fast Deployment",
              desc: "Push code and deploy instantly with zero configuration.",
              icon: "https://cdn-icons-png.flaticon.com/512/3214/3214511.png"
            },
            {
              title: "Open Collaboration",
              desc: "Collaborate across teams using pull requests and reviews.",
              icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            }
          ].map(({ title, desc, icon }, i) => (
            <div key={i} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow hover:shadow-xl transition-all duration-300">
              <img src={icon} alt={title} className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Meet the Creator</h2>
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md">
            <img
              src="https://avatars.githubusercontent.com/u/9919?v=4"
              alt="Team Member"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Nishant Dabre</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Frontend Developer & Visionary</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Passionate about building scalable, beautiful web interfaces that help people collaborate and build amazing things.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6">Join thousands of developers building the future — faster and better.</p>
        <a
          href="/signup"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Create an Account
        </a>
      </section>
    </div>
  );
}
