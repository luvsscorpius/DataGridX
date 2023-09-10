import { gridOptions } from "./agGrid.js";
class dados {

    static exibirDados = () => {
        // Fetch data from server
        fetch("http://127.0.0.1:1880/pessoas")
            .then(response => response.json())
            .then(data => {
                // load fetched data into grid
                gridOptions.api.setRowData(data);
            });
    }

    static adicionarDados = () => {
        const btnAdicionar = document.querySelector('#btnAdicionar')

        btnAdicionar.addEventListener('click', (e) => {
            btnAdicionar.setAttribute('data-dismiss', 'modal')
            // Fetch data from server
            const nome = document.querySelector('#nome').value
            const sobrenome = document.querySelector('#sobrenome').value
            const cidade = document.querySelector('#cidade').value
            const telefone = document.querySelector('#telefone').value
            const email = document.querySelector('#email').value
            fetch(`http://127.0.0.1:1880/adicionarpesssoas/${nome}/${sobrenome}/${cidade}/${telefone}/${email}`)
                .then(response => {
                    if (response.status == 200) {
                        const alertAdicionar = document.createElement('div')
                        alertAdicionar.classList.add('alert', 'alert-primary')
                        alertAdicionar.setAttribute('role', 'alert')
                        alertAdicionar.innerHTML = 'Usuário adicionado com sucesso'
                        document.querySelector('.main').prepend(alertAdicionar)

                        const tempoParaExibir = 5000; // 3000 milissegundos (5 segundos)
                        setTimeout(function () {
                            alertAdicionar.remove();
                        }, tempoParaExibir);

                        document.querySelector('#nome').value = ""
                        document.querySelector('#sobrenome').value = ""
                        document.querySelector('#cidade').value = ""
                        document.querySelector('#telefone').value = ""
                        document.querySelector('#email').value = ""

                        this.exibirDados()
                    } else {
                        alert("Erro ao adicionar")
                        console.log(response)
                    }
                })
        })
    }

    static atualizarDados = () => {
        const btnAtualizar = document.querySelector('#btnAtualizar')

        btnAtualizar.addEventListener('click', () => {
            btnAtualizar.setAttribute('data-dismiss', 'modal')

            const id = btnAtualizar.getAttribute('data-id');
            const nome = document.querySelector('#nomeEdicao').value
            const sobrenome = document.querySelector('#sobrenomeEdicao').value
            const cidade = document.querySelector('#cidadeEdicao').value
            const telefone = document.querySelector('#telefoneEdicao').value
            const email = document.querySelector('#emailEdicao').value
            fetch(`http://127.0.0.1:1880/atualizarpessoas/${id}/${nome}/${sobrenome}/${cidade}/${telefone}/${email}`)
                .then(response => {
                    if (response.status == 200) {
                        const alertAtualizar = document.createElement('div')
                        alertAtualizar.classList.add('alert', 'alert-success')
                        alertAtualizar.setAttribute('role', 'alert')
                        alertAtualizar.innerHTML = 'Usuário atualizado com sucesso'
                        document.querySelector('.main').prepend(alertAtualizar)

                        const tempoParaExibir = 5000; // 3000 milissegundos (5 segundos)
                        setTimeout(function () {
                            alertAtualizar.remove();
                        }, tempoParaExibir);

                        this.exibirDados()
                    } else {
                        alert("Erro ao atualizar")
                        console.log(response)
                    }
                })
        })
    }

    static excluirDados = () => {
        const btnDeletar = document.querySelector('#btnDeletar')

        btnDeletar.addEventListener('click', (e) => {
            btnDeletar.setAttribute('data-dismiss', 'modal')

            const id = btnDeletar.getAttribute('data-id');
            fetch(`http://127.0.0.1:1880/deletarpessoas/${id}`)
                .then(response => {
                    if (response.status == 200) {
                        const alertExcluir = document.createElement('div')
                        alertExcluir.classList.add('alert', 'alert-danger')
                        alertExcluir.setAttribute('role', 'alert')
                        alertExcluir.innerHTML = 'Usuário excluido com sucesso'
                        document.querySelector('.main').prepend(alertExcluir)

                        const tempoParaExibir = 5000; // 3000 milissegundos (5 segundos)
                        setTimeout(function () {
                            alertExcluir.remove();
                        }, tempoParaExibir);

                        this.exibirDados()
                    } else {
                        alert("Erro ao deletar")
                        console.log(response)
                    }
                })
        })
    }
}

export { dados }