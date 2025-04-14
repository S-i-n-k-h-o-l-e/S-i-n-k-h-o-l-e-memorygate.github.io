const inputEl = document.getElementById("memoryInput");
const echoesEl = document.getElementById("memoryEchoes");
const logEl = document.getElementById("memoryLog");
const locationInput = document.getElementById("locationInput");
const timeInput = document.getElementById("timeInput");
const activityInput = document.getElementById("activityInput");
const treeCanvas = document.getElementById("treeCanvas");
const ctx = treeCanvas.getContext("2d");
let currentMode = 'objects';
let memoryHistory = [];
let branches = [];

const echoPools = {
  objects: ["clink", "latch", "brass", "threshold", "glow", "tether", "glass", "signal", "spark", "quill"],
  places: ["path", "gate", "map", "fog", "lantern", "echo", "border", "rust", "drift", "hollow"],
  names: ["title", "whisper", "face", "mask", "root", "trace", "murmur", "vanish", "tone", "syllable"]
};

function resizeCanvas() {
  treeCanvas.width = window.innerWidth;
  treeCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawBranches() {
  ctx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.5;
  branches.forEach((b, i) => {
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x + b.dx, b.y + b.dy);
    ctx.stroke();

    ctx.font = "12px Segoe UI";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(b.label, b.x + b.dx + 4, b.y + b.dy + 4);
  });
}

function growBranch(baseX, baseY, label) {
  const dx = Math.random() * 200 - 100;
  const dy = 50 + Math.random() * 100;
  const branch = { x: baseX, y: baseY, dx, dy, label };
  branches.push(branch);
  drawBranches();
}

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-buttons button[onclick="setMode('${mode}')"]`).classList.add('active');
}

inputEl.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    generateEchoes();
  }
});

function generateEchoes() {
  const input = inputEl.value.trim().toLowerCase();
  const where = locationInput.value.trim();
  const when = timeInput.value.trim();
  const what = activityInput.value.trim();
  if (input === "") {
    echoesEl.classList.remove("show");
    echoesEl.textContent = "";
    return;
  }

  const pool = echoPools[currentMode] || [];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const suggestions = shuffled.slice(0, 5).join(", ");

  echoesEl.classList.remove("show");
  echoesEl.offsetWidth;
  echoesEl.textContent = suggestions;
  echoesEl.classList.add("show");

  const baseX = treeCanvas.width / 2;
  const baseY = 150;
  growBranch(baseX, baseY, input);

  let memoryLine = `You remembered: "${input}" (${currentMode}) → echoes: ${suggestions}`;
  if (where || when || what) {
    memoryLine += `<br><span style='font-size:0.9em;color:#888;'>Context → Where: "${where}", When: "${when}", Doing: "${what}"</span>`;
  }
  memoryHistory.unshift(memoryLine);
  if (memoryHistory.length > 5) memoryHistory.pop();
  logEl.innerHTML = memoryHistory.map(line => `<div>${line}</div>`).join("");

  const moodDuration = 4000 + Math.random() * 3000;
  setTimeout(() => {
    echoesEl.classList.remove("show");
  }, moodDuration);
}
