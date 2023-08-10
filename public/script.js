const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("startButton");
const quizScreen = document.querySelector(".quizScreen");
const questionContainer = document.querySelector(".questionContainer");
const questionsQtd = document.querySelector(".questionsQtd");
const questionElement = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const finishContainer = document.querySelector(".finish");
const textFinish = document.querySelector(".finish span");
const restartButton = document.querySelector(".finish button");
const tryAgainScreen = document.querySelector(".tryAgainScreen");
const textTryAgainScreen = document.querySelector(".tryAgainScreen span");
const tryAgainButton = document.querySelector(".tryAgainScreen button");

import questions from "./questions.js";

// Inicializa variáveis para controle do estado do quiz
let currentIndex = 0;
let questionsCorrect = 0;
let userName;

// verifica se uma string está vazia ou é numérica
function isStringEmpty(str) {
  return str.trim().length === 0 || !isNaN(str);
}

// Obtém um nome de usuário válido
function getValidUserName() {
  do {
    userName = prompt("Bem vindo! Digite aqui o seu nome para começar!");

    if (userName === null) {
      showStartScreen();
    }

    if (isStringEmpty(userName)) {
      alert("Você precisa digitar um nome válido para iniciar");
      showStartScreen();
    }
  } while (isStringEmpty(userName));

  return userName;
}

function showStartScreen() {
  startScreen.style.display = "flex";
  quizScreen.style.display = "none";
  tryAgainScreen.style.display = "none";
}

function showQuizScreen() {
  startScreen.style.display = "none";
  quizScreen.style.display = "flex";
  tryAgainScreen.style.display = "none";
}

function showTryAgainScreen() {
  quizScreen.style.display = "none";
  tryAgainScreen.style.display = "flex";
}

function showFinishScreen() {
  questionContainer.style.display = "none";
  finishContainer.style.display = "flex";
}

// Carrega uma nova questão
function loadQuestion() {
  finishContainer.style.display = "none";
  questionContainer.style.display = "flex";
  const currentQuestion = questions[currentIndex];
  updateQuestionDisplay(currentQuestion);
  createAnswerButtons(currentQuestion.answers);
}

// atualiza a exibição da pergunta
function updateQuestionDisplay(question) {
  questionsQtd.innerHTML = `Questão ${currentIndex + 1} de ${questions.length}`;
  questionElement.textContent = question.question;
}

// Cria botões de respostas
function createAnswerButtons(answers) {
  answersContainer.innerHTML = "";
  answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer");
    answerButton.setAttribute("data-correct", answer.correct);
    answerButton.innerHTML = `
      <span class="letter">${answer.questionLetter}</span> ${answer.option}
    `;
    answersContainer.appendChild(answerButton);
  });
}

function nextQuestion(e) {
  // Verifica se o elemento clicado é um botão de resposta
  if (e.target.classList.contains("answer")) {
    // Verifica se a resposta selecionada está correta
    if (e.target.getAttribute("data-correct") === "true") {
      questionsCorrect++;
    } else {
      tryAgain();
    }

    // Verifica se ainda há mais perguntas
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      loadQuestion();
    } else {
      finish();
    }
  }
}

// Exibe tela de tente novamente após um erro
function tryAgain() {
  textTryAgainScreen.innerHTML = `Humm que pena ${userName}, não foi dessa vez... <br> você acertou ${questionsCorrect} de ${questions.length} questões `;
  showTryAgainScreen();
}

// Exibe o resultado final
function finish() {
  textFinish.innerHTML = `Parabéns ${userName}!! <br> você acertou ${questionsCorrect} de ${questions.length} questões e conseguiu chegar no final do desafio!`;
  showFinishScreen();
}

// Eventos de clique nos botões
startButton.onclick = () => {
  getValidUserName();
  loadQuestion();
  showQuizScreen();
};

tryAgainButton.onclick = () => {
  currentIndex = 0;
  questionsCorrect = 0;
  showStartScreen();
};

restartButton.onclick = () => {
  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
  showStartScreen();
};

// Adiciona evento de clique para todas as respostas
answersContainer.addEventListener("click", nextQuestion);

// Carregar a tela inicial quando a página carregar
showStartScreen();
