# murky

[![Build Status](https://travis-ci.org/nskazki/murky.svg)](https://travis-ci.org/nskazki/murky)
[![Coverage Status](https://coveralls.io/repos/github/nskazki/murky/badge.svg?branch=master)](https://coveralls.io/github/nskazki/murky)

>This module is written on `typescript`, and contains the `.d.ts` file.
><br>If you write on `typescript`: just use it in your project and definitions will be automatically uploaded.

```
npm i -S murky
```

## About

`murky` - it's like [util.format](https://nodejs.org/api/util.html#util_util_format_format),
but with additional placeholders.

![Module Demo](http://imgur.com/bYiho5u.png)

## Exports

```ts
interface IMurky {
  (fmtStr?: string, ...replacers: Array<any>): string
  (...replacers: Array<any>): string
}

export const color: IMurky = function() { /*...*/ }
export const nocolor: IMurky = function() { /*...*/ }

const auto: IMurky = function() {
  return require('supports-color')
    ? color.apply(null, arguments) as string
    : nocolor.apply(null, arguments) as string
}

export default auto
```

## color/nocolor mode

`murky` uses [supports-color](https://github.com/chalk/supports-color)
to detect whether a terminal supports color. So in general,
you can use the default exported function to obtain the best result.

Notes:
 * if you use the color mode, all no string arguments
   will be painted by [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options).
 * if you use the nocolor mode, all the arguments will be discolored,
   including the format string. It uses a [uncolor](https://github.com/stephenmathieson/node-uncolor) module.
 * in any mode all string arguments, except the format string, will be discolored,
   this is due to the internal module needs.

## util.format compatibility

* you can not specify a format string, like `util.format(1, 2, 3) === '1 2 3'`.
* you can print a percent sign, like `util.format('%%') === '%'`.
* you can specify more placeholders than you need,
  like `util.format('%s %s', 1) === '1 %s'`.
* you can specify less placeholders than you need,
  like `util.format('', 1) === ' 1'`.

## List of placeholders

* `%j` - alias to `%j` of `util.format`.
* `%s` - cast any value to string by [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options).
* `%l` - first cast value to string and then flattens result by [string-true-oneline](https://github.com/nskazki/string-true-oneline).
* `%t` - first cast value to string and then adds pad to the result, like on the demo picture. Project was started for sake of it :)
* `%d` and `%n` -
  firstly, if the value is not a finite number or a string which is contained a finite number,
  then the value will be processed by strings handler, like `%s`.
  If the value contains a finite number, it will be formatted by severing of the digit triples.
* `%m` and `%ms` -
  if the value contains a finite number, it will be formatted by [pretty-large-ms](https://github.com/nskazki/pretty-large-ms).
  Otherwise value will be processed by strings handler, like `%s`.
* `%f` - if the value contains a finite number, it will be formatted by [filesize](https://github.com/avoidwork/filesize.js).
  Otherwise value will be processed by strings handler, like `%s`.

## More demo's

![Life Time Demo](http://imgur.com/J4Ub2vm.png)
![Text Block Demo](http://imgur.com/Do6kuB9.png)
![File Stat Demo](http://imgur.com/SzUuLs5.png)
![Unsage Input Demo](http://imgur.com/JxyhKob.png)
