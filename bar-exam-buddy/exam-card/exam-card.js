Polymer('exam-card', {
  examCardTitle: '',
  ready: function() {
    this.setAttribute('hero-id',this.examCardTitle);
  },
  onFabStartExamTap: function(e) {
    this.selectedPage = 1;
    this.selectedHero = this.getAttribute('hero-id');
  },
});
