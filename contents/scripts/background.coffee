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
  render: ->
    background = getRandomBackground()
    flaw = getRandomFromList background.flaws
    bond = getRandomFromList background.bonds
    ideal = getRandomFromList background.ideals
    personality = getRandomFromList background.personalities
    summary = "#{ flaw.quip } #{ background.quip } #{ bond.quip }."
    description = "#{ ideal.quip } and #{ personality.quip }."

    el 'div', className: 'container',
      el 'div', className: 'row',
        el 'div', className: 'col-xs-12',
          el 'h2', className: 'text-center',
            summary.toLowerCase()
          el 'h3', className: 'text-center',
            description.toLowerCase()
      el 'div', className: 'row',
        el 'div', className: 'col-xs-12 col-sm-6 col-sm-offset-3',
          el 'h3', null,
            'Background'
          el 'p', null,
            "#{ background.name } (#{ background.source })"
          el 'h3', null,
            'Flaw'
          el 'p', null
            flaw.text
          el 'h3', null,
            'Bond'
          el 'p', null
            bond.text
          el 'h3', null,
            'Ideal'
          el 'p', null
            el 'strong', null,
              "#{ ideal.summary }: "
            ideal.text
          el 'h3', null,
            'Personality Trait'
          el 'p', null
            personality.text

ReactDOM.render el(BackgroundGenerator), document.querySelector('#background-container')
