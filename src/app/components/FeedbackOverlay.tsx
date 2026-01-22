interface FeedbackOverlayProps {
  message: string;
  onClose: () => void;
  showOk?: boolean;
  dismissible?: boolean;
}

export function FeedbackOverlay({ message, onClose, showOk = true, dismissible = true }: FeedbackOverlayProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={dismissible ? onClose : undefined}
    >
      <div 
        className="bg-white rounded-[20px] shadow-2xl p-12 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-[#4DD0E1] text-center mb-8">
          {message}
        </h2>
        {showOk && (
          <button
            onClick={onClose}
            className="w-full bg-[#4DD0E1] text-white font-bold py-4 rounded-full hover:bg-[#3FBFD1] transition-colors"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}
