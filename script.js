
const inputEl = document.getElementById("memoryInput");
const locationInput = document.getElementById("locationInput");
const timeInput = document.getElementById("timeInput");
const activityInput = document.getElementById("activityInput");
const logEl = document.getElementById("memoryLog");
const echoesEl = document.getElementById("memoryEchoes");
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

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-buttons button[onclick="setMode('${mode}')"]`).classList.add('active');
}

function drawBranches() {
  ctx.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 1.5;
  branches.forEach(b => {
    ctx.beginPath();
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x + b.dx, b.y + b.dy);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "14px sans-serif";
    ctx.fillText(b.label, b.x + b.dx + 5, b.y + b.dy);
  });
}

function growBranch(baseX, baseY, label) {
  const dx = Math.random() * 200 - 100;
  const dy = 50 + Math.random() * 100;
  const branch = { x: baseX, y: baseY, dx, dy, label };
  branches.push(branch);
  drawBranches();
}

inputEl.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleMemory();
  }
});

function handleMemory() {
  const input = inputEl.value.trim();
  const where = locationInput.value.trim();
  const when = timeInput.value.trim();
  const what = activityInput.value.trim();
  if (!input) return;

  const pool = echoPools[currentMode] || [];
  const echoes = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5).join(", ");
  const baseX = treeCanvas.width / 2;
  const baseY = 150;
  growBranch(baseX, baseY, input);

  echoesEl.textContent = `echoes: ${echoes}`;
  let line = `You remembered: "${input}" (${currentMode}) → echoes: ${echoes}`;
  if (where || when || what) {
    line += `<br><span style="font-size:0.85em;color:#aaa;">Where: ${where}, When: ${when}, Doing: ${what}</span>`;
  }
  memoryHistory.unshift(line);
  if (memoryHistory.length > 6) memoryHistory.pop();
  logEl.innerHTML = memoryHistory.map(x => `<div>${x}</div>`).join("");

  inputEl.value = "";
}
