'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactRouter = require('react-router');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reactRedux = require('react-redux');

var _authRoutes = require('./authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _PrivateRoute = require('./PrivateRoute');

var _PrivateRoute2 = _interopRequireDefault(_PrivateRoute);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Private = function Private() {
  return _react2.default.createElement('div', { className: 'my-private-component' });
};

var Unauthorized = function Unauthorized() {
  return _react2.default.createElement('div', { className: 'unauthorized' });
};

var createMockStore = (0, _reduxMockStore2.default)();

var store = void 0,
    component = void 0;

var App = function App(_ref) {
  var store = _ref.store,
      authorize = _ref.authorize;
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouter.MemoryRouter,
      { initialIndex: 0, initialEntries: ['/'] },
      _react2.default.createElement(
        _reactRouter.Switch,
        null,
        _react2.default.createElement(_PrivateRoute2.default, { exact: true, path: '/', component: Private, authorize: authorize }),
        _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/unauthorized', component: Unauthorized }),
        (0, _authRoutes2.default)()
      )
    )
  );
};

var expectPrivate = function expectPrivate(component) {
  expect(component.find('div.my-private-component')).toHaveLength(1);
};

var expectLogin = function expectLogin(component) {
  expect(component.find('.auth-form')).toHaveLength(1);
  expect(component.find('h1').text()).toBe('Login');
};

var expectUnauthorized = function expectUnauthorized(component) {
  expect(component.find('div.unauthorized')).toHaveLength(1);
};

beforeAll(function () {
  (0, _config.initReactDevise)();
});

describe('PrivateRoute', function () {
  it('should render the route when current user is logged in', function () {
    store = createMockStore({
      currentUser: {
        isLoggedIn: true
      }
    });
    component = (0, _enzyme.mount)(_react2.default.createElement(App, { store: store }));
    expectPrivate(component);
  });
  it('should redirect to login when current user is NOT logged in', function () {
    store = createMockStore({
      currentUser: {
        isLoggedIn: false
      }
    });
    component = (0, _enzyme.mount)(_react2.default.createElement(App, { store: store }));
    expectLogin(component);
  });
  it('should render the route when passes custom authorize', function () {
    store = createMockStore({
      currentUser: {
        isLoggedIn: false
      }
    });
    var customAuthorize = function customAuthorize(currentUser) {
      return {
        authorized: true
      };
    };
    component = (0, _enzyme.mount)(_react2.default.createElement(App, { store: store, authorize: customAuthorize }));
    expectPrivate(component);
  });
  it('should NOT render the route when fails custom authorize', function () {
    store = createMockStore({
      currentUser: {
        isLoggedIn: true
      }
    });
    var customAuthorize = function customAuthorize(currentUser) {
      return {
        authorized: false,
        redirectTo: {
          pathname: '/unauthorized'
        }
      };
    };
    component = (0, _enzyme.mount)(_react2.default.createElement(App, { store: store, authorize: customAuthorize }));
    expectUnauthorized(component);
  });
});