'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RequestReconfirm = exports.RequestReconfirmForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _actions = require('../actions');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RequestReconfirmForm = (0, _reduxForm.reduxForm)({
  form: 'requestReconfirmPassword'
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
      FormError = _ref$auth$viewPlugin.FormError,
      Form = _ref$auth$viewPlugin.Form;

  if (submitSucceeded) {
    return _react2.default.createElement(
      'p',
      null,
      messages.reqeustReconfirmSucceeded
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
      label: submitting ? 'Resending Confirmation Instructions...' : 'Resend Confirmation Instructions',
      disabled: !valid || submitting
    }),
    error && _react2.default.createElement(
      FormError,
      null,
      error
    )
  );
});

var RequestReconfirm = function RequestReconfirm(_ref2) {
  var doRequestReconfirm = _ref2.doRequestReconfirm,
      rest = _objectWithoutProperties(_ref2, ['doRequestReconfirm']);

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
      'Resend Confirmation Instructions'
    ),
    _react2.default.createElement(RequestReconfirmForm, _extends({ onSubmit: doRequestReconfirm }, rest)),
    _react2.default.createElement(AuthLinks, null)
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doRequestReconfirm: function doRequestReconfirm(data) {
      return (0, _actions.requestReconfirm)(data, dispatch);
    }
  };
};

var RequestReconfirmContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(RequestReconfirm);

exports.RequestReconfirmForm = RequestReconfirmForm;
exports.RequestReconfirm = RequestReconfirm;
exports.default = RequestReconfirmContainer;