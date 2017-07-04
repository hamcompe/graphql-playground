import { gql, graphql } from 'react-apollo'
import Input from './Input'

function PostList (prop) {
  // function PostList ({ data: { allPosts, loading, _allPostsMeta } }) {
  const { channels, loading } = prop.data
  // console.log(prop.subscribe())
  console.log(prop)
  const text = 'HI PAUL'
  // return <Input channelId={1} text="hello" />
  if (!loading && channels) {
    return (
      <div>
        {channels.map(({ name, messages }) =>
          <div>
            <p>
              {name}
            </p>
            <ul>
              {messages.map(({ id, text }) =>
                <li key={id}>
                  {text}
                </li>
              )}
              <li key={1234}>
                <input type="text" onInput={prop => console.log(prop)} />
                <Input channelId={1} text={text} />
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }

  return <div>loading...</div>
}

const allPosts = gql`
  query channels {
    channels {
      id
      name
      messages {
        id
        text
      }
    }
  }
`

const sub = gql`
  subscription lol {
    messageAdded(channelId: 1) {
      id
      text
    }
  }
`

const wrapped = graphql(allPosts, {
  props: ({ data }) => ({
    data,
    subscribeTo: params =>
      data.subscribeToMore({
        document: sub,
        updateQuery: () => ({ id: 1, text: 'HUH?' })
      })
  })
})(PostList)

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default wrapped
