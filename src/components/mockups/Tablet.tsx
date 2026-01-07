export default function Tablet({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className="relative md:w-[508px] w-full mx-auto">
      <div className={`relative bg-gray-950 p-4 pb-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-gray-800 dark:border-gray-700 transition-colors duration-300 ${className}`}>
        <div className="absolute top-6 left-8 -translate-x-1/2 flex items-center justify-center z-50">
          <div className="relative w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-900 shadow-inner">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white opacity-40"></div>
            <div className="absolute inset-0 rounded-full bg-blue-800 opacity-20"></div>
          </div>
        </div>

        <div className="h-[557px] bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden flex flex-col relative z-10 transition-colors duration-300">
          {children}
        </div>
      </div>
    </div>
  )
}