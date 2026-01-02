export default function BrowserMockup() {
  return (
    <div className="absolute -bottom-5 -right-10 w-[80%] h-[80%] bg-gray-50 dark:bg-[#1a1a1a] rounded-tl-xl border border-gray-200 dark:border-white/10 shadow-2xl transform group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-all duration-500">
      <div className="h-8 border-b border-gray-200 dark:border-white/5 flex items-center gap-2 px-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 dark:bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 dark:bg-green-500/50" />
      </div>

      <div className="p-4 space-y-3">
        <div className="w-1/2 h-4 bg-gray-200 dark:bg-white/10 rounded" />
        <div className="w-full h-24 bg-[#00FF99]/10 rounded border border-[#00FF99]/20" />
        <div className="flex gap-2">
          <div className="w-1/3 h-20 bg-gray-200 dark:bg-white/5 rounded" />
          <div className="w-2/3 h-20 bg-gray-200 dark:bg-white/5 rounded" />
        </div>
      </div>
    </div>
  )
}