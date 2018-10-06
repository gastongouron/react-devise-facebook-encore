'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthLinksComponent = exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../config/index');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthLinksComponent = function AuthLinksComponent(_ref) {
  var currentUser = _ref.currentUser,
      location = _ref.location,
      resourceName = _ref.resourceName,
      AuthLinksList = _ref.AuthLinksList,
      AuthLinksListItem = _ref.AuthLinksListItem;

  if (currentUser.isLoggingIn) {
    return _react2.default.createElement(
      'div',
      null,
      'Logging in...'
    );
  }
  if (currentUser.isLoggedIn) {
    return null;
  }

  var _getConfig = (0, _index.getConfig)(),
      routes = _getConfig.routes;

  var linkableRouteNames = Object.keys(routes).filter(function (routeName) {
    return Boolean(routes[routeName].linkText);
  });
  return _react2.default.createElement(
    AuthLinksList,
    null,
    linkableRouteNames.map(function (routeName) {
      var route = routes[routeName];
      var path = '/' + resourceName + route.path;
      return _react2.default.createElement(AuthLinksListItem, {
        key: path,
        path: path,
        route: route,
        location: location
      });
    })
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
};

var AuthLinks = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps)(AuthLinksComponent));

exports.default = AuthLinks;
exports.AuthLinksComponent = AuthLinksComponent;