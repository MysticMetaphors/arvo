export default function Team() {
  return (
    <section className="relative bg-black-primary text-white py-16">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-30 items-center">
        {/* Left content */}
        <div className="h-full">
          <div>
            <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">Who <span className="text-green-primary">we</span> are.</h2>
            <p className="text-gray-400 text-lg text-justify mb-4">
              At Arvo, we focus on markets where technology, innovation, and design
              unlock long-term value. Working here means you’ll collaborate with talented professionals,
              solve challenging problems, and grow together. Along the way, you may
              also make lifelong friends and enjoy opportunities that inspire growth.
            </p>
            <button className="px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
              See Team
            </button>
          </div>
        </div>
        <div className="space-y-8">
          {Array.from({ length: 3 }, (_, i) =>
            <div key={i} className="flex items-center space-x-10 border-b border-gray-700 pb-6">
              <img
                src="fluxo.png"
                alt="Team member"
                className="w-30 h-30 rounded-lg object-cover"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Alex Rivera</h3>
                <p className="text-gray-400 text-sm">CEO / Co-founder</p>
                <p className="text-gray-400 text-sm mt-1">
                  Alex drives the creative and technical direction of Arvo.
                </p>
                <div className="flex space-x-4 mt-3 text-gray-400">
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fas fa-globe"></i>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>

  )
}