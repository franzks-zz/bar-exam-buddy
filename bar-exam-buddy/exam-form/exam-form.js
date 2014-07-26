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
    this.resetSelected();
    this.$.question.textContent = question.question;

    radios = this.arrRadioButtons;
    this.shuffleRandomChoices();
    rand = this.arrRandomChoices;
    radios[rand[0]].label = question.correctAnswer;
    radios[rand[1]].label = question.choice1;
    radios[rand[2]].label = question.choice2;
    radios[rand[3]].label = question.choice3;

    if(question.selected) {
      this.choiceSelected = question.selected; 
      radios[parseInt(question.selected)].checked = true;
    }
  },
  onChoiceChanged: function(e) {
    if(this.choiceSelected) {
      this.arrQuestions[this.questionCurrent].selected = this.choiceSelected;
    }
  },
  onBtnSubmitAnswerTap: function() {
    if(this.arrRadioButtons[this.arrRandomChoices[0]].checked) {
      //TODO show visual indicator whether user picked right/wrong choice.
    }
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
  resetSelected: function() {
    this.arrRadioButtons.forEach(function(radio) {
      radio.checked = false;
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
