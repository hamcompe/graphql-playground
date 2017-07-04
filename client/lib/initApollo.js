import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws/dist/client'
import ws from 'ws'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
    opts: {
      // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  })
  const wsClient = new SubscriptionClient(
    `ws://localhost:4000/subscriptions`,
    {
      reconnect: true
    },
    ws
  )
  const networkInterfaceWithSubscription = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  )

  return new ApolloClient({
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    // networkInterface: wsClient
    networkInterface: networkInterfaceWithSubscription
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
