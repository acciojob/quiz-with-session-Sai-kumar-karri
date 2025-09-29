// =====================
// Quiz Questions
// =====================
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // ensure 4 options for consistency
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// =====================
// Core DOM Elements
// =====================
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// =====================
// Storage Handling
// =====================
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let finalScore = localStorage.getItem("score");

// Show score if already submitted
if (finalScore !== null) {
  scoreElement.textContent = `Your score is ${finalScore} out of ${questions.length}.`;
}

// =====================
// Render Quiz Questions
// =====================
function renderQuestions() {
  questionsElement.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore from sessionStorage
      if (savedProgress[i] === choice) {
        choiceElement.checked = true;
        choiceElement.setAttribute("checked", "true"); // ✅ for Cypress
      }

      // Save on selection
      choiceElement.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));

        // Reset other options' checked attribute
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach(input => input.removeAttribute("checked"));

        choiceElement.setAttribute("checked", "true"); // ✅ for Cypress
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// =====================
// Handle Submit
// =====================
submitBtn.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (savedProgress[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
