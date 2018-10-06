'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _requireAuth = require('./requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PrivateRoute = function PrivateRoute(_ref) {
  var Component = _ref.component,
      Layout = _ref.layout,
      authorize = _ref.authorize,
      more = _objectWithoutProperties(_ref, ['component', 'layout', 'authorize']);

  return _react2.default.createElement(_reactRouter.Route, _extends({}, more, { render: function render(props) {
      var ResolvedComponent = (0, _requireAuth2.default)(Component, _extends({ authorize: authorize }, props));
      var element = _react2.default.createElement(ResolvedComponent, null);
      return Layout ? _react2.default.createElement(
        Layout,
        props,
        element
      ) : element;
    } }));
};

exports.default = PrivateRoute;