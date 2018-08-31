//mostrar quantidade de palavras no parágrado da página html
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao"); //seleciona o objeto da classe "campoDigitacao"

$(function() { //função a ser chamada quando a página for carregada
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  //click focus blur change podem ser chamados assim também
  $("#botao-reiniciar").click(reiniciaJogo); //não precisa colocar o parênteses no parâmetro para indicar função
});

function atualizaTamanhoFrase() {
  var frase = $(".frase").text(); //seleciona texto da tag com classe "frase"
  var numPalavras = frase.split(" ").length; //separa o texto para cada espaço e diz o número de palavras
  var tamanhoFrase = $("#tamanho-frase"); //seleciona objeto da tag com id "tamanhoFrase"
  tamanhoFrase.text(numPalavras); //troca texto da tag com id "tamanhoFrase" para numPalavras
}

function inicializaContadores() {
  campo.on("input", function(){ //on para realizar alguma ação, input para reagir quando alguém
    //digitar algo no campo, e function() para cobrir a ação do jQuery
    var conteudo = campo.val(); //seleciona o valor do campo que está vazio
    //(se estivesse preenchido, seria text())
    var qtdCaracteres = conteudo.length; //quantidade de caracteres digitados no campo
    var qtdPalavras = conteudo.split(/\S+/).length - 1; //quantidade de palavras digitadas
    //no campo, sendo /\S+/ uma expressão regular usada para definir quando realmente há uma palavra
    //a ser contada, e -1 para o valor voltar a 0 quando todas as palavras forem apagadas
    $("#contador-palavras").text(qtdPalavras); //seleciona a tag do id contadorPalavras e altera o
    //texto para qtdPalavras
    $("#contador-caracteres").text(qtdCaracteres); //seleciona a tag do id contadorCaracteres
    //e altera o texto para qtdCaracteres
  });
}

function inicializaMarcadores() {
  var frase = $(".frase").text();
  campo.on('input', function() {
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length); //subtsr() reparte a string com índices no parâmetro

    if (digitado == comparavel){
      campo.addClass('borda-verde');
      campo.removeClass('borda-vermelha');
    } else {
      campo.addClass('borda-vermelha');
      campo.removeClass('borda-verde');
    }
  });
}

function inicializaCronometro() {
  var tempoRestante = $("#tempo-digitacao").text();
  campo.one("focus", function(){ //focus é para detectar quando o usuário entrar no campo de texto
    //função one é para rodar a função do parâmetro somente uma vez
    var cronoID = setInterval(function(){ //todo setInterval retorna seu próprio ID
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1){
        clearInterval(cronoID); //interrompe a função setInterval ao passar o ID no parâmetro
        finalizaJogo();
      }
    },1000) //setInterval serve para rodar funções de x em x segundos, 1000 do segundo parâmetro representa 1 segundo
  });
}

function finalizaJogo() {
  campo.attr("disabled", true); //attr serve para ler(atributo) ou alterar(atributo, valor) atributos de uma tag
  //o atributo disabled não tem valor, portanto é necessário inserir true no segundo parâmetro
  //campo.addClass("campo-desativado"); adiciona classe pronta do css
  campo.toggleClass("campo-desativado"); //inverte o valor da classe, se é para inserir ou remover
  //campo.css("background-color", "lightgray"); primeiro parâmetro é a propriedade do css e o segundo é o valor
  inserePlacar();
}

/*
$("botao-reiniciar").on("click",function(){

});
*/
//$("botao-reiniciar").click(reiniciaJogo());

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass("campo-desativado");
  campo.removeClass('borda-vermelha');
  campo.removeClass('borda-verde');
  //campo.removeClass("campo-desativado"); remove uma classe pronta do css
}
