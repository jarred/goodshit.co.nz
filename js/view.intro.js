(function() {
  var GS;

  GS = window.GoodShit || (window.GoodShit = {});

  GS.Views || (GS.Views = {});

  GS.Views.Intro = Backbone.View.extend({
    events: {
      'click ul a': 'filterClicked'
    },
    initialize: function(o) {
      this.o = o;
      _.bindAll(this);
      this.$el = $(this.el);
    },
    filterClicked: function(e) {
      e.preventDefault();
      this.$el.addClass('hide');
      $('#map').addClass('visible');
    }
  });

}).call(this);
