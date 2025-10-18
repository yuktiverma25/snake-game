// Quiz questions
const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        question: "Which language runs in the browser?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript"
    },
    {
        question: "Which is not a programming language?",
        options: ["HTML", "Python", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "What year was JavaScript created?",
        options: ["1995", "1990", "2000", "1985"],
        answer: "1995"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

// Load question
function loadQuestion() {
    const currentData = quizData[currentQuestion];
    questionEl.textContent = currentData.question;
    optionsEl.forEach((btn, index) => {
        btn.textContent = currentData.options[index];
        btn.style.backgroundColor = "#f1f1f1";
    });
}

// Check answer
optionsEl.forEach(btn => {
    btn.addEventListener("click", () => {
        if(btn.textContent === quizData[currentQuestion].answer) {
            btn.style.backgroundColor = "#4CAF50"; // green for correct
        } else {
            btn.style.backgroundColor = "#f44336"; // red for wrong
        }
    });
});

// Navigation buttons
nextBtn.addEventListener("click", () => {
    if(currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
});

prevBtn.addEventListener("click", () => {
    if(currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

submitBtn.addEventListener("click", () => {
    score = 0;
    quizData.forEach((q, i) => {
        const selected = Array.from(optionsEl).find(btn => btn.textContent === q.answer);
        if(selected) score++;
    });
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    loadQuestion();
});

// Initialize first question
loadQuestion();
