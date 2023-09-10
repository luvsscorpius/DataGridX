// Cabeçaçlho
const columnDefs = [
    // Colunas
    { field: "Id", width: 90 },
    { field: "nome" },
    { field: "sobrenome" },
    { field: "cidade" },
    { field: "telefone", width: 130 },
    { field: "email", width: 250 },
    {
        field: "Funções",
        width: 144,
        cellRenderer: function (params) {
            const data = params.data;

            // Criando o icone de Edição
            const editIcon = document.createElement('i');
            editIcon.className = 'fa fa-edit icone editIcon';
            editIcon.title = 'Editar';
            editIcon.setAttribute('data-target', '#modalEdição');
            editIcon.setAttribute('data-toggle', 'modal');
            editIcon.setAttribute('data-id', data.Id);

            // Adicione o evento de clique apenas ao ícone de edição
            editIcon.addEventListener('click', (event) => {
                const id = data.Id;

                const btnAtualizar = document.querySelector('#btnAtualizar');
                btnAtualizar.setAttribute('data-id', id);

                fetch(`http://127.0.0.1:1880/pessoas/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        // mostrando todos dados nos inputs
                        document.querySelector('#nomeEdicao').value = data[0].nome;
                        document.querySelector('#sobrenomeEdicao').value = data[0].sobrenome;
                        document.querySelector('#cidadeEdicao').value = data[0].cidade;
                        document.querySelector('#telefoneEdicao').value = data[0].telefone;
                        document.querySelector('#emailEdicao').value = data[0].email;
                    })
            });

            // Criando o icone de excluir
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa', 'fa-trash', 'icone', 'deleteIcon');
            deleteIcon.title = 'Excluir';
            deleteIcon.setAttribute('data-target', '#modalDeleção');
            deleteIcon.setAttribute('data-toggle', 'modal');
            deleteIcon.setAttribute('data-id', data.Id);

            deleteIcon.addEventListener('click', () => {
                const id = data.Id;
                const modalDelecaoh6 = document.querySelector('.modalDelecaoh6')

                const btnDeletar = document.querySelector('#btnDeletar');
                btnDeletar.setAttribute('data-id', id);

                fetch(`http://127.0.0.1:1880/pessoas/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        modalDelecaoh6.innerHTML = `Deseja realmente excluir o usuário: ${data[0].nome}`
                    })
            })

            const container = document.createElement('span');
            container.classList.add('icones')
            container.appendChild(editIcon);
            container.appendChild(deleteIcon);

            return container;
        },
    },
];

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: columnDefs,
    pagination: true, // Habilita a paginação
    paginationPageSize: 10, // Número de linhas por página
};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});

export { gridOptions, columnDefs }