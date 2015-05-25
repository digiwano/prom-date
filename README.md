## prom-date

Turns a Date object into a promise that resolves on that date, with an optional value.

Uses native ES6 promises if available, but falls back to [lie](https://www.npmjs.com/package/lie). You can override this by calling promDate.setPromise(require('some-es6-compliant-promise-library'));

Use require('prom-date').extend() to expose a 'Date.prototype.promise(value)'.

## API:

**promDate(_date_, _value_, _options_)**
* `date` is any javascript Date object
* `value` is the value you would like the promise to resolve with
* `options` an options object with the following keys (there's only one option ri)
  * `rejectPastDates` if true, dates in the past will be immediately rejected rather than immediately resolved. The value they will be rejected with is the same value they would have been resolved with.
* passing `promDate(date, value, "reject")` is shorthand for `promDate(date, value, {rejectPastDates:true})`

**promDate.extend()**
* extends the native Date.prototype to contain a new `Date.prototype.promise(value, options)`
*

**promDate.setPromise(someLib)**
* By default, this library will use the ES6 Native "Promise" object (or whichever object is "Promise" in the global context).
* If native promises are not found, it wil load the [lie](https://www.npmjs.com/package/lie) library.
* to override this behavior, you can call `promDate.setPromise(somePromiseLibrary)`, so long as that library provides a standard ES6-ish `new Promise(function(resolve,reject){})` constructor.

### install

`npm install prom-date`

### usage

```javascript
var promDate = require('prom-date');
var date = new Date(Date.now() + 60000);
promDate(date, 6).then(function(x) {
  console.log("x contains "+x+" 60 seconds later");
});
```

With the date prototype helper:
```javascript
require('prom-date').extend();
var date = new Date(Date.now() + 60000);
date.promise(7).then(function(x) {
  console.log("x contains "+x+" 60 seconds later");
});
```
Rejecting past dates:
```javascript
var promDate = require('prom-date');
var date = new Date(Date.now() - 1);
promDate(date, 7, 'reject').catch(function(x) {
  // rejection! \o/
});
promDate(date, 7, {rejectPastDates:true}).catch(function(x) {
  // rejection!
});
```

Replacing the promises implementation:
```javascript
var bluebird = require('bluebird')
var promDate = require('prom-date');
promDate.setPromise(bluebird);
promDate(date, 7).then(function(x) {
  console.log("bluebird-created my ", x);
})
```

Chainable for cuteness:
```javascript
var promDate = require('prom-date').setPromise(require('any-promise')).extend();
(new Date()).promise(1).then( x => console.log("success!",x) );
promDate(new Date, 2).then( x => console.log("i still work too!",x) );
```
