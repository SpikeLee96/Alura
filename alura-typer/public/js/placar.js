function inserePlacar() {
  var corpoTabela = $(".placar").find('tbody'); //encontra os elementos que atendem à expressão solicitada que sejam descendentes do seletor
  var usuario = "Douglas";
  var numPalavras = $("#contador-palavras").text();
  var linha = novaLinha(usuario, numPalavras);
  linha.find('.botao-remover').click(removeLinha);
  corpoTabela.prepend(linha); //insere antes do conteúdo html do tbody
  //corpoTabela.append(linha); insere a linha depois do conteúdo html dentro do corpo tabela>>>tbody
}

function novaLinha(usuario, numPalavras) {
  var linha = $("<tr>"); //criando elemento html
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(numPalavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").addClass('botao-remover').attr('href', '#');
  var icone = $("<i>").addClass('small').addClass('material-icons').text('delete');

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;
}

function removeLinha(event) {
  event.preventDefault(); //serve para previnir comportamento padrão do link ir para o topo da página, isso com event no parâmetro da função
  $(this).parent().parent().remove(); //this é o objeto da classe, parent() é a referência para o pai dele
}
