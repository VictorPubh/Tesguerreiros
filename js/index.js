// Criação de Variáveis Globais
var items = []
var limit = 10


// Os códigos abaixos são para melhorar a experiência na hora do Teste da aplicação
alert(`Abra o Console.`)

console.log('%c Shalom! ','color:hsl(240, 100%, 90%);background-color:hsl(240, 100%, 50%);');
console.log(`%c A páginação desta página é feita atráves das setas do
seu teclado, use Direito e Esquerdo para ir e voltar 10 resultados,
as teclas Cima e Baixo irão te levar para o início e fim dos resultados
respectivamente, se estiver perdido, use o Console e veja em que
sessão você está.`, 'color:hsl(0, 0%, 80%);background-color:hsl(0, 0%, 0%);')

// Requisição Get para o URL da API
axios.get('https://jsonplaceholder.typicode.com/todos/')
  .then(response => {
    const data = response.data

    // Looping nos resultados, setando cada resultado para um lugar em Items (criado no Início)
    data.forEach((item, i) => {
      items.push(
        createComponent(
          data[i].id,
          data[i].title,
          data[i].completed)
      )
    });

    // Definindo os primeiros resultados
    showResult(0, limit)

  })
  .catch(error => console.log(error))

// Função responsável por criar o Elemento
function createComponent(id, title, completed) {
  const header = `<div class="item">
          <div class="fotinha"></div>
          <div class="texto">
            <p class="titulo"> ${ title } </p>`

  if(completed) {
    result = "completo"
  } else {
    result = "pendente"
  }

  const footer = `<p class="status ${result}"> ${result} </p>
          </div>
          <p class="id" alt="${id}"></p>
        </div>`

  return header + footer
}

// Função responsável por exibir os resultados de acordo com parâmetros recebidos (min e max)
function showResult(min, max) {
  const quadro = document.querySelector('.quadro')

  // Limpa o quadro
  quadro.innerHTML = ''

  let listing = ''
  for(i = min; i < max; i++) {
    listing += items[i]
  }

  // Define a nova Listagem
  quadro.innerHTML = listing
  console.log(min, max) // Posição de Listagem
}

function next() {
  min = limit
  if(limit == (items.length - 10)) {
    console.log("Acabaram os resultados")
  } else {
    limit = min + 10
    showResult(min, limit)
  }
}

function comeBack() {
  if((limit - 10) == 0) {
    console.log("Você está no início")
  } else {
    limit -= 10;
    showResult((limit - 10), limit)
  }
}

// Este bloco de comando Ouve as teclas pressionadas e manipula de acordo 
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            comeBack()
            break;
        case 38:
           showResult(0, 10)
           limit = 10;
            break;
        case 39:
            next()
            break;
        case 40:
            showResult(items.length - 10, items.length)
            limit = 190;
            break;
    }
});
