export default function CodeMockup() {
  return (
    <div className="absolute left-8 top-0 w-full h-[220px] 
    bg-gray-50/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md 
    rounded-tl-xl rounded-bl-xl
    p-4 font-mono text-xs 
    border-l border-t border-b border-gray-200 dark:border-white/10 
    shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]
    transition-colors duration-300 group-hover:border-[#00FF99]/30">
      
      {/* 1. Window Controls (Mac Style) */}
      {/* <div className="flex items-center gap-1.5 mb-4 opacity-70">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 dark:bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500/80" />
      </div> */}

      <div className="flex">
        {/* 2. Line Numbers */}
        <div className="flex flex-col text-right text-gray-300 dark:text-gray-700 pr-4 select-none border-r border-gray-200 dark:border-white/5 mr-4 font-mono">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>

        {/* 3. Code Content */}
        <div className="flex-1">
          <div className="mb-1 text-purple-600 dark:text-[#00FF99]">
            import <span className="text-gray-900 dark:text-white">Future</span> from <span className="text-amber-600 dark:text-yellow-400">'./ai'</span>;
          </div>
          
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <div>
              <span className="text-blue-600 dark:text-blue-400">const</span> <span className="text-yellow-600 dark:text-yellow-200">integrate</span> = <span className="text-blue-600 dark:text-blue-400">async</span> () ={'>'} {'{'}
            </div>
            
            <div className="pl-4 text-gray-400 dark:text-gray-500 italic">
              // Processing data...
            </div>
            
            <div className="pl-4">
              <span className="text-blue-600 dark:text-blue-400">await</span> <span className="text-purple-600 dark:text-[#00FF99] font-bold drop-shadow-[0_0_0px_rgba(0,255,153,0)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,153,0.8)] transition-all duration-300">SmartContract</span>.deploy();
            </div>
            
            <div className="pl-4 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 mr-2">return</span> 
              <span className="text-green-600 dark:text-green-400">true</span>;
              {/* 4. Blinking Cursor */}
              <span className="ml-1 w-1.5 h-4 bg-[#00FF99] animate-pulse"></span>
            </div>
            
            <div>{'}'}</div>
          </div>
        </div>
      </div>

      {/* 5. Subtle Glow Effect on Hover (Background) */}
      <div className="absolute inset-0 bg-[#00FF99] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-l-xl" />
    </div>
  );
}