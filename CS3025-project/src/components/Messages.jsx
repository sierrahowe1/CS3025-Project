import { HelpCircle } from 'lucide-react';


export default function Messages({ onNavigate, onLogout }) {
  const messages = [
    {
      id: 1,
      sender: 'Melissa Smith',
      preview: 'Hello Sharon, I wanted to contact you regarding some baking...',
      timestamp: '5 hours ago',
      unread: false,
    },
    {
      id: 2,
      sender: 'Jane Doe',
      preview: 'Hello Sharon, I wanted to contact you regarding some knitting...',
      timestamp: '10 hours ago',
      unread: true,
    },
    {
      id: 3,
      sender: 'Paige Bueckers',
      preview: 'Hello Sharon, I wanted to contact you regarding some cooking...',
      timestamp: '23 hours ago',
      unread: true,
    },
    {
      id: 4,
      sender: 'Sarah Strong',
      preview: 'Hello Sharon, I wanted to contact you regarding some needlepoint...',
      timestamp: '14 hours ago',
      unread: true,
    },
    {
      id: 5,
      sender: 'Azzi Fudd',
      preview: 'Hello Sharon, I wanted to contact you regarding some baking using cottage cheese...',
      timestamp: '18 hours ago',
      unread: true,
    },
  ];

  const handleNeedHelp = () => {
    console.log('Help requested');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Sidebar */}
      <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
        {/* SSA Logo */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src="src/Image.png"></img>
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
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
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          MESSAGING INBOX
        </h1>

        {/* Messages List */}
        <div className="max-w-4xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
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
      </div>
    </div>
  );
}
