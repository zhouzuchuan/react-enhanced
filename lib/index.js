import React from 'react';
import pick from 'lodash.pick';
import { connect, Provider } from 'react-redux';
export { connect } from 'react-redux';
import get from 'lodash.get';
import { put, call, select, fork, takeLatest, all } from 'redux-saga/effects';
import { combineReducers, createStore, applyMiddleware } from 'redux';
export { bindActionCreators } from 'redux';
import Loadable from 'react-loadable';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import apiManage from 'api-manage';
import isEmpty from 'lodash.isempty';
import { composeWithDevTools } from 'redux-devtools-extension';

var RE = {};

var getType = function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
var isFunction = function isFunction(o) {
    return getType(o) === 'function';
};
var isObject = function isObject(o) {
    return getType(o) === 'object';
};
var isString = function isString(o) {
    return getType(o) === 'string';
};
var isUndefined = function isUndefined(o) {
    return getType(o) === 'undefined';
};
var isArray = function isArray(o) {
    return getType(o) === 'array';
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
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

var defineProperty = function (obj, key, value) {
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
};

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

var inherits = function (subClass, superClass) {
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
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call$$1) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call$$1 && (typeof call$$1 === "object" || typeof call$$1 === "function") ? call$$1 : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * 注入方法
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */

var Install = (function () {
    var inject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (WrappedComponent) {
        return function (props) {
            var newProps = _extends({}, props, isString(inject) || isArray(inject) ? pick(RE, inject) : {});
            return React.createElement(WrappedComponent, newProps);
        };
    };
});

/**
 * 传递context
 * */

var Push = (function (id) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function (WrappedComponent) {
        return function (props) {
            var warehouse = RE.__warehouse__[id];

            if (!warehouse) {
                console.warn('\u7EC4\u4EF6' + WrappedComponent.displayName + ' Push \u7684 \u4ED3\u5E93id \u4E0D\u5B58\u5728\uFF0C\u8BF7\u5728 init \u521D\u59CB\u5316\u4E2D\u6CE8\u518C warehouse\uFF01');
            } else {
                if (isFunction(fn)) {
                    var dealResult = fn(props);
                    Object.entries(isObject(dealResult) ? dealResult : {}).forEach(function (_ref) {
                        var _ref2 = slicedToArray(_ref, 2),
                            n = _ref2[0],
                            m = _ref2[1];

                        warehouse[n] = m;
                    });
                } else {
                    (isArray(fn) ? fn : [fn]).forEach(function (v) {
                        warehouse[v] = props[v];
                    });
                }
            }

            return React.createElement(WrappedComponent, props);
        };
    };
});

/**
 * 继承context
 * id: 仓库名
 * limit：获取CONTEXT中指定的key
 *
 * */

var Pull = (function (id) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function (WrappedComponent) {
        return function (props) {
            var warehouse = RE.__warehouse__[id];
            var newProps = props;

            if (!warehouse) {
                console.warn('\u7EC4\u4EF6' + WrappedComponent.displayName + ' Pull \u7684 \u4ED3\u5E93id \u4E0D\u5B58\u5728\uFF0C\u8BF7\u5728 init \u521D\u59CB\u5316\u4E2D\u6CE8\u518C warehouse\uFF01');
            } else {
                newProps = _extends({}, newProps, isArray(limit) ? pick(warehouse, limit) : {});
            }
            return React.createElement(WrappedComponent, newProps);
        };
    };
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".RE-LOADING-BLOCK {\n    display: block;\n    text-align: center\n}\n\n.RE-LOADING-BLOCK > :first-child {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    background-color: #1890ff;\n    -webkit-animation: rotateplane 1.2s infinite ease-in-out;\n            animation: rotateplane 1.2s infinite ease-in-out;\n}\n\n@-webkit-keyframes rotateplane {\n    0% {\n        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    }\n    50% {\n        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    }\n    100% {\n        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    }\n}\n\n@keyframes rotateplane {\n    0% {\n        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    }\n    50% {\n        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    }\n    100% {\n        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    }\n}\n\n.RE-LOADING-WAVE {\n    display: block;\n    text-align: center\n}\n\n.RE-LOADING-WAVE > * {\n    background-color: #1890ff;\n    width: 4px;\n    height: 30px;\n    margin: 0 1px;\n    display: inline-block;\n    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\n            animation: stretchdelay 1.2s infinite ease-in-out;\n}\n\n.RE-LOADING-WAVE > :nth-child(2) {\n    -webkit-animation-delay: -1.1s;\n            animation-delay: -1.1s;\n}\n\n.RE-LOADING-WAVE > :nth-child(3) {\n    -webkit-animation-delay: -1s;\n            animation-delay: -1s;\n}\n\n.RE-LOADING-WAVE > :nth-child(4) {\n    -webkit-animation-delay: -0.9s;\n            animation-delay: -0.9s;\n}\n\n.RE-LOADING-WAVE > :nth-child(5) {\n    -webkit-animation-delay: -0.8s;\n            animation-delay: -0.8s;\n}\n\n@-webkit-keyframes stretchdelay {\n    0%,\n    40%,\n    100% {\n        -webkit-transform: scaleY(0.4);\n                transform: scaleY(0.4);\n    }\n    20% {\n        -webkit-transform: scaleY(1);\n                transform: scaleY(1);\n    }\n}\n\n@keyframes stretchdelay {\n    0%,\n    40%,\n    100% {\n        -webkit-transform: scaleY(0.4);\n                transform: scaleY(0.4);\n    }\n    20% {\n        -webkit-transform: scaleY(1);\n                transform: scaleY(1);\n    }\n}\n\n.RE-LOADING-CRICLE {\n    display: block;\n    text-align: center;\n    min-width: 30px;\n    height: 30px;\n    position: relative\n}\n\n.RE-LOADING-CRICLE > * {\n    width: 30px;\n    height: 100%;\n    border-radius: 50%;\n    background-color: #1890ff;\n    opacity: 0.6;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    -webkit-animation: bounce 2s infinite ease-in-out;\n            animation: bounce 2s infinite ease-in-out;\n}\n\n.RE-LOADING-CRICLE > :last-child {\n    -webkit-animation-delay: -1s;\n            animation-delay: -1s;\n}\n\n@-webkit-keyframes bounce {\n    0%,\n    100% {\n        -webkit-transform: scale(0);\n                transform: scale(0);\n    }\n    50% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n}\n\n@keyframes bounce {\n    0%,\n    100% {\n        -webkit-transform: scale(0);\n                transform: scale(0);\n    }\n    50% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n}\n";
styleInject(css);

var LOADING_TYPE = [React.createElement(
    'span',
    { className: 'RE-LOADING-BLOCK' },
    React.createElement('span', null)
), React.createElement(
    'span',
    { className: 'RE-LOADING-WAVE' },
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null)
), React.createElement(
    'span',
    { className: 'RE-LOADING-CRICLE' },
    React.createElement('span', null),
    React.createElement('span', null)
)];

var Loading = function Loading(_ref) {
    var type = _ref.type;

    return LOADING_TYPE[type] || LOADING_TYPE[0];
};

var PlaceholderLoading = (function (Loading$$1) {
    var PlaceholderLoading = function (_React$Component) {
        inherits(PlaceholderLoading, _React$Component);

        function PlaceholderLoading() {
            var _ref;

            classCallCheck(this, PlaceholderLoading);

            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            return possibleConstructorReturn(this, (_ref = PlaceholderLoading.__proto__ || Object.getPrototypeOf(PlaceholderLoading)).call.apply(_ref, [this].concat(arg)));
        }

        createClass(PlaceholderLoading, [{
            key: 'render',
            value: function render() {
                return this.props.loading && !isUndefined(Loading$$1) ? !isFunction(Loading$$1) ? React.createElement(Loading, { type: Loading$$1 }) : React.createElement(Loading$$1, this.props) : null;
            }
        }]);
        return PlaceholderLoading;
    }(React.Component);

    return connect(function (store) {
        return {
            loading: (store['@@LOADING'] || {}).loading
        };
    })(PlaceholderLoading);
});

var take = function take(obj, path) {
    return get(obj, path);
};

var requestMiddleware = (function (RE, _ref, store) {
    var requestCallback = _ref.requestCallback,
        requestError = _ref.requestError,
        resultLimit = _ref.resultLimit,
        requestLoading = _ref.requestLoading;
    return function (next) {
        return function (action) {
            // return setTimeout(() => {
            var dispatch = store.dispatch,
                getState = store.getState;


            if (isFunction(action)) {
                action(dispatch, getState);
                return;
            }

            var request = action.request,
                will = action.will,
                error = action.error,
                callback = action.callback,
                did = action.did,
                RE_PROMISE = action.RE_PROMISE,
                __RE_PROMISE_RESOLVE__ = action.__RE_PROMISE_RESOLVE__,
                __RE_PROMISE_REJECT__ = action.__RE_PROMISE_REJECT__,
                rest = objectWithoutProperties(action, ['request', 'will', 'error', 'callback', 'did', 'RE_PROMISE', '__RE_PROMISE_RESOLVE__', '__RE_PROMISE_REJECT__']);


            if (!request) {
                return isEffect(rest.type, RE) ? new Promise(function (resolve, reject) {
                    return next(_extends({
                        __RE_PROMISE_RESOLVE__: resolve,
                        __RE_PROMISE_REJECT__: reject
                    }, rest));
                }) : next(action);
            }

            if (!isFunction(request)) {
                console.error('request must be a function!');
                return next(action);
            }

            if (isObject(will) && isString(will.type)) {
                next(will);
            } else if (isString(will)) {
                next({
                    type: will
                });
            }

            var mergeError = error || requestError;

            var isRequestLoading = isFunction(requestLoading);

            if (isRequestLoading) requestLoading(false, action);

            next({
                type: '@@LOADING/__SET_LOADING__',
                payload: {
                    loading: true
                }
            });

            return request().then(function (result) {
                var data = result.data;

                var transferData = data || result;
                var limitData = isString(resultLimit) ? take(transferData, resultLimit) : isArray(resultLimit) ? resultLimit.reduce(function (r, v) {
                    if (!isString(v)) {
                        console.warn(JSON.stringify(v) + ' \u4E0D\u7B26\u5408\u5B57\u6BB5\u622A\u53D6\u89C4\u5219\uFF1B\u8BF7\u4F7F\u7528"result.data"\u8FD9\u79CD\u89C4\u5219\uFF01');
                        return r;
                    }
                    return [].concat(toConsumableArray(r), [take(transferData, v) || []]);
                }, []) : transferData;

                if (isUndefined(limitData)) {
                    console.warn('设置的 resultLimit 获取不到有效的数据');
                }

                if (isRequestLoading) requestLoading(true, action);

                next({
                    type: '@@LOADING/__SET_LOADING__',
                    payload: {
                        loading: false
                    }
                });

                if (isFunction(requestCallback)) {
                    requestCallback(transferData, rest, dispatch, getState);
                } else if (isString(requestCallback)) {
                    next(_extends({
                        type: requestCallback,
                        payload: transferData
                    }, rest));
                }

                if (isObject(did) && isString(did.type)) {
                    var type = did.type,
                        payload = did.payload,
                        rest2 = objectWithoutProperties(did, ['type', 'payload']);

                    next(_extends({
                        type: did.type,
                        payload: isUndefined(payload) ? limitData : isFunction(payload) ? payload(limitData) : payload
                    }, rest2));
                } else if (isString(did)) {
                    next({
                        type: did,
                        payload: limitData
                    });
                }

                if (isFunction(callback)) {
                    callback(limitData);
                } else if (isString(requecallbacktCallback)) {
                    next(_extends({
                        type: callback,
                        payload: limitData
                    }, rest));
                }
            }).catch(function (err) {
                if (isFunction(mergeError)) {
                    mergeError(err);
                } else if (isString(mergeError)) {
                    next(_extends({
                        type: mergeError
                    }, rest));
                }
            });
            // }, 0);
        };
    };
});

function isEffect(type, RE) {
    if (!type || typeof type !== 'string') return false;

    if (RE._effects[type]) {
        return true;
    }
    return false;
}

var promiseMiddleware = (function (RE, store) {
    return function (next) {
        return function (action) {
            var _marked = /*#__PURE__*/regeneratorRuntime.mark(actionG);

            var dispatch = store.dispatch,
                getState = store.getState;


            if (isFunction(action)) {
                action(dispatch, getState);
                return;
            }

            var __RE_PROMISE_RESOLVE__ = action.__RE_PROMISE_RESOLVE__,
                __RE_PROMISE_REJECT__ = action.__RE_PROMISE_REJECT__,
                rest = objectWithoutProperties(action, ['__RE_PROMISE_RESOLVE__', '__RE_PROMISE_REJECT__']);


            function actionG() {
                var ret;
                return regeneratorRuntime.wrap(function actionG$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return RE._effects[rest.type](rest, { put: put, call: call, select: select });

                            case 3:
                                ret = _context.sent;

                                // next(rest);
                                __RE_PROMISE_RESOLVE__(ret);
                                _context.next = 10;
                                break;

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](0);

                                __RE_PROMISE_REJECT__(_context.t0);

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _marked, this, [[0, 7]]);
            }

            if (isFunction(__RE_PROMISE_REJECT__) && isFunction(__RE_PROMISE_RESOLVE__)) {
                var _next = function _next() {
                    var ret = gen.next();
                    if (!ret.done) _next();
                };

                var gen = actionG();

                _next();
            } else {
                next(rest);
            }
        };
    };
});

function createReducer(initialState, handlers) {
    return function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

var addNameSpace = function addNameSpace() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var namespace = arguments[1];
    return Object.entries(obj).reduce(function (r, _ref) {
        var _ref2 = slicedToArray(_ref, 2),
            n = _ref2[0],
            m = _ref2[1];

        return _extends({}, r, defineProperty({}, namespace + '/' + n, m));
    }, {});
};

function injectAsyncReducers(asyncReducers, initialState) {
    var flag = false;

    if (asyncReducers) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.entries(asyncReducers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref3 = _step.value;

                var _ref4 = slicedToArray(_ref3, 2);

                var n = _ref4[0];
                var m = _ref4[1];

                if (Object.prototype.hasOwnProperty.call(asyncReducers, n)) {
                    if (RE && !(RE.asyncReducers || {})[n]) {
                        RE.asyncReducers[n] = createReducer(initialState[n] || {}, m);
                        flag = true;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        flag && RE.__store__.replaceReducer(combineReducers(RE.asyncReducers));
    }
}

function injectAsyncSagas(sagas, sagaMiddleware) {
    if (sagas) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = Object.entries(sagas)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _ref5 = _step2.value;

                var _ref6 = slicedToArray(_ref5, 2);

                var n = _ref6[0];
                var m = _ref6[1];

                if (Object.prototype.hasOwnProperty.call(sagas, n)) {
                    if (RE && !(RE.asyncSagas || {})[n]) {
                        RE.asyncSagas[n] = m;
                        sagaMiddleware.run(m);
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
}

function registerModel(sagaMiddleware, models) {
    console.log();
    var deal = (Array.isArray(models) ? models : [models]).filter(function (_ref7) {
        var namespace = _ref7.namespace,
            effects = _ref7.effects,
            reducer = _ref7.reducer;

        if (isUndefined(namespace)) {
            console.warn('namespace \u5FC5\u586B\u5E76\u4E14\u552F\u4E00\uFF0C \u8BE5model\u672A\u8F7D\u5165\uFF0C\u8BF7\u68C0\u67E5\uFF01');
            return false;
        }

        // if (RE._models.includes(namespace)) {
        //     console.warn(`namespace 必须唯一， ${namespace} 已经被使用，该model未载入，请检查！`);
        //     return false;
        // }

        RE._models.push(namespace);
        return true;
    }).reduce(function (r, _ref8) {
        var namespace = _ref8.namespace,
            _ref8$effects = _ref8.effects,
            effects = _ref8$effects === undefined ? {} : _ref8$effects,
            _ref8$reducers = _ref8.reducers,
            reducers = _ref8$reducers === undefined ? {} : _ref8$reducers,
            _ref8$state = _ref8.state,
            state = _ref8$state === undefined ? {} : _ref8$state;

        var dealSagas = addNameSpace(effects, namespace);
        var dealReducers = addNameSpace(reducers, namespace);

        RE._effects = _extends({}, RE._effects, dealSagas);
        return {
            state: _extends({}, r.state || {}, defineProperty({}, namespace, state)),
            sagas: _extends({}, r.sagas || {}, defineProperty({}, namespace, dealSagas)),
            reducers: _extends({}, r.reducers || {}, defineProperty({}, namespace, dealReducers))
        };
    }, {});

    if (!deal.sagas) return;

    injectAsyncReducers(deal.reducers, deal.state);
    injectAsyncSagas(Object.entries(deal.sagas).reduce(function (r, _ref9) {
        var _ref10 = slicedToArray(_ref9, 2),
            name = _ref10[0],
            fns = _ref10[1];

        return _extends({}, r, defineProperty({}, name, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return all([fork( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.next = 2;
                                                return all([].concat(toConsumableArray(Object.entries(fns).map(function (_ref11) {
                                                    var _ref12 = slicedToArray(_ref11, 2),
                                                        n = _ref12[0],
                                                        m = _ref12[1];

                                                    return takeLatest(n, /*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
                                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                                            while (1) {
                                                                switch (_context.prev = _context.next) {
                                                                    case 0:
                                                                        _context.next = 2;
                                                                        return all([fork(m.bind(null, action, {
                                                                            put: put,
                                                                            select: select,
                                                                            call: call
                                                                        }))]);

                                                                    case 2:
                                                                    case 'end':
                                                                        return _context.stop();
                                                                }
                                                            }
                                                        }, _callee, this);
                                                    }));
                                                }))));

                                            case 2:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, this);
                            }))]);

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        })));
    }, {}), sagaMiddleware);
}

/**
 * 异步加载组件以及model
 * */

var AsyncComponent = (function (componentLoading) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var isMore = isFunction(params);

    var defaultParams = {
        loading: isFunction(componentLoading) ? componentLoading : function () {
            return React.createElement(Loading, { type: componentLoading });
        }
    };

    if (isMore) {
        return Loadable(_extends({}, defaultParams, {
            loader: params
        }));
    } else {
        var _params$props = params.props,
            props2 = _params$props === undefined ? {} : _params$props,
            component = params.component,
            model = params.model,
            rest = objectWithoutProperties(params, ['props', 'component', 'model']);

        return Loadable.Map(_extends({}, defaultParams, rest, {
            loader: (isArray(model) ? model : [model]).reduce(function (r, v, i) {
                return _extends({}, r, defineProperty({}, i, v));
            }, { component: component }),
            render: function render(_ref, props) {
                var component = _ref.component,
                    models = objectWithoutProperties(_ref, ['component']);

                var ReturnCompoment = component.default;
                models && Object.values(models).forEach(function (v) {
                    return RE.registerModel(v.default);
                });
                return React.createElement(ReturnCompoment, _extends({}, props2, props));
            }
        }));
    }
});

var loadingModel = {
    namespace: '@@LOADING',
    state: {
        loading: false
    },
    effects: {},
    reducers: {
        __SET_LOADING__: function __SET_LOADING__(state, _ref) {
            var payload = _ref.payload;

            return _extends({
                state: state
            }, payload);
        }
    }
};

require('babel-regenerator-runtime');
// 创建 router histroy 中间件
var historyMiddleware = routerMiddleware(createHistory());

// 创建saga中间件
var sagaMiddleware = createSagaMiddleware();

/**
 *
 *
 * @export
 * @param {any} [{
 *     state： 默认state,
 *     reducers： 全局reducers,
 *     effects： 全局effects,
 *     middlewares： saga中间件,
 *     requestCallback：请求统一回调,
 *     requestError：请求统一错误处理,
 *     resultLimit：根据返回的数据数据格式，统一自定义返回
 * }={}]
 * @returns
 */
function configureStore() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$state = _ref.state,
        state = _ref$state === undefined ? {} : _ref$state,
        _ref$reducers = _ref.reducers,
        reducers = _ref$reducers === undefined ? {} : _ref$reducers,
        _ref$effects = _ref.effects,
        effects = _ref$effects === undefined ? [] : _ref$effects,
        _ref$middlewares = _ref.middlewares,
        middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares,
        requestCallback = _ref.requestCallback,
        requestError = _ref.requestError,
        resultLimit = _ref.resultLimit,
        requestLoading = _ref.requestLoading,
        componentLoading = _ref.componentLoading,
        _ref$warehouse = _ref.warehouse,
        warehouse = _ref$warehouse === undefined ? [] : _ref$warehouse,
        _ref$apiList = _ref.apiList,
        apiList = _ref$apiList === undefined ? {} : _ref$apiList;

    apiManage.init({ list: apiList });

    Object.entries({
        __warehouse__: warehouse.reduce(function (r, v, i) {
            return _extends({}, r, defineProperty({}, v, {}));
        }, _extends({}, !isEmpty(apiList) && { $service: apiManage.getService() })),
        _effects: {},
        _reducers: {},
        _models: [],
        asyncReducers: { route: routerReducer },
        asyncSagas: {},
        registerModel: registerModel.bind(null, sagaMiddleware),
        AsyncComponent: AsyncComponent.bind(null, componentLoading),
        RequestLoading: PlaceholderLoading(requestLoading)
    }).forEach(function (_ref2) {
        var _ref3 = slicedToArray(_ref2, 2),
            n = _ref3[0],
            m = _ref3[1];

        RE[n] = m;
    });

    // 中间件列表
    var middleware = [historyMiddleware, sagaMiddleware, requestMiddleware.bind(null, RE, {
        requestCallback: requestCallback,
        requestError: requestError,
        resultLimit: resultLimit,
        requestLoading: requestLoading
    }), promiseMiddleware.bind(null, RE)].concat(toConsumableArray(middlewares || []));

    var operApplyMiddleware = applyMiddleware.apply(undefined, toConsumableArray(middleware));

    RE.__store__ = createStore(combineReducers(_extends({}, reducers, RE.asyncReducers)
    // route: routerReducer
    ), state, process.env.NODE_ENV === 'development' ? composeWithDevTools(operApplyMiddleware) : operApplyMiddleware);

    // 处理saga
    sagaMiddleware.run( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return all(effects);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    // // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(
    //             require('../reducers') /*.default if you use Babel 6+ */
    //         )
    //     )
    // }

    RE.Provider = function (props) {
        return React.createElement(Provider, _extends({}, props, { store: RE.__store__ }));
    };

    if (!isUndefined(requestLoading)) RE.registerModel(loadingModel);

    return RE;
}

export { Install, Push, Pull, configureStore as init };
