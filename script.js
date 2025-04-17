document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input[type='text']");
  const growBtn = document.getElementById("grow-button");

  // Auto-tab
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const next = inputs[index + 1];
        if (next) {
          next.focus();
        } else {
          growBtn.focus();
        }
      }
    });
  });

  // Grow Memory button click
  growBtn.addEventListener("click", () => {
    const where = document.getElementById("where").value.trim();
    const what = document.getElementById("what").value.trim();
    const feel = document.getElementById("feel").value.trim();

    if (where && what && feel) {
      document.getElementById("input-section").style.display = "none";
      document.getElementById("tree-container").style.display = "block";

      renderMemoryTree({ where, what, feel });
    }
  });
});

// Render memory node
function renderMemoryTree({ where, what, feel }) {
  const tree = document.getElementById("memory-tree");

  const node = document.createElement("div");
  node.className = "memory-node";
  node.innerText = `${where} — ${what} — ${feel}`;
  node.style.margin = "10px";
  node.style.padding = "10px";
  node.style.border = "1px solid #00ffaa";
  node.style.borderRadius = "8px";
  node.style.color = "#ccffee";
  node.style.background = "rgba(0,255,150,0.1)";
  node.style.animation = "fadeIn 1s ease";

  tree.appendChild(node);
}


