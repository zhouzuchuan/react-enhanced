'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var Spinner = _interopDefault(require('react-spinkit'));
require('redux-observable');
var pick = _interopDefault(require('lodash.pick'));
var redux = require('redux');
var immutable = require('immutable');
require('babel-regenerator-runtime');
var apiManage = _interopDefault(require('api-manage'));
var isEmpty = _interopDefault(require('lodash.isempty'));
var Loadable = _interopDefault(require('react-loadable'));
var get = _interopDefault(require('lodash.get'));
var PropTypes = _interopDefault(require('prop-types'));
var reactRedux = require('react-redux');
var isEqual = _interopDefault(require('lodash.isequal'));
var classnames = _interopDefault(require('classnames'));

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

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
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

var console$1 = window.console;

/**
 * 默认字段
 *
 */

// api 默认仓库名
var SERVE_NAME = '$service';

// 顶级仓库名
var TOP_WAREHOUSE_NAME = Symbol();

// loading model 名称
var LOADING_MODEL_NAME = 'Enhnaced-Loading-Model';

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
        return limit === true ? wh : pick(wh, isArray(limit) ? limit : [limit]);
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

    return redux.bindActionCreators(Object.entries(pull.apply(undefined, params)).reduce(function (r, _ref5) {
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

var loadingModel = {
    namespace: LOADING_MODEL_NAME,
    state: immutable.fromJS({}),
    reducers: {
        remove: function remove(state, _ref) {
            var payload = _ref.payload;
            return state.deleteIn(payload);
        },
        set: function set(state, _ref2) {
            var payload = _ref2.payload;
            return state.setIn(payload, 1);
        }
    }
};

function configureStore(_ref) {
    var store = _ref.store,
        registerModel = _ref.registerModel;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$models = _ref2.models,
        models = _ref2$models === undefined ? [] : _ref2$models,
        _ref2$warehouse = _ref2.warehouse,
        warehouse = _ref2$warehouse === undefined ? [] : _ref2$warehouse,
        _ref2$loading = _ref2.loading,
        loading = _ref2$loading === undefined ? 'wave' : _ref2$loading,
        _ref2$api = _ref2.api,
        api = _ref2$api === undefined ? {} : _ref2$api;

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
        RequestLoading: RequestLoading,
        ComponentLoading: ComponentLoading
    }).forEach(function (_ref4) {
        var _ref5 = slicedToArray(_ref4, 2),
            n = _ref5[0],
            m = _ref5[1];

        RE[n] = m;
    });

    RE.__store__ = store;

    RE.registerModel = function (fns) {
        return registerModel(isFunction(fns) ? [fns(pick(RE, ['pull', 'push', 'request']))] : fns);
    };

    RE.dispatch = RE.__store__.dispatch
    // RE.getState = RE.__store__.getState

    // 注入默认model
    ;[].concat(toConsumableArray(isArray(models) ? models : [models]), [loadingModel]).forEach(function (v) {
        return RE.registerModel(v);
    });
}

/**
 * 异步加载组件以及注入model
 * */
var asyncComponent = (function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var loader = {};
    var ComponentLoading = RE.ComponentLoading;

    var temp = false;

    if (isFunction(params)) {
        loader = {
            component: params
        };
    } else if (isObject(params)) {
        var component = params.component,
            _params$model = params.model,
            model = _params$model === undefined ? [] : _params$model;

        // //  提前注入model

        Promise.all([].concat(toConsumableArray(isArray(model) ? model : [model])).map(function (v) {
            return v();
        })).then(function (data) {
            if (data.length) {
                Object.values(data).forEach(function (v) {
                    return RE.registerModel(v.default);
                });
                temp = true;
            }
        });

        loader = (isArray(model) ? model : [model]).reduce(function (r, v, i) {
            return _extends({}, r, defineProperty({}, 'model' + i, v));
        }, { component: component });
    }

    return Loadable.Map({
        loading: function loading() {
            return React.createElement(ComponentLoading, null);
        },

        loader: loader,
        render: function render(_ref, props) {
            var component = _ref.component,
                models = objectWithoutProperties(_ref, ['component']);

            var Component = component.default;

            !temp && models && Object.entries(models).forEach(function (_ref2) {
                var _ref3 = slicedToArray(_ref2, 2),
                    k = _ref3[0],
                    v = _ref3[1];

                return k.startsWith('model') && RE.registerModel(v.default);
            });

            return React.createElement(Component, props);
        }
    });
});

/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

var lodash_last = last;

var registerModel = function registerModel() {
    if (RE.registerModel) {
        return RE.registerModel.apply(RE, arguments);
    }
    console$1.error('registerModel 不存在，请先 init！');
};

/**
 *
 * 获取 immutable对象 数据
 *
 * @param {*} source
 * immutable对象
 *
 * @param {Array} pathArr
 * 选取路径集合，采用.拼接路径
 * 如果子项是 array 则返回的数据经过toJS转换
 *
 * @return {*} 默认返回的是取到的immutable数据
 *
 * @example
 *
 * 获取嵌套数据
 * immutableSelector(app, ['data.list'])
 * 多个数据
 * immutableSelector(app, ['name', 'age'])
 * 获取的Imuutable数据 经过toJS处理
 * immutableSelector(app, [['children']])
 *
 */
var immutableSelector = function immutableSelector(source, pathArr) {
    return pathArr.reduce(function (r, v) {
        var isJS = Array.isArray(v);
        var path = (isJS ? v.join('.') : v).split('.');
        var key = lodash_last(lodash_last(path).split('|'));
        var data = source.getIn(path.map(function (v) {
            return v.split('|')[0];
        }));
        return _extends({}, r, defineProperty({}, key, isJS ? data.toJS() : data));
    }, {});
};

var index = {
    immutableSelector: immutableSelector,
    registerModel: registerModel
};

/**
 * 使用仓库
 * */
var useWarehouse = function useWarehouse() {
    var warehouse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TOP_WAREHOUSE_NAME;

    var store = RE.__warehouse__[warehouse];

    if (!store) {
        console.warn('\u4ED3\u5E93\u540D ' + warehouse + ' \u5E76\u672A\u6CE8\u518C\uFF0C\u8BF7\u5728 init \u521D\u59CB\u5316\u4E2D\u6CE8\u518C warehouse\uFF01');
        return Array(3).fill(null);
    }

    return [store, push.bind(null, warehouse), pull.bind(null, warehouse)];
};

/**
 * 使用封装的request action
 * */
var useRequest = function useRequest() {
    var warehouse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SERVE_NAME;
    return request(warehouse, true);
};

/**
 * 使用封装Action
 * */
var useAction = function useAction(type) {
    return function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return RE.dispatch(_extends({ type: type }, params));
    };
};

var index$1 = {
    useWarehouse: useWarehouse,
    useRequest: useRequest,
    useAction: useAction
};

var take = function take(obj, path) {
    return get(obj, path);
};

var requestMiddleware = (function (_ref, store) {
    var requestCallback = _ref.requestCallback,
        _ref$requestError = _ref.requestError,
        requestError = _ref$requestError === undefined ? function () {
        return null;
    } : _ref$requestError,
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
                failCallback = action.failCallback,
                did = action.did,
                rest = objectWithoutProperties(action, ['request', 'will', 'error', 'callback', 'failCallback', 'did']);


            if (!request) {
                return next(action);
            }

            if (!isFunction(request)) {
                console$1.error('request must be a function!');
                next(action);
                return;
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
                type: LOADING_MODEL_NAME + '/set',
                payload: [requestName, timestamp]
            });

            return request().then(function (result) {
                var data = result.data;

                var transferData = data || result;
                var limitData = isString(resultLimit) ? take(transferData, resultLimit) : isArray(resultLimit) ? resultLimit.reduce(function (r, v) {
                    if (!isString(v)) {
                        console$1.warn(JSON.stringify(v) + ' \u4E0D\u7B26\u5408\u5B57\u6BB5\u622A\u53D6\u89C4\u5219\uFF1B\u8BF7\u4F7F\u7528"result.data"\u8FD9\u79CD\u89C4\u5219\uFF01');
                        return r;
                    }
                    return [].concat(toConsumableArray(r), [take(transferData, v) || []]);
                }, []) : transferData;

                if (isUndefined(limitData)) {
                    console$1.warn('设置的 resultLimit 获取不到有效的数据');
                }

                var throttle = true;

                if (isFunction(requestCallback)) {
                    throttle = requestCallback(transferData, rest, dispatch, getState);
                }

                // 如果没有请求不合格 则返回
                if (!throttle) {
                    dispatch({
                        type: LOADING_MODEL_NAME + '/remove',
                        payload: [requestName, timestamp]
                    });
                    if (isFunction(failCallback)) {
                        failCallback(transferData);
                    }
                    return;
                } else {
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
                            payload: isUndefined(payload) ? limitData : isFunction(payload) ? payload(limitData) : payload
                        }, rest2, {
                            type: type
                        }));
                    } else if (isString(did)) {
                        dispatch({
                            type: did,
                            payload: limitData
                        });
                    }

                    dispatch({
                        type: LOADING_MODEL_NAME + '/remove',
                        payload: [requestName, timestamp]
                    });
                    return limitData;
                }
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

var index$2 = {
    requestMiddleware: requestMiddleware
};

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

var _class, _temp;

var returnArray = function returnArray(v) {
    var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : immutable.Map();
    return (isArray(v) ? v : [v]).some(function (o) {
        return !(s.get(o) || immutable.Map()).isEmpty();
    });
};

var returnUpdate = function returnUpdate(include, exclude, store) {
    if (isNull(include)) {
        return isNull(exclude) ? true : !returnArray(exclude, store);
    } else {
        return returnArray(include, store);
    }
};

/**
 * Loading 组件
 * include/exclude (string/string) 默认为请求全触发，设置值且值为字符串, 转成数组，判断request中间层的函数名是否在数组中 有则触发
 *
 * */
var Loading = reactRedux.connect(function (store) {
    return {
        loadingStore: store[LOADING_MODEL_NAME]
    };
}, null, function (_ref2, action, _ref) {
    var loadingStore = _ref2.loadingStore;
    var _ref$include = _ref.include,
        include = _ref$include === undefined ? null : _ref$include,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === undefined ? null : _ref$exclude,
        rest = objectWithoutProperties(_ref, ['include', 'exclude']);

    return _extends({}, rest, {
        update: returnUpdate(include, exclude, loadingStore)
    });
})((_temp = _class = function (_React$Component) {
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
                {
                    className: classnames('RE_loading_wrap', defineProperty({
                        RE_update: update
                    }, wrapClassName, wrapClassName)),
                    style: wrapStyle
                },
                children,
                createChldren
            ) : update ? createChldren : children;
        }
    }]);
    return Loading;
}(React.Component), _class.propTypes = ['include', 'exclude'].reduce(function (r, v) {
    return _extends({}, r, defineProperty({}, v, PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])));
}, {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element), PropTypes.element])
}), _temp));

var index$3 = {
    Loading: Loading
};

exports.bindActionCreators = redux.bindActionCreators;
exports.connect = reactRedux.connect;
exports.Install = Install;
exports.Push = Push;
exports.Pull = Pull;
exports.Model = Model;
exports.Request = Request;
exports.withEnhance = withEnhance;
exports.init = configureStore;
exports.LOADING_MODEL_NAME = LOADING_MODEL_NAME;
exports.asyncComponent = asyncComponent;
exports.tools = index;
exports.hooks = index$1;
exports.middlewares = index$2;
exports.components = index$3;
