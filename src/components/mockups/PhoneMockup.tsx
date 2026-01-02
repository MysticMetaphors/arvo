export default function PhoneMockup() {
  return (
    <div className="absolute bottom-[-20px] right-[20px] w-[100px] h-[180px] border-4 border-gray-800 dark:border-black bg-gray-800 rounded-[20px] overflow-hidden transform group-hover:-translate-y-4 transition-transform duration-500">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 dark:bg-black rounded-b-lg z-20" />
      <div className="w-full h-full bg-gray-50 dark:bg-[#111] pt-6 px-2 space-y-2 transition-colors duration-300">
        <div className="flex gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10" />
          <div className="space-y-1 pt-1">
            <div className="w-12 h-2 bg-gray-300 dark:bg-white/20 rounded" />
            <div className="w-8 h-2 bg-gray-200 dark:bg-white/10 rounded" />
          </div>
        </div>
        <div className="w-full h-24 bg-[#00FF99]/10 rounded border border-[#00FF99]/20" />
      </div>
    </div>
  );
}