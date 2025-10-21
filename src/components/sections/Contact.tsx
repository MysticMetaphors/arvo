export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Me</h2>
        <p className="text-gray-600 mb-12">
          Feel free to reach out to me through the form below or directly using my contact details.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
          {/* Email */}
          <a
            href="mailto:youremail@example.com"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
          >
            <i className="fa-solid fa-envelope text-2xl"></i>
            <span className="text-lg">youremail@example.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+1234567890"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
          >
            <i className="fa-solid fa-phone text-2xl"></i>
            <span className="text-lg">+1 (234) 567-890</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
          >
            <i className="fa-brands fa-linkedin text-2xl"></i>
            <span className="text-lg">LinkedIn</span>
          </a>
        </div>

        {/* Contact Form */}
        <form className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-left">
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
