import ArvoCard from "../ui/arvo/ArvoCard";

export default function Projects() {
  const projects = [
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components, and a smooth browsing experience.",
      image: "fluxo.png",
    },
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components, and a smooth browsing experience.",
      image: "fluxo.png",
    },
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components, and a smooth browsing experience.",
      image: "fluxo.png",
    },
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components, and a smooth browsing experience.",
      image: "fluxo.png",
    },
  ];

  return (
    <>
      <section className="relative bg-black-primary overflow-hidden">
        <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

        <div className="py-16 mx-auto sm:py-16 lg:py-30 px-12 z-10">
          <div className="text-center items-center flex flex-col mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">Our <span className="text-green-primary">Work</span> Speaks for Itself</h2>
            <p className="max-w-screen-md text-gray-400 text-lg md:text-xl">A collection of projects that reflect our passion for clean design and smart development.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:p-12 md:p-6 sm:p-6">
            {projects.map((project, i) => (
              <ArvoCard key={i} {...project} />
            ))}
          </div>
          <div className="flex w-full justify-center mt-10">
            <button className="cursor-pointer px-6 py-2 rounded-full bg-green-400 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
              View More
            </button>
          </div>
        </div>
      </section>
    </>
  )
}