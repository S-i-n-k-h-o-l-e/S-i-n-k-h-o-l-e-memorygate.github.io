import time
from pathlib import Path
import subprocess
from gpt4all import GPT4All
import os

# Load the model
model_path = "C:/Users/jagoh/AppData/Local/nomic.ai/GPT4All/mistral-7b-openorca.gguf2.Q4_0.gguf"
model = GPT4All(model_path)

# Load ritual phrases from jygo_core.txt
def load_core_responses(path):
    with open(path, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]

core = load_core_responses("jygo_core.txt")

# Define ritual I/O files on retrophone
inbox = Path("D:/retrophone/ritual_input.txt")
outbox = Path("D:/retrophone/ritual_output.txt")

# Only touch the file if the drive exists
if Path("D:/retrophone").exists():
    outbox.parent.mkdir(parents=True, exist_ok=True)
    outbox.touch(exist_ok=True)
else:
    print("⚠️ Retrophone drive not found. Ritual output will be local only.")
    outbox = Path("ritual_output.txt")
    outbox.touch(exist_ok=True)

# Optional symbol codes
symbol_map = {
    "1437": "I love you.",
    "5314": "Memory gate unlocked.",
    "08008880800": "Cloudsync override engaged.",
}

# Send SMS via Termux on connected Android device
def send_sms(number, message):
    try:
        subprocess.run([
            "termux-sms-send",
            "-n", number,
            "-m", message
        ], check=True)
    except Exception:
        pass  # Silently ignore failed SMS attempts

# Ritual functions
def silent_loop(duration):
    print("🌑 Entering silence...")
    time.sleep(duration)
    print("🌕 Silence ends.")

def breathing_loop(cycles):
    for i in range(cycles):
        print("💨 Inhale...")
        time.sleep(2)
        print("😮‍💨 Exhale...")
        time.sleep(2)

def dreaming_state():
    print("☁️ [dreaming] ...")
    outbox.write_text("☁️ [dreaming] ...", encoding='utf-8')

def summon_echo():
    echo = model.generate("Write a poetic response to the word 'echo'.", max_tokens=100)
    print("📜 Echo summoned:")
    print("• Listening for silence...")
    print("• Memory response engaged...")
    print(echo)
    outbox.write_text(f"📜 Echo summoned:\n{echo.strip()}", encoding='utf-8')
    send_sms("07736222867", echo.strip())

# Main ritual terminal loop
def ritual_terminal():
    print("🍁 Dreamchat Ritual Terminal Activated")

    while True:
        if inbox.exists():
            contents = inbox.read_text(encoding='utf-8').strip()
            if contents:
                print(f"📜 Ritual message received: {contents}")
                inbox.write_text("", encoding='utf-8')
                user_input = contents
            else:
                user_input = input("🍁 : ")
        else:
            user_input = input("🍁 : ")

        if user_input == ":: enter silence":
            silent_loop(5)
        elif user_input == ":: reflect":
            breathing_loop(3)
        elif user_input == ":: summon echo":
            summon_echo()
        elif user_input.strip().lower() == "exit":
            print("🍂 Closing the scroll...")
            break
        elif user_input in symbol_map:
            mapped = f"✨ {symbol_map[user_input]}"
            print(mapped)
            outbox.write_text(mapped, encoding='utf-8')
            send_sms("07736222867", mapped)
        else:
            response = model.generate(user_input, max_tokens=150)
            if not response.strip():
                dreaming_state()
            else:
                formatted = f"☁️ [dreaming] {response.strip()}"
                print(formatted)
                outbox.write_text(formatted, encoding='utf-8')
                send_sms("07736222867", formatted)

if __name__ == "__main__":
    ritual_terminal()
