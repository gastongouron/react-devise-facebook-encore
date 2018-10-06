'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugin = function plugin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$formProps = _ref.formProps,
      formProps = _ref$formProps === undefined ? {
    className: 'auth-form'
  } : _ref$formProps,
      _ref$formErrorProps = _ref.formErrorProps,
      formErrorProps = _ref$formErrorProps === undefined ? {
    className: 'auth-error',
    style: {
      marginTop: '5px',
      color: 'red'
    }
  } : _ref$formErrorProps,
      _ref$formSuccessProps = _ref.formSuccessProps,
      formSuccessProps = _ref$formSuccessProps === undefined ? {
    className: 'auth-success',
    style: {
      marginTop: '5px',
      color: 'green'
    }
  } : _ref$formSuccessProps,
      _ref$fieldErrorProps = _ref.fieldErrorProps,
      fieldErrorProps = _ref$fieldErrorProps === undefined ? {
    className: 'auth-field-error',
    style: {
      color: 'red'
    }
  } : _ref$fieldErrorProps,
      _ref$fieldWarningProp = _ref.fieldWarningProps,
      fieldWarningProps = _ref$fieldWarningProp === undefined ? {
    className: 'auth-field-warning',
    style: {
      color: 'amber'
    }
  } : _ref$fieldWarningProp,
      _ref$alertProps = _ref.alertProps,
      alertProps = _ref$alertProps === undefined ? {
    className: 'auth-alert'
  } : _ref$alertProps,
      _ref$authLinksListPro = _ref.authLinksListProps,
      authLinksListProps = _ref$authLinksListPro === undefined ? {
    className: 'auth-links'
  } : _ref$authLinksListPro,
      _ref$authLinksListIte = _ref.authLinksListItemProps,
      authLinksListItemProps = _ref$authLinksListIte === undefined ? {
    className: 'auth-link-item'
  } : _ref$authLinksListIte,
      _ref$headingProps = _ref.headingProps,
      headingProps = _ref$headingProps === undefined ? {
    className: 'auth-view-heading'
  } : _ref$headingProps,
      _ref$viewProps = _ref.viewProps,
      viewProps = _ref$viewProps === undefined ? {
    className: 'auth-view'
  } : _ref$viewProps;

  var renderInput = function renderInput(_ref2) {
    var input = _ref2.input,
        label = _ref2.label,
        type = _ref2.type,
        _ref2$meta = _ref2.meta,
        touched = _ref2$meta.touched,
        error = _ref2$meta.error,
        warning = _ref2$meta.warning;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'label',
        null,
        label
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', _extends({}, input, { placeholder: label, type: type })),
        touched && (error && _react2.default.createElement(
          'span',
          fieldErrorProps,
          error
        ) || warning && _react2.default.createElement(
          'span',
          fieldWarningProps,
          warning
        ))
      )
    );
  };
  var SubmitButton = function SubmitButton(_ref3) {
    var label = _ref3.label,
        disabled = _ref3.disabled;
    return _react2.default.createElement('input', {
      type: 'submit',
      value: label,
      disabled: disabled
    });
  };
  var Form = function Form(_ref4) {
    var onSubmit = _ref4.onSubmit,
        children = _ref4.children;

    return _react2.default.createElement(
      'form',
      _extends({ onSubmit: onSubmit }, formProps),
      children
    );
  };
  var FormSuccess = function FormSuccess(_ref5) {
    var children = _ref5.children;

    return _react2.default.createElement(
      'div',
      formSuccessProps,
      children
    );
  };
  var Alert = function Alert(_ref6) {
    var children = _ref6.children;

    return _react2.default.createElement(
      'div',
      alertProps,
      children
    );
  };
  var FormError = function FormError(_ref7) {
    var children = _ref7.children;

    return _react2.default.createElement(
      'div',
      formErrorProps,
      children
    );
  };
  var AuthLinksList = function AuthLinksList(_ref8) {
    var children = _ref8.children;

    return _react2.default.createElement(
      'ul',
      authLinksListProps,
      children
    );
  };
  var AuthLinksListItem = function AuthLinksListItem(_ref9) {
    var path = _ref9.path,
        linkText = _ref9.route.linkText,
        pathname = _ref9.location.pathname;

    if (path === pathname) {
      return null;
    }
    return _react2.default.createElement(
      'li',
      authLinksListItemProps,
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: path },
        linkText
      )
    );
  };
  var Heading = function Heading(_ref10) {
    var children = _ref10.children;

    return _react2.default.createElement(
      'h1',
      headingProps,
      children
    );
  };
  var View = function View(_ref11) {
    var children = _ref11.children;

    return _react2.default.createElement(
      'div',
      viewProps,
      children
    );
  };
  return {
    renderInput: renderInput,
    SubmitButton: SubmitButton,
    Form: Form,
    FormSuccess: FormSuccess,
    Alert: Alert,
    FormError: FormError,
    AuthLinksList: AuthLinksList,
    AuthLinksListItem: AuthLinksListItem,
    Heading: Heading,
    View: View
  };
};

exports.default = {
  plugin: plugin
};