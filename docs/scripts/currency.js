(function() {
  var Currency, c, denominationsList, fromPairs, generateDenominationMap,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

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

  Currency = (function(superClass) {
    extend(Currency, superClass);

    function Currency(props) {
      this.renderCurrencyColumn = bind(this.renderCurrencyColumn, this);
      Currency.__super__.constructor.call(this, props);
      this.state = {
        inputs: generateDenominationMap(),
        bestFit: generateDenominationMap()
      };
    }

    Currency.prototype.onChange = function(denominationKey) {
      return (function(_this) {
        return function(e) {
          _this.state.inputs[denominationKey] = parseInt(e.target.value || 0);
          return _this.setState(_this.state);
        };
      })(this);
    };

    Currency.prototype.renderSmallest = function() {
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
    };

    Currency.prototype.renderCurrencyColumn = function(denomination, i) {
      return c('div', {
        key: i,
        className: "currency-column currency-column--" + denomination.key
      }, c('div', {
        className: 'currency-label'
      }, denomination.label), c('input', {
        type: 'number',
        className: 'currency-input',
        onChange: this.onChange(denomination.key)
      }), c('div', {
        className: 'currency-key'
      }, denomination.key));
    };

    Currency.prototype.renderConversionDropdown = function() {
      return c('select', {
        className: 'currency-output-dropdown'
      }, c('option', null, 'Most efficient (smallest number of coins)'));
    };

    Currency.prototype.render = function() {
      return c('form', null, c('div', {
        className: 'currency'
      }, denominationsList.map(this.renderCurrencyColumn)), c('div', null, this.renderConversionDropdown(), c('div', {
        className: 'currency-results'
      }, this.renderSmallest())));
    };

    return Currency;

  })(React.Component);

  ReactDOM.render(c(Currency), document.querySelector('#currency-container'));

}).call(this);
