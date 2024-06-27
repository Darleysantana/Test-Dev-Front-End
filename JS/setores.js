let items = [
    {
        id: 1, 
        name: 'Informática',
        cargos: ['Desenvolvedora', 'Designer'],
        funcionario: 2
    },
    {
        id: 2, 
        name: 'Administração',
        cargos: ['Gerente'],
        funcionario: 1
    }
];
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
    const funcionario = document.getElementById('itemFuncionario').value;
    const name = document.getElementById('itemName').value;
    const id = document.getElementById('itemId').value;
    const cargos = document.getElementById('itemCargo').value.split(',').map(cargo => cargo.trim());
    if (currentIndex === -1) {
        createItem(name, cargos, funcionario);
    } else {
        updateItem(id, name, cargos, funcionario);
    }
    closeSetor();
    renderTable();
};

function openSetor(action, id = '', name = '', cargos = [], funcionario = '') {
    const setor = document.getElementById('Crudsetor');
    const title = document.getElementById('setorTitle');
    const itemFuncionario = document.getElementById('itemFuncionario');
    const itemName = document.getElementById('itemName');
    const itemId = document.getElementById('itemId');
    const itemCargosContainer = document.getElementById('itemCargosContainer');

    if (action === 'create') {
        title.innerText = 'Criar Setor';
        itemFuncionario.value = '';
        itemName.value = '';
        itemId.value = '';
        clearCargosFields(itemCargosContainer);
        currentIndex = -1;
    } else if (action === 'edit') {
        title.innerText = 'Editar Setor';
        itemFuncionario.value = funcionario;
        itemName.value = name;
        itemId.value = id;
        fillCargosFields(itemCargosContainer, cargos);
        currentIndex = id;
    }

    setor.style.display = 'block';
}

function fillCargosFields(cargos) {
    const itemCargosContainer = document.getElementById('itemCargosContainer');
    if (itemCargosContainer) {
        itemCargosContainer.innerHTML = ''; // Limpa o conteúdo anterior

        cargos.forEach(cargo => {
            const cargoInput = document.createElement('input');
            cargoInput.type = 'text';
            cargoInput.value = cargo;
            cargoInput.className = 'cargoInput';
            itemCargosContainer.appendChild(cargoInput);
        });
    } else {
        console.error('Elemento itemCargosContainer não encontrado.');
    }
}


function clearCargosFields(itemCargosContainer) {
    if (itemCargosContainer) {
        itemCargosContainer.innerHTML = ''; // Limpa o conteúdo dos campos de cargo
    } else {
        console.error('Elemento itemCargosContainer não encontrado para limpar os campos de cargos.');
    }
}



function closeSetor() {
    const setor = document.getElementById('Crudsetor');
    setor.style.display = 'none';
}

function createItem(name, cargos, funcionario) {
    const id = items.length + 1;
    items.push({ id, name, cargos, funcionario });
}

function updateItem(id, name, cargos, funcionario) {
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items[index].name = name;
        items[index].cargos = cargos;
        items[index].funcionario = funcionario;
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id != id);
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('itemTable');
    tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    items.forEach(item => {
        const row = `<tr>
                        <td>${item.id}</td>
                        <td class="hover-target" data-info="Cargos: ${item.cargos.join(', ')}, Quantidade de Funcionários por Setor: ${item.funcionario}">${item.name}</td>
                        <td>
                            <button class="btn btn-warning" onclick="openSetor('edit', '${item.id}', '${item.name}', '${item.cargos.join(', ')}', '${item.funcionario}')">Editar</button>
                            <button class="btn btn-danger" onclick="deleteItem('${item.id}')">Deletar</button>
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
