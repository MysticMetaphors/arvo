export default function CartMockup() {
  return (
    <div className="absolute -bottom-10 -right-4 w-[140px] h-[160px] bg-gray-50 dark:bg-[#1a1a1a] rounded-tl-xl border border-gray-200 dark:border-white/10 p-4 transform group-hover:scale-105 transition-all duration-500">
      <div className="w-full h-20 bg-gray-200 dark:bg-white/5 rounded mb-3 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-2 right-2 w-4 h-4 bg-[#00FF99] rounded-full shadow-[0_0_10px_rgba(0,255,153,0.5)]" />
      </div>
      <div className="w-3/4 h-3 bg-gray-300 dark:bg-white/20 rounded mb-2 transition-colors duration-300" />
      <div className="w-1/2 h-3 bg-gray-200 dark:bg-white/10 rounded transition-colors duration-300" />
      <div className="mt-3 w-full h-6 bg-[#00FF99] rounded flex items-center justify-center text-[10px] font-bold text-black shadow-sm">
        ADD TO CART
      </div>
    </div>
  );
}