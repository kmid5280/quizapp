const questions = [
  {
    question: 'What is the capital of Kansas?',
    answers: ['Topeka', 'Wichita', 'Kansas City', 'Olathe'],
    correctAnswer: 'Topeka'
  },
  {
    question: 'What is the capital of Alaska?',
    answers: ['Fairbanks', 'Anchorage', 'Seward', 'Juneau'],
    correctAnswer: 'Juneau'
  },
  {
    question: 'What is the capital of California?',
    answers: ['Sacramento', 'Los Angeles', 'San Diego', 'San Francisco'],
    correctAnswer: 'Sacramento'
  },
    {
    question: 'What is the capital of Florida',
    answers: ['Tampa', 'Tallahassee', 'Miami', 'Jacksonville'],
    correctAnswer: 'Tallahassee'
  },
  {
    question: 'What is the capital of Maryland?',
    answers: ['Washington, D.C.', 'Rockville', 'Annapolis', 'Baltimore'],
    correctAnswer: 'Annapolis'
  },
  {
    question: 'What is the capital of Texas?',
    answers: ['Austin', 'Dallas', 'Houston', 'San Antonio'],
    correctAnswer: 'Austin'
  },
  {
    question: 'What is the capital of Illinois?',
    answers: ['Rockford', 'Naperville', 'Chicago', 'Springfield'],
    correctAnswer: 'Springfield'
  },
  {
    question: 'What is the capital of Pennsylvania?',
    answers: ['Philadelphia', 'Harrisburg', 'Lancaster', 'Pittsburgh'],
    correctAnswer: 'Harrisburg'
  },
  {
    question: 'What is the capital of Nevada?',
    answers: ['Reno', 'Carson City', 'Henderson', 'Las Vegas'],
    correctAnswer: 'Carson City'
  },
  {
    question: 'What is the capital of Oklamhoma?',
    answers: ['Stillwater', 'Tulsa', 'Oklahoma City', 'Norman'],
    correctAnswer: 'Oklahoma City'
  }
  ];

let questionNumber = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function renderTitle() {
  $('header').html(`
  <div class='startpagetitle'>
    <h1>U.S. State Capital Quiz</h1>
    
  </div>
  `)
}

function renderStartButton() {
  $('main').append(`
    <img class='titleimage' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/US_Capitol_west_side.JPG/1200px-US_Capitol_west_side.JPG" alt="U.S. Capitol">
    <p class="clicktostart">Click Start button or press 'S' to start</p>
    <button class='startbutton' accesskey='s'>Start Quiz</button>
    `)
} /* Note: the access key may not work in all browsers by itself - for instance Firefox requires you to press alt-shift-S to trigger start button. Was not able to find a workaround for this. I also set accesskey values to the individual buttons on the quiz as well, numbers 1-4 respectively. */

function clickStartButton () {
  $('main').on('click', '.startbutton', event => {
    event.preventDefault();
    renderQuestions();
  });
}

function renderQuestions() {
  const currentQuestion = parseInt([questionNumber]) + 1; 
  const formForQuiz = `
    <div class='questionbox'>
    <p class='questionnumber'>Question ${currentQuestion} of ${questions.length}</p>
    <form>
      <p class='questiontitle'>${questions[questionNumber].question}</p>
      <button class='answer' value='${questions[questionNumber].answers[0]}' accesskey='1'>${questions[questionNumber].answers[0]}</button>
      <button class='answer' value='${questions[questionNumber].answers[1]}' accesskey='2'>${questions[questionNumber].answers[1]}</button>
      <button class='answer' value='${questions[questionNumber].answers[2]}' accesskey='3'>${questions[questionNumber].answers[2]}</button>
      <button class='answer' value='${questions[questionNumber].answers[3]}' accesskey='4'>${questions[questionNumber].answers[3]}</button>
    </form>
    <p class='score-tab'>Correct answers: ${correctAnswers}. Incorrect answers: ${incorrectAnswers}.</p>
    </div>`;
    $('main').html(formForQuiz);
    
};

function clickAnswerButton() {
  $('main').on('click', '.answer', event => {
    event.preventDefault();
    let answerButton = event.target.value;
    if (answerButton == questions[questionNumber].correctAnswer) {
      correctAnswers++
      showCorrectAnswer();
      handleProgressButton();
    }
    else {
      incorrectAnswers++;
      showIncorrectAnswer();
      handleProgressButton();
    }
  });
}

function showCorrectAnswer() {
  $('main').html(
  `<p class='correct-answer'>Correct!</p>`
)
}

function showIncorrectAnswer() {
  $('main').html(
    `<p class='incorrect-answer'>Wrong! The answer is ${questions[questionNumber].correctAnswer}.</p>`)
}

function handleProgressButton(){
	if (questionNumber + 1 < questions.length) {
		$('main').append(`
			<button class='next-question'>Next Question</button>
		`);
	}
	else {
		$('main').append(`
			<button class='final-score'>See Final Score</button>
		`);
	}
}

function renderFinalScore() {
  $('main').html(`<p class='quizresults'>You had ${correctAnswers} answers correct and ${incorrectAnswers} incorrect. Play again?</p>
    <button class='playagain'>Play Again</button>`)
}

function playAgain() {
  $('main').on('click', '.playagain', event => {
    event.preventDefault();
    questionNumber = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    renderQuestions();
  })
}

function progressThroughQuiz() {
  $('main').on('click', '.next-question', event => {
    event.preventDefault();
    questionNumber++;
    renderQuestions();
  });
  $('main').on('click', '.final-score', event => {
    event.preventDefault();
    questionNumber++;
    renderFinalScore();
  });
}



function beginQuiz() {
  renderTitle();
  renderStartButton();
  clickStartButton();
  clickAnswerButton();
  progressThroughQuiz();
  playAgain();
}

beginQuiz();
