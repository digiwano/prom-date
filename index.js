"use strict";

var _Promise = typeof Promise === 'function' ? Promise : require('lie');

function promDate(date, value, options) {
  if (!options) options = {};
  if (options === "reject") options = { rejectPastDates: true };
  var then = date.getTime();
  var now = Date.now();
  var past = now > then;
  return new _Promise(function(resolve, reject) {
    if (past && options.rejectPastDates) return reject(value);
    if (past) return resolve(value);
    setTimeout(resolve, then - now, value);
  });
}

promDate.extend = function() {
  if (!Date.prototype.promise) {
    Date.prototype.promise = function(value, options) {
      return promDate(this, value, options);
    };
  }
  // so that you can var promDate = require('prom-date').extend();
  return module.exports;
};

promDate.setPromise = function(somePromiseLibrary) {
  _Promise = somePromiseLibrary;
  return module.exports;
};

module.exports = promDate;
