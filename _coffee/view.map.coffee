GS = window.GoodShit ||= {}
GS.Views ||= {}

GS.Views.Map = Backbone.View.extend
  
  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)
    L.ROOT_URL = '/'
    $.ajax
      url: "//maps.stamen.com/js/tile.stamen.js"
      dataType: 'script'
      success: @initMap
    return

  initMap: ->
    @map = new L.Map 'map',
      center: new L.LatLng(-41.28646, 174.776236)
      zoom: 13
    layer = new L.StamenTileLayer('toner')
    @map.addLayer layer
    # load places...
    $.ajax
      url: "/places.json?cache=#{new Date()}"
      dataType: 'json'
      success: @addMarkers
    return

  addMarkers: (data) ->
    @$el.removeClass 'loading'
    @model = new Backbone.Model data
    _.each @model.get('places'), @addAMarker
    return

  addAMarker: (info) ->
    icon = L.Icon.extend
      iconUrl: '/images/marker.landmarks.png'
      shadowUrl: null
      shadowSize: null
      iconSize: new L.Point(17, 29)
      iconAnchor: new L.Point(8, 29)
      popupAnchor: new L.Point(-3, -30)

    i = new icon()
    marker = new L.Marker new L.LatLng(info.lat, info.long),
      icon: i
    @map.addLayer marker
    return