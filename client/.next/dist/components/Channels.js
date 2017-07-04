'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require('react-apollo');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/vannizer/Projects/subscription-playground/client/components/Channels.js';

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  query channels {\n    channels {\n      id\n      name\n      messages {\n        id\n        text\n      }\n    }\n  }\n'], ['\n  query channels {\n    channels {\n      id\n      name\n      messages {\n        id\n        text\n      }\n    }\n  }\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  subscription lol {\n    messageAdded(channelId: 1) {\n      id\n      text\n    }\n  }\n'], ['\n  subscription lol {\n    messageAdded(channelId: 1) {\n      id\n      text\n    }\n  }\n']);

function PostList(prop) {
  // function PostList ({ data: { allPosts, loading, _allPostsMeta } }) {
  var _prop$data = prop.data,
      channels = _prop$data.channels,
      loading = _prop$data.loading;
  // console.log(prop.subscribe())

  console.log(prop);
  var text = 'HI PAUL';
  // return <Input channelId={1} text="hello" />
  if (!loading && channels) {
    return _react2.default.createElement('div', {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }, channels.map(function (_ref) {
      var name = _ref.name,
          messages = _ref.messages;
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, name), _react2.default.createElement('ul', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, messages.map(function (_ref2) {
        var id = _ref2.id,
            text = _ref2.text;
        return _react2.default.createElement('li', { key: id, __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        }, text);
      }), _react2.default.createElement('li', { key: 1234, __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, _react2.default.createElement('input', { type: 'text', onInput: function onInput(prop) {
          return console.log(prop);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }), _react2.default.createElement(_Input2.default, { channelId: 1, text: text, __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }))));
    }));
  }

  return _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, 'loading...');
}

var allPosts = (0, _reactApollo.gql)(_templateObject);

var sub = (0, _reactApollo.gql)(_templateObject2);

var wrapped = (0, _reactApollo.graphql)(allPosts, {
  props: function props(_ref3) {
    var data = _ref3.data;
    return {
      data: data,
      subscribeTo: function subscribeTo(params) {
        return data.subscribeToMore({
          document: sub,
          updateQuery: function updateQuery() {
            return { id: 1, text: 'HUH?' };
          }
        });
      }
    };
  }
})(PostList);

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
exports.default = wrapped;