
document.getElementById('memory-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = Array.from(document.querySelectorAll('form input'));
    const memory = inputs.map(input => input.value).join(' — ');
    const node = document.createElement('div');
    node.className = 'memory-node';
    node.innerText = memory;
    document.getElementById('memory-tree').appendChild(node);
    inputs.forEach(input => input.value = '');
});
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input[type='text']");

  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const next = inputs[index + 1];
        if (next) {
          next.focus();
        } else {
          document.querySelector("button").focus(); // focuses Grow Memory
        }
      }
    });

function growMemory() {
  const form = document.getElementById("memory-form");
  const tree = document.getElementById("memory-tree");

  form.style.display = "none";
  tree.style.display = "flex"; // assuming it’s flex/grid/whatever
}
document.addEventListener("DOMContentLoaded", function () {
  // existing auto-tab code...

  const growBtn = document.getElementById("grow-memory-btn");
  growBtn.addEventListener("click", growMemory);
});
document.getElementById('where').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.getElementById('what').focus();
});
document.getElementById('what').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.getElementById('feel').focus();
});
document.getElementById('feel').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.getElementById('grow-button').click();
});
document.getElementById('grow-button').addEventListener('click', () => {
  const inputs = {
    where: document.getElementById('where').value.trim(),
    what: document.getElementById('what').value.trim(),
    feel: document.getElementById('feel').value.trim(),
  };

  if (inputs.where && inputs.what && inputs.feel) {
    document.querySelector('.input-container').style.display = 'none';
    document.getElementById('tree-container').style.display = 'block';

    // Trigger your tree rendering logic here (custom logic or SVG drawing)
    renderMemoryTree(inputs);
  }
});

