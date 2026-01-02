export default function CodeMockup() {
  return (
    <div className="absolute -right-5 -top-10 w-[300px] h-[200px] bg-gray-50 dark:bg-[#050505] rounded-l-xl p-4 font-mono text-xs text-gray-600 dark:text-gray-500 border-l border-t border-b border-gray-200 dark:border-white/10 shadow-2xl transition-colors duration-300">
      <div className="mb-2 text-green-600 dark:text-[#00FF99]">
        import <span className="text-gray-900 dark:text-white">Future</span> from <span className="text-yellow-600 dark:text-yellow-500">'./ai'</span>;
      </div>
      <div className="pl-4 border-l border-gray-200 dark:border-white/10">
        <div>
          const <span className="text-blue-600 dark:text-blue-400">integrate</span> = async () ={'>'} {'{'}
        </div>
        <div className="pl-4 text-gray-400 dark:text-gray-600">// Processing data...</div>
        <div className="pl-4">
          await <span className="text-green-600 dark:text-[#00FF99]">SmartContract</span>.deploy();
        </div>
        <div className="pl-4">
          return <span className="text-purple-600 dark:text-purple-400">true</span>;
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  );
}