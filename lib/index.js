import React from 'react';
import { ofType, combineEpics, createEpicMiddleware } from 'redux-observable';
import pick from 'lodash.pick';
import { bindActionCreators, combineReducers, createStore, applyMiddleware, compose } from 'redux';
export { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
export { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { put, call, select, fork, takeLatest, all } from 'redux-saga/effects';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import apiManage, { getService } from 'api-manage';
import Loadable from 'react-loadable';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'babel-regenerator-runtime';
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
var isBoolean = function isBoolean(o) {
    return getType(o) === 'boolean';
};
var isNumber = function isNumber(o) {
    return getType(o) === 'number';
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

var css = ".RE-LOADING-CONTAINER {\n    position: relative\n}\n\n.RE-LOADING-CONTAINER > * {\n    opacity: 0.5;\n    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"0.8\" /></filter></svg>#filter');\n    -webkit-filter: blur(0.8px);\n            filter: blur(0.8px);\n    pointer-events: none;\n}\n\n.RE-LOADING-CONTAINER > .RE-LOADING-WRAP {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    max-height: 300px;\n    text-align: center;\n    opacity: 1;\n    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feGaussianBlur stdDeviation=\"0\" /></filter></svg>#filter');\n    -webkit-filter: blur(0);\n            filter: blur(0);\n    pointer-events: auto;\n    z-index: 5\n}\n\n.RE-LOADING-CONTAINER > .RE-LOADING-WRAP::after {\n    content: '';\n    display: inline-block;\n    width: 0;\n    height: 100%;\n    line-height: 0;\n    vertical-align: middle;\n}\n\n.RE-LOADING-CONTAINER > .RE-LOADING-WRAP > :first-child {\n    display: inline-block;\n    vertical-align: middle\n}\n\n.RE-LOADING-CONTAINER > .RE-LOADING-WRAP > :first-child > .RE-LOADING {\n    display: inline-block;\n    vertical-align: middle;\n}\n\n.RE-LOADING.BLOCK {\n    display: block;\n    text-align: center\n}\n\n.RE-LOADING.BLOCK > :first-child {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    background-color: #1890ff;\n    -webkit-animation: rotateplane 1.2s infinite ease-in-out;\n            animation: rotateplane 1.2s infinite ease-in-out;\n}\n\n@-webkit-keyframes rotateplane {\n    0% {\n        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    }\n    50% {\n        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    }\n    100% {\n        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    }\n}\n\n@keyframes rotateplane {\n    0% {\n        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    }\n    50% {\n        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n                transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    }\n    100% {\n        -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n                transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    }\n}\n\n.RE-LOADING.WAVE {\n    display: block;\n    text-align: center;\n    height: 30px;\n    color: #1890ff\n}\n\n.RE-LOADING.WAVE > * {\n    background-color: currentcolor;\n    width: 4px;\n    height: 100%;\n    margin: 0 1px;\n    display: inline-block;\n    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\n            animation: stretchdelay 1.2s infinite ease-in-out;\n}\n\n.RE-LOADING.WAVE > :nth-child(2) {\n    -webkit-animation-delay: -1.1s;\n            animation-delay: -1.1s;\n}\n\n.RE-LOADING.WAVE > :nth-child(3) {\n    -webkit-animation-delay: -1s;\n            animation-delay: -1s;\n}\n\n.RE-LOADING.WAVE > :nth-child(4) {\n    -webkit-animation-delay: -0.9s;\n            animation-delay: -0.9s;\n}\n\n.RE-LOADING.WAVE > :nth-child(5) {\n    -webkit-animation-delay: -0.8s;\n            animation-delay: -0.8s;\n}\n\n@-webkit-keyframes stretchdelay {\n    0%,\n    40%,\n    100% {\n        -webkit-transform: scaleY(0.4);\n                transform: scaleY(0.4);\n    }\n    20% {\n        -webkit-transform: scaleY(1);\n                transform: scaleY(1);\n    }\n}\n\n@keyframes stretchdelay {\n    0%,\n    40%,\n    100% {\n        -webkit-transform: scaleY(0.4);\n                transform: scaleY(0.4);\n    }\n    20% {\n        -webkit-transform: scaleY(1);\n                transform: scaleY(1);\n    }\n}\n\n.RE-LOADING.CRICLE {\n    display: block;\n    text-align: center;\n    min-width: 30px;\n    height: 30px;\n    position: relative\n}\n\n.RE-LOADING.CRICLE > * {\n    width: 30px;\n    height: 100%;\n    border-radius: 50%;\n    background-color: #1890ff;\n    opacity: 0.6;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    -webkit-animation: bounce 2s infinite ease-in-out;\n            animation: bounce 2s infinite ease-in-out;\n}\n\n.RE-LOADING.CRICLE > :last-child {\n    -webkit-animation-delay: -1s;\n            animation-delay: -1s;\n}\n\n@-webkit-keyframes bounce {\n    0%,\n    100% {\n        -webkit-transform: scale(0);\n                transform: scale(0);\n    }\n    50% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n}\n\n@keyframes bounce {\n    0%,\n    100% {\n        -webkit-transform: scale(0);\n                transform: scale(0);\n    }\n    50% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n}\n";
styleInject(css);

var LOADING_TYPE = [React.createElement(
    'span',
    { className: 'RE-LOADING WAVE' },
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null)
), React.createElement(
    'span',
    { className: 'RE-LOADING BLOCK' },
    React.createElement('span', null)
), React.createElement(
    'span',
    { className: 'RE-LOADING CRICLE' },
    React.createElement('span', null),
    React.createElement('span', null)
)];

var Loading = function Loading(_ref) {
    var type = _ref.type;

    return LOADING_TYPE[type] ? LOADING_TYPE[type] : null;
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
 * 返回loading组件 [请求loading， 组件loading]
 *
 * @param {*} arr
 * @return []
 */
var dealArray = function dealArray(arr) {
    return arr.map(function (v) {
        return React.isValidElement(v) ? v : isBoolean(v) && v || isString(v) || isNumber(v) ? React.createElement(Loading, { type: '' + v }) : null;
    });
};
/**
 * 统一处理传进来的非函数值
 *
 * @param {*} data
 * @returns
 */
var tranferArray = function tranferArray(data) {
    var temp = data;
    if (isArray(data)) {
        var size = data.length;
        if (size >= 2) {
            return dealArray(data.slice(0, 2));
        } else {
            temp = !size ? null : data;
        }
    }
    if (isFunction(data)) {
        temp = null;
    }
    return dealArray(Array(2).fill(temp));
};

/**
 * 返回loading组件
 *
 *
 * @param {*} params
 * function: 则执行, 返回值为 function 不显示 否则 对应下面的逻辑
 * object: 会取里面的type 作为目标 执行下面的逻辑，其他的参数带出
 * array: 为空不显示 数量为1 则复制一份 大于等于2 则去前两个
 * boolean: true 显示默认1， fasle 则不显示
 * string/number: 如果是默认编号 则显示 否则 不显示
 * 其他: 不显示
 * @returns
 */
var loadFormat = (function (params) {
    var dealParams = [params, {}];
    if (isFunction(params)) {
        dealParams[0] = params();
    } else if (isObject(params)) {
        var _params$type = params.type,
            type = _params$type === undefined ? 0 : _params$type,
            rest = objectWithoutProperties(params, ['type']);

        dealParams = [type, rest];
    }
    return [].concat(toConsumableArray(tranferArray(dealParams[0])), [dealParams[1]]);
});

// 封装epic类型 调用
var epicEnhance = function epicEnhance(fn) {
  return function (action$) {
    for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      other[_key - 1] = arguments[_key];
    }

    return fn.apply(undefined, [action$.pipe(ofType(fn.name))].concat(other));
  };
};

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

var RE = {};

var pull = function pull() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
    }

    if (!params.length) {
        return {};
    }

    var _ref = params.length === 1 ? [TOP_WAREHOUSE_NAME].concat(params) : params.slice(0, 2),
        _ref2 = slicedToArray(_ref, 2),
        id = _ref2[0],
        limit = _ref2[1];

    var wh = RE.__warehouse__[id];

    if (!wh) {
        console.warn('\u4ED3\u5E93\u540D ' + id + ' \u5E76\u672A\u6CE8\u518C\uFF0C\u8BF7\u5728 init \u521D\u59CB\u5316\u4E2D\u6CE8\u518C warehouse\uFF01');
        return {};
    }

    return pick(wh, isArray(limit) ? limit : [limit]);
};
var push = function push() {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
    }

    if (!params.length) {
        return {};
    }

    var _ref3 = params.length === 1 ? [TOP_WAREHOUSE_NAME].concat(params) : params.slice(0, 2),
        _ref4 = slicedToArray(_ref3, 2),
        id = _ref4[0],
        limit = _ref4[1];

    var wh = RE.__warehouse__[id];
    if (!wh) {
        console.warn('\u4ED3\u5E93\u540D ' + id + ' \u5E76\u672A\u6CE8\u518C\uFF0C\u8BF7\u5728 init \u521D\u59CB\u5316\u4E2D\u6CE8\u518C warehouse\uFF01');
        return {};
    }

    return isObject(limit) ? Object.entries(limit).reduce(function (r, _ref5) {
        var _ref6 = slicedToArray(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        r[k] = v;
        return r;
    }, wh) : {};
};

var request = function request() {
    for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
    }

    return bindActionCreators(Object.entries(pull.apply(undefined, params)).reduce(function (r, _ref7) {
        var _ref8 = slicedToArray(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return _extends({}, r, defineProperty({}, k, function (params, callback) {
            return {
                request: v.bind(null, params),
                callback: callback
            };
        }));
    }, {}), RE.dispatch);
};
var Context = React.createContext();

RE.pull = pull;
RE.push = push;
RE.request = request;

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

var deal = function deal(l, p) {
    return isFunction(l) ? fn(p) : pick(p, isArray(l) ? l : [l]);
};

var Push = (function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
    }

    return function (WrappedComponent) {
        return function (props) {
            var id = params[0],
                _params$ = params[1],
                fn = _params$ === undefined ? [] : _params$,
                _params$2 = params[2],
                inline = _params$2 === undefined ? true : _params$2;

            if (params.length > 1) {
                push(id, deal(fn, props));
            } else {
                push(deal(id, props));
            }

            return React.createElement(WrappedComponent, _extends({}, props, inline && { push: push }));
        };
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
  var inline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (WrappedComponent) {
    return function (props) {
      return React.createElement(WrappedComponent, _extends({}, props, pull(id, limit), inline && { pull: pull }));
    };
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
    var inline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return function (WrappedComponent) {
        return function (props) {
            return React.createElement(WrappedComponent, _extends({}, props, request(id, limit), inline && { pull: pull }));
        };
    };
});

var withEnhance = (function (WrappedComponent) {
    return function (props) {
        return React.createElement(WrappedComponent, _extends({}, props, { enhance: { request: request, pull: pull, push: push } }));
    };
});

var Provider2 = function Provider2(props) {
    return (
        // <Context.Provider value={LOADING}>
        React.createElement(Provider, props)
        // </Context.Provider>

    );
};

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$1;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

var isArray_1 = isArray$1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);

  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

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

var PlaceholderLoading = (function (rl) {
    var Loading = function (_React$Component) {
        inherits(Loading, _React$Component);

        function Loading() {
            classCallCheck(this, Loading);
            return possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
        }

        createClass(Loading, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(np) {
                return !isEqual_1(np, this.props);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    _props$className = _props.className,
                    className = _props$className === undefined ? '' : _props$className,
                    _props$cover = _props.cover,
                    cover = _props$cover === undefined ? false : _props$cover,
                    content = _props.content,
                    children = _props.children,
                    update = _props.update,
                    _props$mask = _props.mask,
                    mask = _props$mask === undefined ? false : _props$mask,
                    _props$wrapClassName = _props.wrapClassName,
                    wrapClassName = _props$wrapClassName === undefined ? '' : _props$wrapClassName,
                    _props$wrapStyle = _props.wrapStyle,
                    wrapStyle = _props$wrapStyle === undefined ? {} : _props$wrapStyle;


                var childrenComponent = children ? children : null;

                if (update) {
                    var component = React.createElement(
                        'div',
                        { className: 'RE-LOADING-WRAP' },
                        React.createElement(
                            'div',
                            { className: className },
                            null,
                            cover ? null : rl,
                            content
                        )
                    );

                    return !isNull(rl) ? mask ? React.createElement(
                        'div',
                        _extends({ className: 'RE-LOADING-CONTAINER' + ' ' + wrapClassName }, wrapStyle),
                        childrenComponent,
                        component
                    ) : component : null;
                } else {
                    return mask ? React.createElement(
                        'div',
                        _extends({ className: 'RE-LOADING-WRAP' + ' ' + wrapClassName }, wrapStyle),
                        childrenComponent
                    ) : childrenComponent;
                }
            }
        }]);
        return Loading;
    }(React.Component);

    Loading.propTypes = ['include', 'exclude'].reduce(function (r, v) {
        return _extends({}, r, defineProperty({}, v, PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])));
    }, { content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element), PropTypes.element]) });

    return connect(function (store) {
        return store['@@LOADING'] || {};
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
});

var take = function take(obj, path) {
    return get(obj, path);
};

var requestMiddleware = (function (RE, _ref, store) {
    var requestCallback = _ref.requestCallback,
        requestError = _ref.requestError,
        resultLimit = _ref.resultLimit;
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
                __RE_PROMISE_RESOLVE__ = action.__RE_PROMISE_RESOLVE__,
                __RE_PROMISE_REJECT__ = action.__RE_PROMISE_REJECT__,
                rest = objectWithoutProperties(action, ['request', 'will', 'error', 'callback', 'did', '__RE_PROMISE_RESOLVE__', '__RE_PROMISE_REJECT__']);


            if (!request) {
                return isEffect(rest.type, RE) ? new Promise(function (resolve, reject) {
                    return next(_extends({
                        __RE_PROMISE_RESOLVE__: resolve,
                        __RE_PROMISE_REJECT__: reject
                    }, rest));
                }) : // : isEpic(rest.type, RE)
                // ? new Promise((resolve, reject) => {
                //       return next({
                //           __RE_OBSERVABLE_RESOLVE__: resolve,
                //           __RE_OBSERVABLE_REJECT__: reject,
                //           ...rest
                //       });
                //   })
                next(action);
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
                type: '@@LOADING/__SET_LOADING_ACTION__',
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
                    type: '@@LOADING/__SET_LOADING_ACTION__',
                    payload: {
                        timestamp: timestamp,
                        data: defineProperty({}, requestName, false)
                    }
                });
            }).catch(function (err) {
                if (isFunction(mergeError)) {
                    mergeError(err);
                } else if (isString(mergeError)) {
                    dispatch(_extends({
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
                // 如果为空则不继续执行
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
    var deal = (isFunction(models) ? [models(getService())] : Array.isArray(models) ? models : [models]).filter(function (model) {
        if (!isObject(model)) {
            console.warn('model \u5FC5\u987B\u5BFC\u51FA\u5BF9\u8C61\uFF0C\u8BF7\u68C0\u67E5\uFF01');
            return false;
        }
        var namespace = model.namespace;

        if (isUndefined(namespace)) {
            console.warn('namespace \u5FC5\u586B\u5E76\u4E14\u552F\u4E00\uFF0C\u8BF7\u68C0\u67E5\uFF01');
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

    if (!deal.sagas) return;

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

var AsyncComponent = (function (cl) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var isMore = isFunction(params);

    var defaultParams = {
        loading: function loading() {
            return cl;
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

var temp = {};

var loadingModel = {
    namespace: '@@LOADING',
    state: {},
    effects: {
        __SET_LOADING_ACTION__: /*#__PURE__*/regeneratorRuntime.mark(function __SET_LOADING_ACTION__(_ref, _ref2) {
            var _ref$payload = _ref.payload,
                timestamp = _ref$payload.timestamp,
                data = _ref$payload.data;
            var put$$1 = _ref2.put;
            return regeneratorRuntime.wrap(function __SET_LOADING_ACTION__$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            Object.entries(data).forEach(function (_ref3) {
                                var _ref4 = slicedToArray(_ref3, 2),
                                    k = _ref4[0],
                                    v = _ref4[1];

                                if (v) {
                                    temp = _extends({}, temp, defineProperty({}, k, _extends({}, temp[k] || {}, defineProperty({}, timestamp, v))));
                                } else {
                                    delete temp[k][timestamp];
                                }
                            });

                            _context.next = 3;
                            return put$$1({
                                type: '@@LOADING/__SET_SUCCESS__',
                                payload: Object.entries(data).reduce(function (r, _ref5) {
                                    var _ref6 = slicedToArray(_ref5, 2),
                                        k = _ref6[0],
                                        v = _ref6[1];

                                    var curr = Object.values(temp[k] || {});
                                    return _extends({}, r, defineProperty({}, k, curr.length ? curr.some(function (o) {
                                        return o;
                                    }) : false));
                                }, {})
                            });

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, __SET_LOADING_ACTION__, this);
        })
    },
    reducers: {
        __SET_SUCCESS__: function __SET_SUCCESS__(state, _ref7) {
            var payload = _ref7.payload;

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
        _ref$sagas = _ref.sagas,
        _ref$epics = _ref.epics,
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
        loading = _ref$loading === undefined ? 0 : _ref$loading,
        _ref$api = _ref.api,
        api = _ref$api === undefined ? {} : _ref$api;

    var _loadFormat = loadFormat(loading),
        _loadFormat2 = slicedToArray(_loadFormat, 2),
        rl = _loadFormat2[0],
        cl = _loadFormat2[1];

    var _api$name = api.name,
        name = _api$name === undefined ? SERVE_NAME : _api$name,
        apiParams = objectWithoutProperties(api, ['name']);


    Object.entries({
        __warehouse__: warehouse.reduce(function (r, v, i) {
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
        AsyncComponent: AsyncComponent.bind(null, cl),
        Loading: PlaceholderLoading(rl)
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
    }), promiseMiddleware.bind(null, RE)].concat(toConsumableArray(middlewares || []));

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

    // epicMiddleware.run(epics);

    // // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(
    //             require('../reducers') /*.default if you use Babel 6+ */
    //         )
    //     )
    // }

    RE.dispatch = RE.__store__.dispatch;
    RE.getState = RE.__store__.getState;

    RE.Provider = function (props) {
        return React.createElement(Provider2, _extends({}, props, { store: RE.__store__ }));
    };

    // 注入默认model
    [].concat(toConsumableArray(isArray(models) ? models : [models]), [loadingModel]).forEach(function (v) {
        return RE.registerModel(v);
    });

    return RE;
}

export { Install, Push, Pull, Model, Request, withEnhance, configureStore as init };
