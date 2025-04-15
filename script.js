
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
