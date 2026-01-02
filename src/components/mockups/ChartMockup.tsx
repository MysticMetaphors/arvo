export default function ChartMockup() {
  return (
    <div className="absolute bottom-6 right-6 flex items-end gap-2 h-32 w-32">
      <div className="w-8 bg-gray-200 dark:bg-white/10 rounded-t h-[40%] group-hover:h-[60%] transition-all duration-500" />
      <div className="w-8 bg-[#00FF99] dark:bg-[#00FF99]/50 rounded-t h-[70%] group-hover:h-[90%] transition-all duration-500 delay-75 shadow-[0_0_15px_rgba(0,255,153,0.4)]" />
      <div className="w-8 bg-gray-200 dark:bg-white/10 rounded-t h-[50%] group-hover:h-[40%] transition-all duration-500 delay-100" />
    </div>
  );
}