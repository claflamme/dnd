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

denominationMap = fromPairs denominationsList.map (denomination) ->
  [denomination.key, 0]

sortDenominations = (a, b) ->
  b.value > a.value

convertToCopper = (inputs) ->
  denominationsList.reduce (total, denomination) ->
    total + (inputs[denomination.key] * denomination.value)
  , 0

convertToSmallest = (inputs) ->
  copper = convertToCopper inputs

  sortedDenominations = denominationsList.slice().sort sortDenominations

  sortedDenominations.reduce (output, denomination) ->
    output[denomination.key] = Math.floor copper / denomination.value
    copper = copper - (output[denomination.key] * denomination.value)
    output
  , {}

class Currency extends React.Component

  constructor: (props) ->
    super props

    @state =
      inputs: denominationMap

  onChange: (denominationKey) ->
    (e) =>
      @state.inputs[denominationKey] = parseInt e.target.value or 0
      @setState @state

  renderCurrencyColumn: (denomination, i) =>
    c 'div', {
      key: i
      className: "currency-column currency-column--#{ denomination.key }"
    },
      c 'input',
        type: 'number'
        className: 'currency-input'
        onChange: @onChange denomination.key
      c 'div', className: 'currency-key',
        denomination.label

  renderConversionDropdown: ->
    c 'select', className: 'currency-output-dropdown',
      c 'option', null,
        'Smallest number of coins'

  renderOutputs: (outputs) ->
    denominationsList.map (denomination) ->
      c 'span', className: "currency-results__result currency-results__result--#{ denomination.key }",
        c 'strong', null,
          outputs[denomination.key] or 0
        c 'small', null,
          "#{ denomination.key } "

  render: ->
    c 'form', null,
      c 'div', className: 'currency',
        denominationsList.map @renderCurrencyColumn
      c 'div', null,
        @renderConversionDropdown()
        c 'div', className: 'currency-results',
          @renderOutputs convertToSmallest @state.inputs

ReactDOM.render c(Currency), document.querySelector('#currency-container')
