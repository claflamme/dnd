c = React.createElement
denominationsList = [
  { key: 'cp', label: 'Copper', value: 1 }
  { key: 'sp', label: 'Silver', value: 10 }
  { key: 'ep', label: 'Electrum', value: 50 }
  { key: 'gp', label: 'Gold', value: 100 }
  { key: 'pp', label: 'Platinum', value: 1000 }
]

fromPairs = (pairs) ->
  index = -1
  length = if pairs then pairs.length else 0
  result = {}

  while ++index < length
    pair = pairs[index];
    result[pair[0]] = pair[1]

  result

generateDenominationMap = ->
  fromPairs denominationsList.map (denomination) ->
    [denomination.key, 0]

Currency = React.createClass

  getInitialState: ->
    inputs: generateDenominationMap()
    bestFit: generateDenominationMap()

  onChange: (denominationKey, e) ->
    @state.inputs[denominationKey] = parseInt(e.target.value or 0)
    @setState @state

  renderSmallest: ->
    # Convert everything to copper
    total = denominationsList.reduce (total, denomination) =>
      total + (@state.inputs[denomination.key] * denomination.value)
    , 0

    sortedDenominations = denominationsList.slice().sort (a, b) ->
      b.value > a.value

    # Then, convert it all back to the smallest number of coins
    denominations = sortedDenominations.reduce (output, denomination) ->
      output[denomination.key] = Math.floor total / denomination.value
      total = total - (output[denomination.key] * denomination.value)
      output
    , {}

    denominationsList.map (denomination) ->
      if isNaN denominations[denomination.key]
        return "0#{ denomination.key } "
      c 'span', className: "currency-results__result currency-results__result--#{ denomination.key }",
        "#{ denominations[denomination.key] }#{ denomination.key } "

  renderConversionDropdown: ->
    c 'select', className: 'currency-output-dropdown',
      c 'option', null,
        'Most efficient (smallest number of coins)'

  render: ->
    c 'form', null,
      c 'div', className: 'currency',
        denominationsList.map (denomination) =>
          c 'div', className: "currency-column currency-column--#{ denomination.key }",
            c 'div', className: 'currency-label',
              denomination.label
            c 'input',
              type: 'text'
              className: 'currency-input'
              onChange: @onChange.bind this, denomination.key
            c 'div', className: 'currency-key',
              denomination.key
      c 'div', null,
        @renderConversionDropdown()
        c 'div', className: 'currency-results',
          @renderSmallest()

ReactDOM.render c(Currency), document.querySelector('#currency-container')
