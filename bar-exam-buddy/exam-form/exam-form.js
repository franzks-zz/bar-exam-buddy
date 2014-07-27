Polymer('exam-form', {
  questionCurrent: 0,
  arrQuestions: [],
  arrRadioButtons: [],
  arrRandomChoices: [0,1,2,3],
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
    }

    if(question.answered) {
      this.highlightCorrectAnswer();
    }
  },
  onChoiceChanged: function(e) {
    if(this.choiceSelected) {
      this.arrQuestions[this.questionCurrent].selected = this.choiceSelected;
    }
  },
  onBtnSubmitAnswerTap: function() {
    this.highlightCorrectAnswer();
    if(this.arrRadioButtons[this.arrRandomChoices[0]].checked) {
      this.arrQuestions[this.questionCurrent].answered = true;
    }
  },
  highlightCorrectAnswer: function() {
    this.arrRadioButtons[this.arrRandomChoices[0]].shadowRoot.getElementById("radioLabel").classList.add('correct');
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
