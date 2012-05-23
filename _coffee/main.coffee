GS = window.GoodShit ||= {}

GS.Config =
  gMapsAPIKey: 'AIzaSyAnsuXlIr4ZBeBPr9Wz1Zh-vr5kCRHSiLY'

GS.Main =
  init: ->
    _.bindAll @
    GS.appModel = new Backbone.Model()
    # @extendViews()
    $(window).bind 'load', @extendViews
    # $.ajax
    #   url: '/places.json'
    #   dataType: 'json'
    #   success: (data) =>
    #     console.log data
    #     return
    #   error: () =>
    #     console.log 'error', arguments
    #     return
    return

  extendViews: -> 
    _.each $('.extend'), (el) =>
      $el = $(el)
      name = $el.data('view')
      return if name is null or name is ''
      return if GS.Views[name] is undefined
      view = new GS.Views[name]
        el: $el
        appModel: GS.appModel
      $el.removeClass 'extend'
      return