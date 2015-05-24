"use strict";

var _Promise = typeof Promise === 'function' ? Promise : require('lie');

function promDate(date, value) {
  var then = date.getTime();
  var now = Date.now();
  if (now > then) return _Promise.resolve(value);
  return new _Promise(function(resolve) {
    setTimeout(resolve, then - now, value);
  });
}

promDate.extend = function() {
  if (!Date.prototype.promise) {
    Date.prototype.promise = function(value) {
      return promDate(this, value);
    };
  }
};

promDate.setPromise = function(somePromiseLibrary) {
  _Promise = somePromiseLibrary;
};

module.exports = promDate;
