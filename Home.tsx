import { useState } from "react";
import RemindagraphModal from "./RemindagraphModal"; // Import the modal

export default function Home() {
  const [showRemindagraph, setShowRemindagraph] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-green-300 font-mono flex flex-col items-center justify-center">
      
      {/* Buttons */}
      <div className="absolute top-8 left-8 space-y-4">
        <button className="bg-green-200 text-black px-4 py-2 rounded-md">
          📜 Top-Up Terminal
        </button>
        <button className="bg-green-200 text-black px-4 py-2 rounded-md">
          🧪 Download D-Soul App
        </button>
        <button className="bg-green-200 text-black px-4 py-2 rounded-md">
          💗 Support Me
        </button>
        <button
          className="bg-green-200 text-black px-4 py-2 rounded-md border-2 border-white"
          onClick={() => setShowRemindagraph(true)}
        >
          🧠 Remindagraph
        </button>
      </div>

      {/* Dreamchat Input */}
      <div className="text-center mt-8">
        <h1 className="text-4xl text-green-400 font-bold mb-4 drop-shadow">
          MemoryGate
        </h1>
        <input
          type="text"
          placeholder="Whisper into Dreamchat..."
          className="px-4 py-2 w-80 rounded-md bg-black border border-green-400 text-green-200 text-center shadow-md"
        />
        <p className="text-sm italic text-green-200 mt-2">
          <span className="opacity-80">Dreamchat listens:</span> “what are you” enters the archive.
        </p>
      </div>

      {/* Modal Popup */}
      {showRemindagraph && (
        <RemindagraphModal onClose={() => setShowRemindagraph(false)} />
      )}

    </div>
  );
}
