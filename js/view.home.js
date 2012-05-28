(function() {
  var GS;

  GS = window.GoodShit || (window.GoodShit = {});

  GS.Views || (GS.Views = {});

  GS.Views.Home = Backbone.View.extend({
    initialize: function(o) {
      this.o = o;
      _.bindAll(this);
      this.$el = $(this.el);
      this.$('#map').width($(window).width());
      this.$('#map').height($(window).height());
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
        success: this.bigMap
      });
    },
    bigMap: function() {
      var layer, options;
      this.$('#map').transit({
        left: 0,
        top: 0,
        width: $(window).width(),
        height: $(window).height()
      }, 300);
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
        url: "/places.json?cache=" + (new Date()),
        dataType: 'json',
        success: this.placesLoaded
      });
    },
    placesLoaded: function(data) {
      this.model = new Backbone.Model(data);
      this.addPlaceMarkers();
    },
    addPlaceMarkers: function() {
      var _this = this;
      _.each(this.model.get('places'), function(place) {
        var marker;
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(place.lat, place.long),
          map: _this.map,
          title: place.title
        });
        marker.setAnimation('BOUNCE');
        google.maps.event.addListener(marker, 'click', function() {
          _this.markerClicked(place);
        });
      });
    },
    markerClicked: function(place) {
      var _this = this;
      window.location = place.permalink;
      return;
      this.map = null;
      this.$('#map').html('');
      this.$('#map').transit({
        left: 200,
        top: 200,
        width: 400,
        height: 400
      }, 300, function() {
        _this.renderPlace(place);
      });
    },
    renderPlace: function(place) {
      var layer, options;
      layer = 'toner';
      options = {
        center: new google.maps.LatLng(place.lat, place.long),
        zoom: 17,
        mapTypeId: layer,
        backgroundColor: '#000000',
        mapTypeControlOptions: {
          mapTypeIds: []
        }
      };
      this.map = new google.maps.Map(document.getElementById('map'), options);
      this.map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
      this.addPlaceMarkers();
    }
  });

}).call(this);
