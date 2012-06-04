(function() {
  var GS;

  GS = window.GoodShit || (window.GoodShit = {});

  GS.Views || (GS.Views = {});

  GS.Views.Map = Backbone.View.extend({
    initialize: function(o) {
      this.o = o;
      _.bindAll(this);
      this.$el = $(this.el);
      L.ROOT_URL = '/';
      $.ajax({
        url: "//maps.stamen.com/js/tile.stamen.js",
        dataType: 'script',
        success: this.initMap
      });
    },
    initMap: function() {
      var layer;
      this.map = new L.Map('map', {
        center: new L.LatLng(-41.28646, 174.776236),
        zoom: 13
      });
      layer = new L.StamenTileLayer('toner');
      this.map.addLayer(layer);
      $.ajax({
        url: "/places.json?cache=" + (new Date()),
        dataType: 'json',
        success: this.addMarkers
      });
    },
    addMarkers: function(data) {
      this.$el.removeClass('loading');
      this.model = new Backbone.Model(data);
      _.each(this.model.get('places'), this.addAMarker);
    },
    addAMarker: function(info) {
      var i, icon, marker,
        _this = this;
      icon = L.Icon.extend({
        iconUrl: '/images/marker.landmarks.png',
        shadowUrl: null,
        shadowSize: null,
        iconSize: new L.Point(17, 29),
        iconAnchor: new L.Point(8, 29),
        popupAnchor: new L.Point(-3, -30)
      });
      i = new icon();
      marker = new L.Marker(new L.LatLng(info.lat, info.long), {
        icon: i
      });
      this.map.addLayer(marker);
      marker.on('click', function() {
        _this.markerClicked(marker, info);
      });
    },
    markerClicked: function(marker, info) {
      window.location = info.permalink;
    }
  });

}).call(this);
