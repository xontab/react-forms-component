(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.index = mod.exports;
    }
})(this, function (exports) {
    (function (global, factory) {
        if (typeof define === "function" && define.amd) {
            define(['exports', 'react'], factory);
        } else if (typeof exports !== "undefined") {
            factory(exports);
        } else {
            var mod = {
                exports: {}
            };
            factory(mod.exports, global.react);
            global.index = mod.exports;
        }
    })(this, function (exports, _react) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _react2 = _interopRequireDefault(_react);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }

            return obj;
        }

        var _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }

            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }

            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ReactForm = function (_Component) {
            _inherits(ReactForm, _Component);

            function ReactForm(props) {
                _classCallCheck(this, ReactForm);

                var _this = _possibleConstructorReturn(this, (ReactForm.__proto__ || Object.getPrototypeOf(ReactForm)).call(this, props));

                _this.getModel = function () {
                    return _this.state.model;
                };

                _this.getValidations = function () {
                    return _this.state.validations;
                };

                _this.getFullError = function (modelName) {
                    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state;
                    var validations = state.validations;


                    var result = '';
                    if (validations && validations[modelName]) {
                        validations[modelName].map(function (x, i) {
                            if (x !== true) {
                                result += '' + (i > 0 ? '\n' : '') + x;
                            }
                            return x;
                        });
                    }

                    return result;
                };

                _this.isValid = function () {
                    return _this.state.isValid;
                };

                _this._handleChange = function (modelName, evt, validationFuncs, customOnChange) {
                    var _this$state = _this.state,
                        model = _this$state.model,
                        validations = _this$state.validations;

                    var value = _this._getValue(model[modelName], evt.target, modelName);
                    _this.setState({
                        model: _extends({}, model, _defineProperty({}, modelName, value)),
                        validations: _extends({}, validations, _defineProperty({}, modelName, _this._checkValidation(validationFuncs, modelName, value)))
                    }, _this._updateValidation);

                    if (customOnChange) {
                        customOnChange(evt, modelName);
                    }
                };

                _this._renderElement = function (element, i) {
                    if (!element.props) {
                        return element;
                    }

                    var _this$props = _this.props,
                        styleError = _this$props.styleError,
                        classNameError = _this$props.classNameError;
                    var validations = _this.state.validations;


                    var modelName = element.props['data-model'];
                    var errorFor = element.props['data-error-for'];

                    if (modelName) {
                        return _react2.default.createElement(
                            'span',
                            {
                                key: i,
                                style: _this._checkValidationForStyles(validations[modelName], styleError),
                                className: _this._checkValidationForStyles(validations[modelName], classNameError)
                            },
                            element
                        );
                    } else if (errorFor) {
                        return _react2.default.cloneElement(element, null, _this.getFullError(errorFor).split('\n').map(function (x, i2) {
                            return _react2.default.createElement(
                                'span',
                                { key: i2 },
                                x,
                                _react2.default.createElement('br', null)
                            );
                        }));
                    }

                    if (element.props.children) {
                        return _react2.default.cloneElement(element, null, element.props.children.map(function (x, i2) {
                            return _this._renderElement(x, i2);
                        }));
                    }

                    return element;
                };

                _this.state = {
                    isValid: true,
                    model: {},
                    validations: {}
                };
                return _this;
            }

            _createClass(ReactForm, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;

                    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
                    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

                    this.tempState = { model: {}, validations: {} };
                    this.children = _react2.default.Children.map(props.children, function (element) {
                        return _this2._updateChild(element, state);
                    });
                    this.tempState.model = _extends({}, state.model, this.tempState.model);
                    this.tempState.validations = _extends({}, state.validations, this.tempState.validations);
                    this.setState(this.tempState, this._updateValidation);
                }
            }, {
                key: 'componentWillUpdate',
                value: function componentWillUpdate(nextProps, nextState) {
                    if (this.props.children !== nextProps.children) {
                        this.componentWillMount(nextProps, nextState);
                    }
                    if (nextProps.onValidationChange && this.state.isValid !== nextState.isValid) {
                        nextProps.onValidationChange(nextState.isValid);
                    }
                }
            }, {
                key: '_getFirstValue',
                value: function _getFirstValue(values, defaultValue) {
                    var value = values.find(function (x) {
                        return x !== undefined && x !== null;
                    });
                    if (value !== undefined) {
                        return value;
                    }

                    return defaultValue;
                }
            }, {
                key: '_getValue',
                value: function _getValue(state, props, modelName) {
                    var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : props.value;

                    var stateModel = this.state.model[modelName] || {};
                    if (props.type === 'checkbox') {
                        return _extends({}, state || {}, _defineProperty({}, props.value, this._getFirstValue([props.checked, stateModel[props.value], props.defaultChecked], false)));
                    }

                    return value;
                }
            }, {
                key: '_checkValidation',
                value: function _checkValidation(validationFuncs, modelName, value) {
                    return validationFuncs && validationFuncs.map(function (v) {
                        return v(modelName, value);
                    });
                }
            }, {
                key: '_updateValidation',
                value: function _updateValidation() {
                    var _state = this.state,
                        validations = _state.validations,
                        isValid = _state.isValid;

                    var newIsValid = Object.keys(validations).filter(function (x) {
                        return validations[x] && validations[x].filter(function (y) {
                            return y !== true;
                        }).length > 0;
                    }).length === 0;

                    if (newIsValid !== isValid) {
                        this.setState({
                            isValid: newIsValid
                        });
                    }

                    return newIsValid;
                }
            }, {
                key: '_updateChild',
                value: function _updateChild(element, state) {
                    var _this3 = this;

                    if (!element.props) {
                        return element;
                    }

                    var modelName = element.props['data-model'];
                    if (modelName) {
                        var _ret = function () {
                            var validationFuncs = element.props['data-validations'];
                            var value = element.props.defaultValue || element.props.value;
                            if (value !== undefined || !state.model[modelName]) {
                                _this3.tempState.model[modelName] = _this3._getValue(_this3.tempState.model[modelName], element.props, modelName, value);
                                _this3.tempState.validations[modelName] = _this3._checkValidation(validationFuncs, modelName, value);
                            }
                            var newElement = _react2.default.cloneElement(element, {
                                onChange: function onChange(evt) {
                                    return _this3._handleChange(modelName, evt, validationFuncs, element.props.onChange);
                                }
                            });

                            return {
                                v: newElement
                            };
                        }();

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }

                    if (element.props.children) {
                        var newElement = _react2.default.cloneElement(element, {}, _react2.default.Children.map(element.props.children, function (childElement) {
                            return _this3._updateChild(childElement, state);
                        }));

                        return newElement;
                    }

                    return element;
                }
            }, {
                key: '_checkValidationForStyles',
                value: function _checkValidationForStyles(validations, errorStyle) {
                    if (!validations || validations.filter(function (x) {
                        return x !== true;
                    }).length === 0) {
                        return null;
                    }

                    return errorStyle;
                }
            }, {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(
                        'span',
                        null,
                        this.children.map(this._renderElement)
                    );
                }
            }]);

            return ReactForm;
        }(_react.Component);

        ReactForm.propTypes = {
            styleError: _react.PropTypes.object,
            classNameError: _react.PropTypes.string,
            children: _react.PropTypes.any,
            onValidationChange: _react.PropTypes.func
        };
        ReactForm.defaultProps = {
            styleError: {},
            classNameError: ''
        };
        exports.default = ReactForm;
    });
});