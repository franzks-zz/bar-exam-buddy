Polymer('bar-exam-buddy', {
    selectedPage: 0,
    selectedPageChanged: function() {
        this.$.pages.selected = this.selectedPage;
    },
});
