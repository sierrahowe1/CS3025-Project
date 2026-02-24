import { useState, useEffect } from 'react';
import { HelpCircle, Menu, User, Lock, Settings, AlertTriangle, FileText, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function Account({ onNavigate, onLogout, userName, userEmail, messagesCount }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editInfo, setEditInfo] = useState({
    firstName: userName?.split(' ')[0] || 'Sample',
    lastName: userName?.split(' ')[1] || 'Name',
    email: userEmail || 'sampleemail@gmail.com'
  });

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    textSize: 'Large',
    textToSpeech: true,
    emailNotification: true,
    messageNotification: true
  });

  // Load text size preference from localStorage
  useEffect(() => {
    const savedTextSize = localStorage.getItem('textSize');
    if (savedTextSize) {
      setPreferences(prev => ({ ...prev, textSize: savedTextSize }));
    }
  }, []);

  const handleEditInfoChange = (field, value) => {
    setEditInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceToggle = (field) => {
    setPreferences(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleTextSizeChange = (size) => {
    setPreferences(prev => ({ ...prev, textSize: size }));
  };

  const handleSave = () => {
    localStorage.setItem('textSize', preferences.textSize);
    toast.success('Settings saved!', {
      description: 'Your account settings have been updated.',
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deleted', {
        description: 'Your account has been permanently deleted.',
      });
      setTimeout(() => {
        onLogout();
      }, 2000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsSidebarOpen(false);
  };

  // Generate initials from name
  const getInitials = () => {
    const first = editInfo.firstName?.[0] || 'S';
    const last = editInfo.lastName?.[0] || 'N';
    return `${first}${last}`.toUpperCase();
  };

  // Text size classes
  const textSizeClasses = {
    Small: 'text-sm',
    Medium: 'text-base',
    Large: 'text-lg',
    'Extra Large': 'text-xl',
    '2XL': 'text-2xl',
  };

  const headingSizeClasses = {
    Small: 'text-2xl',
    Medium: 'text-3xl',
    Large: 'text-4xl',
    'Extra Large': 'text-5xl',
    '2XL': 'text-6xl',
  };

  const currentTextSize = textSizeClasses[preferences.textSize] || 'text-lg';
  const currentHeadingSize = headingSizeClasses[preferences.textSize] || 'text-4xl';

  // Toggle Switch Component
  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`w-16 h-8 rounded-full relative transition-all duration-300 ease-in-out ${
        enabled 
          ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-lg shadow-cyan-200' 
          : 'bg-gray-300'
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`w-6 h-6 absolute top-1 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
          enabled ? 'right-1' : 'left-1'
        }`}
      />
      <span className="absolute inset-0 flex items-center justify-center font-bold text-xs text-gray-900">
        {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-cyan-50 flex overflow-hidden">
      {/* Mobile Menu Button - Fixed position */}
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
            onClick={() => handleNavigate('bulletin')}
            className="bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md text-sm md:text-base"
          >
            BULLETIN BOARD
          </button>

          <div className="relative">
            <button
              onClick={() => handleNavigate('messaging')}
              className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md hover:shadow-lg text-sm md:text-base"
            >
              MESSAGING
            </button>
            {messagesCount > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
            )}
          </div>

          <button
            onClick={() => handleNavigate('account')}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md hover:shadow-lg text-sm md:text-base"
          >
            ACCOUNT
          </button>
        </div>

        {/* Need Help Button */}
        <div className="p-3 md:p-4">
          <button
            onClick={() => console.log('Help requested')}
            className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-2 md:py-3 px-3 md:px-4 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-400 rounded-full flex items-center justify-center text-white">
              <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <span className="text-xs md:text-sm">Need help?</span>
          </button>
        </div>

        {/* Logout */}
        <div className="p-3 md:p-4">
          <button
            onClick={onLogout}
            className="w-full text-cyan-700 hover:text-cyan-900 font-large text-xs underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="p-6 lg:p-12 pb-20">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Personal Information Section */}
            <div className="bg-gradient-to-br from-cyan-50 via-white to-cyan-50 rounded-3xl p-8 shadow-xl border border-cyan-100 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-transparent rounded-full blur-3xl -z-0" />
              
              <div className="relative z-10">
                {/* Header with Logout */}
                <div className="flex justify-between items-start mb-8">
                  <h2 className={`${currentHeadingSize} font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent`}>
                    Personal Information
                  </h2>
                  <button
                    onClick={onLogout}
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    LOG OUT
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* User Display */}
                  <div className="flex flex-col items-center justify-center gap-6 p-6 bg-white rounded-2xl shadow-lg">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-48 h-48 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-white text-6xl font-bold drop-shadow-lg">
                          {getInitials()}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-cyan-500" />
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="text-center space-y-2">
                      <h3 className={`${currentHeadingSize} font-bold text-gray-900`}>
                        {editInfo.firstName} {editInfo.lastName}
                      </h3>
                      <div className="inline-block bg-cyan-100 px-4 py-2 rounded-full">
                        <p className={`${currentTextSize} text-cyan-700 font-semibold`}>
                          Student Account
                        </p>
                      </div>
                      <p className={`${currentTextSize} text-gray-600`}>
                        {editInfo.email}
                      </p>
                    </div>
                  </div>

                  {/* Edit Form */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className={`${currentHeadingSize} font-bold text-cyan-600 mb-6`}>
                      EDIT INFO
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className={`${currentTextSize} block text-gray-700 font-semibold mb-2`}>
                          First Name
                        </label>
                        <input
                          type="text"
                          value={editInfo.firstName}
                          onChange={(e) => handleEditInfoChange('firstName', e.target.value)}
                          className={`${currentTextSize} w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-cyan-400 focus:bg-white transition-all outline-none`}
                        />
                      </div>
                      <div>
                        <label className={`${currentTextSize} block text-gray-700 font-semibold mb-2`}>
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={editInfo.lastName}
                          onChange={(e) => handleEditInfoChange('lastName', e.target.value)}
                          className={`${currentTextSize} w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-cyan-400 focus:bg-white transition-all outline-none`}
                        />
                      </div>
                      <div>
                        <label className={`${currentTextSize} block text-gray-700 font-semibold mb-2`}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={editInfo.email}
                          onChange={(e) => handleEditInfoChange('email', e.target.value)}
                          className={`${currentTextSize} w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-cyan-400 focus:bg-white transition-all outline-none`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password and Preferences Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Change Password Section */}
              <div className="bg-gradient-to-br from-cyan-50 via-white to-cyan-50 rounded-3xl p-8 shadow-xl border border-cyan-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`${currentHeadingSize} font-bold text-gray-900`}>
                    Change Password
                  </h2>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className={`${currentTextSize} block text-gray-700 font-semibold mb-2`}>
                      Old Password
                    </label>
                    <input
                      type="password"
                      value={passwordInfo.oldPassword}
                      onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                      className={`${currentTextSize} w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-cyan-400 focus:bg-white transition-all outline-none`}
                      placeholder="Enter old password"
                    />
                  </div>
                  <div>
                    <label className={`${currentTextSize} block text-gray-700 font-semibold mb-2`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordInfo.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className={`${currentTextSize} w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-cyan-400 focus:bg-white transition-all outline-none`}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className={`${currentTextSize} block text-gray-700 font-semibold mb-2`}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwordInfo.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className={`${currentTextSize} w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-cyan-400 focus:bg-white transition-all outline-none`}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="bg-gradient-to-br from-cyan-50 via-white to-cyan-50 rounded-3xl p-8 shadow-xl border border-cyan-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`${currentHeadingSize} font-bold text-gray-900`}>
                    Preferences
                  </h2>
                </div>
                
                <div className="space-y-5">
                  {/* Text Size */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <label className={`${currentTextSize} text-gray-700 font-semibold`}>
                      Text Size
                    </label>
                    <select
                      value={preferences.textSize}
                      onChange={(e) => handleTextSizeChange(e.target.value)}
                      className={`${currentTextSize} px-6 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-cyan-400 transition-all outline-none font-semibold cursor-pointer hover:shadow-md`}
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                      <option value="2XL">2XL</option>
                    </select>
                  </div>

                  {/* Text to Speech */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <label className={`${currentTextSize} text-gray-700 font-semibold`}>
                      Text to Speech
                    </label>
                    <ToggleSwitch
                      enabled={preferences.textToSpeech}
                      onToggle={() => handlePreferenceToggle('textToSpeech')}
                    />
                  </div>

                  {/* Email Notification */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <label className={`${currentTextSize} text-gray-700 font-semibold`}>
                      Email Notification
                    </label>
                    <ToggleSwitch
                      enabled={preferences.emailNotification}
                      onToggle={() => handlePreferenceToggle('emailNotification')}
                    />
                  </div>

                  {/* Message Notification */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <label className={`${currentTextSize} text-gray-700 font-semibold`}>
                      Message Notification
                    </label>
                    <ToggleSwitch
                      enabled={preferences.messageNotification}
                      onToggle={() => handlePreferenceToggle('messageNotification')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={() => onNavigate('yourPosts')}
                className={`${currentTextSize} flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <FileText className="w-5 h-5" />
                VIEW YOUR POSTS
              </button>

              <button
                onClick={handleSave}
                className={`${currentTextSize} flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <Save className="w-5 h-5" />
                SAVE CHANGES
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl p-8 shadow-xl border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className={`${currentHeadingSize} font-bold text-red-600`}>
                  Danger Zone
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-white rounded-2xl border border-red-200">
                <div className="flex-1">
                  <h3 className={`${currentHeadingSize} font-bold text-gray-900 mb-2`}>
                    Delete Account
                  </h3>
                  <p className={`${currentTextSize} text-gray-600`}>
                    Deleting your account will permanently remove your posts and messages. This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className={`${currentTextSize} whitespace-nowrap bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  DELETE
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
