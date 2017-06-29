el = React.createElement

backgroundsList = [
  require './backgrounds/acolyte'
  require './backgrounds/charlatan'
  require './backgrounds/criminal'
  require './backgrounds/entertainer'
]

getRandomFromList = (list) ->
  list[Math.floor(Math.random() * list.length)]

getRandomBackground = ->
  getRandomFromList backgroundsList

class BackgroundGenerator extends React.Component
  constructor: (props) ->
    super props

    @state =
      background: null
      flaw: null
      bond: null
      ideal: null
      personality: null

  componentWillMount: ->
    @revealDestiny()

  renderDestiny: ->
    summary = "#{ @state.flaw.quip } #{ @state.background.quip } #{ @state.bond.quip }."
    description = "#{ @state.ideal.quip } and #{ @state.personality.quip }."

    el 'div', className: 'container-fluid',
      el 'div', className: 'row',
        el 'div', className: 'col-xs-12',
          el 'div', className: 'background-summary text-center',
            el 'div', className: 'background-main-line',
              summary.toLowerCase()
            el 'div', className: 'background-sub-line',
              description.toLowerCase()
            el 'button', className: 'refresh-button', onClick: @revealDestiny,
              'Show another ↻'

  renderBackgroundTrait: (title, text) ->
    el 'div', null,
      el 'h3', className: 'mighty-text',
        title
      el 'p', null,
        text

  renderIdeal: (summary, text) ->
    el 'span', null,
      el 'strong', null,
        "#{ summary }: "
      text

  renderDetails: ->
    ideal = @renderIdeal @state.ideal.summary, @state.ideal.text

    el 'div', className: 'container',
      el 'div', className: 'row',
        el 'div', className: 'col-xs-12',
          el 'div', className: 'background-details',
            @renderBackgroundTrait "Background", "#{ @state.background.name } (#{ @state.background.source })"
            @renderBackgroundTrait "Flaw", @state.flaw.text
            @renderBackgroundTrait "Bond", @state.bond.text
            @renderBackgroundTrait "Ideal", ideal
            @renderBackgroundTrait "Personality Trait", @state.personality.text

  revealDestiny: =>
    background = getRandomBackground()

    @setState {
      background: background
      flaw: getRandomFromList background.flaws
      bond: getRandomFromList background.bonds
      ideal: getRandomFromList background.ideals
      personality: getRandomFromList background.personalities
    }

  render: ->
    el 'div', null,
      el 'div', className: 'background-generator',
        el 'div', className: 'container',
          el 'div', className: 'row',
            el 'div', className: 'col-xs-12 text-center',
              el 'h1', null,
                'D&D 5e Background Generator'
              el 'h2', null,
                'Your Epic Destiny Awaits'
        @renderDestiny()
        @renderDetails()

ReactDOM.render el(BackgroundGenerator), document.querySelector('#background-container')
