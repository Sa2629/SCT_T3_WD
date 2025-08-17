const questions = [
      {
        question: "What is the capital of France?",
        answers: [
          { text: "Berlin", correct: false },
          { text: "Madrid", correct: false },
          { text: "Paris", correct: true },
          { text: "Rome", correct: false }
        ]
      },
      {
        question: "Which language runs in a web browser?",
        answers: [
          { text: "Python", correct: false },
          { text: "Java", correct: false },
          { text: "C", correct: false },
          { text: "JavaScript", correct: true }
        ]
      },
      {
        question: "Who developed C language?",
        answers: [
          { text: "James Gosling", correct: false },
          { text: "Dennis Ritchie", correct: true },
          { text: "Guido van Rossum", correct: false },
          { text: "Bjarne Stroustrup", correct: false }
        ]
      },
      {
        question: "Which HTML tag is used to include JavaScript?",
        answers: [
          { text: "<link>", correct: false },
          { text: "<script>", correct: true },
          { text: "<js>", correct: false },
          { text: "<javascript>", correct: false }
        ]
      },
      {
        question: "Which company developed Java?",
        answers: [
          { text: "Sun Microsystems", correct: true },
          { text: "Microsoft", correct: false },
          { text: "Apple", correct: false },
          { text: "Google", correct: false }
        ]
      },
      {
        question: "Which of the following is a CSS framework?",
        answers: [
          { text: "Flask", correct: false },
          { text: "Django", correct: false },
          { text: "Bootstrap", correct: true },
          { text: "NumPy", correct: false }
        ]
      },
      {
        question: "What does SQL stand for?",
        answers: [
          { text: "Strong Question Language", correct: false },
          { text: "Structured Query Language", correct: true },
          { text: "Stylish Question Language", correct: false },
          { text: "Simple Query List", correct: false }
        ]
      },
      {
        question: "Which protocol is used for secure communication over the internet?",
        answers: [
          { text: "HTTP", correct: false },
          { text: "SMTP", correct: false },
          { text: "HTTPS", correct: true },
          { text: "FTP", correct: false }
        ]
      }
    ];

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.textContent = "Next";
      showQuestion();
    }

    function showQuestion() {
      resetState();
      const currentQuestion = questions[currentQuestionIndex];
      const questionNo = currentQuestionIndex + 1;
      questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

      currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct === true) {
          button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
      });
    }

    function resetState() {
      nextButton.style.display = "none";
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }

    function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("wrong");
      }

      Array.from(answerButtons.children).forEach(btn => {
        if (btn.dataset.correct === "true") btn.classList.add("correct");
        btn.disabled = true;
      });
      nextButton.style.display = "block";
    }

    function showScore() {
      resetState();
      questionElement.textContent = `You scored ${score} out of ${questions.length}! 🎉`;
      nextButton.textContent = "Play Again";
      nextButton.style.display = "block";
    }

    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) handleNextButton();
      else startQuiz();
      });

    startQuiz();