Polymer('exam-form', {
  questionCurrent: 0,
  arrQuestions: [],
  arrQuestionLabels: [],
  ready: function() {
    this.arrQuestionLabels = [
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
    this.$.question.textContent = question.question;

    labels = this.arrQuestionLabels;
    labels[0].label = question.choice1;
    labels[1].label = question.choice2;
    labels[2].label = question.choice3;
    labels[3].label = question.correctAnswer;
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
