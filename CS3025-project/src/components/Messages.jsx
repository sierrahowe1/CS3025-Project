import { HelpCircle } from 'lucide-react';
import { useState} from 'react';
import SingleMessage from './SingleMessage';
import toast from 'react-hot-toast';


export default function Messages({ onNavigate, onLogout }) {
  const [messages, setMessages] = useState ([
    {
      id: 1,
      sender: 'Melissa Smith',
      preview: 'Hello Sharon, I wanted to contact you regarding some baking...',
      fullMessage: "Hello Sharon, I wanted to contact you regarding some baking classes you offer. I am very interested in learning more about your sourdough workshop. Could you please share more details and your availability?",
      timestamp: '5 hours ago',
      contactInfo:'melissaSmith@gmail.com' ,
      unread: false,
    },

    {
      id: 2,
      sender: 'Jane Doe',
      preview: 'Hello Sharon, I wanted to contact you regarding some knitting...',
      fullMessage: "Hello Sharon, I wanted to contact you regarding some knitting classes you offer. I am very interested in learning more about your beginner's knitting workshop.I would love to help you with your physical labour needs in return. Could you please share more details and your availability?",
      timestamp: '10 hours ago',
      contactInfo: 'janeDoe@unb.ca',
      unread: true,
    },
    {
      id: 3,
      sender: 'Paige Bueckers',
      preview: 'Hello Sharon, I wanted to contact you regarding some cooking...',
      fullMessage: "Hello Sharon, I wanted to contact you regarding some cooking classes you offer. I am very interested in learning more about your healthy cooking workshop. I would love to help you with your physical labour needs in return. Could you please share more details and your availability?",
      timestamp: '23 hours ago',
      contactInfo: 'paigeBuckets@wings.net',
      unread: true,
    },
    {
      id: 4,
      sender: 'Sarah Strong',
      preview: 'Hello Sharon, I wanted to contact you regarding some needlepoint...',
      fullMessage: "Hello Sharon, I wanted to contact you regarding some needlepoint classes you offer. I am very interested in learning more about your beginner's needlepoint workshop. I would love to help you with your physical labour needs in return. Could you please share more details and your availability?",
      timestamp: '14 hours ago',
      contactInfo: 'sarahStrong@unb.ca',
      unread: true,
    },
    {
      id: 5,
      sender: 'Azzi Fudd',
      preview: 'Hello Sharon, I wanted to contact you regarding some baking using cottage cheese...',
      fullMessage: "Hello Sharon, I wanted to contact you regarding some baking classes you offer. I am very interested in learning more about your cottage cheese baking workshop. I would love to help you with your physical labour needs in return. Could you please share more details and your availability?",
      timestamp: '18 hours ago',
      contactInfo: 'azziCottageCheese@goodCulture.com',
      unread: true,
    },
  ]);

  const [clickedMessage, setClickedMessage] = useState(null);

  const handleMessageClick = (message) => {
    setClickedMessage(message);
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id ? { ...msg, unread: false} : msg)
    );
  }

  const handleAcceptMessage = () => {
    if(clickedMessage) {
      toast.success('Message accepted!', {
        description: `You have accepted the message from ${clickedMessage.sender} at ${clickedMessage.contactInfo}`,
      });
      setClickedMessage(null);
    }
  };

  const handleDeclinedMessage = () => {
    if(clickedMessage) {
      toast.info('Message declined.', {
        description: `You have declined the message from ${clickedMessage.sender}. The message has been kept in your inbox.`,
      });
      setClickedMessage(null);
    }
  }

  const handleBack = () => {
    setClickedMessage(null);
  }

  const handleNeedHelp = () => {
    console.log('Help requested');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-200 to-gray-200 flex">
      
      <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
        
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src="src/Image.png"></img>
          </div>
        </div>

        
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

        
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full text-cyan-700 hover:text-cyan-900 font-medium text-xs underline"
          >
            Logout
          </button>
        </div>
      </div>

      
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          MESSAGING INBOX
        </h1>

        
        <div className="max-w-4xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
            >
              
              {message.unread && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
              )}

              <div className={`flex items-start justify-between gap-4 ${message.unread ? 'ml-6' : ''}`}>
                <div className="flex-1 min-w-0">
                  
                  <div className="inline-block bg-gray-700 text-white px-4 py-1 rounded-full mb-3">
                    <span className="font-semibold text-sm">{message.sender}</span>
                  </div>

                  
                  <p className="text-gray-500 text-base bg-gray-100 rounded-2xl px-4 py-3">
                    {message.preview}
                  </p>
                </div>

                
                <div className="flex-shrink-0 bg-gray-300 text-gray-900 px-4 py-1 rounded-full">
                  <span className="font-medium text-sm whitespace-nowrap">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {clickedMessage && (
        <SingleMessage
          message={clickedMessage}
          onAccept={handleAcceptMessage}
          onDecline={handleDeclinedMessage}
          onBack = {handleBack}
          />
      )}
    </div>
  );
}
