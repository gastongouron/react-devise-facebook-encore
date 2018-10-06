'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.User = exports.UserForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _actions = require('../actions');

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: We are using updateNeedsConfirmationMessage because email is the only field on this form, so we're assuming the email was updated. Need a better way to handle this.

var UserForm = (0, _reduxForm.reduxForm)({
  form: 'editUser'
})(function (_ref) {
  var error = _ref.error,
      dirty = _ref.dirty,
      valid = _ref.valid,
      submitting = _ref.submitting,
      submitSucceeded = _ref.submitSucceeded,
      handleSubmit = _ref.handleSubmit,
      onSubmit = _ref.onSubmit,
      _ref$auth = _ref.auth,
      updateNeedsConfirmationMessage = _ref$auth.messages.updateNeedsConfirmation,
      _ref$auth$viewPlugin = _ref$auth.viewPlugin,
      renderInput = _ref$auth$viewPlugin.renderInput,
      SubmitButton = _ref$auth$viewPlugin.SubmitButton,
      Form = _ref$auth$viewPlugin.Form,
      FormError = _ref$auth$viewPlugin.FormError,
      FormSuccess = _ref$auth$viewPlugin.FormSuccess;

  return _react2.default.createElement(
    Form,
    { onSubmit: handleSubmit((0, _actions.formAction)(onSubmit)) },
    _react2.default.createElement(_reduxForm.Field, {
      name: 'email',
      component: renderInput,
      label: 'Email',
      validate: [_validation.required, _validation.email]
    }),
    _react2.default.createElement(SubmitButton, {
      label: submitting ? 'Updating...' : 'Update',
      disabled: !dirty || !valid || submitting
    }),
    error && _react2.default.createElement(
      FormError,
      null,
      error
    ),
    submitSucceeded && _react2.default.createElement(
      FormSuccess,
      null,
      updateNeedsConfirmationMessage
    )
  );
});

var User = function (_Component) {
  _inherits(User, _Component);

  function User() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(User, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      return (0, _actions.editUser)().then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({
          initialValues: data
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          doUpdateUser = _props.doUpdateUser,
          rest = _objectWithoutProperties(_props, ['doUpdateUser']);

      var _rest$auth$viewPlugin = rest.auth.viewPlugin,
          View = _rest$auth$viewPlugin.View,
          Heading = _rest$auth$viewPlugin.Heading;

      return _react2.default.createElement(
        View,
        null,
        _react2.default.createElement(
          Heading,
          null,
          'User Profile'
        ),
        _react2.default.createElement(UserForm, _extends({
          initialValues: this.state.initialValues,
          onSubmit: doUpdateUser
        }, rest))
      );
    }
  }]);

  return User;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doUpdateUser: function doUpdateUser(form) {
      return (0, _actions.updateUser)(form, dispatch);
    }
  };
};

var UserContainer = (0, _reactRedux.connect)(null, mapDispatchToProps)(User);

exports.UserForm = UserForm;
exports.User = User;
exports.default = UserContainer;