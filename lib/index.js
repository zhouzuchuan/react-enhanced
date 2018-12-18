import React from 'react';
import Spinner from 'react-spinkit';
import { ofType, ActionsObservable, StateObservable, combineEpics, createEpicMiddleware } from 'redux-observable';
import pick from 'lodash.pick';
import { bindActionCreators, combineReducers, createStore, applyMiddleware, compose } from 'redux';
export { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
export { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import classnames from 'classnames';
import get from 'lodash.get';
import { put, call, select, fork, takeLatest, all } from 'redux-saga/effects';
import { Subject, queueScheduler, BehaviorSubject } from 'rxjs';
import { observeOn, mergeMap, map } from 'rxjs/operators';
import Loadable from 'react-loadable';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import 'babel-regenerator-runtime';
import apiManage from 'api-manage';
import isEmpty from 'lodash.isempty';

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
var isNull = function isNull(o) {
    return getType(o) === 'null';
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
 * 返回loading组件
 *
 *
 * @param {*} params
 * array: 为空不显示 数量为 则复制一份 大于等于2 则去前两个
 * string: 如果是默认编号 则显示 否则 不显示
 * 其他: 不显示
 *
 * 返回loading组件 [请求loading， 组件loading]
 * @returns {ReactNode[]}
 */
var loadFormat = (function (params) {
    var _slice$map = (isArray(params) ? params : isString(params) ? Array(2).fill(params) : [params]).slice(0, 2).map(function (v) {
        var REL = function REL(props) {
            return React.isValidElement(v) ? v : React.createElement(Spinner, _extends({
                style: {
                    marginRight: 'auto',
                    marginLeft: 'auto'
                },
                color: '#1890ff',
                fadeIn: 'none'
            }, isObject(v) ? v : { name: v }, props));
        };

        return REL;
    }),
        _slice$map2 = slicedToArray(_slice$map, 2),
        _slice$map2$ = _slice$map2[0],
        ReqestLoading = _slice$map2$ === undefined ? null : _slice$map2$,
        _slice$map2$2 = _slice$map2[1],
        ComponentLoading = _slice$map2$2 === undefined ? null : _slice$map2$2;

    return [ReqestLoading, ComponentLoading];
});

// 封装epic类型 调用
var epicEnhance = function epicEnhance(fn) {
  return function (action$) {
    for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      other[_key - 1] = arguments[_key];
    }

    return fn.apply(undefined, [action$.pipe(ofType(fn.name))].concat(other, [action$]));
  };
};

var console$1 = window.console;

var addNameSpace = function addNameSpace() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var namespace = arguments[1];
    return Object.entries(obj).reduce(function (r, _ref) {
        var _ref2 = slicedToArray(_ref, 2),
            n = _ref2[0],
            m = _ref2[1];

        var funName = namespace + '/' + n;
        Reflect.defineProperty(m, 'name', { value: funName });
        return _extends({}, r, defineProperty({}, funName, m));
    }, {});
};

/**
 * 默认字段
 *
 */

// api 默认仓库名
var SERVE_NAME = '$service';

// 顶级仓库名
var TOP_WAREHOUSE_NAME = Symbol();

// loading model 名称
var RE_LOADING_NAME = 'RE_loading';

var RE = {};

// 提取参数
var extractParams = function extractParams(params, callback) {
    if (!params.length) {
        return {};
    }
    // 如果参数只有一个 则从根仓库取值赋值

    var _ref = params.length === 1 ? [TOP_WAREHOUSE_NAME].concat(toConsumableArray(params)) : params.slice(0, 2),
        _ref2 = slicedToArray(_ref, 2),
        id = _ref2[0],
        limit = _ref2[1];

    var wh = RE.__warehouse__[id];

    if (!wh) {
        console$1.warn('\u4ED3\u5E93\u540D ' + id + ' \u5E76\u672A\u6CE8\u518C\uFF0C\u8BF7\u5728 init \u521D\u59CB\u5316\u4E2D\u6CE8\u518C warehouse\uFF01');
        return {};
    }
    return callback(wh, limit);
};

// 取
var pull = function pull() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
    }

    return extractParams(params, function (wh, limit) {
        return pick(wh, isArray(limit) ? limit : [limit]);
    });
};
// 存
var push = function push() {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
    }

    return extractParams(params, function (wh, limit) {
        return isObject(limit) ? Object.entries(limit).reduce(function (r, _ref3) {
            var _ref4 = slicedToArray(_ref3, 2),
                k = _ref4[0],
                v = _ref4[1];

            r[k] = v;
            return r;
        }, wh) : {};
    });
};
// request中间件包装
var request = function request() {
    for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
    }

    return bindActionCreators(Object.entries(pull.apply(undefined, params)).reduce(function (r, _ref5) {
        var _ref6 = slicedToArray(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        return _extends({}, r, defineProperty({}, k, function (params) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _ref7 = _extends({}, isFunction(options) && { callback: options }, isObject(options) && options),
                tplData = _ref7.tplData,
                restOption = objectWithoutProperties(_ref7, ['tplData']);

            return _extends({
                request: v.bind.apply(v, [null].concat([params].concat(toConsumableArray(tplData ? [tplData] : []))))
            }, restOption);
        }));
    }, {}), RE.dispatch);
};
RE.pull = pull;
RE.push = push;
RE.request = request;

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

var css = ".RE_loading_wrap.RE_update {\n    position: relative;\n}\n\n.RE_loading {\n    text-align: center;\n}\n\n.RE_loading > :first-child > .sk-spinner {\n    display: inline-block;\n    vertical-align: middle;\n}\n\n.RE_loading_wrap.RE_update > * {\n    pointer-events: none;\n    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"0.8\" /></filter></svg>#filter');\n    -webkit-filter: blur(0.8px);\n            filter: blur(0.8px);\n    opacity: 0.5;\n}\n\n.RE_loading_wrap.RE_update > .RE_loading {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 5;\n    width: 100%;\n    height: 100%;\n    max-height: 300px;\n    pointer-events: auto;\n    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"0\" /></filter></svg>#filter');\n    -webkit-filter: blur(0);\n            filter: blur(0);\n    opacity: 1;\n}\n\n.RE_loading_wrap.RE_update > .RE_loading::after {\n    display: inline-block;\n    width: 0;\n    height: 100%;\n    line-height: 0;\n    vertical-align: middle;\n    content: '';\n}\n\n.RE_loading_wrap.RE_update > .RE_loading > :first-child {\n    display: inline-block;\n    vertical-align: middle;\n}\n";
styleInject(css);

/**
 * Loading 组件
 * include/exclude (string/string) 默认为请求全触发，设置值且值为字符串, 转成数组，判断request中间层的函数名是否在数组中 有则触发
 *
 * */

var returnArray = function returnArray(v) {
    var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return (isArray(v) ? v : [v]).some(function (o) {
        return s[o];
    });
};

var returnUpdate = function returnUpdate(include, exclude, store) {
    if (isNull(include)) {
        return isNull(exclude) ? true : !returnArray(exclude, store);
    } else {
        return returnArray(include, store);
    }
};

var Loading = function (_React$Component) {
    inherits(Loading, _React$Component);

    function Loading() {
        classCallCheck(this, Loading);
        return possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    createClass(Loading, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(np) {
            return !isEqual(np, this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$children = _props.children,
                children = _props$children === undefined ? null : _props$children,
                _props$wrapClassName = _props.wrapClassName,
                wrapClassName = _props$wrapClassName === undefined ? '' : _props$wrapClassName,
                _props$wrapStyle = _props.wrapStyle,
                wrapStyle = _props$wrapStyle === undefined ? {} : _props$wrapStyle,
                update = _props.update,
                _props$mask = _props.mask,
                mask = _props$mask === undefined ? false : _props$mask,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                _props$cover = _props.cover,
                cover = _props$cover === undefined ? false : _props$cover,
                content = _props.content,
                _props$spin = _props.spin,
                spin = _props$spin === undefined ? {} : _props$spin;


            var RequestLoading = RE.RequestLoading;
            var createChldren = update ? React.createElement(
                'div',
                { className: 'RE_loading' },
                React.createElement(
                    'div',
                    {
                        className: classnames(defineProperty({}, className, className))
                    },
                    null,
                    cover ? null : React.createElement(RequestLoading, spin),
                    content
                )
            ) : null;

            return mask ? React.createElement(
                'div',
                _extends({
                    className: classnames('RE_loading_wrap', defineProperty({
                        RE_update: update
                    }, wrapClassName, wrapClassName))
                }, wrapStyle),
                children,
                createChldren
            ) : update ? createChldren : children;
        }
    }]);
    return Loading;
}(React.Component);

Loading.propTypes = ['include', 'exclude'].reduce(function (r, v) {
    return _extends({}, r, defineProperty({}, v, PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])));
}, { content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element), PropTypes.element]) });

var Loading$1 = connect(function (store) {
    return store[RE_LOADING_NAME] || {};
}, null, function (loadingStore, action, _ref) {
    var _ref$include = _ref.include,
        include = _ref$include === undefined ? null : _ref$include,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === undefined ? null : _ref$exclude,
        rest = objectWithoutProperties(_ref, ['include', 'exclude']);

    return _extends({}, rest, {
        update: returnUpdate(include, exclude, loadingStore)
    });
})(Loading);

/**
 * 注入方法
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */

var temp = true;

var Install = (function () {
    var inject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (WrappedComponent) {
        var name = WrappedComponent.displayName || WrappedComponent.name;
        var InstallHoc = function InstallHoc(props) {
            if (temp) {
                console$1.warn('Install 将在未来的2.0版本删除，Loading以及AsyncComponent的使用，请查看文档 https://zhouzuchuan.github.io/react-enhanced/#/base/hoc');
                temp = false;
            }
            var newProps = _extends({}, props, isString(inject) || isArray(inject) ? pick(RE, inject) : {});
            return React.createElement(WrappedComponent, newProps);
        };
        Reflect.defineProperty(InstallHoc, 'name', { value: 'InstallHoc-' + name });
        return InstallHoc;
    };
});

/**
 * 传递context
 * */

var deal = function deal(l, p) {
    return isFunction(l) ? l(p) : pick(p, isArray(l) ? l : [l]);
};

var Push = (function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
    }

    return function (WrappedComponent) {
        var name = WrappedComponent.displayName || WrappedComponent.name;
        var PushHoc = function PushHoc(props) {
            var id = params[0],
                _params$ = params[1],
                fn = _params$ === undefined ? [] : _params$;

            if (params.length > 1) {
                push(id, deal(fn, props));
            } else {
                push(deal(id, props));
            }

            return React.createElement(WrappedComponent, _extends({}, props));
        };
        Reflect.defineProperty(PushHoc, 'name', { value: 'PushHoc-' + name });
        return PushHoc;
    };
});

/**
 * 继承context
 * id: 仓库名
 * limit：获取仓库中指定的key
 * inline：是否内联注入pull
 *
 * */

var Pull = (function (id) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function (WrappedComponent) {
        var name = WrappedComponent.displayName || WrappedComponent.name;
        var PullHoc = function PullHoc(props) {
            return React.createElement(WrappedComponent, _extends({}, props, pull(id, limit)));
        };
        Reflect.defineProperty(PullHoc, 'name', { value: 'PullHoc-' + name });
        return PullHoc;
    };
});

var Model = (function (modelFn) {
    return function (WrappedComponent) {
        return function (props) {
            var pull$$1 = RE.pull,
                push$$1 = RE.push,
                dispatch = RE.dispatch,
                request$$1 = RE.request,
                getState = RE.getState;

            var newProps = (isArray(modelFn) ? modelFn : [modelFn]).reduce(function (r, v) {
                return _extends({}, r, isFunction(v) ? v({ pull: pull$$1, push: push$$1, dispatch: dispatch, request: request$$1, getState: getState }, props) || {} : {});
            }, {});
            return React.createElement(WrappedComponent, _extends({}, props, newProps));
        };
    };
});

var Request = (function (id) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function (WrappedComponent) {
        var name = WrappedComponent.displayName || WrappedComponent.name;
        var RequestHoc = function RequestHoc(props) {
            return React.createElement(WrappedComponent, _extends({}, props, request(id, limit)));
        };
        Reflect.defineProperty(RequestHoc, 'name', { value: 'RequestHoc-' + name });
        return RequestHoc;
    };
});

var withEnhance = (function (WrappedComponent) {
    var name = WrappedComponent.displayName || WrappedComponent.name;
    var WithEnhanceHoc = function WithEnhanceHoc(props) {
        return React.createElement(WrappedComponent, _extends({}, props, { enhance: { request: request, pull: pull, push: push } }));
    };
    Reflect.defineProperty(WithEnhanceHoc, 'name', { value: 'WithEnhanceHoc-' + name });
    return WithEnhanceHoc;
});

var Provider2 = function Provider2(props) {
  return React.createElement(Provider, _extends({}, props, { store: RE.__store__ }));
};

var take = function take(obj, path) {
    return get(obj, path);
};

var requestMiddleware = (function (RE, _ref, store) {
    var requestCallback = _ref.requestCallback,
        requestError = _ref.requestError,
        resultLimit = _ref.resultLimit;
    return function (next) {
        return function (action) {
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
                __RE_PROMISE_RESOLVE__ = action.__RE_PROMISE_RESOLVE__,
                __RE_PROMISE_REJECT__ = action.__RE_PROMISE_REJECT__,
                rest = objectWithoutProperties(action, ['request', 'will', 'error', 'callback', 'did', '__RE_PROMISE_RESOLVE__', '__RE_PROMISE_REJECT__']);


            if (!request) {
                return isEffect(rest.type, RE) ? new Promise(function (resolve, reject) {
                    return next(_extends({
                        __RE_PROMISE_RESOLVE__: resolve,
                        __RE_PROMISE_REJECT__: reject
                    }, rest));
                }) : isEpic(rest.type, RE) ? new Promise(function (resolve, reject) {
                    return next(_extends({
                        __RE_OBSERVABLE_RESOLVE__: resolve,
                        __RE_OBSERVABLE_REJECT__: reject
                    }, rest));
                }) : next(action);
            }

            if (!isFunction(request)) {
                console.error('request must be a function!');
                return next(action);
            }

            if (isObject(will) && isString(will.type)) {
                dispatch(will);
            } else if (isString(will)) {
                dispatch({
                    type: will
                });
            }

            var mergeError = error || requestError;

            var requestName = action.request.name.split(' ').reverse()[0];

            // 生成时间戳
            var timestamp = new Date().getTime();

            dispatch({
                type: RE_LOADING_NAME + '/__SET_LOADING_ACTION__',
                payload: {
                    timestamp: timestamp,
                    data: defineProperty({}, requestName, true)
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

                if (isFunction(requestCallback)) {
                    requestCallback(transferData, rest, dispatch, getState);
                } else if (isString(requestCallback)) {
                    dispatch(_extends({
                        type: requestCallback,
                        payload: transferData
                    }, rest));
                }

                if (isFunction(callback)) {
                    callback(limitData, transferData);
                } else if (isString(callback)) {
                    dispatch(_extends({
                        type: callback,
                        payload: limitData
                    }, rest));
                }

                if (isObject(did) && isString(did.type)) {
                    var type = did.type,
                        payload = did.payload,
                        rest2 = objectWithoutProperties(did, ['type', 'payload']);

                    dispatch(_extends({
                        type: did.type,
                        payload: isUndefined(payload) ? limitData : isFunction(payload) ? payload(limitData) : payload
                    }, rest2));
                } else if (isString(did)) {
                    dispatch({
                        type: did,
                        payload: limitData
                    });
                }

                dispatch({
                    type: RE_LOADING_NAME + '/__SET_LOADING_ACTION__',
                    payload: {
                        timestamp: timestamp,
                        data: defineProperty({}, requestName, false)
                    }
                });
                return limitData;
            }).catch(function (err) {
                if (isFunction(mergeError)) {
                    mergeError(err);
                } else if (isString(mergeError)) {
                    dispatch(_extends({
                        type: mergeError
                    }, rest));
                }
            });
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

function isEpic(type, RE) {
    if (!type || typeof type !== 'string') return false;

    if (RE._epics[type]) {
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
                // 如果为空则不继续执行
                if (Object.values(rest).length) next(rest);
            }
        };
    };
});

var actionSubject$ = new Subject().pipe(observeOn(queueScheduler));
var stateSubject$ = new Subject().pipe(observeOn(queueScheduler));
var action$ = new ActionsObservable(actionSubject$);

var observableMiddlevare = (function (RE, store) {
    var dispatch = store.dispatch,
        getState = store.getState;

    var state$ = new StateObservable(stateSubject$, getState());
    return function (next) {
        return function (action) {
            if (isFunction(action)) {
                action(dispatch, getState);
                return;
            }
            var __RE_OBSERVABLE_RESOLVE__ = action.__RE_OBSERVABLE_RESOLVE__,
                __RE_OBSERVABLE_REJECT__ = action.__RE_OBSERVABLE_REJECT__,
                rest = objectWithoutProperties(action, ['__RE_OBSERVABLE_RESOLVE__', '__RE_OBSERVABLE_REJECT__']);


            if (isFunction(__RE_OBSERVABLE_RESOLVE__) && isFunction(__RE_OBSERVABLE_REJECT__)) {
                var fns = RE._epics[rest.type];
                if (isFunction(fns)) {
                    try {
                        __RE_OBSERVABLE_RESOLVE__(epicEnhance(fns)(action$, state$));
                    } catch (e) {
                        __RE_OBSERVABLE_REJECT__(e);
                    }
                } else {
                    console$1.warn(rest.type + ' must be function!');
                    __RE_OBSERVABLE_REJECT__(new Error());
                }
            } else {
                if (Object.values(rest).length) next(rest);
            }
        };
    };
});

var createReducer = function createReducer(initialState, handlers) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
};

function injectAsyncReducers(asyncReducers, initialState) {
    var flag = false;

    if (asyncReducers) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.entries(asyncReducers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;

                var _ref2 = slicedToArray(_ref, 2);

                var n = _ref2[0];
                var m = _ref2[1];

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
                var _ref3 = _step2.value;

                var _ref4 = slicedToArray(_ref3, 2);

                var n = _ref4[0];
                var m = _ref4[1];

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

function injectAsyncEpics(epics, epicMiddleware) {
    if (epics) {
        var epic$ = new BehaviorSubject(combineEpics.apply(undefined, toConsumableArray(Object.entries(epics).reduce(function (r, _ref5) {
            var _ref6 = slicedToArray(_ref5, 2),
                n = _ref6[0],
                _ref6$ = _ref6[1],
                m = _ref6$ === undefined ? {} : _ref6$;

            RE.asyncEpics[n] = m;
            return [].concat(toConsumableArray(r), toConsumableArray(Object.values(m).map(function (v) {
                return epicEnhance(v);
            })));
        }, []))));

        var rootEpic = function rootEpic(action$, state$) {
            return epic$.pipe(mergeMap(function (epic) {
                return epic(action$, state$);
            }));
        };

        epicMiddleware.run(rootEpic);
    }
}

function registerModel(sagaMiddleware, epicMiddleware, models) {
    var deal = (isFunction(models) ? [models(pick(RE, ['pull', 'push', 'request']))] : Array.isArray(models) ? models : [models]).filter(function (model) {
        if (!isObject(model)) {
            console$1.warn('model 必须导出对象，请检查！');
            return false;
        }
        var namespace = model.namespace;

        if (isUndefined(namespace)) {
            console$1.warn('namespace 必填并且唯一，请检查！');
            return false;
        }

        RE._models.push(namespace);
        return true;
    }).reduce(function (r, _ref7) {
        var namespace = _ref7.namespace,
            _ref7$effects = _ref7.effects,
            effects = _ref7$effects === undefined ? {} : _ref7$effects,
            _ref7$reducers = _ref7.reducers,
            reducers = _ref7$reducers === undefined ? {} : _ref7$reducers,
            _ref7$state = _ref7.state,
            state = _ref7$state === undefined ? {} : _ref7$state,
            _ref7$epics = _ref7.epics,
            epics = _ref7$epics === undefined ? {} : _ref7$epics;

        var dealSagas = addNameSpace(effects, namespace);
        var dealEpics = addNameSpace(epics, namespace);
        var dealReducers = addNameSpace(reducers, namespace);

        RE._effects = _extends({}, RE._effects, dealSagas);

        RE._epics = _extends({}, RE._epics, dealEpics);
        return {
            state: _extends({}, r.state || {}, defineProperty({}, namespace, state)),
            sagas: _extends({}, r.sagas || {}, defineProperty({}, namespace, dealSagas)),
            reducers: _extends({}, r.reducers || {}, defineProperty({}, namespace, dealReducers)),
            epics: _extends({}, r.epics || {}, defineProperty({}, namespace, dealEpics))
        };
    }, {});

    if (!deal.sagas && !deal.epics) return;

    injectAsyncReducers(deal.reducers, deal.state);
    injectAsyncEpics(deal.epics, epicMiddleware);
    injectAsyncSagas(Object.entries(deal.sagas).reduce(function (r, _ref8) {
        var _ref9 = slicedToArray(_ref8, 2),
            name = _ref9[0],
            fns = _ref9[1];

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
                                                return all([].concat(toConsumableArray(Object.entries(fns).map(function (_ref10) {
                                                    var _ref11 = slicedToArray(_ref10, 2),
                                                        n = _ref11[0],
                                                        m = _ref11[1];

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

var AsyncComponent = (function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var isMore = isFunction(params);

    var ComponentLoading = RE.ComponentLoading;

    var defaultParams = {
        loading: function loading() {
            return React.createElement(ComponentLoading, null);
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
            loader: (model ? isArray(model) ? model : [model] : []).reduce(function (r, v, i) {
                return _extends({}, r, defineProperty({}, i, v));
            }, {
                component: component
            }),
            render: function render(_ref, props) {
                var component = _ref.component,
                    models = objectWithoutProperties(_ref, ['component']);

                if (!component) return null;
                var ReturnCompoment = component.default;
                models && Object.values(models).forEach(function (v) {
                    return RE.registerModel(v.default);
                });
                return React.createElement(ReturnCompoment, _extends({}, props2, props));
            }
        }));
    }
});

var temp$1 = {};

var loadingModel = {
    namespace: RE_LOADING_NAME,
    epics: {
        __SET_LOADING_ACTION__: function __SET_LOADING_ACTION__(epic$) {
            return epic$.pipe(map(function (_ref) {
                var _ref$payload = _ref.payload,
                    timestamp = _ref$payload.timestamp,
                    data = _ref$payload.data;
                return {
                    type: RE_LOADING_NAME + '/__SET_SUCCESS__',
                    payload: Object.entries(data).reduce(function (r, _ref2) {
                        var _ref3 = slicedToArray(_ref2, 2),
                            k = _ref3[0],
                            v = _ref3[1];

                        if (v) {
                            Reflect.set(temp$1, k, _extends({}, temp$1[k] || {}, defineProperty({}, timestamp, v)));
                        } else {
                            Reflect.deleteProperty(temp$1[k], timestamp);
                        }

                        var curr = Object.values(temp$1[k] || {});
                        return _extends({}, r, defineProperty({}, k, curr.length ? curr.some(function (o) {
                            return o;
                        }) : false));
                    }, {})
                };
            }));
        }
    },
    reducers: {
        __SET_SUCCESS__: function __SET_SUCCESS__(state, _ref4) {
            var payload = _ref4.payload;
            return _extends({}, state, payload);
        }
    }
};

// 创建 router histroy 中间件
var historyMiddleware = routerMiddleware(createHistory());

// 创建saga中间件
var sagaMiddleware = createSagaMiddleware();

// 创建epic中间件
var epicMiddleware = createEpicMiddleware();

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
        _ref$models = _ref.models,
        models = _ref$models === undefined ? [] : _ref$models,
        _ref$middlewares = _ref.middlewares,
        middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares,
        requestCallback = _ref.requestCallback,
        requestError = _ref.requestError,
        resultLimit = _ref.resultLimit,
        _ref$warehouse = _ref.warehouse,
        warehouse = _ref$warehouse === undefined ? [] : _ref$warehouse,
        _ref$loading = _ref.loading,
        loading = _ref$loading === undefined ? 'wave' : _ref$loading,
        _ref$api = _ref.api,
        api = _ref$api === undefined ? {} : _ref$api;

    var _loadFormat = loadFormat(loading),
        _loadFormat2 = slicedToArray(_loadFormat, 2),
        RequestLoading = _loadFormat2[0],
        ComponentLoading = _loadFormat2[1];

    var _api$name = api.name,
        name = _api$name === undefined ? SERVE_NAME : _api$name,
        apiParams = objectWithoutProperties(api, ['name']);


    Object.entries({
        __warehouse__: warehouse.reduce(function (r, v) {
            return _extends(defineProperty({}, v, {}), r);
        }, _extends({}, !isEmpty(apiParams) && defineProperty({}, name, apiManage.init(apiParams)), defineProperty({}, TOP_WAREHOUSE_NAME, {}))),
        _effects: {},
        _epics: {},
        _reducers: {},
        _models: [],
        asyncReducers: { route: routerReducer },
        asyncSagas: {},
        asyncEpics: {},
        registerModel: registerModel.bind(null, sagaMiddleware, epicMiddleware),
        AsyncComponent: AsyncComponent,
        Loading: Loading$1,

        RequestLoading: RequestLoading,
        ComponentLoading: ComponentLoading
    }).forEach(function (_ref3) {
        var _ref4 = slicedToArray(_ref3, 2),
            n = _ref4[0],
            m = _ref4[1];

        RE[n] = m;
    });

    // 中间件列表
    var middleware2 = [historyMiddleware, sagaMiddleware, epicMiddleware, requestMiddleware.bind(null, RE, {
        requestCallback: requestCallback,
        requestError: requestError,
        resultLimit: resultLimit
    }), promiseMiddleware.bind(null, RE), observableMiddlevare.bind(null, RE)].concat(toConsumableArray(middlewares || []));

    var devtools = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function () {
        return function (noop) {
            return noop;
        };
    };

    RE.__store__ = createStore(combineReducers(_extends({}, reducers, RE.asyncReducers)
    // route: routerReducer
    ), state, compose.apply(undefined, [applyMiddleware.apply(undefined, toConsumableArray(middleware2)), devtools()]));

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

    RE.dispatch = RE.__store__.dispatch;
    RE.getState = RE.__store__.getState

    // 注入默认model
    ;[].concat(toConsumableArray(isArray(models) ? models : [models]), [loadingModel]).forEach(function (v) {
        return RE.registerModel(v);
    });

    return {
        Provider: Provider2
    };
}

var component = {
    Loading: Loading$1
};

export { component, Install, Push, Pull, Model, Request, withEnhance, configureStore as init, Loading$1 as Loading, AsyncComponent as asyncComponent };
