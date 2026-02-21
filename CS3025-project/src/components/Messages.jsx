import { useState } from 'react';
import { HelpCircle, Menu } from 'lucide-react';
import { toast } from 'sonner';
import SingleMessage from './SingleMessage';

export default function Messages({ onNavigate, onLogout, messages, setMessages, conversations, onCreateConversation, onOpenConversation }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        description: 'The message has been removed from your inbox and a status message has been sent to the sender.',
      });
      setSelectedMessage(null);
    }
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-cyan-400 text-white p-3 rounded-full shadow-lg hover:bg-cyan-500 transition-all"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Responsive */}
      <div className={`
        fixed lg:static w-64 md:w-72 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 
        flex flex-col h-screen transition-all duration-300 z-50
        ${isSidebarOpen ? 'left-0' : '-left-64 lg:left-0'}
      `}>
        {/* SSA Logo */}
        <div className="p-4 md:p-6">
          <div className="flex flex-col items-center">
            <img src="src/Image.png" alt="Logo" className="w-24 md:w-32 h-auto" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex-1 flex flex-col px-3 md:px-4 py-4 md:py-8 space-y-3 md:space-y-4">
          <button
            onClick={() => {
              onNavigate('bulletin');
              setIsSidebarOpen(false);
            }}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md hover:shadow-lg text-sm md:text-base"
          >
            BULLETIN BOARD
          </button>

          <div className="relative">
            <button
              onClick={() => {
                onNavigate('messaging');
                setIsSidebarOpen(false);
              }}
              className="w-full bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left shadow-lg text-sm md:text-base"
            >
              MESSAGING
            </button>
            {messages.some(msg => msg.unread) && (
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
            )}
          </div>

          <button
            onClick={() => {
              onNavigate('account');
              setIsSidebarOpen(false);
            }}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md hover:shadow-lg text-sm md:text-base"
          >
            ACCOUNT
          </button>
        </div>

        {/* Need Help Button */}
        <div className="p-3 md:p-4">
          <button
            onClick={handleNeedHelp}
            className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-2 md:py-3 px-3 md:px-4 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-400 rounded-full flex items-center justify-center text-white">
              <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <span className="text-xs md:text-sm">Need help?</span>
          </button>
        </div>

        {/* Logout (for testing) */}
        <div className="p-3 md:p-4">
          <button
            onClick={onLogout}
            className="w-full text-cyan-700 hover:text-cyan-900 font-large text-xs underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area - Responsive */}
      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto ml-0 lg:ml-0 mt-16 lg:mt-0">
        {/* Header with Tabs */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            MESSAGING
          </h1>
          
          {/* Tabs - Responsive */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
                activeTab === 'inbox'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              Inbox {messages.length > 0 && `(${messages.length})`}
            </button>
            <button
              onClick={() => setActiveTab('conversations')}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
                activeTab === 'conversations'
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              Active Chats {conversations.length > 0 && `(${conversations.length})`}
            </button>
          </div>
        </div>

        {/* Inbox - Responsive */}
        {activeTab === 'inbox' && (
          <>
            {messages.length === 0 ? (
              <div className="w-full bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-12 text-center">
                <p className="text-gray-500 text-base md:text-lg">No messages in your inbox</p>
              </div>
            ) : (
              <div className="w-full space-y-4 md:space-y-6">
                {[...messages].sort((a, b) => {
                  // Sort messages by timestamp - newest first
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
                    className="relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-4 md:p-6 cursor-pointer"
                  >
                    {/* Unread bubble */}
                    {message.unread && (
                      <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                    )}

                    <div className={`flex flex-col sm:flex-row items-start justify-between gap-3 md:gap-4 ${message.unread ? 'ml-4 md:ml-6' : ''}`}>
                      <div className="flex-1 min-w-0 w-full">
                        {/* Sender Name */}
                        <div className="inline-block bg-gray-700 text-white px-3 md:px-4 py-1 rounded-full mb-2 md:mb-3">
                          <span className="font-semibold text-xs md:text-sm">{message.sender}</span>
                        </div>

                        {/* Message Preview */}
                        <p className="text-gray-500 text-sm md:text-base bg-gray-100 rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-3">
                          {message.preview}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <div className="flex-shrink-0 self-end sm:self-auto bg-gray-300 text-gray-900 px-3 md:px-4 py-1 rounded-full">
                        <span className="font-medium text-xs md:text-sm whitespace-nowrap">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Chat Tab - Responsive */}
        {activeTab === 'conversations' && (
          <>
            {conversations.length === 0 ? (
              <div className="w-full bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-12 text-center">
                <p className="text-gray-500 text-base md:text-lg">No active conversations</p>
                <p className="text-gray-400 text-xs md:text-sm mt-2">Accept messages from your inbox to start chatting</p>
              </div>
            ) : (
              <div className="w-full space-y-4 md:space-y-6">
                {[...conversations].sort((a, b) => {
                  return new Date(b.lastActivity) - new Date(a.lastActivity);
                }).map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => onOpenConversation(conversation)}
                    className="bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-4 md:p-6 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 md:gap-4">
                      <div className="flex-1 min-w-0 w-full">
                        {/* Contact Name */}
                        <div className="inline-block bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-900 px-3 md:px-4 py-1 rounded-full mb-2 md:mb-3">
                          <span className="font-semibold text-xs md:text-sm">{conversation.contactName}</span>
                        </div>

                        {/* Message Preview */}
                        <p className="text-gray-500 text-sm md:text-base bg-gray-100 rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-3">
                          {conversation.messages[conversation.messages.length - 1].text.substring(0, 100)}
                          {conversation.messages[conversation.messages.length - 1].text.length > 100 ? '...' : ''}
                        </p>

                        {/* Message Count */}
                        <p className="text-gray-400 text-xs md:text-sm mt-2">
                          {conversation.messages.length} message{conversation.messages.length !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* Timestamp */}
                      <div className="flex-shrink-0 self-end sm:self-auto bg-gray-300 text-gray-900 px-3 md:px-4 py-1 rounded-full">
                        <span className="font-medium text-xs md:text-sm whitespace-nowrap">
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

      {/* Single Message Modal - Responsive */}
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