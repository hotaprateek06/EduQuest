const startScreen = document.getElementById("start");
const instructionScreen = document.getElementById("instructions");
const navBar = document.getElementById("nav");
const resultScreen = document.getElementById("result");
const quizScreens = document.querySelectorAll(".quiz-screen");

const startBtn = document.getElementById("str-btn");
const crackBtn = document.getElementById("crk-btn");
const navButtons = document.querySelectorAll(".sec-nav");
const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");
const submitBtn = document.getElementById("submit-btn"); 


let currentQuestionIndex = 0;
let score = 0;
let attempted = 0;
let correct = 0;
let incorrect = 0;

const totalQuestions = quizScreens.length;

const correctAnswers = {
    q1: "B", q2: "B", q3: "D", q4:"C", q5: "B",
    q6: "C", q7: "D", q8: "B", q9: "A", q10: "A",
    q11: "B", q12: "A", q13: "D", q14: "D", q15: "C",
    q16: "B", q17: "A", q18: "B", q19: "B", q20: "B"
};


instructionScreen.style.display = "none";
navBar.style.display = "none";
resultScreen.style.display = "none";
quizScreens.forEach(q => q.style.display = "none");


startBtn.onclick = () => {
    startScreen.style.display = "none";
    instructionScreen.style.display = "block";
};

crackBtn.onclick = () => {
    instructionScreen.style.display = "none";
    navBar.style.display = "block";
    showQuestion(0);
};

navButtons.forEach(btn => {
    btn.onclick = () => {
        const section = btn.getAttribute("data");
        jumpToSection(section);
    };
});


function showQuestion(index) {
    quizScreens.forEach((q, i) => {
        q.style.display = i === index ? "block" : "none";
    });
    currentQuestionIndex = index;
}

function jumpToSection(sectionNum) {
    let found = false;
    quizScreens.forEach((screen, index) => {
        if (screen.getAttribute("data") === sectionNum && !found) {
            screen.style.display = "block";
            currentQuestionIndex = index;
            found = true;
        } else {
            screen.style.display = "none";
        }
    });
}

prevButtons.forEach(btn => {
    btn.onclick = () => {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    };
});
nextButtons.forEach(btn => {
    btn.onclick = () => {
        if (currentQuestionIndex < quizScreens.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        }
    };
});

document.querySelectorAll("input[type='radio']").forEach(radio => {
    radio.addEventListener("change", () => {
        const screen = radio.closest(".quiz-screen");
        const index = Array.from(quizScreens).indexOf(screen);
        evaluateAnswer(index);
    });
});

function evaluateAnswer(i) {
    const screen = quizScreens[i];
    const options = screen.querySelectorAll("input[type='radio']");
    if (!options.length) return;

    const name = options[0].name;
    const selected = screen.querySelector(`input[name="${name}"]:checked`);
    if (!selected) return;

    const answer = selected.value;
    const qid = name;

    
    if (selected.parentElement.classList.contains("correct") || selected.parentElement.classList.contains("wrong")) {
        return;
    }

    attempted++;

    options.forEach(opt => opt.parentElement.classList.remove("correct", "wrong"));

    if (correctAnswers[qid] === answer) {
        selected.parentElement.classList.add("correct");
        correct++;
        score += 4;
    } else {
        selected.parentElement.classList.add("wrong");
        incorrect++;
        score -= 1;
        options.forEach(opt => {
            if (opt.value === correctAnswers[qid]) {
                opt.parentElement.classList.add("correct");
            }
        });
    }
}


submitBtn.onclick = showResult;

function showResult() {
    quizScreens.forEach(q => q.style.display = "none");
    navBar.style.display = "none";
    resultScreen.style.display = "block";

    document.getElementById("total-questions").innerText = totalQuestions;
    document.getElementById("attempted").innerText = attempted;
    document.getElementById("unattempted").innerText = totalQuestions - attempted;
    document.getElementById("correct").innerText = correct;
    document.getElementById("incorrect").innerText = incorrect;
    document.getElementById("score").innerText = score;
}

function resetQuizData() {
    score = 0;
    attempted = 0;
    correct = 0;
    incorrect = 0;
    currentQuestionIndex = 0;

    document.querySelectorAll("input[type='radio']").forEach(r => r.checked = false);
    document.querySelectorAll("label").forEach(l => l.classList.remove("correct", "wrong"));
}
function restartQuiz() {
    resetQuizData();
    resultScreen.style.display = "none";
    navBar.style.display = "block";
    showQuestion(0);
}

function goToHome() {
    resetQuizData();
    resultScreen.style.display = "none";
    navBar.style.display = "none";
    startScreen.style.display = "block";
}

const hamburger = document.getElementById("hamburger");
const sectionBtnContainer = document.getElementById("sections-btn");

hamburger.addEventListener("click", () => {
    sectionBtnContainer.classList.toggle("show");
});
navButtons.forEach(btn => {
    btn.onclick = () => {
        const section = btn.getAttribute("data");
        jumpToSection(section);

        
        if (window.innerWidth <= 768) {
            sectionBtnContainer.classList.remove("show");
        }
    };
});
