let items = [];
let currentIndex = -1;

document.getElementById('btnCreate').onclick = function() {
    openFuncionario('create');
};

document.querySelectorAll('.close').forEach(function(element) {
    element.onclick = function() {
        closeFuncionario();
    };
});

window.onclick = function(event) {
    const Funcionario = document.getElementById('CrudFuncionario');
    if (event.target == Funcionario) {
        closeFuncionario();
    }
};

document.getElementById('crudForm').onsubmit = function(event) {
    event.preventDefault();
    const Cargo = document.getElementById('itemCargo').value;
    const name = document.getElementById('itemName').value;
    const id = document.getElementById('itemId').value;
    const idade = document.getElementById('itemIdade').value;
    const telefone = document.getElementById('itemTel').value;
    const sexo = document.getElementById('itemSexo').value;

    if (currentIndex === -1) {
        createItem(name, Cargo, idade, telefone, sexo);
    } else {
        updateItem(id, name, Cargo, idade, telefone, sexo);
    }
    closeFuncionario();
    renderTable();
};

function openFuncionario(action, id = '', name = '', Cargo = '', idade = '', telefone = '', sexo = '') {
    const Funcionario = document.getElementById('CrudFuncionario');
    const title = document.getElementById('FuncionarioTitle');
    const itemSexo = document.getElementById('itemSexo');
    const itemTel = document.getElementById('itemTel');
    const itemIdade = document.getElementById('itemIdade');
    const itemCargo = document.getElementById('itemCargo');
    const itemName = document.getElementById('itemName');
    const itemId = document.getElementById('itemId');
    
    if (action === 'create') {
        title.innerText = 'Criar Item';
        itemSexo.value = '';
        itemTel.value = '';
        itemIdade.value = '';
        itemCargo.value = '';
        itemName.value = '';
        itemId.value = '';
        currentIndex = -1;
    } else if (action === 'edit') {
        title.innerText = 'Editar Item';
        itemSexo.value = sexo;
        itemTel.value = telefone;
        itemIdade.value = idade;
        itemCargo.value = Cargo;
        itemName.value = name;
        itemId.value = id;
        currentIndex = parseInt(id); // Converte id para número, se necessário
    }
    Funcionario.style.display = 'block';
}

function closeFuncionario() {
    const Funcionario = document.getElementById('CrudFuncionario');
    Funcionario.style.display = 'none';
}

function createItem(name, Cargo, idade, telefone, sexo) {
    const id = items.length + 1;
    items.push({ id, name, Cargo, idade, telefone, sexo });
}

function updateItem(id, name, Cargo, idade, telefone, sexo) {
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        items[index].name = name;
        items[index].Cargo = Cargo;
        items[index].idade = idade;
        items[index].telefone = telefone;
        items[index].sexo = sexo;
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id !== parseInt(id));
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('itemTable');
    tableBody.innerHTML = '';
    items.forEach(item => {
        const row = `<tr>
                        <td>${item.id}</td>
                        <td class="hover-target" data-info="Idade: ${item.idade}, Telefone: ${item.telefone}, Sexo: ${item.sexo}">${item.name}</td>
                        <td>${item.Cargo}</td>
                        <td>
                            <button class="btn btn-warning" onclick="openFuncionario('edit', '${item.id}', '${item.name}', '${item.Cargo}', '${item.idade}', '${item.telefone}', '${item.sexo}')">Editar</button>
                            <button class="btn btn-danger" onclick="deleteItem('${item.id}')">Deletar</button>
                        </td>
                    </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const tableBody = document.getElementById('itemTable');

    tableBody.addEventListener('mouseover', (event) => {
        const target = event.target.closest('.hover-target');
        if (target) {
            const info = target.getAttribute('data-info');
            popup.textContent = info;
            popup.style.display = 'block';

            const rect = target.getBoundingClientRect();
            popup.style.left = `${rect.left + window.scrollX}px`;
            popup.style.top = `${rect.bottom + window.scrollY}px`;
        }
    });

    tableBody.addEventListener('mouseout', () => {
        popup.style.display = 'none';
    });
});
