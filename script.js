
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
  });
});
