(function() {
  var Currency, c, denominationsList, fromPairs, generateDenominationMap;

  c = React.createElement;

  denominationsList = [
    {
      key: 'cp',
      label: 'Copper',
      value: 1
    }, {
      key: 'sp',
      label: 'Silver',
      value: 10
    }, {
      key: 'ep',
      label: 'Electrum',
      value: 50
    }, {
      key: 'gp',
      label: 'Gold',
      value: 100
    }, {
      key: 'pp',
      label: 'Platinum',
      value: 1000
    }
  ];

  fromPairs = function(pairs) {
    var index, length, pair, result;
    index = -1;
    length = pairs ? pairs.length : 0;
    result = {};
    while (++index < length) {
      pair = pairs[index];
      result[pair[0]] = pair[1];
    }
    return result;
  };

  generateDenominationMap = function() {
    return fromPairs(denominationsList.map(function(denomination) {
      return [denomination.key, 0];
    }));
  };

  Currency = React.createClass({
    getInitialState: function() {
      return {
        inputs: generateDenominationMap(),
        bestFit: generateDenominationMap()
      };
    },
    onChange: function(denominationKey, e) {
      this.state.inputs[denominationKey] = parseInt(e.target.value || 0);
      return this.setState(this.state);
    },
    renderSmallest: function() {
      var denominations, sortedDenominations, total;
      total = denominationsList.reduce((function(_this) {
        return function(total, denomination) {
          return total + (_this.state.inputs[denomination.key] * denomination.value);
        };
      })(this), 0);
      sortedDenominations = denominationsList.slice().sort(function(a, b) {
        return b.value > a.value;
      });
      denominations = sortedDenominations.reduce(function(output, denomination) {
        output[denomination.key] = Math.floor(total / denomination.value);
        total = total - (output[denomination.key] * denomination.value);
        return output;
      }, {});
      return denominationsList.map(function(denomination) {
        if (isNaN(denominations[denomination.key])) {
          return "0" + denomination.key + " ";
        }
        return c('span', {
          className: "currency-results__result currency-results__result--" + denomination.key
        }, "" + denominations[denomination.key] + denomination.key + " ");
      });
    },
    renderConversionDropdown: function() {
      return c('select', {
        className: 'currency-output-dropdown'
      }, c('option', null, 'Most efficient (smallest number of coins)'));
    },
    render: function() {
      return c('form', null, c('div', {
        className: 'currency'
      }, denominationsList.map((function(_this) {
        return function(denomination) {
          return c('div', {
            className: "currency-column currency-column--" + denomination.key
          }, c('div', {
            className: 'currency-label'
          }, denomination.label), c('input', {
            type: 'text',
            className: 'currency-input',
            onChange: _this.onChange.bind(_this, denomination.key)
          }), c('div', {
            className: 'currency-key'
          }, denomination.key));
        };
      })(this))), c('div', null, this.renderConversionDropdown(), c('div', {
        className: 'currency-results'
      }, this.renderSmallest())));
    }
  });

  ReactDOM.render(c(Currency), document.querySelector('#currency-container'));

}).call(this);
