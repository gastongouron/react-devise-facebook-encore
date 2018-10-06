'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPresent = function isPresent(value) {
  return value !== undefined && value !== null;
};

var required = exports.required = function required(value) {
  return isPresent(value) ? undefined : 'Required';
};
var email = exports.email = function email(value) {
  return isPresent(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
};