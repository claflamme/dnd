(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Currency, c, convertCopperToDenominations, convertToCopper, convertToDenomination, convertToSmallest, denominationMap, denominationsList, fromPairs, sortDenominations,
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

denominationMap = fromPairs(denominationsList.map(function(denomination) {
  return [denomination.key, 0];
}));

sortDenominations = function(a, b) {
  return b.value > a.value;
};

convertToCopper = function(inputs) {
  return denominationsList.reduce(function(total, denomination) {
    return total + (inputs[denomination.key] * denomination.value);
  }, 0);
};

convertCopperToDenominations = function(copper, denominationsList) {
  var sortedDenominations;
  sortedDenominations = denominationsList.slice().sort(sortDenominations);
  return sortedDenominations.reduce(function(output, denomination) {
    output[denomination.key] = Math.floor(copper / denomination.value);
    copper = copper - (output[denomination.key] * denomination.value);
    return output;
  }, {});
};

convertToDenomination = function(inputs, key) {
  var copper, filteredDenominations;
  copper = convertToCopper(inputs);
  filteredDenominations = [];
  denominationsList.find(function(denomination) {
    filteredDenominations.push(denomination);
    return denomination.key === key;
  });
  return convertCopperToDenominations(copper, filteredDenominations);
};

convertToSmallest = function(inputs) {
  var copper;
  copper = convertToCopper(inputs);
  return convertCopperToDenominations(copper, denominationsList);
};

Currency = (function(superClass) {
  extend(Currency, superClass);

  function Currency(props) {
    this.renderCurrencyColumn = bind(this.renderCurrencyColumn, this);
    this.onDropdownSelect = bind(this.onDropdownSelect, this);
    Currency.__super__.constructor.call(this, props);
    this.state = {
      inputs: denominationMap,
      conversion: 'smallest'
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

  Currency.prototype.onDropdownSelect = function(e) {
    return this.setState({
      conversion: e.target.value
    });
  };

  Currency.prototype.renderCurrencyColumn = function(denomination, i) {
    return c('div', {
      key: i,
      className: "currency-column currency-column--" + denomination.key
    }, c('input', {
      type: 'number',
      className: 'currency-input',
      onChange: this.onChange(denomination.key)
    }), c('div', {
      className: 'currency-key'
    }, denomination.key));
  };

  Currency.prototype.renderDropdownDenomination = function(denomination, i) {
    return c('option', {
      key: i,
      value: denomination.key
    }, denomination.label);
  };

  Currency.prototype.renderConversionDropdown = function() {
    return c('select', {
      className: 'currency-output-dropdown',
      onChange: this.onDropdownSelect
    }, c('option', {
      value: 'smallest'
    }, 'Smallest number of coins'), denominationsList.map(this.renderDropdownDenomination));
  };

  Currency.prototype.renderOutputs = function(outputs) {
    return denominationsList.map((function(_this) {
      return function(denomination) {
        if (_this.state.conversion !== 'smallest' && denomination.key !== _this.state.conversion) {
          return null;
        }
        return c('span', {
          className: "currency-results__result currency-results__result--" + denomination.key
        }, c('strong', null, outputs[denomination.key] || 0), c('small', null, denomination.key + " "));
      };
    })(this));
  };

  Currency.prototype.render = function() {
    var outputs;
    outputs = {};
    if (this.state.conversion === 'smallest') {
      outputs = convertToSmallest(this.state.inputs);
    } else {
      outputs = convertToDenomination(this.state.inputs, this.state.conversion);
    }
    return c('form', null, c('div', {
      className: 'currency'
    }, denominationsList.map(this.renderCurrencyColumn)), c('div', null, this.renderConversionDropdown(), c('div', {
      className: 'currency-results'
    }, this.renderOutputs(outputs))));
  };

  return Currency;

})(React.Component);

ReactDOM.render(c(Currency), document.querySelector('#currency-container'));


},{}]},{},[1]);
