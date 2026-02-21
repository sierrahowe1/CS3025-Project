import { useState } from 'react';
import { HelpCircle, User, Clock, X } from 'lucide-react';

export default function BulletinBoard({ onNavigate, onLogout, onAddMessage, messagesCount }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
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
      needHelp: ['Someone to teach me how to make sourdough bread'],
      canOffer: ['Help with gardening and planting'],
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

  // Filter posts based on selected category
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
    
    // Create message and add to inbox
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Sidebar */}
      <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
        {/* SSA Logo */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src="src/Image.png" alt="SSA Logo" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex-1 flex flex-col px-4 py-8 space-y-4">
          <button
            onClick={() => onNavigate('bulletin')}
            className="bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left shadow-lg"
          >
            BULLETIN BOARD
          </button>

          <div className="relative">
            <button
              onClick={() => onNavigate('messaging')}
              className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg"
            >
              MESSAGING
            </button>
            {messagesCount > 0 && (
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

        {/* Need Help Button */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-3 px-4 rounded-full transition-all shadow-md hover:shadow-lg">
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
      <div className="flex-1 p-8 md:p-12 overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            COMMUNITY BULLETIN BOARD
          </h1>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Categories</option>
            <option value="Physical Labour">Physical Labour</option>
            <option value="Cooking">Cooking</option>
            <option value="Crafts">Crafts</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Posts Container with scrollbar */}
        <div className="max-w-5xl bg-gray-200 rounded-3xl p-6 h-[calc(100vh-250px)] overflow-y-auto relative">
          <div className="space-y-6 pr-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No posts found in this category</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl shadow-lg p-6 relative"
                >
                  {/* Post Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h2>

                  {/* Need Help Section */}
                  <div className="mb-3">
                    <p className="text-gray-700 font-semibold mb-1">I need help with:</p>
                    {post.needHelp.map((item, index) => (
                      <p key={index} className="text-gray-700">{item}</p>
                    ))}
                  </div>

                  {/* Can Offer Section */}
                  <div className="mb-4">
                    <p className="text-gray-700 font-semibold mb-1">I can offer:</p>
                    {post.canOffer.map((item, index) => (
                      <p key={index} className="text-gray-700">{item}</p>
                    ))}
                  </div>

                  {/* Footer with user info and contact button */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4">
                      {/* User */}
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="font-bold text-gray-900">{post.author}</span>
                        <span className="bg-cyan-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                          {post.userType}
                        </span>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">{post.timestamp}</span>
                      </div>

                      {/* Category Badge */}
                      <span className="bg-cyan-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>

                    {/* Contact Button */}
                    <button
                      onClick={() => handleContact(post)}
                      className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg"
                    >
                      CONTACT
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Post Button */}
        <div className="absolute bottom-12 right-12">
          <button
            onClick={() => onNavigate('create')}
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            CREATE POST
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Contact {selectedPost?.author}
            </h2>
            <p className="text-gray-600 mb-6">
              Regarding: {selectedPost?.title}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmitContact} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                  Message Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={contactForm.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Enter message title"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message Description
                </label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  placeholder="Enter your message"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end mt-8">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold transition-all shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}