el = React.createElement

backgroundsList = [
  require './backgrounds/acolyte'
  require './backgrounds/charlatan'
  require './backgrounds/criminal'
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

    el 'div', className: 'row',
      el 'div', className: 'col-xs-12',
        el 'div', className: 'background-summary text-center',
          el 'div', className: 'background-main-line',
            summary.toLowerCase()
          el 'div', className: 'background-sub-line',
            description.toLowerCase()

  renderDetails: ->
    el 'div', className: 'container',
      el 'div', className: 'row',
        el 'div', className: 'col-xs-12 col-sm-6 col-sm-offset-3',
          el 'h3', null,
            'Background'
          el 'p', null,
            "#{ @state.background.name } (#{ @state.background.source })"
          el 'h3', null,
            'Flaw'
          el 'p', null
            @state.flaw.text
          el 'h3', null,
            'Bond'
          el 'p', null
            @state.bond.text
          el 'h3', null,
            'Ideal'
          el 'p', null
            el 'strong', null,
              "#{ @state.ideal.summary }: "
            @state.ideal.text
          el 'h3', null,
            'Personality Trait'
          el 'p', null
            @state.personality.text

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
        el 'div', className: 'container-fluid',
          @renderDestiny()
          el 'div', className: 'row',
            el 'div', className: 'col-xs-12 text-center',
              el 'button', className: 'refresh-button', onClick: @revealDestiny,
                'Choose another one'
      @renderDetails()

ReactDOM.render el(BackgroundGenerator), document.querySelector('#background-container')
