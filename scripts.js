// variaveis utilitarias
let randomNumber;
let numDe;
let numA;

// obtem o elemento form 
const form = document.querySelector("form");

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
// previne o comportamento padrão de recarregar a página.
  event.preventDefault();
};

// Função que sorteia o número entre numDe e numA
function sortNumb() {
  // Atualiza os valores de numDe e numA diretamente no momento do sorteio
  numDe = parseInt(document.querySelector("#de").value);
  numA = parseInt(document.querySelector("#a").value);

  // Captura a quantidade de números a serem sorteados
  const totalNumbers = parseInt(document.querySelector("#number").value);

  // Verifica se os inputs são válidos
  if (
    !isNaN(numDe) &&
    !isNaN(numA) &&
    !isNaN(totalNumbers) &&
    numDe <= numA &&
    totalNumbers > 0
  ) {

    // cria um array para armazenar os numeros sorteados
    const generatedNumbers = [];

    // Gera os números, garantindo que não se repitam
    while (generatedNumbers.length < totalNumbers) {
      const newNumber = Math.floor(Math.random() * (numA - numDe + 1)) + numDe;
      if (!generatedNumbers.includes(newNumber)) {
        generatedNumbers.push(newNumber);
      }
    }

    // Chama a função para criar as divs com os números sorteados
    createNumberContainer(generatedNumbers);
  } else {
    alert("Por favor, insira valores válidos.");

    // reinicia a pagina se o valor for inválido 
    location.reload()
  }
}

// função que cria as divs
function createNumberContainer(numbers) {
  const getDiv = document.getElementsByClassName("number-container")[0];

  // Para cada número, cria uma div
  numbers.forEach((number, index) => {
    setTimeout(() => {
      createAndAppendDiv(getDiv, number);
    }, index * 2500); // Adiciona um atraso de 2.5 segundos para cada número
  });
}
// função que junta as divs
function createAndAppendDiv(container, number) {
  // Cria a nova div
  const numbercontain = document.createElement("div");
  numbercontain.classList.add("content-number");

  // Cria o span e insere o número
  const span = document.createElement("span");
  span.textContent = number;

  // Adiciona o span à nova div
  numbercontain.appendChild(span);

  // Adiciona a nova div ao container existente
  container.appendChild(numbercontain);
}

// Função que altera a exibição das divs ao clicar no botão de sorteio
function btnapper() {
  const resultDiv = document.getElementsByClassName("result")[0];
  const mainDiv = document.getElementsByClassName("second")[0];
  const btn2 = document.getElementsByClassName("btn-2")[0];

  const getInputClick = document.getElementById("sort1");

  // Adiciona um listener de clique no botão "sort1"
  getInputClick.addEventListener("click", () => {

    // Exibe a div de resultado e esconde a div principal
    resultDiv.style.display = "flex";
    mainDiv.style.display = "none";

    // Exibe o botão adicional após 6 segundos
    setTimeout(function () {
      btn2.classList.add('show-btn');
    }, 6000);

    // Chama a função para sortear o número
    sortNumb(); 
  });
}

function restart() {
  const btnSortAgain = document.querySelector("#sort"); // Seleciona o botão
  const numberContainer = document.querySelector(".number-container"); // Seleciona o container de números
  const pResult = document.querySelector("#pResult"); // Seleciona o elemento onde o resultado será exibido
  let clickCount = 1; // Inicializa o contador de cliques

  btnSortAgain.addEventListener("click", () => {
    // atualiza o resultado do P
    clickCount++; 
    pResult.innerHTML = `${clickCount + "º"} resultado`;

    // Limpa o conteúdo da div de números
    if (numberContainer) {
      numberContainer.innerHTML = "";
    }

    sortNumb();

  });
}

// Função que adiciona as classes "active" quando o usuário clica nas caixas
function addActiveClass() {
  document.querySelectorAll('.number-wrapper').forEach((box) => {
    box.addEventListener('click', () => {
      box.classList.toggle('active');
    });
  });

  document.querySelectorAll('.number-input').forEach((box) => {
    box.addEventListener('click', () => {
      box.classList.toggle('active');
    });
  });

  document.querySelectorAll('.input-group').forEach((box) => {
    box.addEventListener('click', () => {
      box.classList.toggle('active');
    });
  });
}

// Função para inicializar o evento de sorteio
function initialize() { 
  btnapper(); 
  addActiveClass(); 
  restart()
}

// Chama a função de inicialização
initialize();
