Polymer('exam-card', {
  examCardTitle: '',
  ready: function() {
    this.setAttribute('hero-id',this.examCardTitle);
  },
  fabOnTap: function(e) {
    this.selectedPage = 1;
    console.log(this.getAttribute('hero-id'));
    this.selectedHero = this.getAttribute('hero-id');
  },
});
