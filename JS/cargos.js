let items = [];
let currentIndex = -1;

document.getElementById('btnCreate').onclick = function() {
    opencargo('create');
};

document.querySelectorAll('.close').forEach(function(element) {
    element.onclick = function() {
        closecargo();
    };
});

window.onclick = function(event) {
    const cargo = document.getElementById('Crudcargo');
    if (event.target == cargo) {
        closecargo();
    }
};

document.getElementById('crudForm').onsubmit = function(event) {
    event.preventDefault();
    const setor = document.getElementById('itemSetor').value;
    const name = document.getElementById('itemName').value;
    const id = document.getElementById('itemId').value;
    if (currentIndex === -1) {
        createItem(name, setor);
    } else {
        updateItem(id, name, setor);
    }
    closecargo();
    renderTable();
};

function opencargo(action, id = '', name = '', setor = '') {
    const cargo = document.getElementById('Crudcargo');
    const title = document.getElementById('cargoTitle');
    const itemSetor = document.getElementById('itemSetor');
    const itemName = document.getElementById('itemName');
    const itemId = document.getElementById('itemId');
    if (action === 'create') {
        title.innerText = 'Criar Item';
        itemSetor.value = '';
        itemName.value = '';
        itemId.value = '';
        currentIndex = -1;
    } else if (action === 'edit') {
        title.innerText = 'Editar Item';
        itemSetor.value = setor;
        itemName.value = name;
        itemId.value = id;
        currentIndex = id;
    }
    cargo.style.display = 'block';
}

function closecargo() {
    const cargo = document.getElementById('Crudcargo');
    cargo.style.display = 'none';
}

function createItem(name, setor) {
    const id = items.length + 1;
    items.push({ id, name, setor});
}

function updateItem(id, name, setor) {
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items[index].name = name;
        items[index].setor = setor;
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id != id);
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('itemTable');
    tableBody.innerHTML = '';
    items.forEach(item => {
        const row = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.setor}</td>
                    <td>
                        <button class="btn btn-warning" onclick="opencargo('edit', ${item.id}, '${item.name}', '${item.setor}')">Editar</button>
                        <button class="btn btn-danger" onclick="deleteItem(${item.id})">Deletar</button>
                    </td>
                    </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
    });
}