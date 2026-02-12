import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [studentId, setStudentId] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (nameError) {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validation
    let hasError = false;
    
    if (isSignUp && !name) {
      setNameError('Name is required');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (isSignUp && !confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      hasError = true;
    } else if (isSignUp && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) {
      toast.error('Validation Error', {
        description: 'Please fix the errors in the form.',
      });
      return;
    }

    // Simulate login/signup
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const userType = isStudent ? 'student' : 'senior';
      const displayName = isSignUp ? name : email.split('@')[0]; // Use name for signup, email prefix for login
      toast.success(isSignUp ? 'Sign up successful!' : 'Login successful!', {
        description: isSignUp ? `Welcome, ${name}! Registered as ${userType}.` : `Welcome back!`,
      });
      
      
      onLogin({
        name: displayName,
        email: email,
        isStudent: isStudent,
        studentId: studentId,
      });
      
      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsStudent(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setStudentId('');
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast.info('Password Reset', {
      description: 'A password reset link will be sent to your email.',
    });
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsStudent(false);
    setStudentId('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Sidebar with Gradient Background - Curved protruding buttons */}
      <div className="relative w-full md:w-[200px] lg:w-[220px] bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col items-center justify-center py-8 md:py-0 order-2 md:order-1">
        {/* Decorative top blob */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-white/30 to-transparent rounded-bl-[100px] md:rounded-bl-[120px]" />
        
        {/* Sidebar Buttons - Protruding style */}
        <div className="relative z-10 flex flex-row md:flex-col items-center justify-center gap-4 md:gap-0 w-full">
          {/* LOGIN Button */}
          <div className="relative md:mb-12">
            <button 
              className={`px-8 md:px-10 lg:px-12 py-3 md:py-4 rounded-r-full md:rounded-l-none transition-all duration-300 font-semibold ${
                !isSignUp 
                  ? 'bg-white text-black shadow-lg scale-105' 
                  : 'bg-white/20 text-black hover:bg-gray/10'
              }`}
              onClick={() => {
                setIsSignUp(false);
                resetForm();
              }}
            >
              LOGIN
            </button>
          </div>
          
          {/* SIGN UP Button */}
          <div className="relative">
            <button 
              className={`px-8 md:px-10 lg:px-12 py-3 md:py-4 rounded-r-full md:rounded-l-none transition-all duration-300 font-semibold ${
                isSignUp 
                  ? 'bg-white text-black shadow-lg scale-105' 
                  : 'bg-white/20 text-black hover:bg-white/50'
              }`}
              onClick={() => {
                setIsSignUp(true);
                resetForm();
              }}
            >
              SIGN UP
            </button>
          </div>
        </div>

        {/* Decorative bottom blob */}
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-white/30 to-transparent rounded-tr-[100px] md:rounded-tr-[120px]" />
      </div>

      {/* Right Content Area - Light background */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 lg:p-12 order-1 md:order-2">
        <div className="w-full max-w-md">
          {/* Header with Logo */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <img src="src/Banner.png"></img>
            </div>
          </div>

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Name Input */}
            {isSignUp && (
              <div className="relative">
                <div className="flex items-center gap-4 pb-2 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  />
                </div>
                {nameError && (
                  <p className="text-red-500 text-sm mt-1 ml-9">{nameError}</p>
                )}
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <div className="flex items-center gap-4 pb-2 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1 ml-9">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex items-center gap-4 pb-2 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1 ml-9">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            {isSignUp && (
              <div className="relative">
                <div className="flex items-center gap-4 pb-2 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1 ml-9">{confirmPasswordError}</p>
                )}
              </div>
            )}

            {/* Student Radio Buttons for Sign Up */}
            {isSignUp && (
              <div className="space-y-3">
                <div className="flex items-center gap-6">
                  <span className="text-cyan-500 font-bold text-sm">STUDENT?</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        checked={isStudent === true}
                        onChange={() => setIsStudent(true)}
                        className="w-4 h-4 accent-cyan-500"
                      />
                      <span className="text-gray-700 font-medium text-sm">YES</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        checked={isStudent === false}
                        onChange={() => setIsStudent(false)}
                        className="w-4 h-4 accent-cyan-500"
                      />
                      <span className="text-gray-700 font-medium text-sm">NO</span>
                    </label>
                  </div>
                </div>
                
                {/* Student ID field - shows when YES is selected */}
                {isStudent && (
                  <div className="relative ml-4 pl-4 border-l-2 border-cyan-200">
                    <input
                      type="text"
                      placeholder="STUDENT ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full pb-2 border-b-2 border-gray-300 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-sm transition-colors"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Forgot Password & Submit */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4">
              {!isSignUp && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-cyan-500 hover:underline transition-all font-medium text-sm sm:text-base text-center sm:text-left order-2 sm:order-1"
                >
                  Forgot Password?
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-cyan-400 hover:bg-cyan-500 text-white px-8 sm:px-12 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base order-1 sm:order-2 ${!isSignUp ? 'sm:ml-auto' : 'w-full sm:w-auto'}`}
              >
                {isLoading ? (isSignUp ? 'SIGNING UP...' : 'LOGGING IN...') : (isSignUp ? 'SIGN UP' : 'LOGIN')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}