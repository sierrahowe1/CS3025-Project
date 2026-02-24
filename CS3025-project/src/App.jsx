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
      sender: 'Margret Plum',
      preview: 'Hello Greg, I wanted to contact you regarding your history homework...',
      fullMessage: 'Hello Greg, I wanted to contact you regarding your history homework. I saw your post about studying for a history test and I am also preparing for the same test. I have some great study materials and flashcards that I think could really help you out. I would love to teach you some cords on the guitar in exchange. Would you like to meet up and study together?',
      timestamp: '7 hours ago',
      unread: false,
      
    },
    {
      id: 2,
      sender: 'John Doe',
      preview: 'Hello Greg, I wanted to contact you regarding some driving...',
      fullMessage: 'Hello Sharon, I wanted to contact some driving lessons you wanted to take up. I noticed you mentioned you recently bought a car with manual transmission. I have been driving stick shift for years and would be happy to help you get more comfortable with it. I can also wash and detail your car as part of the deal! Let me know if you are interested.',
      timestamp: '10 hours ago',
      unread: true,
      
    },
    {
      id: 3,
      sender: 'Ann Smith',
      preview: 'Hello Greg, I wanted to contact you regarding some cooking...',
      fullMessage: 'Hello Greg, I wanted to contact you regarding some cooking. I heard you want to learn how to make the most amazing Italian dishes! I have a lot of experience cooking Italian food and I would love to share some of my recipes with you. I can teach you how to make a delicious lasagna in exchange for some help with gardening work. Let me know if you are interested in learning how to cook together!',
      timestamp: '23 hours ago',
      unread: true,
      
    },
    {
      id: 4,
      sender: 'Betty Davis',
      preview: 'Hello Greg, I wanted to contact you regarding some crochet...',
      fullMessage: 'Hello Greg, I wanted to contact you regarding some crochet. I noticed you have been wanting to learn how to crochet for a while now. I have some experience I think that would be a great skill exchange for driving me to a medical appointment I have. Let me know if you are interested in learning together!',
      timestamp: '14 hours ago',
      unread: true,
      
    },
    {
      id: 5,
      sender: 'Susan Boyle',
      preview: 'Hello Greg, I wanted to contact you regarding your math homework...',
      fullMessage: 'Hello Greg, I wanted to contact you regarding your math homework. I saw your post about struggling with a math assignment and I think I can help you out. I have a strong background in math and I would be happy to tutor you. In exchange, I would love to learn how to use my computer better. Let me know if you are interested in working together on your math homework!',
      timestamp: '18 hours ago',
      unread: true,
      
    },
  ]);

    const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      title: 'HISTORY HOMEWORK',
      needHelp: ['Studying for my history test'],
      canOffer: ['Guitar lessons'],
      author: 'YOU',
      timestamp: '2 hours ago',
      category: 'Other',
    },
    {
      id: 2,
      title: 'LEARNING TO COOK',
      needHelp: ['I would like to learn how to cook lasagna'],
      canOffer: ['I could do some gardening work for you.'],
      author: 'YOU',
      timestamp: '6 hours ago',
      category: 'Cooking',
    },
    {
      id: 3,
      title: 'LEARN TO DRIVE STICK SHIFT',
      needHelp: ['I recently bought a car with manual transmission. I can get around, but would like help to get better.'],
      canOffer: ['I could wash your car and detail the interior.'],
      author: 'YOU',
      timestamp: '1 day ago',
      category: 'Physical Labour',
    },
    {
      id: 4,
      title: 'CROCHET',
      needHelp: ['I would love to learn how to crochet.'],
      canOffer: ['A ride to some medical appointments.'],
      author: 'YOU',
      timestamp: '3 hours ago',
      category: 'Crafts',
    },
    {
      id: 5,
      title: 'MATH HOMEWORK',
      needHelp: ['I have a math assignment that I am struggling with'],
      canOffer: ['Teach you how to use your computer'],
      author: 'YOU',
      timestamp: '5 hours ago',
      category: 'Technology',
    },
  ]);

  const handleAddUserPost = (newPostData) => {
    const newPost = {
      id: Date.now(),
      title: newPostData.title.toUpperCase(),
      needHelp: [newPostData.seeking],
      canOffer: [newPostData.canOffer],
      category: newPostData.category,
      author: 'YOU',
      timestamp: 'Just now',
    };

    setUserPosts(prev => [newPost, ...prev]);
  };

  const handleEditUserPost = (postId, updatedPost) => {
    setUserPosts(prev =>
      prev.map(post => post.id === postId ? updatedPost : post)
    );
  };

  const handleDeleteUserPost = (postId) => {
    setUserPosts(prev =>
      prev.filter(post => post.id !== postId)
    );
  };

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);

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
          onAddPost={handleAddUserPost}
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
      case 'currentPosts':
        return <CurrentPosts
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          posts={userPosts}
          setPosts={setUserPosts} 
          messagesCount={messages.filter(m => m.unread).length}
        />

      case 'homepage':
      default:
        return <Homepage 
          userName={credentials?.name} 
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
          onAddPost={handleAddUserPost}
        />
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