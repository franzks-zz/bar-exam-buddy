Polymer('bar-exam-buddy', {
  selectedPage: 0,
  selectedHero: '',
  selectedPageChanged: function() {
    this.$.pages.selected = this.selectedPage;
  },
  onFabBackTap: function(e) {
    this.selectedPage = 0;
  },
});
