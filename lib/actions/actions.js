'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyUser = exports.editUser = exports.updateUser = exports.resetPassword = exports.requestResetPassword = exports.requestReconfirm = exports.confirm = exports.logout = exports.providerLogin = exports.login = exports.signUp = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _api = require('./api');

var _errors = require('../errors');

var _authTokenStore = require('./authTokenStore');

var _index = require('../config/index');

var ROUTES = {
  login: {
    method: 'POST',
    path: 'sign_in'
  },
  signUp: {
    method: 'POST',
    path: null
  },
  confirm: {
    method: 'GET',
    path: 'confirmation'
  },
  resetPassword: {
    method: 'POST',
    path: 'password'
  },
  changePassword: {
    method: 'PATCH',
    path: 'password'
  },
  editRegistration: {
    method: 'GET',
    path: 'edit'
  },
  updateRegistration: {
    method: 'PATCH',
    path: null
  },
  destroyRegistration: {
    method: 'DELETE',
    path: null
  },
  requestReconfirm: {
    method: 'POST',
    path: 'confirmation'
  }
};

var ensureValid = function ensureValid(response) {
  if (response.status === 422) {
    return response.json().then(function (_ref) {
      var errors = _ref.errors;

      throw new _errors.ValidationError(errors);
    });
  }
  return response;
};

var fetch = function fetch(route, data) {
  var _getConfig = (0, _index.getConfig)(),
      _getConfig$apiHost = _getConfig.apiHost,
      apiHost = _getConfig$apiHost === undefined ? '' : _getConfig$apiHost,
      apiResourceName = _getConfig.apiResourceName;

  // Render uri with any params, and remove those params from the data payload.


  var uri = [apiHost, apiResourceName, route.path].join('/');
  Object.keys(data).forEach(function (param) {
    var regex = new RegExp('/:' + param + '(/|$)', 'g');
    if (uri.match(regex)) {
      uri = uri.replace(regex, '/' + data[param]);
      delete data[param];
    }
  });

  return (0, _api.fetchJSON)(uri, {
    method: route.method,
    data: data
  });
};

var fetchWithUserForm = function fetchWithUserForm(route, data) {
  // eslint-disable-line camelcase
  return fetch(route, {
    user: data
  }).then(ensureValid);
};

var tryLoggedIn = function tryLoggedIn(response, dispatch) {
  var auth = response.headers.get('Authorization');
  if (auth) {
    var _auth$split = auth.split(' '),
        _auth$split2 = _slicedToArray(_auth$split, 2),
        _ = _auth$split2[0],
        authToken = _auth$split2[1]; // eslint-disable-line no-unused-vars


    if (authToken) {
      (0, _authTokenStore.setAuthToken)(authToken);
      dispatch({
        type: 'LOGGED_IN',
        payload: authToken
      });
    }
  }
  return response;
};

var signUp = function signUp(data, dispatch) {
  return fetchWithUserForm(ROUTES.signUp, data).then(function (response) {
    return tryLoggedIn(response, dispatch);
  });
};

var doLogin = function doLogin(data, dispatch, _ref2) {
  var route = _ref2.route,
      fetchFunc = _ref2.fetchFunc;

  dispatch({
    type: 'LOGGING_IN'
  });
  return fetchFunc(route, data).then(function (response) {
    if (response.status === 401) {
      dispatch({
        type: 'LOGIN_FAILED'
      });
      throw new _errors.UnauthorizedError();
    }
    return tryLogin(response, dispatch);
  });
};

var login = function login(data, dispatch) {
  return doLogin(data, dispatch, {
    route: ROUTES.login,
    fetchFunc: fetchWithUserForm
  });
};

var providerLogin = function providerLogin(data, dispatch, providerRoute) {
  return doLogin(data, dispatch, {
    route: providerRoute,
    fetchFunc: fetch
  });
};

var confirm = function confirm(token) {
  return fetch(ROUTES.confirm, {
    confirmation_token: token // eslint-disable-line camelcase
  });
};

var requestReconfirm = function requestReconfirm(data) {
  return fetchWithUserForm(ROUTES.requestReconfirm, data);
};

var requestResetPassword = function requestResetPassword(data) {
  return fetchWithUserForm(ROUTES.resetPassword, data);
};

var resetPassword = function resetPassword(data) {
  return fetchWithUserForm(ROUTES.changePassword, data);
};

var editUser = function editUser() {
  return fetch(ROUTES.editRegistration);
};

var updateUser = function updateUser(data, dispatch) {
  return fetchWithUserForm(ROUTES.updateRegistration, data).then(function (response) {
    if (response.status === 401) {
      throw new _errors.UnauthorizedError();
    }
    return tryLoggedIn(response, dispatch);
  });
};

var logout = function logout(dispatch) {
  (0, _authTokenStore.removeAuthToken)();
  dispatch({
    type: 'LOG_OUT'
  });
};

var destroyUser = function destroyUser(data, dispatch) {
  return fetchWithUserForm(ROUTES.destroyRegistration, data).then(function (response) {
    if (response.status === 401) {
      throw new _errors.UnauthorizedError();
    }
    return logout(dispatch);
  });
};

exports.signUp = signUp;
exports.login = login;
exports.providerLogin = providerLogin;
exports.logout = logout;
exports.confirm = confirm;
exports.requestReconfirm = requestReconfirm;
exports.requestResetPassword = requestResetPassword;
exports.resetPassword = resetPassword;
exports.updateUser = updateUser;
exports.editUser = editUser;
exports.destroyUser = destroyUser;