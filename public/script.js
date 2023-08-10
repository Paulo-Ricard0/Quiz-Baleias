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
const tryAgainButton = document.querySelector(".tryAgainScreen button");

import questions from "./questions.js"; 

// Inicializa variáveis para controle do estado do quiz

let currentIndex = 0;
let questionsCorrect = 0;
let userName;

// verifica se uma string está vazia ou é numérica

function isStringEmpty(str) {
    return str.trim().length === 0 || !isNaN(str);
  }
