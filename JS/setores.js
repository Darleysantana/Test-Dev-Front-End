let items = [];
let currentIndex = -1;

document.getElementById('btnCreate').onclick = function() {
    openSetor('create');
};

document.querySelectorAll('.close').forEach(function(element) {
    element.onclick = function() {
        closeSetor();
    };
});

window.onclick = function(event) {
    const setor = document.getElementById('Crudsetor');
    if (event.target == setor) {
        closeSetor();
    }
};

document.getElementById('crudForm').onsubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('itemName').value;
    const id = document.getElementById('itemId').value;
    if (currentIndex === -1) {
        createItem(name);
    } else {
        updateItem(id, name);
    }
    closeSetor();
    renderTable();
};

function openSetor(action, id = '', name = '') {
    const setor = document.getElementById('Crudsetor');
    const title = document.getElementById('setorTitle');
    const itemName = document.getElementById('itemName');
    const itemId = document.getElementById('itemId');
    if (action === 'create') {
        title.innerText = 'Criar Item';
        itemName.value = '';
        itemId.value = '';
        currentIndex = -1;
    } else if (action === 'edit') {
        title.innerText = 'Editar Item';
        itemName.value = name;
        itemId.value = id;
        currentIndex = id;
    }
    setor.style.display = 'block';
}

function closeSetor() {
    const setor = document.getElementById('Crudsetor');
    setor.style.display = 'none';
}

function createItem(name) {
    const id = items.length + 1;
    items.push({ id, name });
}

function updateItem(id, name) {
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items[index].name = name;
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
                    <td>
                        <button class="btn btn-warning" onclick="openSetor('edit', ${item.id}, '${item.name}')">Editar</button>
                        <button class="btn btn-danger" onclick="deleteItem(${item.id})">Deletar</button>
                    </td>
                    </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
    });
}