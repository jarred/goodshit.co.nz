GS = window.GoodShit ||= {}
GS.Views ||= {}

GS.Views.Home = Backbone.View.extend
  
  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)

    @$('#map').width $(window).width()
    @$('#map').height $(window).height()    

    @loadMapsAPI()
    # @loadStyle()
    return

  loadStyle: ->
    $.ajax
      url: '/js/map-style.json'
      dataType: 'json'
      success: (data) =>
        console.log 'loadStyle:success', data
        @mapStyle = data
        @loadMapsAPI()
        return
    return

  loadMapsAPI: ->
    GS.tempView = @
    $.ajax
      url: "http://maps.googleapis.com/maps/api/js?key=#{GS.Config.gMapsAPIKey}&sensor=true&callback=window.GoodShit.tempView.mapsApiLoaded"
      dataType: "script"
    return

  mapsApiLoaded: ->
    # @addMap()
    $.ajax
      url: "http://maps.stamen.com/js/tile.stamen.js"
      dataType: 'script'
      success: @bigMap
    return

  bigMap: ->
    @$('#map').transit
      left: 0
      top: 0
      width: $(window).width()
      height: $(window).height()
      # height: 300
    , 300
    layer = 'toner'
    options =
      center: new google.maps.LatLng(-41.28646, 174.776236)
      zoom: 14
      mapTypeId: layer
      backgroundColor: '#000000'
      mapTypeControlOptions:
        mapTypeIds: []

    @map = new google.maps.Map document.getElementById('map'), options
    # load places...
    @map.mapTypes.set layer, new google.maps.StamenMapType(layer)
    $.ajax
      url: "/places.json?cache=#{new Date()}"
      dataType: 'json'
      success: @placesLoaded
    return

  placesLoaded: (data) ->
    @model = new Backbone.Model data
    @addPlaceMarkers()
    return

  addPlaceMarkers: ->
    _.each @model.get('places'), (place) =>
      marker = new google.maps.Marker
        position: new google.maps.LatLng place.lat, place.long
        map: @map
        title: place.title
      marker.setAnimation 'BOUNCE'
      google.maps.event.addListener marker, 'click', () =>
        @markerClicked place
        return
      return
    return

  markerClicked: (place) ->
    # @map.panTo(new google.maps.LatLng(place.lat, place.long))
    # console.log place
    window.location = place.permalink
    return
    @map = null
    @$('#map').html('')
    @$('#map').transit
      left: 200
      top: 200
      width: 400
      height: 400
    , 300, () =>
      @renderPlace(place)
      return
    return

  renderPlace: (place) ->
    layer = 'toner'
    options =
      center: new google.maps.LatLng(place.lat, place.long)
      zoom: 17
      mapTypeId: layer
      backgroundColor: '#000000'
      mapTypeControlOptions:
        mapTypeIds: []

    @map = new google.maps.Map document.getElementById('map'), options
    # load places...
    @map.mapTypes.set layer, new google.maps.StamenMapType(layer)
    @addPlaceMarkers()
    return