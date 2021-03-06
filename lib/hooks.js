'use strict';

var before = require('./before');
var after = require('./after');

module.exports = function() {
  return function() {
    var app = this;

    // Enable the hooks Plugin
    app.enable('feathers hooks');

    app.mixins.push(before);
    app.mixins.push(after);
  };
};
