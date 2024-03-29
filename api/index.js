const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const { schema } = require('./src/schema')

const PORT = 4000
const server = express()

server.use('*', cors({ origin: 'http://localhost:3000' }))

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
  })
)

const ws = createServer(server)
ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    { execute, subscribe, schema },
    {
      server: ws,
      path: '/subscriptions'
    }
  )
})
