
export default function Homepage({ userName, onLogout}) {

return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
        <div className="relative w-full bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 rounded-b-[40px] md:rounded-b-[60px] px-6 py-12 md:py-16 lg:py-20 shadow-lg">
            <div className="flex justify-center mb-8 md:mb-10">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl">
                            SS
                        </div>
                    </div>
                    <p className="text-cyan-700 text-xs md:text-sm font-semibold tracking-wider">STUDENT-SENIOR ALLIANCE</p>
                </div>
            </div>

            <div className="text-center max-w-4xl mx-auto">
                <h1>
                    Hello, {userName}!
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">What can we do for you today?</p>
            </div>
            </div>

            <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
                <div>
                    
                </div>

            </div>
        </div>
)

}