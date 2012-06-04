GS = window.GoodShit ||= {}
GS.Views ||= {}

GS.Views.Intro = Backbone.View.extend
  events:
    'click ul a': 'filterClicked'

  initialize: (@o) ->
    _.bindAll @
    @$el = $(@el)
    return

  filterClicked: (e) ->
    e.preventDefault()
    @$el.addClass 'hide'
    $('#map').addClass 'visible'
    return