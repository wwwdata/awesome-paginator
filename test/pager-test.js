'use strict';

var expect = require('chai').expect,
    AwesomePager = require('../paginator');

describe('Pager', function () {
  it('throw error if total or url missing', function () {
    expect(AwesomePager).to.throw(Error);
    expect(function () {new AwesomePager({total: 5}); }).to.throw(Error);
    expect(function () {new AwesomePager({url: '/testpage'}); }).to.throw(Error);
  });

  it('first page active', function () {
    var pager = new AwesomePager({
      total: 5,
      url: 'test'
    });

    var firstPage = pager.getFirst();
    expect(firstPage.isActive).to.equal(true);
    expect(firstPage.page).to.equal(1);
  });

  it('first page inactive', function () {
    var pager = new AwesomePager({
      total: 5,
      page: 2,
      url: 'test'
    });

    expect(pager.getFirst().isActive).to.equal(false);
  });

  it('last page active', function () {
    var pager = new AwesomePager({
      total: 5,
      page: 5,
      url: 'test'
    });

    expect(pager.getLast().isActive).to.equal(true);
  });

  it('last page inactive', function () {
    var pager = new AwesomePager({
      total: 5,
      url: 'test'
    });

    expect(pager.getLast().isActive).to.equal(false);
  });

  it('query parameter is in the url', function () {
    var pager = new AwesomePager({
      total: 5,
      url: '/testpage?blah=blubb',
      queryParam: 'myPage'
    });

    expect(pager.getFirst().url).to.match(/&myPage=1$/);
  });

  it('total 5, maxPages 5, page 2', function () {
    var pager = new AwesomePager({
      total: 5,
      maxPages: 5,
      page: 2,
      url: 'test'
    });

    var pages = pager.getPages();

    expect(pages.length).to.equal(5);
    expect(pages[2].page).to.equal(3);
    expect(pages[1].isActive).to.equal(true);
    expect(pages[4].isActive).to.equal(false);
  });

  it('total 20, maxPages 10, page 10', function () {
    var pager = new AwesomePager({
      total: 20,
      maxPages: 10,
      page: 10,
      url: 'test'
    });

    var pages = pager.getPages();

    expect(pages.length).to.equal(10);
    expect(pages[0].page).to.equal(6);
    expect(pages[9].page).to.equal(15);
  });

  it('total 20, maxPages 5, page 10', function () {
    var pager = new AwesomePager({
      total: 20,
      maxPages: 5,
      page: 10,
      url: 'test'
    });

    var pages = pager.getPages();

    expect(pages.length).to.equal(5);

  });

  it('total 20, maxPages 7, page 2', function () {
    var pager = new AwesomePager({
      total: 20,
      maxPages: 7,
      page: 3,
      url: 'test'
    });

    var pages = pager.getPages();

    expect(pages.length).to.equal(7);
    expect(pages[0].page).to.equal(1);
    expect(pages[6].page).to.equal(7);
  });

  it('total 20, maxPages 8, page 19', function () {
    var pager = new AwesomePager({
      total: 20,
      maxPages: 8,
      page: 19,
      url: 'test'
    });

    var pages = pager.getPages();

    expect(pages.length).to.equal(8);
    expect(pages[0].page).to.equal(13);
    expect(pages[7].page).to.equal(20);
  });

  it('total 2, maxPages 5, page 2', function () {
    var pager = new AwesomePager({
      total: 2,
      maxPages: 5,
      page: 2,
      url: 'test'
    });

    var pages = pager.getPages();

    expect(pages.length).to.equal(2);
    expect(pages[0].page).to.equal(1);
    expect(pages[1].page).to.equal(2);
  });
});
