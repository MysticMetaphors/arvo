export default function Desktop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative bg-gray-950 p-2 lg:p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-gray-700 border">
        <div className="absolute z-50 md:top-2 lg:top-4 left-1/2 -translate-x-1/2 flex items-center justify-center w-48 h-6 bg-gray-950 rounded-b-xl border-gray-700 border-x border-b shadow-lg">
          <div className="relative w-4 h-4 rounded-full bg-gray-950 shadow-inner">
            <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white opacity-40"></div>
            <div className="absolute inset-1 rounded-full bg-blue-800 opacity-20"></div>
          </div>
        </div>
        <div className="lg:h-[550px] h-[55vh] bg-gray-800  rounded-2xl overflow-hidden">
          {children}
        </div>
      </div>

      <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 w-48 h-10 bg-gray-950 rounded-b-xl border-gray-700 border-x border-b shadow-lg"></div>
    </div>
  )
}