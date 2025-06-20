import React, { useState, useEffect } from "react";
import Dreamchat from "./Dreamchat";
import MoodWeb from "./MoodWeb";
import { auth, signInAnonymously } from "./firebase";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
      else signInAnonymously();
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <div className="p-8 text-center">Loading MemoryGate...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white font-sans">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">MemoryGate</h1>
        <p className="text-sm opacity-70">Whisper to your archive</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-12">
        <Dreamchat user={user} />
        <MoodWeb user={user} />
      </main>
      <footer className="text-center text-xs text-gray-400 pb-4">
        © 2025 Jago Hooper — Ritual Systems. Creative Commons + MIT License.
      </footer>
    </div>
  );
}