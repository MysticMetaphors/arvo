export default function AppInterfaceMockup() {
  return (
    <div className="absolute left-8 bottom-0 w-full h-[90%] bg-gray-50 dark:bg-[#1a1a1a] rounded-tl-lg border-l border-t border-gray-200 dark:border-white/10 flex overflow-hidden shadow-2xl transition-colors duration-300">
      <div className="w-12 border-r border-gray-200 dark:border-white/5 flex flex-col items-center py-4 gap-4 bg-gray-100 dark:bg-[#111]">
        <div className="w-6 h-50 rounded bg-[#00FF99] shadow-[0_0_10px_rgba(0,255,153,0.4)]" />
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-white/10" />
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-white/10 group-hover:bg-[#00FF99] transition-colors duration-300 relative">
             <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-100 dark:border-[#111]" />
        </div>
        <div className="w-6 h-6 rounded bg-gray-300 dark:bg-white/10" />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
            <div className="w-24 h-2.5 bg-gray-200 dark:bg-white/10 rounded-full" />
            <div className="flex gap-2">
                <div className="w-16 h-6 rounded bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/5" />
                <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-white/20" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 h-full">
            
            <div className="col-span-2 bg-white dark:bg-white/5 rounded-lg p-3 border border-gray-200 dark:border-white/5 shadow-sm">
                <div className="flex items-end gap-1 h-12 mt-2">
                    <div className="w-1/4 h-[40%] bg-gray-200 dark:bg-white/10 rounded-t" />
                    <div className="w-1/4 h-[70%] bg-[#00FF99]/80 rounded-t group-hover:h-[90%] transition-all duration-500" />
                    <div className="w-1/4 h-[50%] bg-gray-200 dark:bg-white/10 rounded-t" />
                    <div className="w-1/4 h-[60%] bg-gray-200 dark:bg-white/10 rounded-t" />
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-lg p-3 border border-gray-200 dark:border-white/5 shadow-sm flex flex-col gap-2">
                <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full" />
                <div className="w-2/3 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full" />
                <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full" />
            </div>

             <div className="bg-white dark:bg-white/5 rounded-lg p-3 border border-gray-200 dark:border-white/5 shadow-sm relative overflow-hidden group-hover:border-[#00FF99]/30 transition-colors">
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF99] rounded-full animate-pulse" />
                <div className="w-1/2 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mt-1" />
            </div>

        </div>
      </div>
    </div>
  )
}