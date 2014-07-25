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
  },
  fabPrevOnTap: function(e) {
  },
  fabNextOnTap: function(e) {
  },
});
