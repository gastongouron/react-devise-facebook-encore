'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RequestResetPassword = exports.RequestResetPasswordForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _actions = require('../actions');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RequestResetPasswordForm = (0, _reduxForm.reduxForm)({
  form: 'requestResetPassword'
})(function (_ref) {
  var handleSubmit = _ref.handleSubmit,
      valid = _ref.valid,
      submitting = _ref.submitting,
      submitSucceeded = _ref.submitSucceeded,
      error = _ref.error,
      onSubmit = _ref.onSubmit,
      _ref$auth = _ref.auth,
      messages = _ref$auth.messages,
      _ref$auth$viewPlugin = _ref$auth.viewPlugin,
      renderInput = _ref$auth$viewPlugin.renderInput,
      SubmitButton = _ref$auth$viewPlugin.SubmitButton,
      Form = _ref$auth$viewPlugin.Form,
      FormError = _ref$auth$viewPlugin.FormError;

  if (submitSucceeded) {
    return _react2.default.createElement(
      'p',
      null,
      messages.requestResetPasswordSucceeded
    );
  }
  return _react2.default.createElement(
    Form,
    { onSubmit: handleSubmit((0, _actions.formAction)(onSubmit)) },
    _react2.default.createElement(_reduxForm.Field, {
      name: 'email',
      label: 'Email',
      component: renderInput,
      validate: [_validation.required, _validation.email]
    }),
    _react2.default.createElement(SubmitButton, {
      label: submitting ? 'Requesting Password Reset...' : 'Request Password Reset',
      disabled: !valid || submitting
    }),
    error && _react2.default.createElement(
      FormError,
      null,
      error
    )
  );
});

var RequestResetPassword = function RequestResetPassword(_ref2) {
  var doRequestResetPassword = _ref2.doRequestResetPassword,
      rest = _objectWithoutProperties(_ref2, ['doRequestResetPassword']);

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
      'Request Password Reset'
    ),
    _react2.default.createElement(RequestResetPasswordForm, _extends({ onSubmit: doRequestResetPassword }, rest)),
    _react2.default.createElement(AuthLinks, null)
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doRequestResetPassword: function doRequestResetPassword(data) {
      return (0, _actions.requestResetPassword)(data, dispatch);
    }
  };
};

var RequestResetPasswordContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(RequestResetPassword);

exports.RequestResetPasswordForm = RequestResetPasswordForm;
exports.RequestResetPassword = RequestResetPassword;
exports.default = RequestResetPasswordContainer;