//lista das palavras
const palavras = ['MACA', 'BANANA', 'LARANJA', 'KIWI', 'PERA', 'ANANAS', 'MANGA', 'MELANCIA', 'MELAO', 'MORANGO', 'UVA', 'CEREJA', 'PESSEGO', 'TANGERINA', 'LIMAO', 'COCO', 'FIGO'];

//variáveis para controle do jogo
let palavra_selecionada = ''; 
let letras_adivinhadas = [];  
let tentativas_erradas = 0;    
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

//função para começar o jogo
function initGame() {
    letras_adivinhadas = [];        
    tentativas_erradas = 0;         
    game_over = false;              

    //escolhe uma palavra aleatória da lista
    palavra_selecionada = palavras[Math.floor(Math.random() * palavras.length)];
    console.log("Palavra selecionada:", palavra_selecionada);

    //atualiza as estatísticas e exibe a palavra com underscores
    atualizar_estatisticas();
    mensagem_el.textContent = '';  
    mensagem_el.className = '';    

    //mostra as tentativas restantes
    tentativas_restantes_el.textContent = "Tentativas restantes: " + (6 - tentativas_erradas);

    //cria o teclado (botões e letras)
    criar_teclado();

    //atualiza a palavra oculta
    atualizar_palavra();
}

//função para criar os botões do teclado (botões e letras)
function criar_teclado() {
    teclado_el.innerHTML = '';  
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);  
        const botao = document.createElement('button');  
        botao.textContent = letra;  
        botao.addEventListener('click', () => verificar_letra(letra, botao));  
        botao.classList.add('botao-teclado');  //adiciona a classe para o efeito de hover
        teclado_el.appendChild(botao);  
    }
}

//função para verificar se a letra adivinhada está correta
function verificar_letra(letra, botao) {
    if (game_over || letras_adivinhadas.includes(letra)) return;  

    letras_adivinhadas.push(letra);  
    botao.disabled = true;           

    if (palavra_selecionada.includes(letra)) {
        botao.style.backgroundColor = 'lawngreen';  //feedback visual para letra correta
        atualizar_palavra();  
        mensagem_el.textContent = 'Boa!';  
    } else {
        botao.style.backgroundColor = 'red';  //feedback visual para letra incorreta
        tentativas_erradas++;  
        mensagem_el.textContent = 'Tenta outra vez!';  
    }

    //atualiza o número de tentativas restantes
    tentativas_restantes_el.textContent = "Tentativas restantes: " + (6 - tentativas_erradas);

    //altera a cor do contador de tentativas restantes quando o número está baixo
    if (6 - tentativas_erradas <= 2) {
        tentativas_restantes_el.style.color = 'red';
    } else {
        tentativas_restantes_el.style.color = 'black';
    }

    //atualiza as estatísticas
    atualizar_estatisticas();

    //verifica se o jogo acabou
    verificar_fim_jogo();
}

//função para atualizar a palavra oculta na tela
function atualizar_palavra() {
    let palavra_mostrada = ''; 
    let letras_corretas = 0;  

    for (let letra of palavra_selecionada) {
        if (letras_adivinhadas.includes(letra)) {
            palavra_mostrada += letra + ' ';  
            letras_corretas++;        
        } else {
            palavra_mostrada += '_ ';         
        }
    }

    palavra_escondida_el.textContent = palavra_mostrada.trim();
    letras_corretas_el.textContent = letras_corretas;
    letras_restantes_el.textContent = palavra_selecionada.length - letras_corretas;
    total_letras_el.textContent = palavra_selecionada.length;
}

//função para atualizar as estatísticas do jogo
function atualizar_estatisticas() {
    let letras_corretas = 0;
    for (let letra of palavra_selecionada) {
        if (letras_adivinhadas.includes(letra)) letras_corretas++;  
    }

    letras_corretas_el.textContent = letras_corretas;
    letras_restantes_el.textContent = palavra_selecionada.length - letras_corretas;
    total_letras_el.textContent = palavra_selecionada.length;
}

//função para verificar se o jogo terminou (ganhou ou perdeu)
function verificar_fim_jogo() {
    if (!palavra_selecionada.split('').some(l => !letras_adivinhadas.includes(l))) {
        mensagem_el.textContent = "Parabéns! Adivinhaste a palavra!"; 
        game_over = true;  
        desativar_teclado();  
    }

    if (tentativas_erradas >= 6) {
        mensagem_el.textContent = "Fim de jogo! A palavra era: " + palavra_selecionada; 
        game_over = true;  
        desativar_teclado();  
    }
}

//função para desativar todos os botões do teclado (quando o jogo termina)
function desativar_teclado() {
    const botoes = teclado_el.querySelectorAll('button');
    botoes.forEach(botao => botao.disabled = true);  
}

//função para reiniciar o jogo
botao_reiniciar.addEventListener('click', initGame);

//inicia o jogo quando a página é carregada
window.onload = initGame;
