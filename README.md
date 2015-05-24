## prom-date

Turns a Date object into a promise that resolves on that date, with an optional value.

Uses native ES6 promises if available, but falls back to [lie](https://www.npmjs.com/package/lie). You can override this by calling promDate.setPromise(require('some-es6-compliant-promise-library'));

Use require('prom-date').extend() to expose a 'Date.prototype.promise(value)'.

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
