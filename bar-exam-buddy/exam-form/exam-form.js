Polymer('exam-form', {
  questionCurrent: 0,
  ready: function() {
    this.$.xhr.request({
      url: 'dummy-questions.json',
      callback: this.onQuestionsLoaded.bind(this)
    });
  },
  arrQuestions: [],
  onQuestionsLoaded: function(result) {
    this.arrQuestions = eval(result);
    this.loadQuestion(0);
  },
  loadQuestion: function(index) {
    question = this.arrQuestions[index];
    this.$.question.textContent = question.question;
    this.$.choice1.label = question.choice1;
    this.$.choice2.label = question.choice2;
    this.$.choice3.label = question.choice3;
    this.$.choice4.label = question.correctAnswer;
  },
  fabPrevOnTap: function() {
    if(this.questionCurrent>0) {
      this.questionCurrent--;
      this.loadQuestion(this.questionCurrent);
    }
  },
  fabNextOnTap: function() {
    if(this.questionCurrent<this.arrQuestions.length-1) {
      this.questionCurrent++;
      this.loadQuestion(this.questionCurrent);
    }
  },
});
