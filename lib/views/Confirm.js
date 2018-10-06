'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Confirm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _actions = require('../actions');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Confirm = function (_Component) {
  _inherits(Confirm, _Component);

  function Confirm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Confirm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      confirming: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Confirm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _url$parse = _url2.default.parse(this.props.location.search, true),
          query = _url$parse.query;

      return this.props.doConfirm(query.confirmation_token).then(function (response) {
        var newState = {
          confirming: false
        };
        if (response.ok) {
          _this2.setState(newState);
        } else if (response.status === 422) {
          response.json().then(function (errors) {
            var errorMessages = Object.keys(errors).reduce(function (result, field) {
              result.push(errors[field].map(function (predicate) {
                return field + ' ' + predicate;
              }));
              return result;
            }, []);
            _this2.setState(_extends({}, newState, {
              errors: errorMessages
            }));
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.confirming) {
        return _react2.default.createElement(
          'div',
          null,
          'Confirming...'
        );
      }
      var _props$auth = this.props.auth,
          _props$auth$messages = _props$auth.messages,
          confirmSucceededMessage = _props$auth$messages.confirmSucceeded,
          confirmContinueLinkText = _props$auth$messages.confirmContinueLinkText,
          confirmFailedMessage = _props$auth$messages.confirmFailed,
          _props$auth$viewPlugi = _props$auth.viewPlugin,
          View = _props$auth$viewPlugi.View,
          Heading = _props$auth$viewPlugi.Heading,
          FormError = _props$auth$viewPlugi.FormError;

      if (this.state.errors) {
        var AuthLinks = this.props.auth.AuthLinks;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            FormError,
            null,
            _react2.default.createElement(
              'p',
              null,
              confirmFailedMessage
            ),
            _react2.default.createElement(
              'ul',
              null,
              this.state.errors.map(function (error) {
                return _react2.default.createElement(
                  'li',
                  { key: error },
                  error
                );
              })
            )
          ),
          _react2.default.createElement(AuthLinks, null)
        );
      }
      return _react2.default.createElement(
        View,
        null,
        _react2.default.createElement(
          Heading,
          null,
          'Confirmed'
        ),
        _react2.default.createElement(
          'p',
          null,
          confirmSucceededMessage
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          confirmContinueLinkText
        )
      );
    }
  }]);

  return Confirm;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doConfirm: function doConfirm(token) {
      return (0, _actions.confirm)(token, dispatch);
    },
    doLogout: function doLogout() {
      return (0, _actions.logout)(dispatch);
    }
  };
};

var ConfirmContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Confirm);

exports.Confirm = Confirm;
exports.default = ConfirmContainer;