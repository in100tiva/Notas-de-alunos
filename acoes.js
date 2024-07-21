import { exibirEstudantes, exibirDetalhesEstudante } from './display.js';

let estudantes = [];
let idEstudanteAtual = null;

export function inicializarEstudantes(dados) {
    estudantes = dados;
    exibirEstudantes(estudantes);
}

export function definirIdEstudanteAtual(id) {
    idEstudanteAtual = id;
}

export function adicionarEstudante() {
    const nome = document.getElementById('novoNomeEstudante').value;
    if (nome) {
        const novoId = (estudantes.length > 0) ? (parseInt(estudantes[estudantes.length - 1].id) + 1).toString() : "1";
        estudantes.push({ nome, id: novoId, notas: {} });
        exibirEstudantes(estudantes);
        document.getElementById('novoNomeEstudante').value = '';
    }
}

export function adicionarDisciplina() {
    const disciplina = document.getElementById('novaDisciplina').value;
    const nota = document.getElementById('novaNota').value;
    if (disciplina && nota && !isNaN(nota)) {
        const estudante = estudantes.find(e => e.id === idEstudanteAtual);
        if (estudante) {
            estudante.notas[disciplina] = parseInt(nota);
            exibirDetalhesEstudante(estudante);
            document.getElementById('novaDisciplina').value = '';
            document.getElementById('novaNota').value = '';
        }
    }
}

export function deletarEstudante(idEstudante) {
    estudantes = estudantes.filter(estudante => estudante.id !== idEstudante);
    exibirEstudantes(estudantes);
}

export function editarNota(idEstudante, disciplina) {
    const novaNota = prompt("Insira a nova nota:");
    if (novaNota !== null && !isNaN(novaNota)) {
        const estudante = estudantes.find( e => e.id === idEstudante);
        if (estudante) {
            estudante.notas[disciplina] = parseInt(novaNota)
            exibirDetalhesEstudante(estudante);
        }
    }
}


export function baixarJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(estudantes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "estudantes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

}