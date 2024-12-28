let currentCategory = [];
let currentIndex = 0;
let score = 0;
let timer;

const categoryButtons = document.querySelectorAll('.category-btn');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const categoryTitle = document.getElementById('category-title');
const timerElement = document.getElementById('time');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit-btn');
const resetButton = document.getElementById('reset-btn');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');

function startCategory(category) {
    currentCategory = categories[category];
    // shuffleArray(currentCategory); 
    currentIndex = 0;
    score = 0;
    showQuiz();
    startTimer();
    displayQuestion();
}

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

function showQuiz() {
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    document.getElementById('category-container').style.display = 'none';
}

function displayQuestion() {
    const currentQuestion = currentCategory[currentIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    for (const [key, value] of Object.entries(currentQuestion.options)) {
        const button = document.createElement('button');
        button.textContent = `${key}. ${value}`;
        button.onclick = () => checkAnswer(key);
        optionsElement.appendChild(button);
    }
}

function checkAnswer(selectedOption) {
    const correctAnswer = currentCategory[currentIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    clearInterval(timer);
    if (currentIndex < currentCategory.length - 1) {
        currentIndex++;
        startTimer();
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 15;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (currentIndex < currentCategory.length - 1) {
                currentIndex++;
                startTimer();
                displayQuestion();
            } else {
                endQuiz();
            }
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    scoreElement.textContent = `Your score is ${score} out of ${currentCategory.length}`;
}

function resetQuiz() {
    clearInterval(timer);
    currentIndex = 0;
    score = 0;
    startTimer();
    displayQuestion();
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        startCategory(category);
    });
});

resetButton.addEventListener('click', resetQuiz);

submitButton.addEventListener('click', endQuiz);

// restartButton.addEventListener('click', () => {
//     quizContainer.style.display = 'none';
//     resultsContainer.style.display = 'none';
//     document.getElementById('category-container').style.display = 'flex';
//     currentIndex = 0;
//     score = 0;
// });
document.getElementById("restart-btn").addEventListener("click", () => {
    // Hide results container
    document.getElementById("results-container").style.display = "none";
    
    // Show category container
    document.getElementById("category-container").style.display = "flex";
    
    // Reset quiz container and other states if necessary
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("category-title").innerText = "";
    document.getElementById("question").innerText = "";
    document.getElementById("options").innerHTML = "";
    document.getElementById("time").innerText = "20";
});
