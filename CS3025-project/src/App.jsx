import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast, Toaster} from 'sonner';
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Messages from "./components/Messages";

export default function App() {
 const [isLoggedIn, setLoggedIn] = useState(false);
 const [credentials, setCredentials] = useState(null); 
 const [currentPage, setCurrentPage] = useState('homepage');


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
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'messaging': 
        return <Messages onNavigate={handleNavigate} onLogout={handleLogout}/>
      case 'homepage':
        default:
          return <Homepage userName={credentials?.name} onLogout={handleLogout} onNavigate={handleNavigate}/>
    }
  };

  
  
 

 return (
  <>
    {isLoggedIn ? (
      renderPage()
    ) : (
      <Login onLogin={handleLogin}/>
    )}
    <Toaster />
  
  </>
  
 );

}

