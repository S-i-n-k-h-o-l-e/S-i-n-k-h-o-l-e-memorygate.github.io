import { useState } from "react";
import RemindagraphModal from "./RemindagraphModal"; // Import the modal

export default function Home() {
  const [showRemindagraph, setShowRemindagraph] = useState(false);
  const [userInput, setUserInput] = useState("");

  // Whisper Sending Function
  async function sendToWhisperServer(message: string) {
    try {
      await fetch('http://localhost:5000/whisper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Failed to send whisper:', error);
    }
  }

  const handleSubmit = async () => {
    if (userInput.trim()) {
      await sendToWhisperServer(userInput.trim());
      setUserInput(''); // Clear input after sending
    }
  };

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

      {/* Centered Dreamchat Input */}
      <div className="flex flex-col items-center justify-center text-center mt-20 space-y-6">
        <h1 className="text-5xl text-green-400 font-bold mb-4 drop-shadow">
          MemoryGate
        </h1>
        <input
          type="text"
          placeholder="Whisper into Dreamchat..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          className="px-4 py-2 w-80 rounded-md bg-black border border-green-400 text-green-200 text-center shadow-md"
        />
        <p className="text-sm italic text-green-200 mt-2">
          <span className="opacity-80">Dreamchat listens:</span> whisper a memory to the scroll.
        </p>
      </div>

      {/* Remindagraph Modal (Memory Tree Popup) */}
      {showRemindagraph && (
        <RemindagraphModal onClose={() => setShowRemindagraph(false)} />
      )}
    </div>
  );
}
