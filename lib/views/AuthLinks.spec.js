'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _AuthLinks = require('./AuthLinks');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<AuthLinksComponent />', function () {
  var resourceName = 'users';
  var currentUser = { isLoggedIn: false };
  var AuthLinksList = function AuthLinksList(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
      'ul',
      null,
      children
    );
  };
  var AuthLinksListItem = function AuthLinksListItem(_ref2) {
    var path = _ref2.path,
        linkText = _ref2.route.linkText,
        pathname = _ref2.location.pathname;

    return _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'a',
        { href: path },
        linkText
      )
    );
  };
  var location = { pathname: 'no-match' };

  it('should render list with 4 links', function () {
    (0, _config.initReactDevise)();
    var component = (0, _enzyme.mount)(_react2.default.createElement(_AuthLinks.AuthLinksComponent, {
      resourceName: resourceName,
      AuthLinksList: AuthLinksList,
      AuthLinksListItem: AuthLinksListItem,
      currentUser: currentUser,
      location: location
    }));
    var tree = (0, _enzymeToJson.mountToJson)(component);
    var list = tree.children[0].children[0];
    expect(list.type).toEqual('ul');
    [['/users/login', 'Log In'], ['/users/sign-up', 'Sign Up'], ['/users/confirmation/new', 'Resend Confirmation Instructions'], ['/users/password/new', 'Reset Your Password']].forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          path = _ref4[0],
          text = _ref4[1];

      expect(list.children.some(function (listItem) {
        return listItem.children[0].type === 'li' && listItem.children[0].children[0].type === 'a' && listItem.children[0].children[0].props.href === path && listItem.children[0].children[0].children[0] === text;
      })).toBeTruthy();
    });
  });
  it('should render link for custom route', function () {
    (0, _config.initReactDevise)({
      routes: {
        login: {
          path: '/foo',
          linkText: 'Foo Bar'
        }
      }
    });
    var component = (0, _enzyme.mount)(_react2.default.createElement(_AuthLinks.AuthLinksComponent, {
      resourceName: resourceName,
      AuthLinksList: AuthLinksList,
      AuthLinksListItem: AuthLinksListItem,
      currentUser: currentUser,
      location: location
    }));
    var tree = (0, _enzymeToJson.mountToJson)(component);
    var list = tree.children[0].children[0];
    expect(list.children.some(function (listItem) {
      return listItem.children[0].children[0].props.href === '/users/foo' && listItem.children[0].children[0].children[0] === 'Foo Bar';
    })).toBeTruthy();
  });
});