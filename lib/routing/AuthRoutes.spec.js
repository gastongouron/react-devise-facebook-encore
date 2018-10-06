'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _authRoutes = require('./authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _config = require('../config');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyLogin = function MyLogin() {
  return _react2.default.createElement('div', { className: 'my-login' });
};

describe('authRoutes', function () {
  var auth = { clientResourceName: 'users' };
  it('should return a route to users', function () {
    (0, _config.initReactDevise)(auth);
    var component = (0, _enzyme.shallow)(_react2.default.createElement(
      'div',
      null,
      (0, _authRoutes2.default)()
    ));
    var routes = component.find(_reactRouter.Route);
    expect(routes).toHaveLength(1);
    expect(routes.prop('path')).toEqual('/' + auth.clientResourceName);
  });
});

describe('<AuthRoutesComponent />', function () {
  var auth = { clientResourceName: 'users' };
  it('should render 6 routes', function () {
    (0, _config.initReactDevise)(auth);
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_authRoutes.AuthRoutesComponent, null));
    expect(component.find(_reactRouter.Switch)).toHaveLength(1);
    expect(component.find(_reactRouter.Route)).toHaveLength(7);
  });
  it('should render with custom views', function () {
    (0, _config.initReactDevise)(_extends({}, auth, {
      routes: {
        login: {
          path: '/foo',
          component: MyLogin
        }
      }
    }));
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_authRoutes.AuthRoutesComponent, null));
    expect(component.find(_reactRouter.Route)).toHaveLength(7);
    var tree = (0, _enzymeToJson.shallowToJson)(component);
    expect(tree.children.some(function (n) {
      return n.props.path === '/users/foo';
    })).toBeTruthy();

    // TODO: This does not test that custom view component is being used.
    // expect(component.find('div.my-login')).toHaveLength(1);
  });
});