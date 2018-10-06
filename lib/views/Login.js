'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _errors = require('../errors');

var _reactRouterDom = require('react-router-dom');

var _reduxForm = require('redux-form');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LoginForm = (0, _reduxForm.reduxForm)({
  form: 'login'
})(function (_ref) {
  var handleSubmit = _ref.handleSubmit,
      valid = _ref.valid,
      submitting = _ref.submitting,
      error = _ref.error,
      onSubmit = _ref.onSubmit,
      _ref$auth = _ref.auth,
      messages = _ref$auth.messages,
      _ref$auth$viewPlugin = _ref$auth.viewPlugin,
      renderInput = _ref$auth$viewPlugin.renderInput,
      SubmitButton = _ref$auth$viewPlugin.SubmitButton,
      Form = _ref$auth$viewPlugin.Form,
      FormError = _ref$auth$viewPlugin.FormError;

  var submit = function submit(data) {
    return onSubmit(data).catch(_errors.UnauthorizedError, function () {
      throw new _reduxForm.SubmissionError({
        _error: messages.loginFailed
      });
    });
  };
  return _react2.default.createElement(
    Form,
    { onSubmit: handleSubmit(submit) },
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
      label: 'Password'
    }),
    _react2.default.createElement(SubmitButton, {
      label: submitting ? 'Logging In...' : 'Log In',
      disabled: !valid || submitting
    }),
    error && _react2.default.createElement(
      FormError,
      null,
      error
    )
  );
});

var Login = function Login() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var currentUser = _ref2.currentUser,
      doLogin = _ref2.doLogin,
      _ref2$location = _ref2.location;
  _ref2$location = _ref2$location === undefined ? {} : _ref2$location;
  var _ref2$location$state = _ref2$location.state;
  _ref2$location$state = _ref2$location$state === undefined ? {} : _ref2$location$state;
  var alert = _ref2$location$state.alert,
      _ref2$location$state$ = _ref2$location$state.from;
  _ref2$location$state$ = _ref2$location$state$ === undefined ? {} : _ref2$location$state$;

  var returnTo = _ref2$location$state$.pathname,
      rest = _objectWithoutProperties(_ref2, ['currentUser', 'doLogin', 'location']);

  var submit = function submit(data) {
    return doLogin(data);
  };
  if (currentUser.isLoggedIn) {
    return _react2.default.createElement(_reactRouterDom.Redirect, { to: returnTo || '/' });
  }
  var _rest$auth = rest.auth,
      AuthLinks = _rest$auth.AuthLinks,
      _rest$auth$viewPlugin = _rest$auth.viewPlugin,
      View = _rest$auth$viewPlugin.View,
      Heading = _rest$auth$viewPlugin.Heading,
      Alert = _rest$auth$viewPlugin.Alert;

  return _react2.default.createElement(
    View,
    null,
    _react2.default.createElement(
      Heading,
      null,
      'Login'
    ),
    alert && _react2.default.createElement(
      Alert,
      null,
      alert
    ),
    _react2.default.createElement(LoginForm, _extends({ onSubmit: submit }, rest)),
    _react2.default.createElement(AuthLinks, null)
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doLogin: function doLogin(data) {
      return (0, _actions.login)(data, dispatch);
    }
  };
};

var LoginContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);

exports.Login = Login;
exports.default = LoginContainer;