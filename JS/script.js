//lista das palavras 

const palavras = ['MAÇA', 'BANANA', 'LARANJA', 'KIWI', 'PERA', 'ANANAS', 'MANGA', 'MELANCIA', 'MELAO', 'MORANGO', 'UVA', 'CEREJA', 'PESSEGO',  'TANGERINA', 'LIMAO', 'COCO', 'FIGO'];


//variavel para selecionar a palavra
let palavra_selecionada = '';

//variavel para as letras adivinhadas
let letras_adivinhadas = [];

//variavel para o numero de tentativas erradas
let tentativas_erradas = 0;

//variavel para ver se o jogo ja acabou
let game_over = false;


//elementos do DOM
const palavra_escondida_el = document.getElementById('palavra_escondida');
const tentativas_restantes_el = document.getElementById('tentativas_restantes');
const mensagem_el = document.getElementById('mensagem');
const teclado_el = document.getElementById('teclado');
const botao_reiniciar = document.getElementById('botao_reiniciar');
const letras_corretas_el = document.getElementById('letras_corretas');
const letras_restantes_el = document.getElementById('letras_restantes');
const total_letras_el = document.getElementById('total_letras');
