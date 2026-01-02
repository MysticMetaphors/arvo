export default function AppInterfaceMockup() {
  return (
    <div className="absolute right-0 bottom-0 w-[60%] bg-gray-50 dark:bg-[#1a1a1a] rounded-tl-2xl border-l border-t border-gray-200 dark:border-white/10 p-4 transition-colors duration-300">
      <div className="flex gap-3 mb-4">
        <div className="w-8 h-8 rounded bg-gray-200 dark:bg-white/10" />
        <div className="w-8 h-8 rounded bg-gray-200 dark:bg-white/5" />
        <div className="w-8 h-8 rounded bg-gray-200 dark:bg-white/5" />
      </div>
      <div className="space-y-2">
        <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded" />
        <div className="w-[80%] h-2 bg-gray-200 dark:bg-white/10 rounded" />
        <div className="w-[90%] h-2 bg-gray-200 dark:bg-white/10 rounded" />
      </div>
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#00FF99] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,153,0.4)] dark:shadow-[0_0_15px_#00FF99]">
        <div className="w-4 h-4 bg-black rounded-sm" />
      </div>
    </div>
  )
}