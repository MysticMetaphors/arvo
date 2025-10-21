export default function Phone({children}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="relative w-[300px] mx-auto">
            <div className="relative bg-gray-950 p-2 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-gray-700">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center w-24 h-6 bg-gray-950 rounded-b-xl border-gray-700 border-x border-b shadow-lg">
                    <div className="relative w-3 h-3 rounded-full bg-gray-900 shadow-inner">
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white opacity-40"></div>
                        <div className="absolute inset-0 rounded-full bg-blue-800 opacity-20"></div>
                    </div>
                </div>

                <div className="h-[570px] bg-gray-800 rounded-2xl overflow-hidden flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    )
}