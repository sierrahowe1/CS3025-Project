import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import SingleMessage from './SingleMessage';

export default function Messages({ onNavigate, onLogout, messages, setMessages, conversations, onCreateConversation, onOpenConversation }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('inbox'); 

  const handleNeedHelp = () => {
    console.log('Help requested');
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    // Mark message as read
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id ? { ...msg, unread: false } : msg
      )
    );
  };

  const handleAccept = () => {
    if (selectedMessage) {
      onCreateConversation(selectedMessage);
      setSelectedMessage(null);
    }
  };

  const handleDecline = () => {
    if (selectedMessage) {
      toast.info('Message Declined', {
        description: 'The message has been kept in your inbox.',
      });
      setSelectedMessage(null);
    }
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Sidebar */}
      <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
        {/* SSA Logo */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src="src/Image.png" alt="SSA Logo" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex-1 flex flex-col px-4 py-8 space-y-4">
          <button
            onClick={() => onNavigate('bulletin')}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg"
          >
            BULLETIN BOARD
          </button>

          <div className="relative">
            <button
              onClick={() => onNavigate('messaging')}
              className="w-full bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left shadow-lg"
            >
              MESSAGING
            </button>
            {messages.some(msg => msg.unread) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </div>

          <button
            onClick={() => onNavigate('account')}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg"
          >
            ACCOUNT
          </button>
        </div>

        {/* Need Help Button */}
        <div className="p-4">
          <button
            onClick={handleNeedHelp}
            className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-3 px-4 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-sm">Need help?</span>
          </button>
        </div>

        {/* Logout (for testing) */}
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full text-cyan-700 hover:text-cyan-900 font-medium text-xs underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* Header with Tabs */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            MESSAGING
          </h1>
          
          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'inbox'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              Inbox {messages.length > 0 && `(${messages.length})`}
            </button>
            <button
              onClick={() => setActiveTab('conversations')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'conversations'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              Active Chats {conversations.length > 0 && `(${conversations.length})`}
            </button>
          </div>
        </div>

        {/* Inbox Tab */}
        {activeTab === 'inbox' && (
          <>
            {messages.length === 0 ? (
              <div className="max-w-4xl bg-white rounded-3xl shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No messages in your inbox</p>
              </div>
            ) : (
              <div className="max-w-4xl space-y-6">
                {[...messages].sort((a, b) => {
                  // Sort by timestamp - newest first
                  const getTimestamp = (msg) => {
                    if (msg.timestamp === 'Just now') return Date.now();
                    const hours = parseInt(msg.timestamp.match(/(\d+)\s*hour/)?.[1] || '0');
                    const days = parseInt(msg.timestamp.match(/(\d+)\s*day/)?.[1] || '0');
                    return Date.now() - (hours * 3600000) - (days * 86400000);
                  };
                  return getTimestamp(b) - getTimestamp(a);
                }).map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
                  >
                    {/* Unread indicator */}
                    {message.unread && (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}

                    <div className={`flex items-start justify-between gap-4 ${message.unread ? 'ml-6' : ''}`}>
                      <div className="flex-1 min-w-0">
                        {/* Sender Name */}
                        <div className="inline-block bg-gray-700 text-white px-4 py-1 rounded-full mb-3">
                          <span className="font-semibold text-sm">{message.sender}</span>
                        </div>

                        {/* Message Preview */}
                        <p className="text-gray-500 text-base bg-gray-100 rounded-2xl px-4 py-3">
                          {message.preview}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <div className="flex-shrink-0 bg-gray-300 text-gray-900 px-4 py-1 rounded-full">
                        <span className="font-medium text-sm whitespace-nowrap">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Conversations Tab */}
        {activeTab === 'conversations' && (
          <>
            {conversations.length === 0 ? (
              <div className="max-w-4xl bg-white rounded-3xl shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No active conversations</p>
                <p className="text-gray-400 text-sm mt-2">Accept messages from your inbox to start chatting</p>
              </div>
            ) : (
              <div className="max-w-4xl space-y-6">
                {[...conversations].sort((a, b) => {
                  // Sort by last activity - newest first
                  return new Date(b.lastActivity) - new Date(a.lastActivity);
                }).map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => onOpenConversation(conversation)}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Contact Name */}
                        <div className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 px-4 py-1 rounded-full mb-3">
                          <span className="font-semibold text-sm">{conversation.contactName}</span>
                        </div>

                        {/* Last Message Preview */}
                        <p className="text-gray-500 text-base bg-gray-100 rounded-2xl px-4 py-3">
                          {conversation.messages[conversation.messages.length - 1].text.substring(0, 100)}
                          {conversation.messages[conversation.messages.length - 1].text.length > 100 ? '...' : ''}
                        </p>

                        {/* Message Count */}
                        <p className="text-gray-400 text-sm mt-2">
                          {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <div className="flex-shrink-0 bg-gray-300 text-gray-900 px-4 py-1 rounded-full">
                        <span className="font-medium text-sm whitespace-nowrap">
                          {conversation.messages[conversation.messages.length - 1].timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <SingleMessage
          message={selectedMessage}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
