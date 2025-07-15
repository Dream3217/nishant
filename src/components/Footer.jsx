export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-4 mb-2">
          <a
            href="mailto:nks983775@gmail.com"
            className="hover:text-yellow-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            📧 nks983775@gmail.com
          </a>
          <a
            href="https://www.instagram.com/nishantdabre_07/"
            className="hover:text-pink-400 flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-5 h-5"
            />
            Instagram
          </a>
        </div>
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MyProject. All rights reserved.</p>
      </div>
    </footer>
  );
}
