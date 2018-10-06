'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./config/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withAuth = function withAuth(WrappedComponent) {
  var Authorized = function Authorized(props) {
    var config = (0, _index.getConfig)();
    return _react2.default.createElement(WrappedComponent, _extends({ auth: config }, props));
  };
  return Authorized;
};

exports.default = withAuth;