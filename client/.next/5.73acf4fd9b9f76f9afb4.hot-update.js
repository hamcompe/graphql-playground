webpackHotUpdate(5,{

/***/ 681:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initApollo;

var _reactApollo = __webpack_require__(565);

var _isomorphicFetch = __webpack_require__(682);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _client = __webpack_require__(683);

var _ws = __webpack_require__(694);

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = _isomorphicFetch2.default;
}

function create(initialState) {
  var networkInterface = (0, _reactApollo.createNetworkInterface)({
    uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
    opts: {
      // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  });
  var wsClient = new _client.SubscriptionClient('ws://localhost:4000/subscriptions', {
    reconnect: true
  }, _ws2.default);
  var networkInterfaceWithSubscription = (0, _client.addGraphQLSubscriptions)(networkInterface, wsClient);

  return new _reactApollo.ApolloClient({
    initialState: initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    // networkInterface: wsClient
    networkInterface: networkInterfaceWithSubscription
  });
}

function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/vannizer/Projects/subscription-playground/client/lib/initApollo.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/vannizer/Projects/subscription-playground/client/lib/initApollo.js"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54), __webpack_require__(32)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS43M2FjZjRmZDliOWY3NmY5YWZiNC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL2luaXRBcG9sbG8uanM/NDQ1OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9DbGllbnQsIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UgfSBmcm9tICdyZWFjdC1hcG9sbG8nXG5pbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCdcbmltcG9ydCB7XG4gIFN1YnNjcmlwdGlvbkNsaWVudCxcbiAgYWRkR3JhcGhRTFN1YnNjcmlwdGlvbnNcbn0gZnJvbSAnc3Vic2NyaXB0aW9ucy10cmFuc3BvcnQtd3MvZGlzdC9jbGllbnQnXG5pbXBvcnQgd3MgZnJvbSAnd3MnXG5cbmxldCBhcG9sbG9DbGllbnQgPSBudWxsXG5cbi8vIFBvbHlmaWxsIGZldGNoKCkgb24gdGhlIHNlcnZlciAodXNlZCBieSBhcG9sbG8tY2xpZW50KVxuaWYgKCFwcm9jZXNzLmJyb3dzZXIpIHtcbiAgZ2xvYmFsLmZldGNoID0gZmV0Y2hcbn1cblxuZnVuY3Rpb24gY3JlYXRlIChpbml0aWFsU3RhdGUpIHtcbiAgY29uc3QgbmV0d29ya0ludGVyZmFjZSA9IGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2Uoe1xuICAgIHVyaTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9ncmFwaHFsJywgLy8gU2VydmVyIFVSTCAobXVzdCBiZSBhYnNvbHV0ZSlcbiAgICBvcHRzOiB7XG4gICAgICAvLyBBZGRpdGlvbmFsIGZldGNoKCkgb3B0aW9ucyBsaWtlIGBjcmVkZW50aWFsc2Agb3IgYGhlYWRlcnNgXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ1xuICAgIH1cbiAgfSlcbiAgY29uc3Qgd3NDbGllbnQgPSBuZXcgU3Vic2NyaXB0aW9uQ2xpZW50KFxuICAgIGB3czovL2xvY2FsaG9zdDo0MDAwL3N1YnNjcmlwdGlvbnNgLFxuICAgIHtcbiAgICAgIHJlY29ubmVjdDogdHJ1ZVxuICAgIH0sXG4gICAgd3NcbiAgKVxuICBjb25zdCBuZXR3b3JrSW50ZXJmYWNlV2l0aFN1YnNjcmlwdGlvbiA9IGFkZEdyYXBoUUxTdWJzY3JpcHRpb25zKFxuICAgIG5ldHdvcmtJbnRlcmZhY2UsXG4gICAgd3NDbGllbnRcbiAgKVxuXG4gIHJldHVybiBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgICBpbml0aWFsU3RhdGUsXG4gICAgc3NyTW9kZTogIXByb2Nlc3MuYnJvd3NlciwgLy8gRGlzYWJsZXMgZm9yY2VGZXRjaCBvbiB0aGUgc2VydmVyIChzbyBxdWVyaWVzIGFyZSBvbmx5IHJ1biBvbmNlKVxuICAgIC8vIG5ldHdvcmtJbnRlcmZhY2U6IHdzQ2xpZW50XG4gICAgbmV0d29ya0ludGVyZmFjZTogbmV0d29ya0ludGVyZmFjZVdpdGhTdWJzY3JpcHRpb25cbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdEFwb2xsbyAoaW5pdGlhbFN0YXRlKSB7XG4gIC8vIE1ha2Ugc3VyZSB0byBjcmVhdGUgYSBuZXcgY2xpZW50IGZvciBldmVyeSBzZXJ2ZXItc2lkZSByZXF1ZXN0IHNvIHRoYXQgZGF0YVxuICAvLyBpc24ndCBzaGFyZWQgYmV0d2VlbiBjb25uZWN0aW9ucyAod2hpY2ggd291bGQgYmUgYmFkKVxuICBpZiAoIXByb2Nlc3MuYnJvd3Nlcikge1xuICAgIHJldHVybiBjcmVhdGUoaW5pdGlhbFN0YXRlKVxuICB9XG5cbiAgLy8gUmV1c2UgY2xpZW50IG9uIHRoZSBjbGllbnQtc2lkZVxuICBpZiAoIWFwb2xsb0NsaWVudCkge1xuICAgIGFwb2xsb0NsaWVudCA9IGNyZWF0ZShpbml0aWFsU3RhdGUpXG4gIH1cblxuICByZXR1cm4gYXBvbGxvQ2xpZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvaW5pdEFwb2xsby5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTtBQUNBO0FBQ0E7O0FBR0E7QUFHQTtBQUpBO0FBRkE7QUFNQTtBQU9BO0FBSkE7QUFJQTtBQUNBOztBQU1BO0FBQUE7QUFFQTtBQUVBO0FBTEE7QUFPQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=