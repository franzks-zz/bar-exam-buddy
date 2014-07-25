Polymer('exam-form', {
  questionCurrent: 0,
  questionTotal: 0,
  ready: function() {
    this.$.xhr.request({
      url: 'dummy-questions.json',
      callback: this.onQuestionsLoaded.bind(this)
    });
  },
  arrQuestions: [],
  onQuestionsLoaded: function(result) {
    this.arrQuestions = eval(result);
    this.questionTotal = this.arrQuestions.length;
  },
  fabPrevOnTap: function(e) {
  },
  fabNextOnTap: function(e) {
  },
});
