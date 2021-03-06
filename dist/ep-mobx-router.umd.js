(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx'), require('query-string'), require('ep-tarantino'), require('react'), require('mobx-react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'query-string', 'ep-tarantino', 'react', 'mobx-react'], factory) :
  (factory((global.mobxRouter = global.mobxRouter || {}),global.mobx,global.queryString,global.tarantino,global.React,global.mobxReact));
}(this, (function (exports,mobx,queryString,tarantino,React,mobxReact) { 'use strict';

queryString = 'default' in queryString ? queryString['default'] : queryString;
tarantino = 'default' in tarantino ? tarantino['default'] : tarantino;
var React__default = 'default' in React ? React['default'] : React;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
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

var isObject = function isObject(obj) {
  return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj);
};
var getObjectKeys = function getObjectKeys(obj) {
  return isObject(obj) ? Object.keys(obj) : [];
};

var viewsForDirector = function viewsForDirector(views, store, parentView) {
  return getObjectKeys(views).reduce(function (obj, viewKey) {
    var view = views[viewKey];

    if (!view.childRoutes) {
      obj[view.path.replace(/\$/g, '?')] = {
        on: function on() {
          for (var _len = arguments.length, paramsArr = Array(_len), _key = 0; _key < _len; _key++) {
            paramsArr[_key] = arguments[_key];
          }

          view.setMatch(true);
          view.goTo(store, paramsArr);
        },
        after: function after() {
          return view.setMatch(false);
        }
      };
    } else {
      obj[view.path.replace(/\$/g, '?')] = _extends({}, viewsForDirector(view.childRoutes, store, view), {
        on: function on() {
          for (var _len2 = arguments.length, paramsArr = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            paramsArr[_key2] = arguments[_key2];
          }

          view.setMatch(true);
          view.goTo(store, paramsArr);
        },
        after: function after() {
          return view.setMatch(false);
        }
      });
    }

    view.ownPath = view.path;

    if (parentView) {
      view.path = ('' + parentView.path + view.path).replace('\/\/', '\/');
      view.originalPath = ('' + parentView.originalPath + view.originalPath).replace('\/\/', '\/');
    }

    return obj;
  }, {});
};

var getRegexMatches = function getRegexMatches(string, regexExpression, callback) {
  var match = void 0;
  while ((match = regexExpression.exec(string)) !== null) {
    callback(match);
  }
};

var paramRegex = /\/(:([^\/$]*)\$?|\/)/g;
var optionalRegex = /(\/:[^\/]*\$)/g;

var _class;
var _descriptor;
var _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Route = (_class = function () {

  //lifecycle methods
  function Route(props) {
    var _this = this;

    classCallCheck(this, Route);

    _initDefineProp(this, 'match', _descriptor, this);

    this.getParamsObject = function (paramsArray) {
      var params = [];

      getRegexMatches(_this.originalPath, paramRegex, function (_ref) {
        var _ref2 = slicedToArray(_ref, 1),
            paramKeyWithoutColon = _ref2[0];

        params.push(paramKeyWithoutColon);
      });

      return paramsArray.reduce(function (obj, paramValue, index) {
        if (!params[index]) return obj;
        obj[params[index].replace(/(\/:|\$)/g, '')] = paramValue;

        return obj;
      }, {});
    };

    _initDefineProp(this, 'setMatch', _descriptor2, this);

    getObjectKeys(props).forEach(function (propKey) {
      return _this[propKey] = props[propKey];
    });
    this.originalPath = this.path;

    //if there are optional parameters, replace the path with a regex expression
    this.path = this.path.indexOf('$') === -1 ? this.path : this.path.replace(optionalRegex, "/?([^/\!]*)");

    //bind
    this.replaceUrlParams = this.replaceUrlParams.bind(this);
    this.getParamsObject = this.getParamsObject.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  /*
   Sets the root path for the current path, so it's easier to determine if the route entered/exited or just some params changed
   Example: for '/' the root path is '/', for '/profile/:username/:tab' the root path is '/profile/'
   */


  //props


  createClass(Route, [{
    key: 'replaceUrlParams',


    /*
     replaces url params placeholders with params from an object
     Example: if url is /book/:id/page/:pageId and object is {id:100, pageId:200} it will return /book/100/page/200
     */
    value: function replaceUrlParams(params) {
      var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      params = mobx.toJS(params);
      queryParams = mobx.toJS(queryParams);

      var queryParamsString = queryString.stringify(queryParams).toString();
      var hasQueryParams = queryParamsString !== '';
      var newPath = this.originalPath;

      getRegexMatches(this.originalPath, paramRegex, function (_ref3) {
        var _ref4 = slicedToArray(_ref3, 3),
            fullMatch = _ref4[0],
            paramKey = _ref4[1],
            paramKeyWithoutColon = _ref4[2];

        var value = params[paramKeyWithoutColon];
        newPath = value ? newPath.replace(paramKey, value) : newPath.replace('/' + paramKey, '');
      });

      return ('' + newPath + (hasQueryParams ? '?' + queryParamsString : '')).toString();
    }

    /*
     converts an array of params [123, 100] to an object
     Example: if the current this.path is /book/:id/page/:pageId it will return {id:123, pageId:100}
     */

  }, {
    key: 'goTo',
    value: function goTo(store, paramsArr) {
      var paramsObject = this.getParamsObject(paramsArr);
      var queryParamsObject = queryString.parse(window.location.search);
      store.router.goTo(this, paramsObject, store, queryParamsObject);
    }
  }, {
    key: 'rootPath',
    get: function get() {
      if (!this.ownPath) return this.originalPath;
      if (this.ownPath.indexOf(':') !== -1) {
        return this.ownPath.split(':')[0];
      }

      return this.ownPath;
    }
  }]);
  return Route;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'match', [mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'rootPath', [mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'rootPath'), _class.prototype), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'setMatch', [mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (value) {
      _this2.match = value;
    };
  }
})), _class);

var _dec;
var _dec2;
var _class$1;
var _descriptor$1;
var _descriptor2$1;
var _descriptor3;
var _descriptor4;

function _initDefineProp$1(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var RouterStore = (_dec = mobx.observable.struct, _dec2 = mobx.observable.struct, (_class$1 = function () {
  function RouterStore() {
    classCallCheck(this, RouterStore);

    _initDefineProp$1(this, 'params', _descriptor$1, this);

    _initDefineProp$1(this, 'queryParams', _descriptor2$1, this);

    _initDefineProp$1(this, 'currentView', _descriptor3, this);

    _initDefineProp$1(this, 'goTo', _descriptor4, this);
  }

  createClass(RouterStore, [{
    key: 'currentPath',
    get: function get() {
      return this.currentView ? this.currentView.replaceUrlParams(this.params, this.queryParams) : '';
    }
  }]);
  return RouterStore;
}(), (_descriptor$1 = _applyDecoratedDescriptor$1(_class$1.prototype, 'params', [_dec], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2$1 = _applyDecoratedDescriptor$1(_class$1.prototype, 'queryParams', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor$1(_class$1.prototype, 'currentView', [mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor$1(_class$1.prototype, 'goTo', [mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this = this;

    return function (view, paramsObj, store, queryParamsObj) {
      var nextPath = view.replaceUrlParams(paramsObj, queryParamsObj);
      var pathChanged = nextPath !== _this.currentPath;

      if (!pathChanged) {
        return;
      }

      var rootViewChanged = !_this.currentView || _this.currentView.rootPath !== view.rootPath;
      var currentParams = mobx.toJS(_this.params);
      var currentQueryParams = mobx.toJS(_this.queryParams);

      var beforeExitResult = rootViewChanged && _this.currentView && _this.currentView.beforeExit ? _this.currentView.beforeExit(_this.currentView, currentParams, store, currentQueryParams) : true;
      if (beforeExitResult === false) {
        return;
      }

      var beforeEnterResult = rootViewChanged && view.beforeEnter ? view.beforeEnter(view, currentParams, store, currentQueryParams) : true;
      if (beforeEnterResult === false) {
        return;
      }

      rootViewChanged && _this.currentView && _this.currentView.onExit && _this.currentView.onExit(_this.currentView, currentParams, store, currentQueryParams);

      _this.currentView = view;
      _this.params = _extends({}, _this.params, mobx.toJS(paramsObj));
      _this.queryParams = mobx.toJS(queryParamsObj);
      var nextParams = mobx.toJS(paramsObj);
      var nextQueryParams = mobx.toJS(queryParamsObj);

      rootViewChanged && view.onEnter && view.match && view.onEnter(view, nextParams, store, nextQueryParams);
      !rootViewChanged && _this.currentView && view.match && _this.currentView.onParamsChange && _this.currentView.onParamsChange(_this.currentView, nextParams, store, nextQueryParams);
    };
  }
}), _applyDecoratedDescriptor$1(_class$1.prototype, 'currentPath', [mobx.computed], Object.getOwnPropertyDescriptor(_class$1.prototype, 'currentPath'), _class$1.prototype)), _class$1));

var createDirectorRouter = function createDirectorRouter(views, store) {
  return new tarantino.Router(_extends({}, viewsForDirector(views, store))).configure({
    html5history: true,
    recurse: 'forward',
    strict: false
  }).init();
};

var startRouter = function startRouter(views, store) {
  var router = createDirectorRouter(views, store);

  mobx.autorun(function () {
    var currentPath = store.router.currentPath;

    if (currentPath !== window.location.pathname) router.setRoute(currentPath);
  });
};

var _class$2;
var _class2;
var _descriptor$2;
var _descriptor2$2;
var _class4;

function _initDefineProp$2(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var AsyncComponent = mobxReact.observer(_class$2 = (_class2 = function (_Component) {
  inherits(AsyncComponent, _Component);

  function AsyncComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AsyncComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp$2(_this, 'isLoaded', _descriptor$2, _this), _initDefineProp$2(_this, 'component', _descriptor2$2, _this), _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AsyncComponent, [{
    key: 'load',
    value: function load() {
      var _this2 = this;

      this.props.async.then(function (component) {
        return mobx.runInAction(function () {
          _this2.component = component;_this2.isLoaded = true;
        });
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (process && process.env && process.env.NODE_ENV !== 'production') this.load(); // temp hack for hmr
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.load();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.isLoaded) {
        return React__default.createElement(
          this.component,
          null,
          this.props.children
        );
      }

      return React__default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);
  return AsyncComponent;
}(React.Component), (_descriptor$2 = _applyDecoratedDescriptor$2(_class2.prototype, 'isLoaded', [mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$2 = _applyDecoratedDescriptor$2(_class2.prototype, 'component', [mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2)) || _class$2;

var MobxRouter = mobxReact.observer(_class4 = function (_Component2) {
  inherits(MobxRouter, _Component2);

  function MobxRouter() {
    classCallCheck(this, MobxRouter);
    return possibleConstructorReturn(this, (MobxRouter.__proto__ || Object.getPrototypeOf(MobxRouter)).apply(this, arguments));
  }

  createClass(MobxRouter, [{
    key: 'getCurrentViewTree',
    value: function getCurrentViewTree(list) {
      var _this4 = this;

      return Object.keys(list).reduce(function (acc, key) {
        var route = list[key];

        if (!route || !route.match || acc.length >= 1) return acc;

        if (route.async && route.match) {
          if (route.childRoutes) {
            return [].concat(toConsumableArray(acc), [React__default.createElement(
              AsyncComponent,
              { key: key, async: route.async },
              _this4.getCurrentViewTree(route.childRoutes)
            )]);
          }

          return [].concat(toConsumableArray(acc), [React__default.createElement(AsyncComponent, { key: key, async: route.async })]);
        }

        var Component$$1 = route.component;

        if (route.childRoutes) {
          return [].concat(toConsumableArray(acc), [React__default.createElement(
            Component$$1,
            { key: key },
            _this4.getCurrentViewTree(route.childRoutes)
          )]);
        }

        return typeof route.component === 'function' ? [].concat(toConsumableArray(acc), [React__default.createElement(Component$$1, { key: key })]) : [].concat(toConsumableArray(acc), [Component$$1]);
      }, []);
    }
  }, {
    key: 'render',
    value: function render() {
      var routes = this.props.routes;


      return React__default.createElement(
        'div',
        null,
        this.getCurrentViewTree(routes)
      );
    }
  }]);
  return MobxRouter;
}(React.Component)) || _class4;

var Link = function Link(_ref) {
  var view = _ref.view,
      className = _ref.className,
      _ref$params = _ref.params,
      params = _ref$params === undefined ? {} : _ref$params,
      _ref$queryParams = _ref.queryParams,
      queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams,
      _ref$store = _ref.store,
      store = _ref$store === undefined ? {} : _ref$store,
      _ref$refresh = _ref.refresh,
      refresh = _ref$refresh === undefined ? false : _ref$refresh,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      children = _ref.children,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? children : _ref$title,
      _ref$router = _ref.router,
      router = _ref$router === undefined ? store.router : _ref$router;

  if (!router) {
    return console.error('The router prop must be defined for a Link component to work!');
  }
  return React__default.createElement(
    'a',
    {
      style: style,
      className: className,
      onClick: function onClick(e) {
        var middleClick = e.which == 2;
        var cmdOrCtrl = e.metaKey || e.ctrlKey;
        var openinNewTab = middleClick || cmdOrCtrl;
        var shouldNavigateManually = refresh || openinNewTab || cmdOrCtrl;

        if (!shouldNavigateManually) {
          e.preventDefault();
          router.goTo(view, params, store, queryParams);
        }
      },
      href: view && view.replaceUrlParams(params, queryParams) },
    title
  );
};

var Link$1 = mobxReact.observer(Link);

//components

exports.Route = Route;
exports.MobxRouter = MobxRouter;
exports.Link = Link$1;
exports.RouterStore = RouterStore;
exports.startRouter = startRouter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
