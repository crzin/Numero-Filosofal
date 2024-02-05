let listaDeNumerosSorteados = []
let numeroLimite = 1000
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1
function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;   
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',
    {rate:1.2})
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do numero filosofal');
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numeroLimite}:`);
}
exibirMensagemInicial();

function verificarChute (){
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1','Boaa, acertou!');
        let palavraTentativa= tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Numero filosofal descoberto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1','Errouu!');
            exibirTextoNaTela('p',`O numero secreto é menor que ${chute} `);
        }
        if (chute < numeroSecreto) {
            exibirTextoNaTela('h1','Errouu!');
            exibirTextoNaTela('p',`O numero secreto é maior que ${chute} `);
        }
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1 );
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == 2 ) {
        listaDeNumerosSorteados = []
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',
    true)
}
