import { gql, graphql } from 'react-apollo'

function PostUpvoter ({ addMessage, channelId, text }) {
  return <button onClick={() => addMessage(channelId, text)}>CLICK</button>
}

const allPosts = gql`
  mutation addMessage($channelId: ID!, $text: String) {
    addMessage(message: { channelId: $channelId, text: $text }) {
      id
      text
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  props: ({ ownProps, mutate }) => ({
    addMessage: (channelId, text) =>
      mutate({
        variables: { channelId, text }
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   updatePost: {
        //     __typename: 'Post',
        //     id: ownProps.id,
        //     votes: ownProps.votes + 1
        //   }
        // }
      })
  })
})(PostUpvoter)
