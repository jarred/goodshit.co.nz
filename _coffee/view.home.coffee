GS = window.GoodShit ||= {}
GS.Views ||= {}

GS.Views.Home = Backbone.View.extend
  
  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)
    # @loadMapsAPI()
    @loadStyle()
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
    @addMap()
    return

  addMap: ->
    options =
      center: new google.maps.LatLng(-41.311833, 174.779038)
      zoom: 12
      mapTypeId: google.maps.MapTypeId.ROADMAP
      styles: @mapStyle
    @map = new google.maps.Map document.getElementById('map'), options
    # load places...
    $.ajax
      url: '/places.json'
      dataType: 'json'
      success: @placesLoaded
    return

  placesLoaded: (data) ->
    @model = new Backbone.Model data
    _.each @model.get('places'), @addPlaceMarker
    return

  addPlaceMarker: (place) ->
    marker = new google.maps.Marker
      position: new google.maps.LatLng place.lat, place.long
      map: @map
      title: place.title
    google.maps.event.addListener marker, 'click', () =>
      @markerClicked place
      return
    return

  markerClicked: (place) ->
    console.log place
    window.location = place.permalink
    return