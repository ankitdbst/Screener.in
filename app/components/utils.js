'use strict';
/* global process */


function setTitle(title) {
  var fullTitle = title.trim() + ' - Screener.in';
  window.document.title = fullTitle;
  var location = window.location.pathname;
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  if(!window.ga)
    return;
  window.ga('set', {
    page: location,
    title: fullTitle
  });
  window.ga('send', 'pageview');
}

function scrollToTop() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function toSlug(text) {
  return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

function toMonthYear(dt) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "June", "July",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var date = new Date(dt);
  var monthIndex = monthNames[date.getMonth()];
  var year = date.getFullYear();
  return monthIndex + ' ' + year;
}

function toLocalNumber(value) {
  var options = {minimumFractionDigits: 2};
  return parseFloat(value).toLocaleString('en-IN', options);
}

function withUnit(value, unit) {
  if(value === null || value === undefined)
    return '--';
  value = toLocalNumber(value);
  if(unit == 'Rs.Cr.' || unit === undefined)
    return '₹ ' + value + ' Cr.';
  if(unit == 'Rs.')
    return '₹ ' + value;
  if(unit == '%')
    return value + '%';
  return value;
}

function getPageNumbers(currentPage, totalPages) {
  var pages = [];
  for (var i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i);
    }
  }
  if(pages.indexOf(2) == -1 && totalPages > 2)
    pages.unshift("…");
  if(pages.indexOf(1) == -1)
    pages.unshift(1);
  if(pages.indexOf(totalPages - 1) == -1 && totalPages > 2)
    pages.push("…");
  if(pages.indexOf(totalPages) == -1)
    pages.push(totalPages);
  return pages;
}

function getFormData(form) {
  var data = {};
  for (var i = 0; i < form.elements.length; i++) {
    var elem = form.elements[i];
    if (elem.type == 'checkbox' && !elem.checked)
      data[elem.name] = false;
    else
      data[elem.name] = elem.value;
  }
  return data;
}

function fixFirstKColumns(table, k)
{
  //Make a clone of our table
  var tableClone = table.cloneNode(true)
  table.parentNode.insertBefore(tableClone, table)
  tableClone.className += ' fixed-column'

  //Remove everything except for first column
  var nodes = tableClone.querySelectorAll(['th:not(:nth-child(-n+'+k+'))', 'td:not(:nth-child(-n+'+k+')'])
  nodes.forEach((el) => {
    el.remove()
  })

  var trs = table.querySelectorAll('tr')
  //Match the height of the rows to that of the original table's
  tableClone.querySelectorAll('tr').forEach((elem, i) => {
    elem.style.height = trs[i].offsetHeight + 'px'
  })
}

exports.setTitle = setTitle;
exports.scrollToTop = scrollToTop;
exports.toSlug = toSlug;
exports.toLocalNumber = toLocalNumber;
exports.toMonthYear = toMonthYear;
exports.withUnit = withUnit;
exports.getPageNumbers = getPageNumbers;
exports.getFormData = getFormData;
exports.fixFirstKColumns = fixFirstKColumns;
