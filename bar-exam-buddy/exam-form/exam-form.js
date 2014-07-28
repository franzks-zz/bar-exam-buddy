Polymer('exam-form', {
  questionCurrent: 0,
  arrQuestions: [],
  arrRadioButtons: [],
  arrRandomChoices: [0,1,2,3],
  numCorrect: 0,
  numAnswered: 0,
  ready: function() {
    this.arrRadioButtons = [
      this.$.choice1,
      this.$.choice2,
      this.$.choice3,
      this.$.choice4,
    ];
    this.$.xhr.request({
      url: 'dummy-questions.json',
      callback: this.onQuestionsLoaded.bind(this)
    });
  },
  onQuestionsLoaded: function(result) {
    this.arrQuestions = eval(result);
    this.loadQuestion(0);
  },
  loadQuestion: function(index) {
    this.questionCurrent = index;
    question = this.arrQuestions[index];
    this.resetRadioButtonStyles();
    this.$.question.textContent = question.question;

    radios = this.arrRadioButtons;
    if(!question.choiceOrder) {
      this.shuffleRandomChoices();
      question.choiceOrder = this.arrRandomChoices.slice();
    }
    radios[question.choiceOrder[0]].label = question.correctAnswer;
    radios[question.choiceOrder[1]].label = question.choice1;
    radios[question.choiceOrder[2]].label = question.choice2;
    radios[question.choiceOrder[3]].label = question.choice3;

    if(question.selected) {
      this.choiceSelected = question.selected; 
      radios[parseInt(question.selected)].checked = true;
    } else {
      this.choiceSelected = null;
    }
    if(question.answered) {
      this.setRadioButtonDisabled(true);
      this.highlightCorrectAnswer();
    } else {
      this.setRadioButtonDisabled(false);
    }

    this.$.dialogListQuestions.opened = false;
  },
  onChoiceChanged: function(e) {
    if(this.choiceSelected) {
      this.arrQuestions[this.questionCurrent].selected = this.choiceSelected;
    }
  },
  onBtnSubmitAnswerTap: function() {
    if(this.choiceSelected) {
      this.highlightCorrectAnswer();
      this.setRadioButtonDisabled(true);
      question = this.arrQuestions[this.questionCurrent];
      if(!question.answered) {
        question.answered = true;
        this.numAnswered++;
        if(this.arrRadioButtons[question.choiceOrder[0]].checked) {
          this.numCorrect++;
          this.$.toastCorrect.show();
        } else {
          this.$.toastWrong.show();
        }
      }
    } else {
      this.$.toastNoAnswer.show();
    }
  },
  highlightCorrectAnswer: function() {
    this.arrRadioButtons[this.arrQuestions[this.questionCurrent].choiceOrder[0]].shadowRoot.getElementById("radioLabel").classList.add('correct');
  },
  onBtnChooseQuestionTap: function() {
    this.$.dialogListQuestions.opened = true;
  },
  onFabPrevTap: function() {
    if(this.questionCurrent>0) {
      this.questionCurrent--;
      this.loadQuestion(this.questionCurrent);
    }
  },
  onFabNextTap: function() {
    if(this.questionCurrent<this.arrQuestions.length-1) {
      this.questionCurrent++;
      this.loadQuestion(this.questionCurrent);
    }
  },
  setRadioButtonDisabled: function(disabled) {
    this.arrRadioButtons.forEach(function(radio) {
      radio.disabled = disabled;
    });
  },
  resetRadioButtonStyles: function() {
    this.arrRadioButtons.forEach(function(radio) {
      radio.checked = false;
      radio.shadowRoot.getElementById("radioLabel").classList.remove('correct');
    });
  },
  shuffleRandomChoices: function() {
    array = this.arrRandomChoices;
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  },
});

// Very dirt hack temporarily done because on-tap doesn't accept
// arguments as of right now
function load(index) {
  document.getElementsByTagName('bar-exam-buddy')[0].shadowRoot.getElementsByTagName('exam-form')[0].loadQuestion(index);
}
