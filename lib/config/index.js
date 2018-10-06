'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = exports.initReactDevise = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultMessages = require('./defaultMessages');

var _defaultMessages2 = _interopRequireDefault(_defaultMessages);

var _defaultRoutes = require('./defaultRoutes');

var _defaultRoutes2 = _interopRequireDefault(_defaultRoutes);

var _viewPluginPlain = require('./viewPluginPlain');

var _viewPluginPlain2 = _interopRequireDefault(_viewPluginPlain);

var _views = require('../views');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = void 0;

var Config = function Config() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$clientResourceNa = _ref.clientResourceName,
      clientResourceName = _ref$clientResourceNa === undefined ? 'users' : _ref$clientResourceNa,
      _ref$apiResourceName = _ref.apiResourceName,
      apiResourceName = _ref$apiResourceName === undefined ? 'auth' : _ref$apiResourceName,
      apiHost = _ref.apiHost,
      _ref$viewPlugins = _ref.viewPlugins,
      viewPlugins = _ref$viewPlugins === undefined ? [] : _ref$viewPlugins,
      _ref$defaultViewPlugi = _ref.defaultViewPluginSettings,
      defaultViewPluginSettings = _ref$defaultViewPlugi === undefined ? {} : _ref$defaultViewPlugi,
      _ref$messages = _ref.messages,
      messages = _ref$messages === undefined ? {} : _ref$messages,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? {} : _ref$routes;

  _classCallCheck(this, Config);

  var defaultViewPlugin = _viewPluginPlain2.default.plugin(defaultViewPluginSettings);
  this.viewPlugin = Object.assign.apply(Object, [{}, defaultViewPlugin].concat(_toConsumableArray(viewPlugins)));
  var AuthLinksComponent = function AuthLinksComponent(props) {
    return _react2.default.createElement(_views.AuthLinks, _extends({
      resourceName: clientResourceName
    }, _this.viewPlugin, props));
  };
  this.apiHost = apiHost;
  this.apiResourceName = apiResourceName;
  this.clientResourceName = clientResourceName;
  this.messages = Object.assign({}, _defaultMessages2.default, messages);
  this.AuthLinks = AuthLinksComponent;
  this.routes = Object.keys(_defaultRoutes2.default).reduce(function (result, routeName) {
    result[routeName] = Object.assign(_defaultRoutes2.default[routeName], routes[routeName] || {});
    return result;
  }, {});
};

var getConfig = function getConfig() {
  return instance;
};

var init = function init(args) {
  instance = new Config(args);
  return getConfig;
};

exports.initReactDevise = init;
exports.getConfig = getConfig;