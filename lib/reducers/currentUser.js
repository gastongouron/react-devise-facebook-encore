'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

var currentUser = function currentUser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'LOGGING_IN':
      return {
        isLoggingIn: true
      };
    case 'LOGGED_IN':
      return _extends({
        isLoggedIn: true
      }, (0, _jwtDecode2.default)(action.payload));
    case 'LOG_OUT':
    case 'LOGIN_FAILED':
      return initialState;
    default:
      return state;
  }
};

exports.default = currentUser;