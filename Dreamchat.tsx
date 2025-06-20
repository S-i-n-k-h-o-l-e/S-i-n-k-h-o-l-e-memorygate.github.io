import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Dreamchat({ user }: { user: any }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const meaningScore = Math.random() * 10;
    await addDoc(collection(db, "mood-web"), {
      uid: user.uid,
      word: input.trim(),
      meaning: meaningScore,
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="bg-white/5 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Dreamchat</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="p-3 rounded-lg bg-white/10 text-white placeholder-gray-400"
          placeholder="Whisper a word..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}