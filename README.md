# awesome-paginator

A simple paginator with support to build urls.

There are a lot of other paginators out there but I just created this one
because it is the way I want a paginator to be. Just pagination without
template rendering or other stuff. Because it is better you
do that with your templating engine, this makes this module more reusable.

[![build status](https://secure.travis-ci.org/wwwdata/awesome-paginator.png)](http://travis-ci.org/wwwdata/awesome-paginator)

## Installation

This module is installed via npm:

``` bash
$ npm install awesome-paginator
```

## Example Usage

### Initialisation
``` js
var AwesomePaginator = require('awesome-paginator');

var pagination = new AwesomePaginator({
  page: 6,             // default is 1
  total: 10,
  maxPages: 5,         // default is 10
  url: '/search?name=Alfred',
  queryParam: 'offset' // default is 'page'
});
```

Please provide all required parameters. Otherwise an Error will be thrown.

### First page
The first page, this is always page 1. You can use this if you want to make a
quick jump to the first page and also know if the user already is at the firsrt
page with the `isActive` status.

``` js
var first = pagination.getFirst();

{ page: 1, isActive: false, url: '/search?name=Alfred&offset=1' }
```

### Last page
The same as with the first page, but this is always the last page with `isActive`
status and `url`.

``` js
var last = pagination.getLast();

{ page: 10, isActive: false, url: '/search?name=Alfred&offset=10' }
```

### Pages
This is an array of pages. The main functionality of this pagination.

``` js
var pages = pagination.getPages();

[ { page: 4, isActive: false, url: '/search?name=Alfred&offset=4' },
  { page: 5, isActive: false, url: '/search?name=Alfred&offset=5' },
  { page: 6, isActive: true, url: '/search?name=Alfred&offset=6' },
  { page: 7, isActive: false, url: '/search?name=Alfred&offset=7' },
  { page: 8, isActive: false, url: '/search?name=Alfred&offset=8' } ]
```
## Feedback
If you want to help or fix a bug just feel free to open a pull-request on
github!

Just be sure that you have executed the `Grunt` Task before in this repository
which checks for `jshint` and executes all the tests.
