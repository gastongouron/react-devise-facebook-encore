'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResetPassword = exports.ResetPasswordForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _reactRouterDom = require('react-router-dom');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _actions = require('../actions');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ResetPasswordForm = (0, _reduxForm.reduxForm)({
  form: 'requestResetPassword'
})(function (_ref) {
  var handleSubmit = _ref.handleSubmit,
      valid = _ref.valid,
      submitting = _ref.submitting,
      error = _ref.error,
      onSubmit = _ref.onSubmit,
      query = _ref.query,
      submitSucceeded = _ref.submitSucceeded,
      _ref$auth = _ref.auth,
      resourceName = _ref$auth.resourceName,
      messages = _ref$auth.messages,
      _ref$auth$viewPlugin = _ref$auth.viewPlugin,
      renderInput = _ref$auth$viewPlugin.renderInput,
      SubmitButton = _ref$auth$viewPlugin.SubmitButton,
      Form = _ref$auth$viewPlugin.Form,
      FormError = _ref$auth$viewPlugin.FormError;

  var submitWithQuery = function submitWithQuery(form) {
    return onSubmit(_extends({}, form, query));
  };
  if (submitSucceeded) {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' + resourceName + '/login' });
  }
  return _react2.default.createElement(
    Form,
    { onSubmit: handleSubmit((0, _actions.formAction)(submitWithQuery)) },
    _react2.default.createElement(_reduxForm.Field, {
      name: 'password',
      type: 'password',
      component: renderInput,
      label: 'Password',
      validate: _validation.required
    }),
    _react2.default.createElement(_reduxForm.Field, {
      name: 'password_confirmation',
      type: 'password',
      component: renderInput,
      label: 'Password Again',
      validate: _validation.required
    }),
    _react2.default.createElement(SubmitButton, {
      label: submitting ? 'Resetting Password...' : 'Reset Password',
      disabled: !valid || submitting
    }),
    error && _react2.default.createElement(
      FormError,
      null,
      error
    )
  );
});

var ResetPassword = function ResetPassword(_ref2) {
  var doResetPassword = _ref2.doResetPassword,
      location = _ref2.location,
      rest = _objectWithoutProperties(_ref2, ['doResetPassword', 'location']);

  var _url$parse = _url2.default.parse(location.search, true),
      query = _url$parse.query;

  var _rest$auth = rest.auth,
      AuthLinks = _rest$auth.AuthLinks,
      _rest$auth$viewPlugin = _rest$auth.viewPlugin,
      View = _rest$auth$viewPlugin.View,
      Heading = _rest$auth$viewPlugin.Heading;

  return _react2.default.createElement(
    View,
    null,
    _react2.default.createElement(
      Heading,
      null,
      'Reset Password'
    ),
    _react2.default.createElement(ResetPasswordForm, _extends({ onSubmit: doResetPassword, query: query }, rest)),
    _react2.default.createElement(AuthLinks, null)
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doResetPassword: function doResetPassword(form) {
      return (0, _actions.resetPassword)(form, dispatch);
    }
  };
};

var ResetPasswordContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(ResetPassword);

exports.ResetPasswordForm = ResetPasswordForm;
exports.ResetPassword = ResetPassword;
exports.default = ResetPasswordContainer;