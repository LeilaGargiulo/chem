document.addEventListener('DOMContentLoaded', function() {
  var questions = {
    stoichiometry: [
      {
        question: "What is the term for the substance that limits the amount of product formed in a reaction?",
        answers: ["Excess reagent", "Limiting reagent", "Catalyst", "Solvent"],
        correctIndex: 1
      },
      {
        question: "In a balanced reaction, the coefficients represent:",
        answers: ["Mole ratios", "Mass fractions", "Molarities", "None"],
        correctIndex: 0
      },
      {
        question: "Which law is often used in stoichiometry calculations?",
        answers: ["Boyle's Law", "Avogadro's Law", "Law of conservation of mass", "Charles's Law"],
        correctIndex: 2
      }
    ],
    thermodynamics: [
      {
        question: "What does enthalpy (H) represent in a reaction?",
        answers: ["Total energy", "Heat content", "Kinetic energy", "Potential energy"],
        correctIndex: 1
      },
      {
        question: "Which term describes a process that absorbs heat?",
        answers: ["Exothermic", "Isochoric", "Adiabatic", "Endothermic"],
        correctIndex: 3
      },
      {
        question: "What is the relationship between Gibbs free energy and spontaneity?",
        answers: ["Negative ΔG means nonspontaneous", "Positive ΔG means spontaneous", "Negative ΔG means spontaneous", "Zero ΔG means maximally spontaneous"],
        correctIndex: 2
      }
    ],
    organic: [
      {
        question: "What functional group is characteristic of alcohols?",
        answers: ["-OH", "-COOH", "-NH₂", "-CH₃"],
        correctIndex: 0
      },
      {
        question: "Benzene is known for its:",
        answers: ["Singular bonds", "Conjugated double bonds", "Ionic bonds", "Triple bonds"],
        correctIndex: 1
      },
      {
        question: "Which of these is a common reaction in organic chemistry?",
        answers: ["Substitution", "Distillation", "Sublimation", "Filtration"],
        correctIndex: 0
      }
    ],
    equilibrium: [
      {
        question: "Le Chatelier's principle predicts the response of a system when:",
        answers: ["Equilibrium is disturbed", "Temperature is constant", "Volume doubles", "Catalyst is added"],
        correctIndex: 0
      },
      {
        question: "Increasing the concentration of reactants will shift the equilibrium:",
        answers: ["To the right", "To the left", "No change", "Cannot determine"],
        correctIndex: 0
      },
      {
        question: "Which condition does NOT affect chemical equilibrium?",
        answers: ["Pressure", "Concentration", "Catalyst", "Temperature"],
        correctIndex: 2
      }
    ]
  };

  var unitDropdown = document.getElementById('unitDropdown');
  var questionArea = document.getElementById('questionArea');
  var answersList = document.getElementById('answersList');
  var dropZone = document.getElementById('dropZone');
  var progressBar = document.getElementById('progressBar');
  var progressText = document.getElementById('progressText');
  var nextButton = document.getElementById('nextQuestion');

  var currentUnit = unitDropdown.value;
  var currentQuestionIndex = 0;
  var currentQuestions = questions[currentUnit];

  function updateProgress() {
    var progressPercent = (currentQuestionIndex / currentQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    progressText.textContent = "Question " + (currentQuestionIndex + 1) + " of " + currentQuestions.length;
  }

  function loadQuestion(unit, index) {
    currentQuestions = questions[unit];
    if (index >= currentQuestions.length) {
      // Quiz complete!
      questionArea.textContent = "Quiz complete!";
      answersList.innerHTML = "";
      dropZone.textContent = "";
      nextButton.style.display = "none";
      return;
    }
    var qObj = currentQuestions[index];
    questionArea.textContent = qObj.question;
    dropZone.dataset.correct = qObj.correctIndex;
    dropZone.style.backgroundColor = '#fff';
    dropZone.textContent = "Drop your answer here.";
    // Clear previous answer options
    answersList.innerHTML = "";
    qObj.answers.forEach(function(answer, idx) {
      var li = document.createElement('li');
      li.textContent = answer;
      li.setAttribute('draggable', 'true');
      li.classList.add('draggable');
      li.dataset.answerIndex = idx;
      answersList.appendChild(li);
    });
    updateProgress();
    nextButton.style.display = "none";
  }

  // Load the first question
  loadQuestion(currentUnit, currentQuestionIndex);

  unitDropdown.addEventListener('change', function() {
    currentUnit = this.value;
    currentQuestionIndex = 0;
    loadQuestion(currentUnit, currentQuestionIndex);
  });

  // Drag and drop handling
  document.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('draggable')) {
      e.dataTransfer.setData('text/plain', e.target.dataset.answerIndex);
    }
  });

  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    var droppedIndex = e.dataTransfer.getData('text/plain');
    var correctIndex = dropZone.dataset.correct;
    if (droppedIndex === correctIndex) {
      dropZone.textContent = "Correct!";
      dropZone.style.backgroundColor = '#c8e6c9';
      nextButton.style.display = "inline-block";
    } else {
      dropZone.textContent = "Incorrect, try again.";
      dropZone.style.backgroundColor = '#ffcdd2';
    }
  });

  nextButton.addEventListener('click', function() {
    currentQuestionIndex++;
    loadQuestion(currentUnit, currentQuestionIndex);
  });
});
