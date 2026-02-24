import { useState } from 'react';
import { HelpCircle, User, Clock, X, Menu } from 'lucide-react';
import { toast } from 'sonner';
import CreateAPost from './CreateAPost.jsx';

export default function YourPosts({ onNavigate, onLogout, posts, setPosts, messagesCount }) {
  const [editingPost, setEditingPost] = useState(null);
  const [doCreateAPost, setCreateAPost] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    needHelp: '',
    canOffer: ''
  });


  // Filter to show only user's posts
  const userPosts = posts.filter(post => post.author === 'YOU');
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddPost = (newPostData) => {
    const newPost = {
      id: Date.now(),
      title: newPostData.title.toUpperCase(),
      needHelp: [newPostData.seeking],
      canOffer: [newPostData.canOffer],
      category: newPostData.category,
      author: 'YOU',
      timestamp: 'Just now',
    };

    setPosts(prev => [newPost, ...prev]);

    toast.success('Post created!');
  };

  const handleEditClick = (post) => {
    setEditingPost(post.id);
    setEditForm({
      title: post.title,
      category: post.category,
      needHelp: post.needHelp[0] || '',
      canOffer: post.canOffer[0] || ''
    });
  };

  const handleSaveEdit = (postId) => {
  setPosts(prevPosts =>
    prevPosts.map(post =>
      post.id === postId
        ? {
            ...post,
            title: editForm.title.toUpperCase(),
            category: editForm.category,
            needHelp: [editForm.needHelp],
            canOffer: [editForm.canOffer],
          }
        : post
    )
  );

  setEditingPost(null);

  toast.success('Post updated!');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditForm({
      title: '',
      category: '',
      needHelp: '',
      canOffer: ''
    });
  };

  const handleDelete = (postId, postTitle) => {
  if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    toast.success('Post deleted');
  }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
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
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-3xl text-left transition-all shadow-md hover:shadow-lg text-sm md:text-base"
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
            className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-2 md:py-3 px-3 md:px-4 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

        {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 lg:p-8 overflow-y-auto relative mt-6 lg:mt-0">    
            <div className="flex flex-col mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
                YOUR CURRENT POSTS</h1>

            {/* posts container */}
              <div className="w-full bg-gray-200 rounded-2xl border-2 border-gray-200 md:rounded-3xl p-3 md:p-6 pr-20 mt-6 h-[calc(100vh-180px)] overflow-y-auto relative">
                {userPosts.length === 0 ? (
                <div className="bg-gray-200 rounded-3xl text-center">
                    <p className="text-2xl text-gray-500">You haven't created any posts yet.</p>
                    <button
                    onClick={() => setCreateAPost(true)}
                    className="mt-6 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-lg"
                    >
                    Create Your First Post
                    </button>
                </div>
            ) : (
              userPosts.map(post => (
                <div key={post.id} className="bg-white rounded-2xl p-4 mb-4 shadow-md">                 
                 {editingPost === post.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">Title:</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => handleEditFormChange('title', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">Category:</label>
                        <select
                          value={editForm.category}
                          onChange={(e) => handleEditFormChange('category', e.target.value)}
                          className="w-full md:w-auto px-4 md:px-6 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:border-cyan-400 text-sm md:text-base"
                        >
                            <option value="all">All Categories</option>
                            <option value="Physical Labour">Physical Labour</option>
                            <option value="Personal Assistance">Personal Assistance</option>
                            <option value="Companionship">Companionship</option>
                            <option value="Education">Education</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Crafts">Crafts</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
                        </select>
                      </div>



                      
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">I need help with:</label>
                        <textarea
                          value={editForm.needHelp}
                          onChange={(e) => handleEditFormChange('needHelp', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">I can offer:</label>
                        <textarea
                          value={editForm.canOffer}
                          onChange={(e) => handleEditFormChange('canOffer', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4">
                        <button
                          onClick={handleCancelEdit}
                          className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(post.id)}
                          className="px-6 py-2 rounded-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      {/* Post Title */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>


                      <div className="flex flex-col md:flex-row gap-4 mb-4 text-justify">
                        <div className="flex-1 bg-white p-2 rounded-lg">
                            <span className="font-semibold text-gray-900">I need help with:</span>
                            <p className="text-gray-700 mt-1">{post.needHelp.join(', ')}</p>
                        </div>
                        <div className="flex-1 bg-white p-2 rounded-lg text-jusitfy">
                            <span className="font-semibold text-gray-900">I can offer:</span>
                            <p className="text-gray-700 mt-1">{post.canOffer.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-5 h-5" />
                            <span>{post.timestamp}</span>
                          </div>
                          <span className="bg-cyan-200 text-cyan-900 px-4 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditClick(post)}
                            className="px-8 py-2 rounded-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold transition-colors shadow-md"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="px-8 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors shadow-md"
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Return Button - Bottom Right */}
        <div className="fixed bottom-4 right-8">
          <button
            onClick={() => onNavigate('account')}
            className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            RETURN
          </button>
        </div>
      </div>
        <CreateAPost
            isOpen={doCreateAPost}
            onClose={() => setCreateAPost(false)}
            onCreate={handleAddPost}
        />
    </div>
  );
}