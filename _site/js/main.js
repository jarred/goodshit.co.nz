(function() {
  var GS;

  GS = window.GoodShit || (window.GoodShit = {});

  GS.Config = {
    gMapsAPIKey: 'AIzaSyAnsuXlIr4ZBeBPr9Wz1Zh-vr5kCRHSiLY'
  };

  GS.Main = {
    init: function() {
      _.bindAll(this);
      GS.appModel = new Backbone.Model();
      this.extendViews();
    },
    extendViews: function() {
      var _this = this;
      return _.each($('.extend'), function(el) {
        var $el, name, view;
        $el = $(el);
        name = $el.data('view');
        if (name === null || name === '') return;
        if (GS.Views[name] === void 0) return;
        view = new GS.Views[name]({
          el: $el,
          appModel: GS.appModel
        });
        $el.removeClass('extend');
      });
    }
  };

}).call(this);
