'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _views = require('../views');

exports.default = {
  login: {
    path: '/login',
    component: _views.Login,
    linkText: 'Log In'
  },
  signup: {
    path: '/sign-up',
    component: _views.SignUp,
    linkText: 'Sign Up'
  },
  requestReconfirm: {
    path: '/confirmation/new',
    component: _views.RequestReconfirm,
    linkText: 'Resend Confirmation Instructions'
  },
  confirm: {
    path: '/confirmation',
    component: _views.Confirm
  },
  requestResetPassword: {
    path: '/password/new',
    component: _views.RequestResetPassword,
    linkText: 'Reset Your Password'
  },
  resetPassword: {
    path: '/password/edit',
    component: _views.ResetPassword
  },
  editUser: {
    path: null,
    component: _views.User,
    requireAuth: true
  }
};