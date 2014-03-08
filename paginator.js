'use strict';

var url = require('url');

/**
 * The Pager object.
 *
 * @param {object} params
 * @param {number} [params.page] the current page. Default is 1
 * @param {number} params.total total number of pages
 * @param {number} [params.maxPages] the maximum of pages in the pager. Default is 10
 * @param {string} params.url the url that gets the pager query parameter appended
 * @param {string} [params.queryParam] the query parameter name, for example use: page
 * @constructor
 */
function Pager(params) {
  this.page = params.page || 1;

  if (typeof params.total !== 'number') {
    throw new Error('Parameter total is required!');
  }
  this.total = params.total;

  this.maxPages = params.maxPages || 10;

  if (typeof params.url !== 'string') {
    throw new Error('Parameter url is required!');
  }
  this.url = params.url;

  this.queryParam = params.queryParam || 'page';
}

/**
 * Build a url for a page
 *
 * @param {number} page
 * @returns {string} the constructed url
 */
Pager.prototype.buildUrl = function (page) {
  var parsed = url.parse(this.url, true);
  parsed.search = undefined;
  parsed.query[this.queryParam] = page;

  return url.format(parsed);
};

/**
 * Get the first page
 *
 * @returns {{page: number, isActive: boolean, url: string}}
 */
Pager.prototype.getFirst = function () {
  return {
    page: 1,
    isActive: this.page === 1,
    url: this.buildUrl(1)
  };
};

/**
 * Get the last page
 *
 * @returns {{page: number, isActive: boolean, url: string}}
 */
Pager.prototype.getLast = function () {
  return {
    page: this.total,
    isActive: this.page === this.total,
    url: this.buildUrl(this.total)
  };
};

/**
 * Get all pages that you want to render in your template
 *
 * @returns [{page: number, isActive: boolean, url: string}]
 */
Pager.prototype.getPages = function () {
  var half = Math.floor(this.maxPages / 2),
      start,
      end,
      result = [];

  if (this.maxPages >= this.total) {
    start = 1;
    end = this.total;
  } else {
    start = this.page - half;
    end = this.page + half;

    if (this.maxPages % 2 === 0) {
      start += 1;
    }

    if (this.page <= half) {
      start = 1;
      end = this.maxPages;
    }

    if (end > this.total) {
      start = this.total - this.maxPages + 1;
      end = this.total;
    }
  }

  for (var i = start; i <= end; i++) {
    result.push({
      page: i,
      isActive: i === this.page,
      url: this.buildUrl(i)
    });
  }

  return result;
};

module.exports = Pager;