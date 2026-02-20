import { X, Mail } from 'lucide-react';

export default function SingleMessage({ message, onAccept, onDecline, onBack }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-cyan-300 p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Message Details</h2>
              <p className="text-cyan-50 text-sm">{message.timestamp}</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Message Content */}
        <div className="p-8">
          {/* Sender */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
              From
            </label>
            <div className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full">
              <span className="font-semibold">{message.sender}</span>
            </div>
          </div>

          {/* Full Message */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
              Message
            </label>
            <div className="bg-gray-100 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                {message.fullMessage || message.preview}
              </p>
            </div>
          </div>

          {/* Contact Information (if available) */}
          {message.contactInfo && (
            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                Contact Information
              </label>
              <div className="bg-cyan-50 rounded-2xl p-4">
                <p className="text-gray-700">{message.contactInfo}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onAccept}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Accept & Contact Sender
            </button>
            <button
              onClick={onDecline}
              className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-4 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Decline
            </button>
          </div>

          {/* Info Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Accepting will remove this message from your inbox and share your contact information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
