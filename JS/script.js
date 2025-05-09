//lista das palavras
const palavras = ['MACA', 'BANANA', 'LARANJA', 'KIWI', 'PERA', 'ANANAS', 'MANGA', 'MELANCIA', 'MELAO', 'MORANGO', 'UVA', 'CEREJA', 'PESSEGO', 'TANGERINA', 'LIMAO', 'COCO', 'FIGO'];

//variavel para selecionar a palavra
let palavra_selecionada = ''; 

//variavel para as letras adivinhadas
let letras_adivinhadas = [];  

//variavel para o numero de tentativas erradas
let tentativas_erradas = 0;   

//variavel para ver se o jogo ja acabou
let game_over = false;   

//referências dos elementos HTML (DOM)
const palavra_escondida_el = document.getElementById('palavra_escondida');
const tentativas_restantes_el = document.getElementById('tentativas_restantes');
const mensagem_el = document.getElementById('mensagem');
const teclado_el = document.getElementById('teclado');
const botao_reiniciar = document.getElementById('botao_reiniciar');
const letras_corretas_el = document.getElementById('letras_corretas');
const letras_restantes_el = document.getElementById('letras_restantes');
const total_letras_el = document.getElementById('total_letras');

//funçao para comecar o jogo
function initGame() {
    letras_adivinhadas = [];        //reset das letras adivinhadas
    tentativas_erradas = 0;         //reset das tentativas erradas
    game_over = false;              //reset do status do jogo

    //escolhe uma palavra aleatória da lista
    palavra_selecionada = palavras[Math.floor(Math.random() * palavras.length)];
    console.log("Palavra selecionada:", palavra_selecionada);

    //atualiza as estatísticas e exibe a palavra com underscores
    atualizar_estatisticas();
    mensagem_el.textContent = '';  //limpa a mensagem de estado do jogo
    mensagem_el.className = '';    //limpa a classe de estilo da mensagem

    //mostra as tentativas restantes
    tentativas_restantes_el.textContent = "Tentativas restantes: " + (6 - tentativas_erradas);

    //cria o teclado (botoes e letras)
    criar_teclado();

    //atualiza a palavra oculta
    atualizar_palavra();
}

//funçao para criar os botoes do teclado (botoes e letras)
function criar_teclado() {
    teclado_el.innerHTML = '';  
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);  //converte o código ASCII para letra
        const botao = document.createElement('button');  //cria o botao
        botao.textContent = letra;  //letra do botão
        botao.addEventListener('click', () => verificar_letra(letra, botao));  //adiciona o evento de clique
        teclado_el.appendChild(botao);  //adiciona o botao ao teclado
    }
}

//funçao para verificar se a letra adivinhada está correta
function verificar_letra(letra, botao) {
    if (game_over || letras_adivinhadas.includes(letra)) return;  //se o jogo acabou ou a letra já foi adivinhada, não faz nada

    letras_adivinhadas.push(letra);  //adiciona a letra ao array de letras adivinhadas
    botao.disabled = true;           //desabilita o botão de letra clicado

    //verifica se a letra está na palavra
    if (palavra_selecionada.includes(letra)) {
        atualizar_palavra();  //atualiza a palavra oculta com a letra adivinhada
        mensagem_el.textContent = 'Boa!';  //exibe a mensagem de sucesso
    } else {
        tentativas_erradas++;  //aumenta as tentativas erradas
        mensagem_el.textContent = 'Tenta outra vez!';  //mostra a mensagem de erro
    }

    //atualiza o numero de tentativas restantes
    tentativas_restantes_el.textContent = "Tentativas restantes: " + (6 - tentativas_erradas);

    //atualiza as estatísticas
    atualizar_estatisticas();

    //verifica se o jogo acabou
    verificar_fim_jogo();
}

//funçao para atualizar a palavra oculta na tela
function atualizar_palavra() {
    let palavra_mostrada = ''; 
    let letras_corretas = 0;  //letras corretas

    //vai a cada letra da palavra selecionada
    for (let letra of palavra_selecionada) {
        if (letras_adivinhadas.includes(letra)) {
            palavra_mostrada += letra + ' ';  //se a letra foi adivinhada, mostra a letra
            letras_corretas++;        //aumenta o contador de letras corretas
        } else {
            palavra_mostrada += '_ ';         //se a letra não foi adivinhada, mostra o underscore
        }
    }

    //atualiza a palavra oculta na tela
    palavra_escondida_el.textContent = palavra_mostrada.trim();
    //atualiza o número de letras corretas e restantes
    letras_corretas_el.textContent = letras_corretas;
    letras_restantes_el.textContent = palavra_selecionada.length - letras_corretas;
    total_letras_el.textContent = palavra_selecionada.length;
}

//funçao para atualizar as estatísticas do jogo
function atualizar_estatisticas() {
    let letras_corretas = 0;
    for (let letra of palavra_selecionada) {
        if (letras_adivinhadas.includes(letra)) letras_corretas++;  //conta as letras corretas
    }

    //atualiza a contagem de letras corretas e restantes
    letras_corretas_el.textContent = letras_corretas;
    letras_restantes_el.textContent = palavra_selecionada.length - letras_corretas;
    total_letras_el.textContent = palavra_selecionada.length;
}

//funçao para verificar se o jogo terminou (ganhou ou perdeu)
function verificar_fim_jogo() {
    //verifica se todas as letras foram adivinhadas (palavra completa)
    if (!palavra_selecionada.split('').some(l => !letras_adivinhadas.includes(l))) {
        mensagem_el.textContent = "Parabéns! Adivinhaste a palavra!"; 
        game_over = true;  //define o status do jogo como 'acabado'
        desativar_teclado();  //desativa o teclado
    }

    //verifica se o número de tentativas erradas atingiu o limite (6 tentativas)
    if (tentativas_erradas >= 6) {
        mensagem_el.textContent = "Fim de jogo! A palavra era: " + palavra_selecionada; 
        game_over = true;  //define o status do jogo como 'acabado'
        desativar_teclado();  //desativa o teclado
    }
}

//funçao para desativar todos os botoes do teclado (quando o jogo termina)
function desativar_teclado() {
    const botoes = teclado_el.querySelectorAll('button');
    botoes.forEach(botao => botao.disabled = true);  //desativa todos os botoes
}

//funçao para reiniciar o jogo
botao_reiniciar.addEventListener('click', initGame);

//inicia o jogo quando a página é carregada
window.onload = initGame;
