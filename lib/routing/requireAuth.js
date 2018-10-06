'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _index = require('../config/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var requireAuth = function requireAuth(WrappedComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var authorize = _ref.authorize,
      props = _objectWithoutProperties(_ref, ['authorize']);

  var Authorizer = function Authorizer(_ref2) {
    var currentUser = _ref2.currentUser,
        location = _ref2.location;

    var _ref3 = authorize ? authorize(currentUser) : {
      authorized: currentUser.isLoggedIn
    },
        authorized = _ref3.authorized,
        redirectTo = _ref3.redirectTo;

    if (authorized) {
      return _react2.default.createElement(WrappedComponent, props);
    }

    var _getConfig = (0, _index.getConfig)(),
        clientResourceName = _getConfig.clientResourceName,
        login = _getConfig.routes.login,
        mustLoginMessage = _getConfig.messages.mustLoginMessage;

    var to = redirectTo || {
      pathname: '/' + clientResourceName + login.path,
      state: {
        alert: mustLoginMessage,
        from: location
      }
    };
    return _react2.default.createElement(_reactRouter.Redirect, { to: to });
  };
  Authorizer = (0, _reactRouter.withRouter)(Authorizer);
  var mapStateToProps = function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
  };
  return (0, _reactRedux.connect)(mapStateToProps)(Authorizer);
};

exports.default = requireAuth;