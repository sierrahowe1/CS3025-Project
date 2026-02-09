import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';
import Login from "./components/Login";
import Homepage from "./components/Homepage";

export default function App() {
  [loggedIn, setLoggedIn] = useState(false);
  [credentials, setCredentials] = useState(null); 

  const handleLogin = (user) => {
    setLoggedIn(true);
    setCredentials(user);
  }
 const handleLogout = () => {
  setLoggedIn(false);
  setCredentials(null);
  toast.success("Logged out successfully!", {
    description: "You have logged out of your account.",
  });
  
 };

 return (
  <>
    {loggedIn ? (
      <Homepage userName={credentials?.name} onLogout={handleLogout}/>
    ) : (
      <Login onLogin={handleLogin}/>
    )}
    <Toaster />
  
  </>
  
 );

}

