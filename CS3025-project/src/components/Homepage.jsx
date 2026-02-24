
import { HelpCircle } from "lucide-react";
import {useState} from 'react';
import { toast } from 'sonner';
import CreateAPost from "./CreateAPost.jsx";

export default function Homepage({ userName, onLogout, onNavigate, onAddPost}) {
    const [doCreateAPost, setCreateAPost] = useState(false);

    const handleNeedHelp = () => {
        console.log("Requesting help...");
    };

    const handleAddPost = (newPostData) => {
        onAddPost(newPostData);
        toast.success('Post created!');
    };

return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col">
        <div className="relative w-full bg-gradient-to-br from-cyan-100 via-cyan-300 to-cyan-400 rounded-b-[40px] md:rounded-b-[60px] px-6 py-12 md:py-16 lg:py-20 shadow-lg">
            <div className="flex justify-center mb-8 md:mb-10">
            <img src="src/Image.png" className="w-20 h-20 sm:w-50 sm:h-50 object-contain"/>

            </div>

            

            <div className="text-center max-w-4xl mx-auto">
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                    Hello, {userName}!
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">What can we do for you today?</p>
            </div>
            </div>

            <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
                <div className="max-w-6x1 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        <button  onClick={() => onNavigate('bulletin')} className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-3xl px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Community Board</button>

                        <button onClick= {() => setCreateAPost(true)} className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-3xl px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Create a Post</button>

                        <button onClick= {() => onNavigate('account')} className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-3xl px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Account Settings</button>

                        <button onClick={() => onNavigate('messaging')} className="bg-gradient-to-br from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-gray-900 font-semibold text-base md:text-3xl px-6 py-6 md:py-8 rounded-[30px] md:rounded-[40px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" >Messages</button>

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
                        <button onClick={onLogout} className="flex items-center gap-3 bg-cyan-300 hover:bg-gray-300 text-gray-800 font-x-large px-8 py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">Logout</button>
                    </div>

                </div>

            </div>

            <CreateAPost
                isOpen={doCreateAPost}
                onClose={() => setCreateAPost(false)}
                onCreate={handleAddPost}
            />
        </div>
);

}