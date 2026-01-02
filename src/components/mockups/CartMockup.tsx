export default function CartMockup() {
  return (
    <div className="absolute -bottom-35 right-6 w-[160px] p-4 rounded-xl 
    bg-white dark:bg-[#1a1a1a] 
    border border-gray-200 dark:border-white/10 
    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
    transform transition-all duration-500 ease-out
    group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-[0_30px_60px_-12px_rgba(0,255,153,0.15)]">

      {/* 1. Product Image Area */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-white/5 rounded-lg mb-3 overflow-hidden group-hover:bg-gray-50 dark:group-hover:bg-white/10 transition-colors duration-500 flex items-center justify-center">

        {/* CSS "Product" Shape (Abstract Box) */}
        <div className="w-12 h-12 border-2 border-gray-300 dark:border-white/20 rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center bg-white dark:bg-[#1a1a1a]">
          <div className="w-6 h-6 bg-[#00FF99] rounded opacity-80 shadow-[0_0_15px_#00FF99]" />
        </div>

        {/* "New" Dot Indicator */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF99] rounded-full shadow-[0_0_10px_rgba(0,255,153,0.8)] animate-pulse" />
      </div>

      {/* 2. Text Skeletons */}
      <div className="space-y-2 mb-4">
        {/* Title Line */}
        <div className="w-3/4 h-2 bg-gray-200 dark:bg-white/20 rounded-full" />

        <div className="flex justify-between items-center">
          {/* Subtitle Line */}
          <div className="w-1/2 h-2 bg-gray-100 dark:bg-white/10 rounded-full" />
          {/* Price Pill */}
          <div className="w-8 h-3 rounded-full bg-gray-100 dark:bg-white/10" />
        </div>
      </div>

      {/* 3. Interactive Action Button */}
      <div className="
    relative w-full h-8 overflow-hidden rounded-md cursor-pointer
    bg-[#00FF99] text-black font-bold text-[10px] tracking-wide
    flex items-center justify-center shadow-lg shadow-[#00FF99]/20
  ">
        {/* Text & Icon wrapper */}
        <div className="flex items-center gap-1 transform transition-transform duration-300 group-hover:-translate-x-1">
          <span>ADD TO CART</span>
          {/* Arrow slides in on hover */}
          <i className="fa-solid fa-arrow-right opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all duration-300 text-[9px]" />
        </div>
      </div>

    </div>
  );
}