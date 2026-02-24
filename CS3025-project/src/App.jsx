import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Login from "./components/Login.jsx";
import Homepage from "./components/Homepage.jsx";
import Messages from "./components/Messages.jsx";
import Chat from "./components/Chat.jsx";
import BulletinBoard from "./components/BulletinBoard.jsx";
import Account from "./components/Account.jsx";
import CurrentPosts from "./components/CurrentPosts.jsx";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null); 
  const [currentPage, setCurrentPage] = useState('homepage');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Melissa Smith',
      preview: 'Hello Sharon, I wanted to contact you regarding some baking...',
      fullMessage: 'Hello Sharon, I wanted to contact you regarding some baking. I saw your post about making traditional sourdough bread and I would love to learn from you. I have been trying to perfect my starter for months now. Would you be available for a baking session sometime this week?',
      timestamp: '5 hours ago',
      unread: false,
      contactInfo: 'melissa.smith@email.com',
    },
    {
      id: 2,
      sender: 'Jane Doe',
      preview: 'Hello Sharon, I wanted to contact you regarding some knitting...',
      fullMessage: 'Hello Sharon, I wanted to contact you regarding some knitting. I noticed you mentioned you knit beautiful sweaters and I am just getting started with knitting. I would really appreciate some guidance on choosing the right yarn and needles for a beginner project. Do you offer any knitting lessons?',
      timestamp: '10 hours ago',
      unread: true,
      contactInfo: 'jane.doe@email.com',
    },
    {
      id: 3,
      sender: 'Paige Bueckers',
      preview: 'Hello Sharon, I wanted to contact you regarding some cooking...',
      fullMessage: 'Hello Sharon, I wanted to contact you regarding some cooking. I heard you make the most amazing Italian dishes! I am hosting a dinner party next month and would love to get some of your secret recipes, especially for your famous lasagna. Would you be willing to share some tips?',
      timestamp: '23 hours ago',
      unread: true,
      contactInfo: 'paige.bueckers@email.com',
    },
    {
      id: 4,
      sender: 'Sarah Strong',
      preview: 'Hello Sharon, I wanted to contact you regarding some needlepoint...',
      fullMessage: 'Hello Sharon, I wanted to contact you regarding some needlepoint. Your needlepoint work is absolutely stunning! I saw the photo you shared of the floral cushion cover and I am inspired to learn this craft. Could we perhaps meet up so you could show me the basic stitches and techniques?',
      timestamp: '14 hours ago',
      unread: true,
      contactInfo: 'sarah.strong@email.com',
    },
    {
      id: 5,
      sender: 'Azzi Fudd',
      preview: 'Hello Sharon, I wanted to contact you regarding some baking using cottage cheese...',
      fullMessage: 'Hello Sharon, I wanted to contact you regarding some baking using cottage cheese. I have recently become very interested in healthier baking options and I understand you have some wonderful recipes that incorporate cottage cheese. I would love to learn more about this technique and maybe even bake together!',
      timestamp: '18 hours ago',
      unread: true,
      contactInfo: 'azzi.fudd@email.com',
    },
  ]);

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setCredentials(user);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setCredentials(null);
    setCurrentPage("homepage");
    toast.info("Logged out successfully!", {
      description: "You have logged out of your account.",
    });
  };

  const handleEditPost = (postId, updatedPost) => {
    setPosts(prev =>
      prev.map(post => post.id === postId ? updatedPost : post)
    );
  };

  const handleDeletePost = (postId) => {
    setPosts(prev =>
      prev.filter(post => post.id !== postId)
    );
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setActiveConversation(null);
  };

  const addMessage = (newMessage) => {
    const message = {
      id: Date.now(), // Simple unique ID
      sender: newMessage.name,
      preview: newMessage.title,
      fullMessage: newMessage.message,
      timestamp: 'Just now',
      unread: true,
      contactInfo: newMessage.contactInfo || 'No contact info provided',
    };
    setSentMessages(prev => [message, ...prev]); // Add to beginning of array
    toast.success('Message sent!', {
      description: 'Your message has been sent successfully.',
    });
  };

  const createConversation = (message) => {
    const newConversation = {
      id: Date.now(),
      contactName: message.sender,
      contactInfo: message.contactInfo,
      messages: [
        {
          text: message.fullMessage,
          timestamp: message.timestamp,
          fromMe: false,
        },
      ],
      lastActivity: new Date().toISOString(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    
    // Remove from inbox
    setMessages(prevMessages =>
      prevMessages.filter(msg => msg.id !== message.id)
    );
    
    toast.success('Conversation started!', {
      description: `You can now chat with ${message.sender}`,
    });
  };

  const sendMessage = (conversationId, messageText) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                text: messageText,
                timestamp: 'Just now',
                fromMe: true,
              },
            ],
            lastActivity: new Date().toISOString(),
          };
        }
        return conv;
      })
    );
    
    // Update active conversation
    setActiveConversation(prev => {
      if (prev && prev.id === conversationId) {
        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              text: messageText,
              timestamp: 'Just now',
              fromMe: true,
            },
          ],
        };
      }
      return prev;
    });

    // Simulate response from other person after 2 seconds (for prototype)
    setTimeout(() => {
      const responses = [
        "That sounds great! What time works best for you?",
        "Perfect! I'm available this week. When would you like to meet?",
        "Thank you for reaching out! I'd be happy to help with that.",
        "I appreciate your interest! Let's coordinate a time that works for both of us.",
        "Wonderful! Would weekdays or weekends be better for you?",
        "That works for me! Should we meet at your place or mine?",
        "Great idea! I'm free most afternoons this week.",
        "I'm excited to work on this together! How about Tuesday or Wednesday?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  text: randomResponse,
                  timestamp: 'Just now',
                  fromMe: false,
                },
              ],
              lastActivity: new Date().toISOString(),
            };
          }
          return conv;
        })
      );
      
      // Update active conversation with response
      setActiveConversation(prev => {
        if (prev && prev.id === conversationId) {
          return {
            ...prev,
            messages: [
              ...prev.messages,
              {
                text: randomResponse,
                timestamp: 'Just now',
                fromMe: false,
              },
            ],
          };
        }
        return prev;
      });
    }, 2000);
  };

  const openConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const closeConversation = () => {
    setActiveConversation(null);
  };

  const renderPage = () => {
    if (activeConversation) {
      return (
        <Chat
          conversation={activeConversation}
          onBack={closeConversation}
          onSendMessage={sendMessage}
        />
      );
    }

    switch (currentPage) {
      case 'bulletin':
        return <BulletinBoard 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
          onAddMessage={addMessage} 
          messagesCount={messages.filter(m => m.unread).length} 
        />
      case 'messaging': 
        return <Messages 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
          messages={messages} 
          setMessages={setMessages}
          conversations={conversations}
          onCreateConversation={createConversation}
          onOpenConversation={openConversation}
          sentMessages={sentMessages}
        />

      case 'account':
        return <Account
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          userName={credentials?.name}
          userEmail={credentials?.email}
          messagesCount={messages.filter(m => m.unread).length}
        />
  
      case 'yourPosts':
        return <CurrentPosts
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          posts={posts}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
          messagesCount={messages.filter(m => m.unread).length}
        />

      case 'homepage':
      default:
        return <Homepage userName={credentials?.name} onLogout={handleLogout} onNavigate={handleNavigate} />
    }
  };

  return (
    <>
      {isLoggedIn ? (
        renderPage()
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Toaster />
    </>
  );
}