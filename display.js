import { deletarEstudante, editarNota, definirIdEstudanteAtual } from './acoes.js';

export function exibirEstudantes(estudantes) {
    const listaEstudantes = document.getElementById('listaEstudantes');
    listaEstudantes.innerHTML = '';
    estudantes.forEach(estudante => {
        const li = document.createElement('li');
        li.innerHTML = `${estudante.nome} <span class="delete-icon" data-id="${estudante.id}">&#128465;</span>`;
        li.addEventListener('click', (event) => {
            if (event.target.tagName !== 'SPAN') {
                exibirDetalhesEstudante(estudante);
            }
        });
        listaEstudantes.appendChild(li);
    });

    document.querySelectorAll('.delete-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            deletarEstudante(event.target.dataset.id);
        });
    });
}

export function exibirDetalhesEstudante(estudante) {
    document.getElementById('listaEstudantes').style.display = 'none';
    document.getElementById('adicionarEstudanteForm').style.display = 'none';
    const detalhesEstudante = document.getElementById('detalhesEstudante');
    detalhesEstudante.style.display = 'block';

    document.getElementById('nomeEstudante').textContent = `Nome: ${estudante.nome}`;
    const listaNotas = document.getElementById('listaNotas');
    listaNotas.innerHTML = '';

    definirIdEstudanteAtual(estudante.id);

    for (const [disciplina, nota] of Object.entries(estudante.notas)) {
        const li = document.createElement('li');
        li.innerHTML = `${disciplina}: ${nota} <span class="edit-icon" data-id="${estudante.id}" data-disciplina="${disciplina}">&#9998;</span>`;
        listaNotas.appendChild(li);
    }

    document.querySelectorAll('.edit-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            editarNota(event.target.dataset.id, event.target.dataset.disciplina);
        });
    });
}

export function voltar() {
    document.getElementById('detalhesEstudante').style.display = 'none';
    document.getElementById('listaEstudantes').style.display = 'block';
    document.getElementById('adicionarEstudanteForm').style.display = 'block';
}
