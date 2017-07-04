'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initApollo;

var _reactApollo = require('react-apollo');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _client = require('subscriptions-transport-ws/dist/client');

var _ws = require('ws');

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