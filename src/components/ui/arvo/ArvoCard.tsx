// "use client";

export default function ArvoCard({ title = '', description = '', image = '' }) {
  return (
    <div
      className="group relative border border-gray-700 rounded-lg bg-black-primary overflow-hidden hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-70"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center align-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-10 py-2 w-full flex justify-center items-center">
          <div>
            <h3 className="text-white text-xl font-semibold tracking-tight mb-2">{title}</h3>
            <p className="text-gray-400 text-lg md:text-md">{description}</p>
            <div className="flex w-full justify-end mt-4">
              <a href="#" className="px-6 py-1 bg-green-primary/5 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
