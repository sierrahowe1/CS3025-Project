import { useState } from 'react';
import { toast } from '@sonner@2.0.3'; //used for response alerts
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'; //used for symbols

export default function App() {
  const [isSignUp, goSignUp] = useState(false); //set to false initially
  const [name, setName] = useState('');//set to be an empty text initially
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmed] = useState('');
  const [showPassword, showingPassword] = useState(false);//we are not showing the password initially
  const [showConfirmedPassword, showingConfirmedPassword] = useState(false);
  const [isStudent, setStudent] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [isLoading, confirmLoading] = useState(flase);
  const [nameError, confirmNameError] = useState('');
  const [emailError, confirmEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmError] = useState('');

const handleNameChange = (name) => {
    setName(name.target.value);
    if(nameError) {
      confirmNameError('');
    }

  };

  const handleEmailFormat = (email) => {
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if(emailError) {
      confirmEmailError('');
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(e.target.value);
    if(passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (confirm) => {
    confirmPassword(e.target.value);
    if(confirmPasswordError) {
      setConfirmError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;

    if(isSignup && !name) {
      confirmNameError("Please enter your name.");
      error = true;
    }

    if(!email) {
      confirmEmailError("Please enter your email.");
      error = true;
    }
    else if(!handleEmailFormat(email)) {
      confirmEmailError("This email is not valid.");
      error = true;
    }

    if(!password) {
      setPasswordError("Please enter a password.");
      error = true;
    }
    else if(password.length < 7) {
      setPasswordError("Password must be at least 7 characters.");
      error = true;
    }

    if(isSignup && !confirmPassword) {
      setConfirmError("Must confirm password.");
      error = true;
    }
    else if(isSignup && password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      error = true;
    }


  }


}


