(function() {
  var GS;

  GS = window.GoodShit || (window.GoodShit = {});

  GS.Views || (GS.Views = {});

  GS.Views.Home = Backbone.View.extend({
    initialize: function(o) {
      this.o = o;
      _.bindAll(this);
      this.$el = $(this.el);
      this.loadMapsAPI();
    },
    loadMapsAPI: function() {
      GS.tempView = this;
      $.ajax({
        url: "http://maps.googleapis.com/maps/api/js?key=" + GS.Config.gMapsAPIKey + "&sensor=true&callback=window.GoodShit.tempView.mapsApiLoaded",
        dataType: "script"
      });
    },
    mapsApiLoaded: function() {
      this.addMap();
    },
    addMap: function() {
      var options;
      options = {
        center: new google.maps.LatLng(-41.311833, 174.779038),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(document.getElementById('map'), options);
      $.ajax({
        url: '/places.json',
        dataType: 'json',
        success: this.placesLoaded
      });
    },
    placesLoaded: function(data) {
      this.model = new Backbone.Model(data);
      _.each(this.model.get('places'), this.addPlaceMarker);
    },
    addPlaceMarker: function(place) {
      var marker,
        _this = this;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(place.lat, place.long),
        map: this.map,
        title: place.title
      });
      google.maps.event.addListener(marker, 'click', function() {
        _this.markerClicked(place);
      });
    },
    markerClicked: function(place) {
      console.log(place);
      window.location = place.permalink;
    }
  });

}).call(this);
