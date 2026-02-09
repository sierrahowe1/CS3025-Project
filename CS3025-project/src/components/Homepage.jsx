
import { HelpCircle } from "lucide-react";

export default function Homepage({ userName, onLogout}) {

    const handleNeedHelp = () => {
        console.log("Requesting help...");
    }

return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
        <div className="relative w-full bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 rounded-b-[40px] md:rounded-b-[60px] px-6 py-12 md:py-16 lg:py-20 shadow-lg">
            <div className="flex justify-center mb-8 md:mb-10">
            <img src="src/Image.jpeg" className="w-20 h-20 sm:w-50 sm:h-50 object-contain"/>

            </div>

            

            <div className="text-center max-w-4xl mx-auto">
                <h1>
                    Hello, {userName}!
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">What can we do for you today?</p>
            </div>
            </div>

            <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
                <div className="max-w-6x1 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <button className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-lg px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Community Board</button>

                        <button className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-lg px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Create a Post</button>

                        <button className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-lg px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Account Settings</button>

                        <button className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-lg px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Messages</button>

                    </div>

                    <div className="flex justify-start">
                        <button onClick= {handleNeedHelp} className="flex items-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm md:text-base">Need help?</span>
                        </button>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button onClick={onLogout} className="text-cyan-600 hover:text-cyan-700 font-medium text-sm underline">Logout</button>
                    </div>

                </div>

            </div>
        </div>
);

}