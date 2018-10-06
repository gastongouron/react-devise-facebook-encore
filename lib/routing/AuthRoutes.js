'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRoutesComponent = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _index = require('../config/index');

var _requireAuth = require('./requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultNotFoundComponent = function defaultNotFoundComponent() {
  return _react2.default.createElement(
    'div',
    null,
    'Not Found'
  );
};

var AuthRoutesComponent = function AuthRoutesComponent() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$wrapper = _ref.wrapper,
      Wrapper = _ref$wrapper === undefined ? _reactRouter.Route : _ref$wrapper,
      _ref$notFoundComponen = _ref.notFoundComponent,
      NotFoundComponent = _ref$notFoundComponen === undefined ? defaultNotFoundComponent : _ref$notFoundComponen;

  var config = (0, _index.getConfig)();
  var clientResourceName = config.clientResourceName,
      routes = config.routes;

  return _react2.default.createElement(
    _reactRouter.Switch,
    null,
    Object.keys(routes).map(function (routeName) {
      var route = routes[routeName];
      var fullPath = '/' + clientResourceName + (route.path ? route.path : '');
      var component = function component(props) {
        return _react2.default.createElement(route.component, _extends({
          auth: config
        }, props));
      };
      var routeProps = {
        key: fullPath,
        exact: true,
        path: fullPath,
        component: component
      };
      if (route.requireAuth) {
        var ResolvedComponent = (0, _requireAuth2.default)(Wrapper, routeProps);
        return _react2.default.createElement(ResolvedComponent, routeProps);
      }
      return _react2.default.createElement(Wrapper, routeProps);
    }),
    _react2.default.createElement(NotFoundComponent, null)
  );
};

var instance = void 0;

var authRoutes = function authRoutes() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      wrapper = _ref2.wrapper,
      notFoundComponent = _ref2.notFoundComponent;

  if (!instance) {
    var chooseRoute = function chooseRoute() {
      return _react2.default.createElement(AuthRoutesComponent, {
        wrapper: wrapper,
        notFoundComponent: notFoundComponent
      });
    };
    instance = chooseRoute;
  }

  var _getConfig = (0, _index.getConfig)(),
      clientResourceName = _getConfig.clientResourceName;

  return _react2.default.createElement(_reactRouter.Route, { path: '/' + clientResourceName, component: instance });
};

exports.default = authRoutes;
exports.AuthRoutesComponent = AuthRoutesComponent;