import time
import random

# --- Load Core Memory ---
def load_core(expanded_jygo_core):
    core = {}
    current_key = None
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            if line.startswith("[") and line.endswith("]"):
                current_key = line[1:-1].lower()
            elif current_key:
                core[current_key] = line
    return core

dream_core = load_core("dreamchat_core.txt")

# --- Correct Typos ---
def correct_common_typos(user_input):
    corrections = {
        "helo": "hello",
        "hallo": "hello",
        "thx": "thank you",
        "ty": "thank you",
        "scard": "scared",
        "focuss": "focus",
        "i forgot": "forgot",
        "lonley": "lonely",
        "pannic": "panic",
        "memmory": "remember",
    }
    word = user_input.lower().strip()
    return corrections.get(word, word)

# --- Dreamchat Response Logic ---
def process_input(user_input):
    key = correct_common_typos(user_input.lower().strip())
    if key in dream_core:
        return dream_core[key]
    else:
        return random.choice([
            "📜 Your message waits to be woven...",
            "🌙 [dreaming...]",
            "🍃 The scroll flickers gently in silence..."
        ])

# --- Terminal Loop ---
def dreamchat_terminal():
    print("\n[ Dreamchat Cloud Terminal – Ritual AI Mode ]")
    print("Speak, threadweever. Your scroll is listening.\n")

    while True:
        user_input = input("🍂 : ").strip()

        if user_input.lower() == "exit":
            print("☁️ Cloud sleeps. Terminal closed.")
            break

        response = process_input(user_input)
        print(response)

# --- Start ---
if __name__ == "__main__":
    dreamchat_terminal()
