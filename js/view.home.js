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
    loadStyle: function() {
      var _this = this;
      $.ajax({
        url: '/js/map-style.json',
        dataType: 'json',
        success: function(data) {
          console.log('loadStyle:success', data);
          _this.mapStyle = data;
          _this.loadMapsAPI();
        }
      });
    },
    loadMapsAPI: function() {
      GS.tempView = this;
      $.ajax({
        url: "http://maps.googleapis.com/maps/api/js?key=" + GS.Config.gMapsAPIKey + "&sensor=true&callback=window.GoodShit.tempView.mapsApiLoaded",
        dataType: "script"
      });
    },
    mapsApiLoaded: function() {
      $.ajax({
        url: "http://maps.stamen.com/js/tile.stamen.js",
        dataType: 'script',
        success: this.addMap
      });
    },
    addMap: function() {
      var layer, options;
      layer = 'toner';
      options = {
        center: new google.maps.LatLng(-41.28646, 174.776236),
        zoom: 14,
        mapTypeId: layer,
        backgroundColor: '#000000',
        mapTypeControlOptions: {
          mapTypeIds: []
        }
      };
      this.map = new google.maps.Map(document.getElementById('map'), options);
      this.map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
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
