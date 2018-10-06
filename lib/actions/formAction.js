'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxForm = require('redux-form');

var _errors = require('../errors');

var formAction = function formAction(action) {
  return function (data) {
    return action(data).catch(_errors.ValidationError, function (err) {
      // TODO: This will show only the first message per attribute.
      throw new _reduxForm.SubmissionError(err.errors);
    });
  };
};

exports.default = formAction;