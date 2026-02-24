import {X} from 'lucide-react';

export default function NeedHelp({ isOpen, onClose}) {
    if(!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">APP TUTORIAL VIDEO</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md"
                    ><X className="w-4 h-4 text-black"/>
                    </button>
                </div>

                <div className="p-4">
                    <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                       <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="App Tutorial Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                       
                       ></iframe> 
                    </div>

                    <div className="mt-4 space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">How to Use the App: A Guide for Beginners</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-cyan-500">1.</span>
                                <span><strong>Bulletin Board: </strong> View and create posts to connect with Seniors. Contact users or create new posts.</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-cyan-500">2.</span>
                                <span><strong>Messaging: </strong> Send and receive messages from Seniors about inquiries.</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-cyan-500">3.</span>
                                <span><strong>Account Settings: </strong> View and edit your profile information and account preferences.</span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-2 px-6 rounded-full transition-all shadow-md text-sm"
                        >GOT IT!</button>
                    </div>
                </div>
            </div>
        </div>
    );
}