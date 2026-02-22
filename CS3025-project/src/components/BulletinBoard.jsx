import { useState } from 'react';
import { HelpCircle, User, Clock, X, Menu } from 'lucide-react';
import CreateAPost from './CreateAPost.jsx';

export default function BulletinBoard({ onNavigate, onLogout, onAddMessage, messagesCount }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doCreateAPost, setCreateAPost] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    title: '',
    message: ''
  });

  const posts = [
    {
      id: 1,
      title: 'YARD WORK',
      needHelp: ['Raking my leaves'],
      canOffer: ['A home cooked meal'],
      author: 'SHARON',
      userType: 'Senior',
      timestamp: '2 hours ago',
      category: 'Physical Labour',
    },
    {
      id: 2,
      title: 'ASSEMBLE FURNITURE',
      needHelp: ['I have some Ikea furniture that I need help assembling'],
      canOffer: ['A ride to the grocery store to pick up groceries'],
      author: 'ROBERT',
      userType: 'Senior',
      timestamp: '6 hours ago',
      category: 'Physical Labour',
    },
    {
      id: 3,
      title: 'BAKING LESSONS',
      needHelp: ['Someone to teach me how to make sourdough bread '],
      canOffer: ['Help with gardening and planting '],
      author: 'MARGARET',
      userType: 'Senior',
      timestamp: '1 day ago',
      category: 'Cooking',
    },
    {
      id: 4,
      title: 'KNITTING PROJECT',
      needHelp: ['Help finishing a sweater I started'],
      canOffer: ['Piano lessons'],
      author: 'LINDA',
      userType: 'Senior',
      timestamp: '3 hours ago',
      category: 'Crafts',
    },
    {
      id: 5,
      title: 'SMARTPHONE HELP',
      needHelp: ['Learning how to use my new iPhone'],
      canOffer: ['Homemade cookies'],
      author: 'GEORGE',
      userType: 'Senior',
      timestamp: '5 hours ago',
      category: 'Technology',
    },
  ];

  // Filter posts based by category
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleNeedHelp = () => {
    console.log('Help requested');
  };

  const handleContact = (post) => {
    setSelectedPost(post);
    setShowContactModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
    setSelectedPost(null);
    setContactForm({ name: '', title: '', message: '' });
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    
    // Create post
    onAddMessage({
      name: contactForm.name,
      title: contactForm.title,
      message: contactForm.message,
      contactInfo: 'Contact info available after accepting message'
    });
    
    handleCloseModal();
  };

  const handleFormChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
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
            onClick={() => { onNavigate('bulletin'); setIsSidebarOpen(false); }}
            className="bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md text-sm md:text-base"
          >
            BULLETIN BOARD
          </button>

          <div className="relative">
            <button
              onClick={() => { onNavigate('messaging'); setIsSidebarOpen(false); }}
              className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md hover:shadow-lg text-sm md:text-base"
            >
              MESSAGING
            </button>
            {messagesCount > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
            )}
          </div>

          <button
            onClick={() => { onNavigate('account'); setIsSidebarOpen(false); }}
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

      {/* Main Content Area - Responsive */}
      <div className="flex-1 p-4 md:p-8 lg:p-8 overflow-y-auto relative mt-6 lg:mt-0">
        {/* Header - Responsive */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3 md:mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            COMMUNITY BULLETIN BOARD
          </h1>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-4 md:px-6 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:border-cyan-400 text-sm md:text-base"
          >
            <option value="all">All Categories</option>
            <option value="Physical Labour">Physical Labour</option>
            <option value="Cooking">Cooking</option>
            <option value="Crafts">Crafts</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Posts Container with scrollbar - Responsive */}
        <div className="w-full bg-gray-200 rounded-2xl border-2 border-gray-200 md:rounded-3xl p-3 md:p-6 pr-20 h-[calc(100vh-180px)] overflow-y-auto relative">
          <div className="space-y-3 md:space-y-4 pr-2 md:pr-0">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-12 text-center">
                <p className="text-gray-500 text-base md:text-lg">No posts found in this category</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-lg py-3 md:py-4 pr-2 md:pr-3 pl-4 md:pl-6 relative"
                >
                  {/* Post Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                    {post.title}
                  </h2>

                  {/* Need Help & Can Offer Sections */}
                  <div className="flex flex-col lg:flex-row gap-5">
                    {/* Need Help Section */}
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold mb-1 text-lg md:text-base">I need help with:</p>
                      {post.needHelp.map((item, index) => (
                        <p key={index} className="text-gray-700 text-lg md:text-base break-words text-justify">{item}</p>
                      ))}
                    </div>

                    {/* Can Offer Section */}
                    <div className="flex-1 px-4 text-justify">
                      <p className="text-gray-700 font-semibold mb-1 text-lg md:text-base">I can offer:</p>
                      {post.canOffer.map((item, index) => (
                        <p key={index} className="text-gray-700 text-lg md:text-base break-words text-justify">{item}</p>
                      ))}
                    </div>
                  </div>

                  {/* Footer with user info and contact button - Responsive */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-2 md:mt-3">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                      {/* User */}
                      <div className="flex items-center gap-1 md:gap-2">
                        <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                        <span className="font-bold text-gray-900 text-sm md:text-base">{post.author}</span>
                        <span className="bg-cyan-300 text-gray-900 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium">
                          {post.userType}
                        </span>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 md:gap-2">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                        <span className="text-gray-700 text-sm md:text-base">{post.timestamp}</span>
                      </div>

                      {/* Category Badge */}
                      <span className="bg-cyan-300 text-gray-900 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium">
                        {post.category}
                      </span>
                    </div>

                    {/* Contact Button */}
                    <button
                      onClick={() => handleContact(post)}
                      className="w-full lg:w-auto bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                      CONTACT
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Post Button - Responsive */}
        <div className="fixed bottom-0 right-4 md:bottom-2 md:right-8 lg:bottom-4 lg:right-12">
          <button
            onClick={() => setCreateAPost(true)}
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            CREATE POST
          </button>
        </div>
      </div>

      {/* Contact Modal - Responsive */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-cyan-400 rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-lg md:max-w-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Contact {selectedPost?.author}
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Regarding: {selectedPost?.title}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmitContact} className="space-y-4 md:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                  className="w-full bg-white text-gray-700 placeholder-gray-400 px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-200 focus:outline-none transition-colors text-sm md:text-base"
                  placeholder="Enter your name"
                />
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-gray-800 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                  Message Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={contactForm.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  required
                  className="w-full bg-white text-gray-700 placeholder-gray-400 px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-200 focus:outline-none transition-colors text-sm md:text-base"
                  placeholder="Enter message title"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-800 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                  Message Description
                </label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-white text-gray-700 placeholder-gray-400 px-3 md:px-4 py-2 md:py-3 rounded-lg border-2 border-gray-200 focus:border-cyan-200 focus:outline-none transition-colors resize-none text-sm md:text-base"
                  placeholder="Enter your message"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4 md:mt-8">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full bg-white hover:bg-gray-300 sm:w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-gray-800 font-semibold shadow-lg transition-colors text-md md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-600 hover:from-cyan-500 hover:to-cyan-500 text-white font-bold transition-all shadow-lg hover:shadow-xlg text-md md:text-base"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <CreateAPost
        isOpen={doCreateAPost}
        onClose={() => setCreateAPost(false)}
      />
    </div>
    
  );
}