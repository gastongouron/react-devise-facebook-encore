'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJSON = exports.getJSON = exports.fetchJSON = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _authTokenStore = require('./authTokenStore');

require('fetch-bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doFetch = function doFetch(url, args) {
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var bearerToken = (0, _authTokenStore.getBearerToken)();
  if (bearerToken) {
    headers.authorization = bearerToken;
  }
  return fetch(url, _extends({}, args, {
    headers: headers
  }));
};

var fetchWithQuery = function fetchWithQuery(url, _ref) {
  var method = _ref.method,
      data = _ref.data;

  var query = _url2.default.format({ query: data });
  return doFetch('' + url + query, {
    method: method
  });
};

var fetchWithPayload = function fetchWithPayload(url, _ref2) {
  var method = _ref2.method,
      data = _ref2.data;

  return doFetch(url, {
    method: method,
    body: JSON.stringify(data)
  });
};

var fetchJSON = function fetchJSON(url, args) {
  switch (args.method.toUpperCase()) {
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return fetchWithPayload(url, args);
    case 'GET':
    case 'DELETE':
    default:
      return fetchWithQuery(url, args);
  }
};

var getJSON = function getJSON(url, args) {
  return fetchJSON(url, _extends({}, args, {
    method: 'GET'
  }));
};

var postJSON = function postJSON(url, args) {
  return fetchJSON(url, _extends({}, args, {
    method: 'POST'
  }));
};

exports.fetchJSON = fetchJSON;
exports.getJSON = getJSON;
exports.postJSON = postJSON;