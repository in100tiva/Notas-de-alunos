import { inicializarEstudantes, adicionarEstudante, adicionarDisciplina, baixarJSON } from './acoes.js';
import { voltar } from './display.js';

document.getElementById('voltarBotao').onclick = voltar;
document.getElementById('adicionarEstudanteBotao').onclick = adicionarEstudante;
document.getElementById('adicionarDisciplinaBotao').onclick = adicionarDisciplina;
document.getElementById('baixarJSONBotao').onclick = baixarJSON;

fetch('students.json')
    .then(response => response.json())
    .then(dados => {
        inicializarEstudantes(dados);
    });
