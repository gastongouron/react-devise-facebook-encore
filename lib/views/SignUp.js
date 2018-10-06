'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SignUp = exports.SignUpForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _reactRouterDom = require('react-router-dom');

var _actions = require('../actions');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SignUpForm = (0, _reduxForm.reduxForm)({
  form: 'signUp'
})(function (_ref) {
  var error = _ref.error,
      valid = _ref.valid,
      submitting = _ref.submitting,
      submitSucceeded = _ref.submitSucceeded,
      handleSubmit = _ref.handleSubmit,
      onSubmit = _ref.onSubmit,
      _ref$auth = _ref.auth,
      signUpSucceededMessage = _ref$auth.messages.signUpSucceeded,
      _ref$auth$viewPlugin = _ref$auth.viewPlugin,
      renderInput = _ref$auth$viewPlugin.renderInput,
      SubmitButton = _ref$auth$viewPlugin.SubmitButton,
      Form = _ref$auth$viewPlugin.Form,
      FormError = _ref$auth$viewPlugin.FormError;

  if (submitSucceeded) {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: {
        pathname: '/',
        state: {
          notice: signUpSucceededMessage
        } }
    });
  }
  return _react2.default.createElement(
    Form,
    { onSubmit: handleSubmit((0, _actions.formAction)(onSubmit)) },
    _react2.default.createElement(_reduxForm.Field, {
      name: 'email',
      component: renderInput,
      label: 'Email',
      validate: [_validation.required, _validation.email]
    }),
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
      label: submitting ? 'Signing Up...' : 'Sign Up',
      disabled: !valid || submitting
    }),
    error && _react2.default.createElement(
      FormError,
      null,
      error
    )
  );
});

var SignUp = function SignUp(_ref2) {
  var doSignUp = _ref2.doSignUp,
      rest = _objectWithoutProperties(_ref2, ['doSignUp']);

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
      'Sign Up'
    ),
    _react2.default.createElement(SignUpForm, _extends({ onSubmit: doSignUp }, rest)),
    _react2.default.createElement(AuthLinks, null)
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doSignUp: function doSignUp(form) {
      return (0, _actions.signUp)(form, dispatch);
    }
  };
};

var SignUpContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(SignUp);

exports.SignUpForm = SignUpForm;
exports.SignUp = SignUp;
exports.default = SignUpContainer;