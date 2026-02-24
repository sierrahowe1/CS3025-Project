import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {toast} from 'sonner';


export default function CreateAPost ({ isOpen, onClose, onCreate }) {
    const [postType, setPostType] = useState('seeking');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [seeking, setSeeking] = useState('');
    const [canOffer, setCanOffer] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const categories = [
        'Physical Labour',
        'Personal Assistance',
        'Companionship',
        'Education',
        'Cooking',
        'Crafts',
        'Technology',
        'Other'
    ];
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("FORM SUBMITTED");

      if (!category) {
        toast.error('Please select a category.');
        return;
      }

      if (!title.trim()) {
        toast.error('Please enter a post title.');
        return;
      }

      if (!seeking.trim()) {
        toast.error('Please enter what you need help with.');
        return;
      }

      if (!canOffer.trim()) {
        toast.error('Please enter what you can offer.');
        return;
      }

      onCreate({
        title,
        category,
        seeking,
        canOffer,
      });

      toast.success('Post created!', {
        description: 'Your post has been posted to the community!',
      });

      handleClose();
    };


    const handleClose = () => {
        setPostType('seeking');
        setCategory('');
        setTitle('');
        setSeeking('');
        setCanOffer('');
        setShowCategoryDropdown(false);
        onClose();
    };

    if (!isOpen) {
        return null;
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-cyan-400 via-cyan-400 to-cyan-400 rounded-[40px] shadow-2xl p-8 md:p-10 max-h-[90vh] overflow-y-auto">
        

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Create a New Post
          </h2>
          <p className="text-black-200 text-base md:text-xl">
            Share what you need help with or how you can help others in the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

      

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
            <h3 className="text-xl font-bold text-gray-900 mb-3">I need help with: </h3>
            <input
              type="text"
              value={seeking}
              onChange={(e) => setSeeking(e.target.value)}
              placeholder="Provide details about what you need help with"
              className="w-full bg-white rounded-2xl px-5 py-4 text-gray-900 text-lg placeholder:text-gray-500 shadow-md focus:shadow-lg outline-none resize-none transition-shadow"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">I can offer: </h3>
            <input
              type="text"
              value={canOffer}
              onChange={(e) => setCanOffer(e.target.value)}
              placeholder="Provide details about what you can offer in exchange for help"
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
              className="bg-gradient-to-br from-cyan-600 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}