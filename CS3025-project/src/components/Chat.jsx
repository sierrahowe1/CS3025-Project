import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

export default function Chat({ conversation, onBack, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(conversation.id, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={onBack}
          className="text-gray-900 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{conversation.contactName}</h2>
          <p className="text-sm text-gray-700">Active conversation</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {conversation.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-3xl px-6 py-4 ${
                  message.fromMe
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900'
                    : 'bg-white text-gray-900 shadow-md'
                }`}
              >
                <p className="text-base">{message.text}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.fromMe ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-cyan-400 focus:outline-none transition-colors text-base"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}