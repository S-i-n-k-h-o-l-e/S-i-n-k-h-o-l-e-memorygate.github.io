export default function RemindagraphModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-black border border-green-300 rounded-2xl p-6 shadow-lg w-[90%] max-w-md text-green-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-green-400 hover:text-red-300 text-xl"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4 text-green-300">Remindagraph</h2>
        <p className="text-sm opacity-90 mb-4">
          You’ve opened the memory interface. Whisper a forgotten thread, or let one find you.
        </p>

        {/* Memory input */}
        <input
          type="text"
          placeholder="Type a memory fragment..."
          className="w-full px-3 py-2 bg-black border border-green-400 rounded-md mb-4 text-green-100"
        />

        <button className="bg-green-400 text-black px-4 py-2 rounded-md w-full hover:bg-green-300 transition">
          Plant Thread 🌱
        </button>

      </div>
    </div>
  );
}
