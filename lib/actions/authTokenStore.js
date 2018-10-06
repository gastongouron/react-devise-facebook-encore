'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEY = 'authToken';

var setAuthToken = function setAuthToken(authToken) {
  return localStorage.setItem(KEY, authToken);
};

var removeAuthToken = function removeAuthToken() {
  return localStorage.removeItem(KEY);
};

var getAuthToken = function getAuthToken() {
  return localStorage.getItem(KEY);
};

var hasAuthToken = function hasAuthToken() {
  return Boolean(getAuthToken());
};

var getBearerToken = function getBearerToken() {
  var authToken = getAuthToken();
  if (authToken) {
    return 'Bearer ' + authToken;
  }
};

var addAuthorizationHeaderToRequest = function addAuthorizationHeaderToRequest(request, next) {
  var bearerToken = getBearerToken();
  if (bearerToken) {
    request.options.headers = request.options.headers || {};
    request.options.headers.authorization = bearerToken;
  }
  if (next) {
    next();
  }
};

exports.setAuthToken = setAuthToken;
exports.removeAuthToken = removeAuthToken;
exports.getAuthToken = getAuthToken;
exports.hasAuthToken = hasAuthToken;
exports.getBearerToken = getBearerToken;
exports.addAuthorizationHeaderToRequest = addAuthorizationHeaderToRequest;