'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require('react-apollo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/vannizer/Projects/subscription-playground/client/components/Input.js';

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  mutation addMessage($channelId: ID!, $text: String) {\n    addMessage(message: { channelId: $channelId, text: $text }) {\n      id\n      text\n    }\n  }\n'], ['\n  mutation addMessage($channelId: ID!, $text: String) {\n    addMessage(message: { channelId: $channelId, text: $text }) {\n      id\n      text\n    }\n  }\n']);

function PostUpvoter(_ref) {
  var addMessage = _ref.addMessage,
      channelId = _ref.channelId,
      text = _ref.text;

  return _react2.default.createElement('button', { onClick: function onClick() {
      return addMessage(channelId, text);
    }, __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, 'CLICK');
}

var allPosts = (0, _reactApollo.gql)(_templateObject);

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
exports.default = (0, _reactApollo.graphql)(allPosts, {
  props: function props(_ref2) {
    var ownProps = _ref2.ownProps,
        mutate = _ref2.mutate;
    return {
      addMessage: function addMessage(channelId, text) {
        return mutate({
          variables: { channelId: channelId, text: text
            // optimisticResponse: {
            //   __typename: 'Mutation',
            //   updatePost: {
            //     __typename: 'Post',
            //     id: ownProps.id,
            //     votes: ownProps.votes + 1
            //   }
            // }
          } });
      }
    };
  }
})(PostUpvoter);