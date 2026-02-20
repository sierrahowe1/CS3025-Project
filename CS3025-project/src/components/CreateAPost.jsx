import {useState} from 'react';
import {X, ChevronDown} from 'lucide-react';
import {toast} from 'sonner';


export default function CreateAPost ({ isOpen, onClose }) {
    const [postType, setPostType] = useState('seeking');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const categories = [
        'Technology',
        'Transportation',
        'Grocery Shopping',
        'Home Maintenance',
        'Companionship',
        'Medical Assistance',
        'Education/Tutoring',
        'Cooking/Baking',
        'Other'
    ];


    const handleSubmit = (e) => {
        e.preventDefault();


        if (!category) {
            toast.error('Please select a category.');
            return;
        }

        if (!title.trim()) {
            toast.error('Please enter a post title.');
            return;
        }

        if (!description.trim()) {
            toast.error('Please enter a description.');
            return;
        }


        toast.success('Post created!', {
            description: `Your ${postType === 'seeking' ? 'help request' : 'help offer'} has been posted to the community!`,
        });

        handleClose();
    };


    const handleClose = () => {
        setPostType('seeking');
        setCategory('');
        setTitle('');
        setDescription('');
        setShowCategoryDropdown(false);
        onClose();
    };

    if (!isOpen) {
        return null;
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-cyan-600 via-cyan-400 to-cyan-200 rounded-[40px] shadow-2xl p-8 md:p-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-200 hover:text-white transition-colors"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Create a New Post
          </h2>
          <p className="text-black-200 text-base md:text-lg">
            Share what you need help with or how you can help others in the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Post Type</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setPostType('seeking')}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    postType === 'seeking'
                      ? 'bg-gray-900 border-gray-900'
                      : 'bg-white border-gray-400 group-hover:border-gray-600'
                  }`}
                >
                  {postType === 'seeking' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-lg text-gray-900">Seeking Help</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setPostType('offering')}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    postType === 'offering'
                      ? 'bg-gray-900 border-gray-900'
                      : 'bg-white border-gray-400 group-hover:border-gray-600'
                  }`}
                >
                  {postType === 'offering' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-lg text-gray-900">Offering Help</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Category</h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full bg-white rounded-2xl px-5 py-4 text-left text-gray-700 text-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <span className={category ? 'text-gray-900' : 'text-gray-500'}>
                  {category || 'Select a Category'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl z-10 overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-5 py-3 text-left text-black-500 hover:bg-cyan-50 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Post Title</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary of your post"
              className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-lg placeholder:text-gray-500 shadow-md focus:shadow-lg outline-none transition-shadow"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about what you need or what you can offer"
              rows={5}
              className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-lg placeholder:text-gray-500 shadow-md focus:shadow-lg outline-none resize-none transition-shadow"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-10 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-br from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}