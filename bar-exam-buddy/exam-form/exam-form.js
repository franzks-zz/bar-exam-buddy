Polymer('exam-form', {
  questionCurrent: 0,
  arrQuestions: [],
  arrQuestionLabels: [],
  arrRandomChoices: [0,1,2,3],
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
    this.shuffleRandomChoices();
    rand = this.arrRandomChoices;
    labels[rand[0]].label = question.correctAnswer;
    labels[rand[1]].label = question.choice1;
    labels[rand[2]].label = question.choice2;
    labels[rand[3]].label = question.choice3;
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
