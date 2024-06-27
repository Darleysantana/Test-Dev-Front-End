let items = [
    {
        id: '1',
        name: 'Desenvovedora',
        setor: 'Informática',
        funcionario: '1'
    },
    {
        id: '2',
        name: 'Desingner',
        setor: 'Informática',
        funcionario: '1'
    },
    {
        id: '3',
        name: 'Gerente',
        setor: 'Administração',
        funcionario: '1'
    }
];
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
    const funcionario = document.getElementById('itemFuncionario').value;
    const setor = document.getElementById('itemSetor').value;
    const name = document.getElementById('itemName').value;
    const id = document.getElementById('itemId').value;
    if (currentIndex === -1) {
        createItem(name, setor, funcionario);
    } else {
        updateItem(id, name, funcionario);
    }
    closecargo();
    renderTable();
};

function opencargo(action, id = '', name = '', setor = '', funcionario = '') {
    const cargo = document.getElementById('Crudcargo');
    const title = document.getElementById('cargoTitle');
    const itemFuncionario = document.getElementById('itemFuncionario');
    const itemSetor = document.getElementById('itemSetor');
    const itemName = document.getElementById('itemName');
    const itemId = document.getElementById('itemId');
    if (action === 'create') {
        title.innerText = 'Criar Item';
        itemFuncionario.value = '';
        itemSetor.value = '';
        itemName.value = '';
        itemId.value = '';
        currentIndex = -1;
    } else if (action === 'edit') {
        title.innerText = 'Editar Item';
        itemFuncionario.value = funcionario;
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

function createItem(name, setor, funcionario) {
    const id = items.length + 1;
    items.push({ id, name, setor, funcionario});
}

function updateItem(id, name, setor, funcionario) {
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items[index].name = name;
        items[index].setor = setor;
        items[index].funcionario = funcionario;
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
                        <td class="hover-target" data-info="Quantidade de Funcionários por Setor: ${item.funcionario}">${item.name}</td>
                        <td>${item.setor}</td>
                    <td>
                        <button class="btn btn-warning" onclick="opencargo('edit', ${item.id}, '${item.name}', '${item.setor}', '${item.funcionario}')">Editar</button>
                        <button class="btn btn-danger" onclick="deleteItem(${item.id})">Deletar</button>
                    </td>
                    </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
    });

// Adiciona evento de hover para mostrar os cargos ao passar o mouse
const popup = document.getElementById('popup');
tableBody.querySelectorAll('.hover-target').forEach(td => {
    td.addEventListener('mouseover', () => {
        const info = td.getAttribute('data-info');
        popup.textContent = info;
        popup.style.display = 'block';

        const rect = td.getBoundingClientRect();
        popup.style.left = `${rect.left + window.scrollX}px`;
        popup.style.top = `${rect.bottom + window.scrollY}px`;
    });

    td.addEventListener('mouseout', () => {
        popup.style.display = 'none';
    });
});

}

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza a tabela ao carregar a página
    renderTable();
});
