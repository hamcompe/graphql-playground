webpackHotUpdate(0,Array(543).concat([
/* 543 */
false,
/* 544 */
false,
/* 545 */
false,
/* 546 */
false,
/* 547 */
false,
/* 548 */
false,
/* 549 */
false,
/* 550 */
false,
/* 551 */
false,
/* 552 */,
/* 553 */
false,
/* 554 */
false,
/* 555 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _visitor = __webpack_require__(664);

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, { leave: printDocASTReducer });
} /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },

  // Document

  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },

  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet;
    // Anonymous queries with no directives or variable definitions can use
    // the query short form.
    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },


  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue;
    return variable + ': ' + type + wrap(' = ', defaultValue);
  },

  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },

  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },

  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },

  // Fragments

  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },

  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },

  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return 'fragment ' + name + ' on ' + typeCondition + ' ' + wrap('', join(directives, ' '), ' ') + selectionSet;
  },

  // Value

  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10) {
    var value = _ref10.value;
    return JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return JSON.stringify(value);
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },

  // Directive

  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },

  // Type

  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },

  // Type System Definitions

  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },

  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },

  ScalarTypeDefinition: function ScalarTypeDefinition(_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  },

  ObjectTypeDefinition: function ObjectTypeDefinition(_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ', ')), join(directives, ' '), block(fields)], ' ');
  },

  FieldDefinition: function FieldDefinition(_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + wrap('(', join(args, ', '), ')') + ': ' + type + wrap(' ', join(directives, ' '));
  },

  InputValueDefinition: function InputValueDefinition(_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  },

  InterfaceTypeDefinition: function InterfaceTypeDefinition(_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  },

  UnionTypeDefinition: function UnionTypeDefinition(_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), '= ' + join(types, ' | ')], ' ');
  },

  EnumTypeDefinition: function EnumTypeDefinition(_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  },

  EnumValueDefinition: function EnumValueDefinition(_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  },

  InputObjectTypeDefinition: function InputObjectTypeDefinition(_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  },

  TypeExtensionDefinition: function TypeExtensionDefinition(_ref31) {
    var definition = _ref31.definition;
    return 'extend ' + definition;
  },

  DirectiveDefinition: function DirectiveDefinition(_ref32) {
    var name = _ref32.name,
        args = _ref32.arguments,
        locations = _ref32.locations;
    return 'directive @' + name + wrap('(', join(args, ', '), ')') + ' on ' + join(locations, ' | ');
  }
};

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}

/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
  return array && array.length !== 0 ? indent('{\n' + join(array, '\n')) + '\n}' : '{}';
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && maybeString.replace(/\n/g, '\n  ');
}

/***/ }),
/* 556 */
false,
/* 557 */
false,
/* 558 */
false,
/* 559 */
false,
/* 560 */
false,
/* 561 */
false,
/* 562 */
false,
/* 563 */
false,
/* 564 */
false,
/* 565 */,
/* 566 */,
/* 567 */
false,
/* 568 */
false,
/* 569 */
false,
/* 570 */
false,
/* 571 */
false,
/* 572 */
false,
/* 573 */
false,
/* 574 */
false,
/* 575 */
false,
/* 576 */
false,
/* 577 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 578 */,
/* 579 */
false,
/* 580 */
false,
/* 581 */
false,
/* 582 */
false,
/* 583 */
false,
/* 584 */
false,
/* 585 */
false,
/* 586 */
false,
/* 587 */
false,
/* 588 */
false,
/* 589 */
false,
/* 590 */
false,
/* 591 */
false,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */
false,
/* 602 */
false,
/* 603 */
false,
/* 604 */
false,
/* 605 */
false,
/* 606 */
false,
/* 607 */
false,
/* 608 */
false,
/* 609 */
false,
/* 610 */
false,
/* 611 */
false,
/* 612 */
false,
/* 613 */
false,
/* 614 */
false,
/* 615 */
false,
/* 616 */
false,
/* 617 */
false,
/* 618 */
false,
/* 619 */
false,
/* 620 */
false,
/* 621 */
false,
/* 622 */
false,
/* 623 */
false,
/* 624 */
false,
/* 625 */
false,
/* 626 */
false,
/* 627 */
false,
/* 628 */
false,
/* 629 */
false,
/* 630 */
false,
/* 631 */
false,
/* 632 */
false,
/* 633 */
false,
/* 634 */
false,
/* 635 */
false,
/* 636 */
false,
/* 637 */
false,
/* 638 */
false,
/* 639 */
false,
/* 640 */
false,
/* 641 */
false,
/* 642 */
false,
/* 643 */
false,
/* 644 */
false,
/* 645 */
false,
/* 646 */
false,
/* 647 */
false,
/* 648 */
false,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/apollo-client/data/storeUtils.js
function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) { return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables); });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\" is not supported.\n                    Use variables instead of inline arguments to overcome this limitation.");
    }
}
function storeKeyNameFromField(field, variables) {
    var directivesObj = null;
    if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function (directive) {
            directivesObj[directive.name.value] = {};
            if (directive.arguments) {
                directive.arguments.forEach((function (_a) {
                    var name = _a.name, value = _a.value;
                    return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                }));
            }
        });
    }
    var argObj = null;
    if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj, name, value, variables);
        });
    }
    return getStoreKeyName(field.name.value, argObj, directivesObj);
}
function getStoreKeyName(fieldName, args, directives) {
    if (directives && directives['connection'] && directives['connection']['key']) {
        return directives['connection']['key'];
    }
    if (args) {
        var stringifiedArgs = JSON.stringify(args);
        return fieldName + "(" + stringifiedArgs + ")";
    }
    return fieldName;
}
function resultKeyNameFromField(field) {
    return field.alias ?
        field.alias.value :
        field.name.value;
}
function isField(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
function isIdValue(idObject) {
    return (idObject != null &&
        typeof idObject === 'object' &&
        idObject.type === 'id');
}
function toIdValue(id, generated) {
    if (generated === void 0) { generated = false; }
    return {
        type: 'id',
        id: id,
        generated: generated,
    };
}
function isJsonValue(jsonObject) {
    return (jsonObject != null &&
        typeof jsonObject === 'object' &&
        jsonObject.type === 'json');
}
//# sourceMappingURL=storeUtils.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/assign.js
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (typeof (source) === 'undefined' || source === null) {
            return;
        }
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}
//# sourceMappingURL=assign.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/queries/getFromAST.js
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


function getMutationDefinition(doc) {
    checkDocument(doc);
    var mutationDef = null;
    doc.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition'
            && definition.operation === 'mutation') {
            mutationDef = definition;
        }
    });
    if (!mutationDef) {
        throw new Error('Must contain a mutation definition.');
    }
    return mutationDef;
}
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var foundOperation = false;
    doc.definitions.forEach(function (definition) {
        switch (definition.kind) {
            case 'FragmentDefinition':
                break;
            case 'OperationDefinition':
                if (foundOperation) {
                    throw new Error('Queries must have exactly one operation definition.');
                }
                foundOperation = true;
                break;
            default:
                throw new Error("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
    });
}
function getOperationName(doc) {
    var res = null;
    doc.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition' && definition.name) {
            res = definition.name.value;
        }
    });
    return res;
}
function getFragmentDefinitions(doc) {
    var fragmentDefinitions = doc.definitions.filter(function (definition) {
        if (definition.kind === 'FragmentDefinition') {
            return true;
        }
        else {
            return false;
        }
    });
    return fragmentDefinitions;
}
function getQueryDefinition(doc) {
    checkDocument(doc);
    var queryDef = null;
    doc.definitions.map(function (definition) {
        if (definition.kind === 'OperationDefinition'
            && definition.operation === 'query') {
            queryDef = definition;
        }
    });
    if (!queryDef) {
        throw new Error('Must contain a query definition.');
    }
    return queryDef;
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    var opDef = null;
    doc.definitions.map(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            opDef = definition;
        }
    });
    if (!opDef) {
        throw new Error('Must contain a query definition.');
    }
    return opDef;
}
function getFragmentDefinition(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    if (doc.definitions.length > 1) {
        throw new Error('Fragment must have exactly one definition.');
    }
    var fragmentDef = doc.definitions[0];
    if (fragmentDef.kind !== 'FragmentDefinition') {
        throw new Error('Must be a fragment definition.');
    }
    return fragmentDef;
}
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            throw new Error("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === 'undefined') {
        if (fragments.length !== 1) {
            throw new Error("Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        }
        actualFragmentName = fragments[0].name.value;
    }
    var query = __assign({}, document, { definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ].concat(document.definitions) });
    return query;
}
function getDefaultValues(definition) {
    if (definition.variableDefinitions && definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return assign.apply(void 0, [{}].concat(defaultValues));
    }
    return {};
}
//# sourceMappingURL=getFromAST.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/cloneDeep.js
function cloneDeep(value) {
    if (Array.isArray(value)) {
        return value.map(function (item) { return cloneDeep(item); });
    }
    if (value !== null && typeof value === 'object') {
        var nextValue = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                nextValue[key] = cloneDeep(value[key]);
            }
        }
        return nextValue;
    }
    return value;
}
//# sourceMappingURL=cloneDeep.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/queries/queryTransform.js


var TYPENAME_FIELD = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function addTypenameToSelectionSet(selectionSet, isRoot) {
    if (isRoot === void 0) { isRoot = false; }
    if (selectionSet.selections) {
        if (!isRoot) {
            var alreadyHasThisField = selectionSet.selections.some(function (selection) {
                return selection.kind === 'Field' && selection.name.value === '__typename';
            });
            if (!alreadyHasThisField) {
                selectionSet.selections.push(TYPENAME_FIELD);
            }
        }
        selectionSet.selections.forEach(function (selection) {
            if (selection.kind === 'Field') {
                if (selection.name.value.lastIndexOf('__', 0) !== 0 && selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
            else if (selection.kind === 'InlineFragment') {
                if (selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
        });
    }
}
function removeConnectionDirectiveFromSelectionSet(selectionSet) {
    if (selectionSet.selections) {
        selectionSet.selections.forEach(function (selection) {
            if (selection.kind === 'Field' && selection && selection.directives) {
                selection.directives = selection.directives.filter(function (directive) {
                    var willRemove = directive.name.value === 'connection';
                    if (willRemove) {
                        if (!directive.arguments || !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                            console.warn('Removing an @connection directive even though it does not have a key. ' +
                                'You may want to use the key parameter to specify a store key.');
                        }
                    }
                    return !willRemove;
                });
            }
        });
        selectionSet.selections.forEach(function (selection) {
            if (selection.kind === 'Field') {
                if (selection.selectionSet) {
                    removeConnectionDirectiveFromSelectionSet(selection.selectionSet);
                }
            }
            else if (selection.kind === 'InlineFragment') {
                if (selection.selectionSet) {
                    removeConnectionDirectiveFromSelectionSet(selection.selectionSet);
                }
            }
        });
    }
}
function addTypenameToDocument(doc) {
    checkDocument(doc);
    var docClone = cloneDeep(doc);
    docClone.definitions.forEach(function (definition) {
        var isRoot = definition.kind === 'OperationDefinition';
        addTypenameToSelectionSet(definition.selectionSet, isRoot);
    });
    return docClone;
}
function removeConnectionDirectiveFromDocument(doc) {
    checkDocument(doc);
    var docClone = cloneDeep(doc);
    docClone.definitions.forEach(function (definition) {
        removeConnectionDirectiveFromSelectionSet(definition.selectionSet);
    });
    return docClone;
}
//# sourceMappingURL=queryTransform.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/transport/networkInterface.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var networkInterface___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



function printRequest(request) {
    return networkInterface___assign({}, request, { query: __WEBPACK_IMPORTED_MODULE_1_graphql_language_printer__["print"](request.query) });
}
var BaseNetworkInterface = (function () {
    function BaseNetworkInterface(uri, opts) {
        if (opts === void 0) { opts = {}; }
        if (!uri) {
            throw new Error('A remote endpoint is required for a network layer');
        }
        if (typeof uri !== 'string') {
            throw new Error('Remote endpoint must be a string');
        }
        this._uri = uri;
        this._opts = networkInterface___assign({}, opts);
        this._middlewares = [];
        this._afterwares = [];
    }
    BaseNetworkInterface.prototype.query = function (request) {
        return new Promise(function (resolve, reject) {
            reject(new Error('BaseNetworkInterface should not be used directly'));
        });
    };
    return BaseNetworkInterface;
}());

var networkInterface_HTTPFetchNetworkInterface = (function (_super) {
    __extends(HTTPFetchNetworkInterface, _super);
    function HTTPFetchNetworkInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTTPFetchNetworkInterface.prototype.applyMiddlewares = function (requestAndOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = requestAndOptions.request, options = requestAndOptions.options;
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyMiddleware.apply(scope, [{ request: request, options: options }, next]);
                        }
                    }
                    else {
                        resolve({
                            request: request,
                            options: options,
                        });
                    }
                };
                next();
            };
            queue(_this._middlewares.slice(), _this);
        });
    };
    HTTPFetchNetworkInterface.prototype.applyAfterwares = function (_a) {
        var _this = this;
        var response = _a.response, options = _a.options;
        return new Promise(function (resolve, reject) {
            var responseObject = { response: response, options: options };
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyAfterware.apply(scope, [responseObject, next]);
                        }
                    }
                    else {
                        resolve(responseObject);
                    }
                };
                next();
            };
            queue(_this._afterwares.slice(), _this);
        });
    };
    HTTPFetchNetworkInterface.prototype.fetchFromRemoteEndpoint = function (_a) {
        var request = _a.request, options = _a.options;
        return fetch(this._uri, networkInterface___assign({}, this._opts, { body: JSON.stringify(printRequest(request)), method: 'POST' }, options, { headers: networkInterface___assign({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers) }));
    };
    HTTPFetchNetworkInterface.prototype.query = function (request) {
        var _this = this;
        var options = networkInterface___assign({}, this._opts);
        return this.applyMiddlewares({
            request: request,
            options: options,
        }).then(function (rao) {
            if (rao.request.query) {
                rao.request.query = removeConnectionDirectiveFromDocument(rao.request.query);
            }
            return rao;
        }).then(function (rao) { return _this.fetchFromRemoteEndpoint.call(_this, rao); })
            .then(function (response) { return _this.applyAfterwares({
            response: response,
            options: options,
        }); })
            .then(function (_a) {
            var response = _a.response;
            var httpResponse = response;
            return httpResponse.json().catch(function (error) {
                var httpError = new Error("Network request failed with status " + response.status + " - \"" + response.statusText + "\"");
                httpError.response = httpResponse;
                httpError.parseError = error;
                throw httpError;
            });
        })
            .then(function (payload) {
            if (!payload.hasOwnProperty('data') && !payload.hasOwnProperty('errors')) {
                throw new Error("Server response was missing for query '" + request.debugName + "'.");
            }
            else {
                return payload;
            }
        });
    };
    HTTPFetchNetworkInterface.prototype.use = function (middlewares) {
        var _this = this;
        middlewares.map(function (middleware) {
            if (typeof middleware.applyMiddleware === 'function') {
                _this._middlewares.push(middleware);
            }
            else {
                throw new Error('Middleware must implement the applyMiddleware function');
            }
        });
        return this;
    };
    HTTPFetchNetworkInterface.prototype.useAfter = function (afterwares) {
        var _this = this;
        afterwares.map(function (afterware) {
            if (typeof afterware.applyAfterware === 'function') {
                _this._afterwares.push(afterware);
            }
            else {
                throw new Error('Afterware must implement the applyAfterware function');
            }
        });
        return this;
    };
    return HTTPFetchNetworkInterface;
}(BaseNetworkInterface));

function createNetworkInterface(uriOrInterfaceOpts, secondArgOpts) {
    if (secondArgOpts === void 0) { secondArgOpts = {}; }
    if (!uriOrInterfaceOpts) {
        throw new Error('You must pass an options argument to createNetworkInterface.');
    }
    var uri;
    var opts;
    if (typeof uriOrInterfaceOpts === 'string') {
        console.warn("Passing the URI as the first argument to createNetworkInterface is deprecated as of Apollo Client 0.5. Please pass it as the \"uri\" property of the network interface options.");
        opts = secondArgOpts;
        uri = uriOrInterfaceOpts;
    }
    else {
        opts = uriOrInterfaceOpts.opts;
        uri = uriOrInterfaceOpts.uri;
    }
    return new networkInterface_HTTPFetchNetworkInterface(uri, opts);
}
//# sourceMappingURL=networkInterface.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/transport/batching.js
var QueryBatcher = (function () {
    function QueryBatcher(_a) {
        var batchInterval = _a.batchInterval, _b = _a.batchMax, batchMax = _b === void 0 ? 0 : _b, batchFetchFunction = _a.batchFetchFunction;
        this.queuedRequests = [];
        this.queuedRequests = [];
        this.batchInterval = batchInterval;
        this.batchMax = batchMax;
        this.batchFetchFunction = batchFetchFunction;
    }
    QueryBatcher.prototype.enqueueRequest = function (request) {
        var fetchRequest = {
            request: request,
        };
        this.queuedRequests.push(fetchRequest);
        fetchRequest.promise = new Promise(function (resolve, reject) {
            fetchRequest.resolve = resolve;
            fetchRequest.reject = reject;
        });
        if (this.queuedRequests.length === 1) {
            this.scheduleQueueConsumption();
        }
        if (this.queuedRequests.length === this.batchMax) {
            this.consumeQueue();
        }
        return fetchRequest.promise;
    };
    QueryBatcher.prototype.consumeQueue = function () {
        var requests = this.queuedRequests.map(function (queuedRequest) { return queuedRequest.request; });
        var promises = [];
        var resolvers = [];
        var rejecters = [];
        this.queuedRequests.forEach(function (fetchRequest, index) {
            promises.push(fetchRequest.promise);
            resolvers.push(fetchRequest.resolve);
            rejecters.push(fetchRequest.reject);
        });
        this.queuedRequests = [];
        var batchedPromise = this.batchFetchFunction(requests);
        batchedPromise.then(function (results) {
            results.forEach(function (result, index) {
                resolvers[index](result);
            });
        }).catch(function (error) {
            rejecters.forEach(function (rejecter, index) {
                rejecters[index](error);
            });
        });
        return promises;
    };
    QueryBatcher.prototype.scheduleQueueConsumption = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.queuedRequests.length) {
                _this.consumeQueue();
            }
        }, this.batchInterval);
    };
    return QueryBatcher;
}());

//# sourceMappingURL=batching.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/transport/batchedNetworkInterface.js
/* harmony import */ var batchedNetworkInterface___WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(577);
/* harmony import */ var batchedNetworkInterface___WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(batchedNetworkInterface___WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
var batchedNetworkInterface___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var batchedNetworkInterface___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




var batchedNetworkInterface_HTTPBatchedNetworkInterface = (function (_super) {
    batchedNetworkInterface___extends(HTTPBatchedNetworkInterface, _super);
    function HTTPBatchedNetworkInterface(_a) {
        var uri = _a.uri, _b = _a.batchInterval, batchInterval = _b === void 0 ? 10 : _b, _c = _a.batchMax, batchMax = _c === void 0 ? 0 : _c, fetchOpts = _a.fetchOpts;
        var _this = _super.call(this, uri, fetchOpts) || this;
        if (typeof batchInterval !== 'number') {
            throw new Error("batchInterval must be a number, got " + batchInterval);
        }
        if (typeof batchMax !== 'number') {
            throw new Error("batchMax must be a number, got " + batchMax);
        }
        _this.batcher = new QueryBatcher({
            batchInterval: batchInterval,
            batchMax: batchMax,
            batchFetchFunction: _this.batchQuery.bind(_this),
        });
        return _this;
    }
    HTTPBatchedNetworkInterface.prototype.query = function (request) {
        return this.batcher.enqueueRequest(request);
    };
    HTTPBatchedNetworkInterface.prototype.batchQuery = function (requests) {
        var _this = this;
        var options = batchedNetworkInterface___assign({}, this._opts);
        var middlewarePromise = this.applyBatchMiddlewares({
            requests: requests,
            options: options,
        });
        return new Promise(function (resolve, reject) {
            middlewarePromise.then(function (batchRequestAndOptions) {
                return _this.batchedFetchFromRemoteEndpoint(batchRequestAndOptions)
                    .then(function (result) {
                    var httpResponse = result;
                    if (!httpResponse.ok) {
                        return _this.applyBatchAfterwares({ responses: [httpResponse], options: batchRequestAndOptions })
                            .then(function () {
                            var httpError = new Error("Network request failed with status " + httpResponse.status + " - \"" + httpResponse.statusText + "\"");
                            httpError.response = httpResponse;
                            throw httpError;
                        });
                    }
                    return result.json();
                })
                    .then(function (responses) {
                    if (typeof responses.map !== 'function') {
                        throw new Error('BatchingNetworkInterface: server response is not an array');
                    }
                    _this.applyBatchAfterwares({
                        responses: responses,
                        options: batchRequestAndOptions.options,
                    }).then(function (responseAndOptions) {
                        resolve(responseAndOptions.responses);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    HTTPBatchedNetworkInterface.prototype.applyBatchMiddlewares = function (_a) {
        var _this = this;
        var requests = _a.requests, options = _a.options;
        return new Promise(function (resolve, reject) {
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyBatchMiddleware.apply(scope, [{ requests: requests, options: options }, next]);
                        }
                    }
                    else {
                        resolve({
                            requests: requests,
                            options: options,
                        });
                    }
                };
                next();
            };
            queue(_this._middlewares.slice(), _this);
        });
    };
    HTTPBatchedNetworkInterface.prototype.applyBatchAfterwares = function (_a) {
        var _this = this;
        var responses = _a.responses, options = _a.options;
        return new Promise(function (resolve, reject) {
            var responseObject = { responses: responses, options: options };
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyBatchAfterware.apply(scope, [responseObject, next]);
                        }
                    }
                    else {
                        resolve(responseObject);
                    }
                };
                next();
            };
            queue(_this._afterwares.slice(), _this);
        });
    };
    HTTPBatchedNetworkInterface.prototype.use = function (middlewares) {
        var _this = this;
        middlewares.map(function (middleware) {
            if (typeof middleware.applyBatchMiddleware === 'function') {
                _this._middlewares.push(middleware);
            }
            else {
                throw new Error('Batch middleware must implement the applyBatchMiddleware function');
            }
        });
        return this;
    };
    HTTPBatchedNetworkInterface.prototype.useAfter = function (afterwares) {
        var _this = this;
        afterwares.map(function (afterware) {
            if (typeof afterware.applyBatchAfterware === 'function') {
                _this._afterwares.push(afterware);
            }
            else {
                throw new Error('Batch afterware must implement the applyBatchAfterware function');
            }
        });
        return this;
    };
    HTTPBatchedNetworkInterface.prototype.batchedFetchFromRemoteEndpoint = function (batchRequestAndOptions) {
        var options = {};
        assign(options, batchRequestAndOptions.options);
        var printedRequests = batchRequestAndOptions.requests.map(function (request) {
            return printRequest(request);
        });
        return fetch(this._uri, batchedNetworkInterface___assign({}, this._opts, { body: JSON.stringify(printedRequests), method: 'POST' }, options, { headers: batchedNetworkInterface___assign({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers) }));
    };
    return HTTPBatchedNetworkInterface;
}(BaseNetworkInterface));

function createBatchingNetworkInterface(options) {
    if (!options) {
        throw new Error('You must pass an options argument to createNetworkInterface.');
    }
    return new batchedNetworkInterface_HTTPBatchedNetworkInterface({
        uri: options.uri,
        batchInterval: options.batchInterval,
        batchMax: options.batchMax,
        fetchOpts: options.opts || {},
    });
}
//# sourceMappingURL=batchedNetworkInterface.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/actions.js
function isQueryResultAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT';
}
function isQueryErrorAction(action) {
    return action.type === 'APOLLO_QUERY_ERROR';
}
function isQueryInitAction(action) {
    return action.type === 'APOLLO_QUERY_INIT';
}
function isQueryResultClientAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT_CLIENT';
}
function isQueryStopAction(action) {
    return action.type === 'APOLLO_QUERY_STOP';
}
function isMutationInitAction(action) {
    return action.type === 'APOLLO_MUTATION_INIT';
}
function isMutationResultAction(action) {
    return action.type === 'APOLLO_MUTATION_RESULT';
}
function isMutationErrorAction(action) {
    return action.type === 'APOLLO_MUTATION_ERROR';
}
function isUpdateQueryResultAction(action) {
    return action.type === 'APOLLO_UPDATE_QUERY_RESULT';
}
function isStoreResetAction(action) {
    return action.type === 'APOLLO_STORE_RESET';
}
function isSubscriptionResultAction(action) {
    return action.type === 'APOLLO_SUBSCRIPTION_RESULT';
}
function isWriteAction(action) {
    return action.type === 'APOLLO_WRITE';
}
//# sourceMappingURL=actions.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/queries/directives.js
function shouldInclude(selection, variables) {
    if (variables === void 0) { variables = {}; }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            return;
        }
        var directiveArguments = directive.arguments || [];
        var directiveName = directive.name.value;
        if (directiveArguments.length !== 1) {
            throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
        }
        var ifArgument = directiveArguments[0];
        if (!ifArgument.name || ifArgument.name.value !== 'if') {
            throw new Error("Invalid argument for the @" + directiveName + " directive.");
        }
        var ifValue = directiveArguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            if (ifValue.kind !== 'Variable') {
                throw new Error("Argument for the @" + directiveName + " directive must be a variable or a bool ean value.");
            }
            else {
                evaledValue = variables[ifValue.name.value];
                if (evaledValue === undefined) {
                    throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                }
            }
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}
//# sourceMappingURL=directives.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/writeToStore.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_environment__ = __webpack_require__(552);
var writeToStore___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var writeToStore___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};






var WriteError = (function (_super) {
    writeToStore___extends(WriteError, _super);
    function WriteError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'WriteError';
        return _this;
    }
    return WriteError;
}(Error));
function enhanceErrorWithDocument(error, document) {
    var enhancedError = new WriteError("Error writing result to store for query " + (document.loc && document.loc.source && document.loc.source.body));
    enhancedError.message += '/n' + error.message;
    enhancedError.stack = error.stack;
    return enhancedError;
}
function writeQueryToStore(_a) {
    var result = _a.result, query = _a.query, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, _c = _a.fragmentMap, fragmentMap = _c === void 0 ? {} : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction;
    var queryDefinition = getQueryDefinition(query);
    variables = assign({}, getDefaultValues(queryDefinition), variables);
    try {
        return writeSelectionSetToStore({
            dataId: 'ROOT_QUERY',
            result: result,
            selectionSet: queryDefinition.selectionSet,
            context: {
                store: store,
                variables: variables,
                dataIdFromObject: dataIdFromObject,
                fragmentMap: fragmentMap,
                fragmentMatcherFunction: fragmentMatcherFunction,
            },
        });
    }
    catch (e) {
        throw enhanceErrorWithDocument(e, query);
    }
}
function writeResultToStore(_a) {
    var dataId = _a.dataId, result = _a.result, document = _a.document, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
    var operationDefinition = getOperationDefinition(document);
    var selectionSet = operationDefinition.selectionSet;
    var fragmentMap = createFragmentMap(getFragmentDefinitions(document));
    variables = assign({}, getDefaultValues(operationDefinition), variables);
    try {
        return writeSelectionSetToStore({
            result: result,
            dataId: dataId,
            selectionSet: selectionSet,
            context: {
                store: store,
                variables: variables,
                dataIdFromObject: dataIdFromObject,
                fragmentMap: fragmentMap,
                fragmentMatcherFunction: fragmentMatcherFunction,
            },
        });
    }
    catch (e) {
        throw enhanceErrorWithDocument(e, document);
    }
}
function writeSelectionSetToStore(_a) {
    var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
    var variables = context.variables, store = context.store, dataIdFromObject = context.dataIdFromObject, fragmentMap = context.fragmentMap;
    selectionSet.selections.forEach(function (selection) {
        var included = shouldInclude(selection, variables);
        if (isField(selection)) {
            var resultFieldKey = resultKeyNameFromField(selection);
            var value = result[resultFieldKey];
            if (included) {
                if (typeof value !== 'undefined') {
                    writeFieldToStore({
                        dataId: dataId,
                        value: value,
                        field: selection,
                        context: context,
                    });
                }
                else {
                    if (context.fragmentMatcherFunction) {
                        if (!__WEBPACK_IMPORTED_MODULE_3__util_environment__["b" /* isProduction */]()) {
                            console.warn("Missing field " + resultFieldKey + " in " + JSON.stringify(result, null, 2).substring(0, 100));
                        }
                    }
                }
            }
        }
        else {
            var fragment = void 0;
            if (isInlineFragment(selection)) {
                fragment = selection;
            }
            else {
                fragment = (fragmentMap || {})[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value + ".");
                }
            }
            var matches = true;
            if (context.fragmentMatcherFunction && fragment.typeCondition) {
                var idValue = { type: 'id', id: 'self', generated: false };
                var fakeContext = {
                    store: { 'self': result },
                    returnPartialData: false,
                    hasMissingField: false,
                    customResolvers: {},
                };
                matches = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);
                if (fakeContext.returnPartialData) {
                    console.error('WARNING: heuristic fragment matching going on!');
                }
            }
            if (included && matches) {
                writeSelectionSetToStore({
                    result: result,
                    selectionSet: fragment.selectionSet,
                    dataId: dataId,
                    context: context,
                });
            }
        }
    });
    return store;
}
function isGeneratedId(id) {
    return (id[0] === '$');
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    var generated = cache[generatedKey];
    var real = cache[realKey];
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (isIdValue(value)
            && isGeneratedId(value.id)
            && isIdValue(realValue)) {
            mergeWithGenerated(value.id, realValue.id, cache);
        }
        delete cache[generatedKey];
        cache[realKey] = writeToStore___assign({}, generated, real);
    });
}
function writeFieldToStore(_a) {
    var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
    var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store, fragmentMap = context.fragmentMap;
    var storeValue;
    var storeFieldName = storeKeyNameFromField(field, variables);
    var shouldMerge = false;
    var generatedKey = '';
    if (!field.selectionSet || value === null) {
        storeValue =
            value != null && typeof value === 'object'
                ? { type: 'json', json: value }
                : value;
    }
    else if (Array.isArray(value)) {
        var generatedId = dataId + "." + storeFieldName;
        storeValue = processArrayValue(value, generatedId, field.selectionSet, context);
    }
    else {
        var valueDataId = dataId + "." + storeFieldName;
        var generated = true;
        if (!isGeneratedId(valueDataId)) {
            valueDataId = '$' + valueDataId;
        }
        if (dataIdFromObject) {
            var semanticId = dataIdFromObject(value);
            if (semanticId && isGeneratedId(semanticId)) {
                throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
            }
            if (semanticId) {
                valueDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: valueDataId,
            result: value,
            selectionSet: field.selectionSet,
            context: context,
        });
        storeValue = {
            type: 'id',
            id: valueDataId,
            generated: generated,
        };
        if (store[dataId] && store[dataId][storeFieldName] !== storeValue) {
            var escapedId = store[dataId][storeFieldName];
            if (isIdValue(storeValue) && storeValue.generated
                && isIdValue(escapedId) && !escapedId.generated) {
                throw new Error("Store error: the application attempted to write an object with no provided id" +
                    (" but the store already contains an id of " + escapedId.id + " for this object."));
            }
            if (isIdValue(escapedId) && escapedId.generated) {
                generatedKey = escapedId.id;
                shouldMerge = true;
            }
        }
    }
    var newStoreObj = writeToStore___assign({}, store[dataId], (_b = {}, _b[storeFieldName] = storeValue, _b));
    if (shouldMerge) {
        mergeWithGenerated(generatedKey, storeValue.id, store);
    }
    if (!store[dataId] || storeValue !== store[dataId][storeFieldName]) {
        store[dataId] = newStoreObj;
    }
    var _b;
}
function processArrayValue(value, generatedId, selectionSet, context) {
    return value.map(function (item, index) {
        if (item === null) {
            return null;
        }
        var itemDataId = generatedId + "." + index;
        if (Array.isArray(item)) {
            return processArrayValue(item, itemDataId, selectionSet, context);
        }
        var generated = true;
        if (context.dataIdFromObject) {
            var semanticId = context.dataIdFromObject(item);
            if (semanticId) {
                itemDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: itemDataId,
            result: item,
            selectionSet: selectionSet,
            context: context,
        });
        var idStoreValue = {
            type: 'id',
            id: itemDataId,
            generated: generated,
        };
        return idStoreValue;
    });
}
//# sourceMappingURL=writeToStore.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/optimistic-data/store.js
var store___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var optimisticDefaultState = [];
function getDataWithOptimisticResults(store) {
    if (store.optimistic.length === 0) {
        return store.data;
    }
    var patches = store.optimistic.map(function (opt) { return opt.data; });
    return assign.apply(void 0, [{}, store.data].concat(patches));
}
function optimistic(previousState, action, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    if (isMutationInitAction(action) && action.optimisticResponse) {
        var optimisticResponse = void 0;
        if (typeof action.optimisticResponse === 'function') {
            optimisticResponse = action.optimisticResponse(action.variables);
        }
        else {
            optimisticResponse = action.optimisticResponse;
        }
        var fakeMutationResultAction = {
            type: 'APOLLO_MUTATION_RESULT',
            result: { data: optimisticResponse },
            document: action.mutation,
            operationName: action.operationName,
            variables: action.variables,
            mutationId: action.mutationId,
            extraReducers: action.extraReducers,
            updateQueries: action.updateQueries,
            update: action.update,
        };
        var optimisticData = getDataWithOptimisticResults(store___assign({}, store, { optimistic: previousState }));
        var patch = getOptimisticDataPatch(optimisticData, fakeMutationResultAction, store.queries, store.mutations, config);
        var optimisticState = {
            action: fakeMutationResultAction,
            data: patch,
            mutationId: action.mutationId,
        };
        var newState = previousState.concat([optimisticState]);
        return newState;
    }
    else if ((isMutationErrorAction(action) || isMutationResultAction(action))
        && previousState.some(function (change) { return change.mutationId === action.mutationId; })) {
        return rollbackOptimisticData(function (change) { return change.mutationId === action.mutationId; }, previousState, store, config);
    }
    return previousState;
}
function getOptimisticDataPatch(previousData, optimisticAction, queries, mutations, config) {
    var optimisticData = store_data(previousData, optimisticAction, queries, mutations, config);
    var patch = {};
    Object.keys(optimisticData).forEach(function (key) {
        if (optimisticData[key] !== previousData[key]) {
            patch[key] = optimisticData[key];
        }
    });
    return patch;
}
function rollbackOptimisticData(filterFn, previousState, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    var optimisticData = assign({}, store.data);
    var newState = previousState
        .filter(function (item) { return !filterFn(item); })
        .map(function (change) {
        var patch = getOptimisticDataPatch(optimisticData, change.action, store.queries, store.mutations, config);
        assign(optimisticData, patch);
        return store___assign({}, change, { data: patch });
    });
    return newState;
}
//# sourceMappingURL=store.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/isEqual.js
function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a != null && typeof a === 'object' && b != null && typeof b === 'object') {
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                if (!b.hasOwnProperty(key)) {
                    return false;
                }
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=isEqual.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/readFromStore.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_anywhere__);
var readFromStore___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};






var ID_KEY = typeof Symbol !== 'undefined' ? Symbol('id') : '@@id';
function readQueryFromStore(options) {
    var optsPatch = { returnPartialData: false };
    return diffQueryAgainstStore(readFromStore___assign({}, options, optsPatch)).result;
}
var readStoreResolver = function (fieldName, idValue, args, context, _a) {
    var resultKey = _a.resultKey, directives = _a.directives;
    assertIdValue(idValue);
    var objId = idValue.id;
    var obj = context.store[objId];
    var storeKeyName = getStoreKeyName(fieldName, args, directives);
    var fieldValue = (obj || {})[storeKeyName];
    if (typeof fieldValue === 'undefined') {
        if (context.customResolvers && obj && (obj.__typename || objId === 'ROOT_QUERY')) {
            var typename = obj.__typename || 'Query';
            var type = context.customResolvers[typename];
            if (type) {
                var resolver = type[fieldName];
                if (resolver) {
                    return resolver(obj, args);
                }
            }
        }
        if (!context.returnPartialData) {
            throw new Error("Can't find field " + storeKeyName + " on object (" + objId + ") " + JSON.stringify(obj, null, 2) + ".");
        }
        context.hasMissingField = true;
        return fieldValue;
    }
    if (isJsonValue(fieldValue)) {
        if (idValue.previousResult && isEqual(idValue.previousResult[resultKey], fieldValue.json)) {
            return idValue.previousResult[resultKey];
        }
        return fieldValue.json;
    }
    if (idValue.previousResult) {
        fieldValue = addPreviousResultToIdValues(fieldValue, idValue.previousResult[resultKey]);
    }
    return fieldValue;
};
function diffQueryAgainstStore(_a) {
    var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
    var queryDefinition = getQueryDefinition(query);
    variables = assign({}, getDefaultValues(queryDefinition), variables);
    var context = {
        store: store,
        returnPartialData: returnPartialData,
        customResolvers: (config && config.customResolvers) || {},
        hasMissingField: false,
    };
    var rootIdValue = {
        type: 'id',
        id: rootId,
        previousResult: previousResult,
    };
    var result = __WEBPACK_IMPORTED_MODULE_0_graphql_anywhere___default.a(readStoreResolver, query, rootIdValue, context, variables, {
        fragmentMatcher: fragmentMatcherFunction,
        resultMapper: resultMapper,
    });
    return {
        result: result,
        isMissing: context.hasMissingField,
    };
}
function assertIdValue(idValue) {
    if (!isIdValue(idValue)) {
        throw new Error("Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
    }
}
function addPreviousResultToIdValues(value, previousResult) {
    if (isIdValue(value)) {
        return readFromStore___assign({}, value, { previousResult: previousResult });
    }
    else if (Array.isArray(value)) {
        var idToPreviousResult_1 = {};
        if (Array.isArray(previousResult)) {
            previousResult.forEach(function (item) {
                if (item && item[ID_KEY]) {
                    idToPreviousResult_1[item[ID_KEY]] = item;
                }
            });
        }
        return value.map(function (item, i) {
            var itemPreviousResult = previousResult && previousResult[i];
            if (isIdValue(item)) {
                itemPreviousResult = idToPreviousResult_1[item.id] || itemPreviousResult;
            }
            return addPreviousResultToIdValues(item, itemPreviousResult);
        });
    }
    return value;
}
function resultMapper(resultFields, idValue) {
    if (idValue.previousResult) {
        var currentResultKeys_1 = Object.keys(resultFields);
        var sameAsPreviousResult = Object.keys(idValue.previousResult)
            .reduce(function (sameKeys, key) { return sameKeys && currentResultKeys_1.indexOf(key) > -1; }, true) &&
            currentResultKeys_1.reduce(function (same, key) { return (same && areNestedArrayItemsStrictlyEqual(resultFields[key], idValue.previousResult[key])); }, true);
        if (sameAsPreviousResult) {
            return idValue.previousResult;
        }
    }
    Object.defineProperty(resultFields, ID_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: idValue.id,
    });
    return resultFields;
}
function areNestedArrayItemsStrictlyEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return false;
    }
    return a.reduce(function (same, item, i) { return same && areNestedArrayItemsStrictlyEqual(item, b[i]); }, true);
}
//# sourceMappingURL=readFromStore.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/proxy.js
var proxy___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};





var proxy_ReduxDataProxy = (function () {
    function ReduxDataProxy(store, reduxRootSelector, fragmentMatcher, reducerConfig) {
        this.store = store;
        this.reduxRootSelector = reduxRootSelector;
        this.reducerConfig = reducerConfig;
        this.fragmentMatcher = fragmentMatcher;
    }
    ReduxDataProxy.prototype.readQuery = function (_a) {
        var query = _a.query, variables = _a.variables;
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        return readQueryFromStore({
            rootId: 'ROOT_QUERY',
            store: getDataWithOptimisticResults(this.reduxRootSelector(this.store.getState())),
            query: query,
            variables: variables,
            fragmentMatcherFunction: this.fragmentMatcher.match,
            config: this.reducerConfig,
        });
    };
    ReduxDataProxy.prototype.readFragment = function (_a) {
        var id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        var query = getFragmentQueryDocument(fragment, fragmentName);
        var data = getDataWithOptimisticResults(this.reduxRootSelector(this.store.getState()));
        if (typeof data[id] === 'undefined') {
            return null;
        }
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        return readQueryFromStore({
            rootId: id,
            store: data,
            query: query,
            variables: variables,
            fragmentMatcherFunction: this.fragmentMatcher.match,
            config: this.reducerConfig,
        });
    };
    ReduxDataProxy.prototype.writeQuery = function (_a) {
        var data = _a.data, query = _a.query, variables = _a.variables;
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        this.store.dispatch({
            type: 'APOLLO_WRITE',
            writes: [{
                    rootId: 'ROOT_QUERY',
                    result: data,
                    document: query,
                    operationName: getOperationName(query),
                    variables: variables || {},
                }],
        });
    };
    ReduxDataProxy.prototype.writeFragment = function (_a) {
        var data = _a.data, id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        var document = getFragmentQueryDocument(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            document = addTypenameToDocument(document);
        }
        this.store.dispatch({
            type: 'APOLLO_WRITE',
            writes: [{
                    rootId: id,
                    result: data,
                    document: document,
                    operationName: getOperationName(document),
                    variables: variables || {},
                }],
        });
    };
    return ReduxDataProxy;
}());

var proxy_TransactionDataProxy = (function () {
    function TransactionDataProxy(data, reducerConfig) {
        this.data = proxy___assign({}, data);
        this.reducerConfig = reducerConfig;
        this.writes = [];
        this.isFinished = false;
    }
    TransactionDataProxy.prototype.finish = function () {
        this.assertNotFinished();
        var writes = this.writes;
        this.writes = [];
        this.isFinished = true;
        return writes;
    };
    TransactionDataProxy.prototype.readQuery = function (_a) {
        var query = _a.query, variables = _a.variables;
        this.assertNotFinished();
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        return readQueryFromStore({
            rootId: 'ROOT_QUERY',
            store: this.data,
            query: query,
            variables: variables,
            config: this.reducerConfig,
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
    };
    TransactionDataProxy.prototype.readFragment = function (_a) {
        var id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        this.assertNotFinished();
        if (!fragment) {
            throw new Error('fragment option is required. Please pass a GraphQL fragment to readFragment.');
        }
        var data = this.data;
        var query = getFragmentQueryDocument(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        if (typeof data[id] === 'undefined') {
            return null;
        }
        return readQueryFromStore({
            rootId: id,
            store: data,
            query: query,
            variables: variables,
            config: this.reducerConfig,
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
    };
    TransactionDataProxy.prototype.writeQuery = function (_a) {
        var data = _a.data, query = _a.query, variables = _a.variables;
        this.assertNotFinished();
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        this.applyWrite({
            rootId: 'ROOT_QUERY',
            result: data,
            document: query,
            operationName: getOperationName(query),
            variables: variables || {},
        });
    };
    TransactionDataProxy.prototype.writeFragment = function (_a) {
        var data = _a.data, id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        this.assertNotFinished();
        if (!fragment) {
            throw new Error('fragment option is required. Please pass a GraphQL fragment to writeFragment.');
        }
        var query = getFragmentQueryDocument(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        this.applyWrite({
            rootId: id,
            result: data,
            document: query,
            operationName: getOperationName(query),
            variables: variables || {},
        });
    };
    TransactionDataProxy.prototype.assertNotFinished = function () {
        if (this.isFinished) {
            throw new Error('Cannot call transaction methods after the transaction has finished.');
        }
    };
    TransactionDataProxy.prototype.applyWrite = function (write) {
        writeResultToStore({
            result: write.result,
            dataId: write.rootId,
            document: write.document,
            variables: write.variables,
            store: this.data,
            dataIdFromObject: this.reducerConfig.dataIdFromObject || (function () { return null; }),
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
        this.writes.push(write);
    };
    return TransactionDataProxy;
}());

//# sourceMappingURL=proxy.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/replaceQueryResults.js
var replaceQueryResults___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function replaceQueryResults(state, _a, config) {
    var variables = _a.variables, document = _a.document, newResult = _a.newResult;
    var clonedState = replaceQueryResults___assign({}, state);
    return writeResultToStore({
        result: newResult,
        dataId: 'ROOT_QUERY',
        variables: variables,
        document: document,
        store: clonedState,
        dataIdFromObject: config.dataIdFromObject,
        fragmentMatcherFunction: config.fragmentMatcher,
    });
}
//# sourceMappingURL=replaceQueryResults.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/errorHandling.js
function tryFunctionOrLogError(f) {
    try {
        return f();
    }
    catch (e) {
        if (console.error) {
            console.error(e);
        }
    }
}
//# sourceMappingURL=errorHandling.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/store.js
var data_store___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};








function store_data(previousState, action, queries, mutations, config) {
    if (previousState === void 0) { previousState = {}; }
    var constAction = action;
    if (isQueryResultAction(action)) {
        if (!queries[action.queryId]) {
            return previousState;
        }
        if (action.requestId < queries[action.queryId].lastRequestId || action.fetchMoreForQueryId) {
            return previousState;
        }
        if (!graphQLResultHasError(action.result)) {
            var queryStoreValue = queries[action.queryId];
            var clonedState = data_store___assign({}, previousState);
            var newState_1 = writeResultToStore({
                result: action.result.data,
                dataId: 'ROOT_QUERY',
                document: action.document,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
            if (action.extraReducers) {
                action.extraReducers.forEach(function (reducer) {
                    newState_1 = reducer(newState_1, constAction);
                });
            }
            return newState_1;
        }
    }
    else if (isSubscriptionResultAction(action)) {
        if (!graphQLResultHasError(action.result)) {
            var clonedState = data_store___assign({}, previousState);
            var newState_2 = writeResultToStore({
                result: action.result.data,
                dataId: 'ROOT_SUBSCRIPTION',
                document: action.document,
                variables: action.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
            if (action.extraReducers) {
                action.extraReducers.forEach(function (reducer) {
                    newState_2 = reducer(newState_2, constAction);
                });
            }
            return newState_2;
        }
    }
    else if (isMutationResultAction(constAction)) {
        if (!constAction.result.errors) {
            var queryStoreValue = mutations[constAction.mutationId];
            var clonedState = data_store___assign({}, previousState);
            var newState_3 = writeResultToStore({
                result: constAction.result.data,
                dataId: 'ROOT_MUTATION',
                document: constAction.document,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
            var updateQueries_1 = constAction.updateQueries;
            if (updateQueries_1) {
                Object.keys(updateQueries_1).forEach(function (queryId) {
                    var query = queries[queryId];
                    if (!query) {
                        return;
                    }
                    var _a = diffQueryAgainstStore({
                        store: previousState,
                        query: query.document,
                        variables: query.variables,
                        returnPartialData: true,
                        fragmentMatcherFunction: config.fragmentMatcher,
                        config: config,
                    }), currentQueryResult = _a.result, isMissing = _a.isMissing;
                    if (isMissing) {
                        return;
                    }
                    var reducer = updateQueries_1[queryId];
                    var nextQueryResult = tryFunctionOrLogError(function () { return reducer(currentQueryResult, {
                        mutationResult: constAction.result,
                        queryName: getOperationName(query.document),
                        queryVariables: query.variables,
                    }); });
                    if (nextQueryResult) {
                        newState_3 = writeResultToStore({
                            result: nextQueryResult,
                            dataId: 'ROOT_QUERY',
                            document: query.document,
                            variables: query.variables,
                            store: newState_3,
                            dataIdFromObject: config.dataIdFromObject,
                            fragmentMatcherFunction: config.fragmentMatcher,
                        });
                    }
                });
            }
            if (constAction.update) {
                var update_1 = constAction.update;
                var proxy_1 = new proxy_TransactionDataProxy(newState_3, config);
                tryFunctionOrLogError(function () { return update_1(proxy_1, constAction.result); });
                var writes = proxy_1.finish();
                newState_3 = store_data(newState_3, { type: 'APOLLO_WRITE', writes: writes }, queries, mutations, config);
            }
            if (constAction.extraReducers) {
                constAction.extraReducers.forEach(function (reducer) {
                    newState_3 = reducer(newState_3, constAction);
                });
            }
            return newState_3;
        }
    }
    else if (isUpdateQueryResultAction(constAction)) {
        return replaceQueryResults(previousState, constAction, config);
    }
    else if (isStoreResetAction(action)) {
        return {};
    }
    else if (isWriteAction(action)) {
        return action.writes.reduce(function (currentState, write) { return writeResultToStore({
            result: write.result,
            dataId: write.rootId,
            document: write.document,
            variables: write.variables,
            store: currentState,
            dataIdFromObject: config.dataIdFromObject,
            fragmentMatcherFunction: config.fragmentMatcher,
        }); }, data_store___assign({}, previousState));
    }
    return previousState;
}
//# sourceMappingURL=store.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/queries/networkStatus.js
var NetworkStatus;
(function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
}
//# sourceMappingURL=networkStatus.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/queries/store.js
var queries_store___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




function store_queries(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (isQueryInitAction(action)) {
        var newState = queries_store___assign({}, previousState);
        var previousQuery = previousState[action.queryId];
        if (previousQuery && previousQuery.queryString !== action.queryString) {
            throw new Error('Internal Error: may not update existing query string in store');
        }
        var isSetVariables = false;
        var previousVariables = null;
        if (action.storePreviousVariables &&
            previousQuery &&
            previousQuery.networkStatus !== NetworkStatus.loading) {
            if (!isEqual(previousQuery.variables, action.variables)) {
                isSetVariables = true;
                previousVariables = previousQuery.variables;
            }
        }
        var newNetworkStatus = NetworkStatus.loading;
        if (isSetVariables) {
            newNetworkStatus = NetworkStatus.setVariables;
        }
        else if (action.isPoll) {
            newNetworkStatus = NetworkStatus.poll;
        }
        else if (action.isRefetch) {
            newNetworkStatus = NetworkStatus.refetch;
        }
        else if (action.isPoll) {
            newNetworkStatus = NetworkStatus.poll;
        }
        newState[action.queryId] = {
            queryString: action.queryString,
            document: action.document,
            variables: action.variables,
            previousVariables: previousVariables,
            networkError: null,
            graphQLErrors: [],
            networkStatus: newNetworkStatus,
            lastRequestId: action.requestId,
            metadata: action.metadata,
        };
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = queries_store___assign({}, previousState[action.fetchMoreForQueryId], { networkStatus: NetworkStatus.fetchMore });
        }
        return newState;
    }
    else if (isQueryResultAction(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        if (action.requestId < previousState[action.queryId].lastRequestId) {
            return previousState;
        }
        var newState = queries_store___assign({}, previousState);
        var resultHasGraphQLErrors = graphQLResultHasError(action.result);
        newState[action.queryId] = queries_store___assign({}, previousState[action.queryId], { networkError: null, graphQLErrors: resultHasGraphQLErrors ? action.result.errors : [], previousVariables: null, networkStatus: NetworkStatus.ready });
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = queries_store___assign({}, previousState[action.fetchMoreForQueryId], { networkStatus: NetworkStatus.ready });
        }
        return newState;
    }
    else if (isQueryErrorAction(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        if (action.requestId < previousState[action.queryId].lastRequestId) {
            return previousState;
        }
        var newState = queries_store___assign({}, previousState);
        newState[action.queryId] = queries_store___assign({}, previousState[action.queryId], { networkError: action.error, networkStatus: NetworkStatus.error });
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = queries_store___assign({}, previousState[action.fetchMoreForQueryId], { networkError: action.error, networkStatus: NetworkStatus.error });
        }
        return newState;
    }
    else if (isQueryResultClientAction(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        var newState = queries_store___assign({}, previousState);
        newState[action.queryId] = queries_store___assign({}, previousState[action.queryId], { networkError: null, previousVariables: null, networkStatus: action.complete ? NetworkStatus.ready : NetworkStatus.loading });
        return newState;
    }
    else if (isQueryStopAction(action)) {
        var newState = queries_store___assign({}, previousState);
        delete newState[action.queryId];
        return newState;
    }
    else if (isStoreResetAction(action)) {
        return resetQueryState(previousState, action);
    }
    return previousState;
}
function resetQueryState(state, action) {
    var observableQueryIds = action.observableQueryIds;
    var newQueries = Object.keys(state).filter(function (queryId) {
        return (observableQueryIds.indexOf(queryId) > -1);
    }).reduce(function (res, key) {
        res[key] = queries_store___assign({}, state[key], { networkStatus: NetworkStatus.loading });
        return res;
    }, {});
    return newQueries;
}
//# sourceMappingURL=store.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/mutations/store.js
var mutations_store___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

function store_mutations(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (isMutationInitAction(action)) {
        var newState = mutations_store___assign({}, previousState);
        newState[action.mutationId] = {
            mutationString: action.mutationString,
            variables: action.variables,
            loading: true,
            error: null,
        };
        return newState;
    }
    else if (isMutationResultAction(action)) {
        var newState = mutations_store___assign({}, previousState);
        newState[action.mutationId] = mutations_store___assign({}, previousState[action.mutationId], { loading: false, error: null });
        return newState;
    }
    else if (isMutationErrorAction(action)) {
        var newState = mutations_store___assign({}, previousState);
        newState[action.mutationId] = mutations_store___assign({}, previousState[action.mutationId], { loading: false, error: action.error });
    }
    else if (isStoreResetAction(action)) {
        return {};
    }
    return previousState;
}
//# sourceMappingURL=store.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/store.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(593);
var apollo_client_store___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







var crashReporter = function (store) { return function (next) { return function (action) {
    try {
        return next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err);
        console.error(err.stack);
        throw err;
    }
}; }; };
var createReducerError = function (error, action) {
    var reducerError = { error: error };
    if (isQueryResultAction(action)) {
        reducerError.queryId = action.queryId;
    }
    else if (isSubscriptionResultAction(action)) {
        reducerError.subscriptionId = action.subscriptionId;
    }
    else if (isMutationResultAction(action)) {
        reducerError.mutationId = action.mutationId;
    }
    return reducerError;
};
function createApolloReducer(config) {
    return function apolloReducer(state, action) {
        if (state === void 0) { state = {}; }
        try {
            var newState = {
                queries: store_queries(state.queries, action),
                mutations: store_mutations(state.mutations, action),
                data: store_data(state.data, action, state.queries, state.mutations, config),
                optimistic: [],
                reducerError: null,
            };
            newState.optimistic = optimistic(state.optimistic, action, newState, config);
            if (state.data === newState.data &&
                state.mutations === newState.mutations &&
                state.queries === newState.queries &&
                state.optimistic === newState.optimistic &&
                state.reducerError === newState.reducerError) {
                return state;
            }
            return newState;
        }
        catch (reducerError) {
            return apollo_client_store___assign({}, state, { reducerError: createReducerError(reducerError, action) });
        }
    };
}
function createApolloStore(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.reduxRootKey, reduxRootKey = _c === void 0 ? 'apollo' : _c, initialState = _b.initialState, _d = _b.config, config = _d === void 0 ? {} : _d, _e = _b.reportCrashes, reportCrashes = _e === void 0 ? true : _e, logger = _b.logger;
    var enhancers = [];
    var middlewares = [];
    if (reportCrashes) {
        middlewares.push(crashReporter);
    }
    if (logger) {
        middlewares.push(logger);
    }
    if (middlewares.length > 0) {
        enhancers.push(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(void 0, middlewares));
    }
    if (typeof window !== 'undefined') {
        var anyWindow = window;
        if (anyWindow.devToolsExtension) {
            enhancers.push(anyWindow.devToolsExtension());
        }
    }
    var compose = __WEBPACK_IMPORTED_MODULE_0_redux__["compose"];
    if (initialState && initialState[reduxRootKey] && initialState[reduxRootKey]['queries']) {
        throw new Error('Apollo initial state may not contain queries, only data');
    }
    if (initialState && initialState[reduxRootKey] && initialState[reduxRootKey]['mutations']) {
        throw new Error('Apollo initial state may not contain mutations, only data');
    }
    return __WEBPACK_IMPORTED_MODULE_0_redux__["createStore"](__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"]((_f = {}, _f[reduxRootKey] = createApolloReducer(config), _f)), initialState, compose.apply(void 0, enhancers));
    var _f;
}
//# sourceMappingURL=store.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/Observable.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_symbol_observable__);

function isSubscription(subscription) {
    return subscription.unsubscribe !== undefined;
}
var Observable = (function () {
    function Observable(subscriberFunction) {
        this.subscriberFunction = subscriberFunction;
    }
    Observable.prototype[__WEBPACK_IMPORTED_MODULE_0_symbol_observable___default.a] = function () {
        return this;
    };
    Observable.prototype.subscribe = function (observer) {
        var subscriptionOrCleanupFunction = this.subscriberFunction(observer);
        if (isSubscription(subscriptionOrCleanupFunction)) {
            return subscriptionOrCleanupFunction;
        }
        else {
            return {
                unsubscribe: subscriptionOrCleanupFunction,
            };
        }
    };
    return Observable;
}());

//# sourceMappingURL=Observable.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/errors/ApolloError.js
var ApolloError___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
var generateErrorMessage = function (err) {
    var message = '';
    if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length !== 0) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError ? graphQLError.message : 'Error message not found.';
            message += "GraphQL error: " + errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += 'Network error: ' + err.networkError.message + '\n';
    }
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    ApolloError___extends(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        if (!errorMessage) {
            _this.message = generateErrorMessage(_this);
        }
        else {
            _this.message = errorMessage;
        }
        _this.extraInfo = extraInfo;
        return _this;
    }
    return ApolloError;
}(Error));

//# sourceMappingURL=ApolloError.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/core/types.js
var FetchType;
(function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));
//# sourceMappingURL=types.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/maybeDeepFreeze.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(552);

function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop)
            && o[prop] !== null
            && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}
function maybeDeepFreeze(obj) {
    if (__WEBPACK_IMPORTED_MODULE_0__environment__["a" /* isDevelopment */]() || __WEBPACK_IMPORTED_MODULE_0__environment__["c" /* isTest */]()) {
        return deepFreeze(obj);
    }
    return obj;
}
//# sourceMappingURL=maybeDeepFreeze.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/core/ObservableQuery.js
var ObservableQuery___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ObservableQuery___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};








var ObservableQuery_ObservableQuery = (function (_super) {
    ObservableQuery___extends(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var scheduler = _a.scheduler, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
        var _this = this;
        var queryManager = scheduler.queryManager;
        var queryId = queryManager.generateQueryId();
        var subscriberFunction = function (observer) {
            return _this.onSubscribe(observer);
        };
        _this = _super.call(this, subscriberFunction) || this;
        _this.isCurrentlyPolling = false;
        _this.options = options;
        _this.variables = _this.options.variables || {};
        _this.scheduler = scheduler;
        _this.queryManager = queryManager;
        _this.queryId = queryId;
        _this.shouldSubscribe = shouldSubscribe;
        _this.observers = [];
        _this.subscriptionHandles = [];
        return _this;
    }
    ObservableQuery.prototype.result = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            var subscription = null;
            var observer = {
                next: function (result) {
                    resolve(result);
                    var selectedObservers = that.observers.filter(function (obs) { return obs !== observer; });
                    if (selectedObservers.length === 0) {
                        that.queryManager.removeQuery(that.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: function (error) {
                    reject(error);
                },
            };
            subscription = that.subscribe(observer);
        });
    };
    ObservableQuery.prototype.currentResult = function () {
        var _a = this.queryManager.getCurrentQueryResult(this, true), data = _a.data, partial = _a.partial;
        var queryStoreValue = this.queryManager.getApolloState().queries[this.queryId];
        if (queryStoreValue && ((queryStoreValue.graphQLErrors && queryStoreValue.graphQLErrors.length > 0) ||
            queryStoreValue.networkError)) {
            var error = new ApolloError({
                graphQLErrors: queryStoreValue.graphQLErrors,
                networkError: queryStoreValue.networkError,
            });
            return { data: {}, loading: false, networkStatus: queryStoreValue.networkStatus, error: error };
        }
        var queryLoading = !queryStoreValue || queryStoreValue.networkStatus === NetworkStatus.loading;
        var loading = (this.options.fetchPolicy === 'network-only' && queryLoading)
            || (partial && this.options.fetchPolicy !== 'cache-only');
        var networkStatus;
        if (queryStoreValue) {
            networkStatus = queryStoreValue.networkStatus;
        }
        else {
            networkStatus = loading ? NetworkStatus.loading : NetworkStatus.ready;
        }
        return {
            data: data,
            loading: isNetworkRequestInFlight(networkStatus),
            networkStatus: networkStatus,
            partial: partial,
        };
    };
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.refetch = function (variables) {
        this.variables = ObservableQuery___assign({}, this.variables, variables);
        if (this.options.fetchPolicy === 'cache-only') {
            return Promise.reject(new Error('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        this.options.variables = ObservableQuery___assign({}, this.options.variables, this.variables);
        var combinedOptions = ObservableQuery___assign({}, this.options, { fetchPolicy: 'network-only' });
        return this.queryManager.fetchQuery(this.queryId, combinedOptions, FetchType.refetch)
            .then(function (result) { return maybeDeepFreeze(result); });
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        if (!fetchMoreOptions.updateQuery) {
            throw new Error('updateQuery option is required. This function defines how to update the query data with the new results.');
        }
        return Promise.resolve()
            .then(function () {
            var qid = _this.queryManager.generateQueryId();
            var combinedOptions = null;
            if (fetchMoreOptions.query) {
                combinedOptions = fetchMoreOptions;
            }
            else {
                var variables = ObservableQuery___assign({}, _this.variables, fetchMoreOptions.variables);
                combinedOptions = ObservableQuery___assign({}, _this.options, fetchMoreOptions, { variables: variables });
            }
            combinedOptions = ObservableQuery___assign({}, combinedOptions, { query: combinedOptions.query, fetchPolicy: 'network-only' });
            return _this.queryManager.fetchQuery(qid, combinedOptions, FetchType.normal, _this.queryId);
        })
            .then(function (fetchMoreResult) {
            var data = fetchMoreResult.data;
            var reducer = fetchMoreOptions.updateQuery;
            var mapFn = function (previousResult, _a) {
                var variables = _a.variables;
                var queryVariables = variables;
                return reducer(previousResult, {
                    fetchMoreResult: data,
                    queryVariables: queryVariables,
                });
            };
            _this.updateQuery(mapFn);
            return fetchMoreResult;
        });
    };
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var observable = this.queryManager.startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
        });
        var subscription = observable.subscribe({
            next: function (data) {
                if (options.updateQuery) {
                    var reducer_1 = options.updateQuery;
                    var mapFn = function (previousResult, _a) {
                        var variables = _a.variables;
                        return reducer_1(previousResult, {
                            subscriptionData: { data: data },
                            variables: variables,
                        });
                    };
                    _this.updateQuery(mapFn);
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                }
                else {
                    console.error('Unhandled GraphQL subscription error', err);
                }
            },
        });
        this.subscriptionHandles.push(subscription);
        return function () {
            var i = _this.subscriptionHandles.indexOf(subscription);
            if (i >= 0) {
                _this.subscriptionHandles.splice(i, 1);
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (opts) {
        var oldOptions = this.options;
        this.options = ObservableQuery___assign({}, this.options, opts);
        if (opts.pollInterval) {
            this.startPolling(opts.pollInterval);
        }
        else if (opts.pollInterval === 0) {
            this.stopPolling();
        }
        var tryFetch = (oldOptions.fetchPolicy !== 'network-only' && opts.fetchPolicy === 'network-only')
            || (oldOptions.fetchPolicy === 'cache-only' && opts.fetchPolicy !== 'cache-only')
            || (oldOptions.fetchPolicy === 'standby' && opts.fetchPolicy !== 'standby')
            || false;
        return this.setVariables(this.options.variables, tryFetch, opts.fetchResults);
    };
    ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
        if (tryFetch === void 0) { tryFetch = false; }
        if (fetchResults === void 0) { fetchResults = true; }
        var newVariables = ObservableQuery___assign({}, this.variables, variables);
        if (isEqual(newVariables, this.variables) && !tryFetch) {
            if (this.observers.length === 0 || !fetchResults) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.result();
        }
        else {
            this.variables = newVariables;
            this.options.variables = newVariables;
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.queryManager.fetchQuery(this.queryId, ObservableQuery___assign({}, this.options, { variables: this.variables }))
                .then(function (result) { return maybeDeepFreeze(result); });
        }
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var _a = this.queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
        var newResult = tryFunctionOrLogError(function () { return mapFn(previousResult, { variables: variables }); });
        if (newResult) {
            this.queryManager.store.dispatch({
                type: 'APOLLO_UPDATE_QUERY_RESULT',
                newResult: newResult,
                variables: variables,
                document: document,
                operationName: getOperationName(document),
            });
        }
    };
    ObservableQuery.prototype.stopPolling = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.options.pollInterval = undefined;
            this.isCurrentlyPolling = false;
        }
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        if (this.options.fetchPolicy === 'cache-first' || (this.options.fetchPolicy === 'cache-only')) {
            throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
        }
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.options.pollInterval = pollInterval;
        this.isCurrentlyPolling = true;
        this.scheduler.startPollingQuery(this.options, this.queryId);
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        this.observers.push(observer);
        if (observer.next && this.lastResult) {
            observer.next(this.lastResult);
        }
        if (observer.error && this.lastError) {
            observer.error(this.lastError);
        }
        if (this.observers.length === 1) {
            this.setUpQuery();
        }
        var retQuerySubscription = {
            unsubscribe: function () {
                if (!_this.observers.some(function (el) { return el === observer; })) {
                    return;
                }
                _this.observers = _this.observers.filter(function (obs) { return obs !== observer; });
                if (_this.observers.length === 0) {
                    _this.tearDownQuery();
                }
            },
        };
        return retQuerySubscription;
    };
    ObservableQuery.prototype.setUpQuery = function () {
        var _this = this;
        if (this.shouldSubscribe) {
            this.queryManager.addObservableQuery(this.queryId, this);
        }
        if (!!this.options.pollInterval) {
            if (this.options.fetchPolicy === 'cache-first' || (this.options.fetchPolicy === 'cache-only')) {
                throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
            }
            this.isCurrentlyPolling = true;
            this.scheduler.startPollingQuery(this.options, this.queryId);
        }
        var observer = {
            next: function (result) {
                _this.lastResult = result;
                _this.observers.forEach(function (obs) {
                    if (obs.next) {
                        obs.next(result);
                    }
                });
            },
            error: function (error) {
                _this.observers.forEach(function (obs) {
                    if (obs.error) {
                        obs.error(error);
                    }
                    else {
                        console.error('Unhandled error', error.message, error.stack);
                    }
                });
                _this.lastError = error;
            },
        };
        this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, observer));
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.subscriptionHandles.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptionHandles = [];
        this.queryManager.stopQuery(this.queryId);
        if (this.shouldSubscribe) {
            this.queryManager.removeObservableQuery(this.queryId);
        }
        this.observers = [];
    };
    return ObservableQuery;
}(Observable));

//# sourceMappingURL=ObservableQuery.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/util/warnOnce.js
/* harmony import */ var warnOnce___WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(552);

var haveWarned = Object.create({});
function warnOnceInDevelopment(msg, type) {
    if (type === void 0) { type = 'warn'; }
    if (warnOnce___WEBPACK_IMPORTED_MODULE_0__environment__["b" /* isProduction */]()) {
        return;
    }
    if (!haveWarned[msg]) {
        if (!warnOnce___WEBPACK_IMPORTED_MODULE_0__environment__["c" /* isTest */]()) {
            haveWarned[msg] = true;
        }
        switch (type) {
            case 'error':
                console.error(msg);
                break;
            default:
                console.warn(msg);
        }
    }
}
//# sourceMappingURL=warnOnce.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/fragmentMatcher.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_environment__ = __webpack_require__(552);


var IntrospectionFragmentMatcher = (function () {
    function IntrospectionFragmentMatcher(options) {
        if (options && options.introspectionQueryResultData) {
            this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
            this.isReady = true;
        }
        else {
            this.isReady = false;
        }
        this.match = this.match.bind(this);
    }
    IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        if (!this.isReady) {
            throw new Error('FragmentMatcher.match() was called before FragmentMatcher.init()');
        }
        var obj = context.store[idValue.id];
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            throw new Error("Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        var implementingTypes = this.possibleTypesMap[typeCondition];
        if (implementingTypes && implementingTypes.indexOf(obj.__typename) > -1) {
            return true;
        }
        return false;
    };
    IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
        var typeMap = {};
        introspectionResultData.__schema.types.forEach(function (type) {
            if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
                typeMap[type.name] = type.possibleTypes.map(function (implementingType) { return implementingType.name; });
            }
        });
        return typeMap;
    };
    return IntrospectionFragmentMatcher;
}());

var fragmentMatcher_haveWarned = false;
var fragmentMatcher_HeuristicFragmentMatcher = (function () {
    function HeuristicFragmentMatcher() {
    }
    HeuristicFragmentMatcher.prototype.ensureReady = function () {
        return Promise.resolve();
    };
    HeuristicFragmentMatcher.prototype.canBypassInit = function () {
        return true;
    };
    HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        var obj = context.store[idValue.id];
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            if (!fragmentMatcher_haveWarned) {
                console.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
                console.warn('Could not find __typename on Fragment ', typeCondition, obj);
                console.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " +
                    "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
                if (!__WEBPACK_IMPORTED_MODULE_0__util_environment__["c" /* isTest */]()) {
                    fragmentMatcher_haveWarned = true;
                }
            }
            context.returnPartialData = true;
            return true;
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        warnOnceInDevelopment("You are using the simple (heuristic) fragment matcher, but your queries contain union or interface types.\n     Apollo Client will not be able to able to accurately map fragments." +
            "To make this error go away, use the IntrospectionFragmentMatcher as described in the docs: " +
            "http://dev.apollodata.com/react/initialization.html#fragment-matcher", 'error');
        context.returnPartialData = true;
        return true;
    };
    return HeuristicFragmentMatcher;
}());

//# sourceMappingURL=fragmentMatcher.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/transport/Deduplicator.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__);

var Deduplicator = (function () {
    function Deduplicator(networkInterface) {
        this.networkInterface = networkInterface;
        this.inFlightRequestPromises = {};
    }
    Deduplicator.prototype.query = function (request, deduplicate) {
        var _this = this;
        if (deduplicate === void 0) { deduplicate = true; }
        if (!deduplicate) {
            return this.networkInterface.query(request);
        }
        var key = this.getKey(request);
        if (!this.inFlightRequestPromises[key]) {
            this.inFlightRequestPromises[key] = this.networkInterface.query(request);
        }
        return this.inFlightRequestPromises[key]
            .then(function (res) {
            delete _this.inFlightRequestPromises[key];
            return res;
        })
            .catch(function (err) {
            delete _this.inFlightRequestPromises[key];
            throw err;
        });
    };
    Deduplicator.prototype.getKey = function (request) {
        return __WEBPACK_IMPORTED_MODULE_0_graphql_language_printer__["print"](request.query) + "|" + JSON.stringify(request.variables) + "|" + request.operationName;
    };
    return Deduplicator;
}());

//# sourceMappingURL=Deduplicator.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/data/resultReducers.js


function createStoreReducer(resultReducer, document, variables, config) {
    return function (store, action) {
        var _a = diffQueryAgainstStore({
            store: store,
            query: document,
            variables: variables,
            returnPartialData: true,
            fragmentMatcherFunction: config.fragmentMatcher,
            config: config,
        }), result = _a.result, isMissing = _a.isMissing;
        if (isMissing) {
            return store;
        }
        var nextResult;
        try {
            nextResult = resultReducer(result, action, variables);
        }
        catch (err) {
            console.warn('Unhandled error in result reducer', err);
            throw err;
        }
        if (result !== nextResult) {
            return writeResultToStore({
                dataId: 'ROOT_QUERY',
                result: nextResult,
                store: store,
                document: document,
                variables: variables,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
        }
        return store;
    };
}
//# sourceMappingURL=resultReducers.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/scheduler/scheduler.js
var scheduler___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var scheduler_QueryScheduler = (function () {
    function QueryScheduler(_a) {
        var queryManager = _a.queryManager;
        this.queryManager = queryManager;
        this.pollingTimers = {};
        this.inFlightQueries = {};
        this.registeredQueries = {};
        this.intervalQueries = {};
    }
    QueryScheduler.prototype.checkInFlight = function (queryId) {
        var queries = this.queryManager.getApolloState().queries;
        return queries[queryId] && queries[queryId].networkStatus !== NetworkStatus.ready;
    };
    QueryScheduler.prototype.fetchQuery = function (queryId, options, fetchType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryManager.fetchQuery(queryId, options, fetchType).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    QueryScheduler.prototype.startPollingQuery = function (options, queryId, listener) {
        if (!options.pollInterval) {
            throw new Error('Attempted to start a polling query without a polling interval.');
        }
        if (this.queryManager.ssrMode) {
            return queryId;
        }
        this.registeredQueries[queryId] = options;
        if (listener) {
            this.queryManager.addQueryListener(queryId, listener);
        }
        this.addQueryOnInterval(queryId, options);
        return queryId;
    };
    QueryScheduler.prototype.stopPollingQuery = function (queryId) {
        delete this.registeredQueries[queryId];
    };
    QueryScheduler.prototype.fetchQueriesOnInterval = function (interval) {
        var _this = this;
        this.intervalQueries[interval] = this.intervalQueries[interval].filter(function (queryId) {
            if (!_this.registeredQueries.hasOwnProperty(queryId)) {
                return false;
            }
            if (_this.checkInFlight(queryId)) {
                return true;
            }
            var queryOptions = _this.registeredQueries[queryId];
            var pollingOptions = scheduler___assign({}, queryOptions);
            pollingOptions.fetchPolicy = 'network-only';
            _this.fetchQuery(queryId, pollingOptions, FetchType.poll);
            return true;
        });
        if (this.intervalQueries[interval].length === 0) {
            clearInterval(this.pollingTimers[interval]);
            delete this.intervalQueries[interval];
        }
    };
    QueryScheduler.prototype.addQueryOnInterval = function (queryId, queryOptions) {
        var _this = this;
        var interval = queryOptions.pollInterval;
        if (!interval) {
            throw new Error("A poll interval is required to start polling query with id '" + queryId + "'.");
        }
        if (this.intervalQueries.hasOwnProperty(interval.toString()) && this.intervalQueries[interval].length > 0) {
            this.intervalQueries[interval].push(queryId);
        }
        else {
            this.intervalQueries[interval] = [queryId];
            this.pollingTimers[interval] = setInterval(function () {
                _this.fetchQueriesOnInterval(interval);
            }, interval);
        }
    };
    QueryScheduler.prototype.registerPollingQuery = function (queryOptions) {
        if (!queryOptions.pollInterval) {
            throw new Error('Attempted to register a non-polling query with the scheduler.');
        }
        return new ObservableQuery_ObservableQuery({
            scheduler: this,
            options: queryOptions,
        });
    };
    return QueryScheduler;
}());

//# sourceMappingURL=scheduler.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/core/QueryManager.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_environment__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_graphql_language_printer__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_graphql_language_printer__);
var QueryManager___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



















var QueryManager_QueryManager = (function () {
    function QueryManager(_a) {
        var networkInterface = _a.networkInterface, store = _a.store, reduxRootSelector = _a.reduxRootSelector, _b = _a.reducerConfig, reducerConfig = _b === void 0 ? { mutationBehaviorReducers: {} } : _b, fragmentMatcher = _a.fragmentMatcher, _c = _a.addTypename, addTypename = _c === void 0 ? true : _c, _d = _a.queryDeduplication, queryDeduplication = _d === void 0 ? false : _d, _e = _a.ssrMode, ssrMode = _e === void 0 ? false : _e;
        var _this = this;
        this.idCounter = 1;
        this.networkInterface = networkInterface;
        this.deduplicator = new Deduplicator(networkInterface);
        this.store = store;
        this.reduxRootSelector = reduxRootSelector;
        this.reducerConfig = reducerConfig;
        this.pollingTimers = {};
        this.queryListeners = {};
        this.queryDocuments = {};
        this.addTypename = addTypename;
        this.queryDeduplication = queryDeduplication;
        this.ssrMode = ssrMode;
        if (typeof fragmentMatcher === 'undefined') {
            this.fragmentMatcher = new fragmentMatcher_HeuristicFragmentMatcher();
        }
        else {
            this.fragmentMatcher = fragmentMatcher;
        }
        this.scheduler = new scheduler_QueryScheduler({
            queryManager: this,
        });
        this.fetchQueryPromises = {};
        this.observableQueries = {};
        this.queryIdsByName = {};
        if (this.store['subscribe']) {
            var currentStoreData_1;
            this.store['subscribe'](function () {
                var previousStoreData = currentStoreData_1 || {};
                var previousStoreHasData = Object.keys(previousStoreData).length;
                currentStoreData_1 = _this.getApolloState();
                if (isEqual(previousStoreData, currentStoreData_1) && previousStoreHasData) {
                    return;
                }
                _this.broadcastQueries();
            });
        }
    }
    QueryManager.prototype.broadcastNewStore = function (store) {
        this.broadcastQueries();
    };
    QueryManager.prototype.mutate = function (_a) {
        var _this = this;
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, updateWithProxyFn = _a.update;
        var mutationId = this.generateQueryId();
        if (this.addTypename) {
            mutation = addTypenameToDocument(mutation);
        }
        variables = assign({}, getDefaultValues(getMutationDefinition(mutation)), variables);
        var mutationString = __WEBPACK_IMPORTED_MODULE_12_graphql_language_printer__["print"](mutation);
        var request = {
            query: mutation,
            variables: variables,
            operationName: getOperationName(mutation),
        };
        this.queryDocuments[mutationId] = mutation;
        var updateQueries = {};
        if (updateQueriesByName) {
            Object.keys(updateQueriesByName).forEach(function (queryName) { return (_this.queryIdsByName[queryName] || []).forEach(function (queryId) {
                updateQueries[queryId] = updateQueriesByName[queryName];
            }); });
        }
        this.store.dispatch({
            type: 'APOLLO_MUTATION_INIT',
            mutationString: mutationString,
            mutation: mutation,
            variables: variables || {},
            operationName: getOperationName(mutation),
            mutationId: mutationId,
            optimisticResponse: optimisticResponse,
            extraReducers: this.getExtraReducers(),
            updateQueries: updateQueries,
            update: updateWithProxyFn,
        });
        return new Promise(function (resolve, reject) {
            _this.networkInterface.query(request)
                .then(function (result) {
                if (result.errors) {
                    var error = new ApolloError({
                        graphQLErrors: result.errors,
                    });
                    _this.store.dispatch({
                        type: 'APOLLO_MUTATION_ERROR',
                        error: error,
                        mutationId: mutationId,
                    });
                    delete _this.queryDocuments[mutationId];
                    reject(error);
                    return;
                }
                _this.store.dispatch({
                    type: 'APOLLO_MUTATION_RESULT',
                    result: result,
                    mutationId: mutationId,
                    document: mutation,
                    operationName: getOperationName(mutation),
                    variables: variables || {},
                    extraReducers: _this.getExtraReducers(),
                    updateQueries: updateQueries,
                    update: updateWithProxyFn,
                });
                var reducerError = _this.getApolloState().reducerError;
                if (reducerError && reducerError.mutationId === mutationId) {
                    reject(reducerError.error);
                    return;
                }
                if (typeof refetchQueries[0] === 'string') {
                    refetchQueries.forEach(function (name) { _this.refetchQueryByName(name); });
                }
                else {
                    refetchQueries.forEach(function (pureQuery) {
                        _this.query({
                            query: pureQuery.query,
                            variables: pureQuery.variables,
                            fetchPolicy: 'network-only',
                        });
                    });
                }
                delete _this.queryDocuments[mutationId];
                resolve(result);
            })
                .catch(function (err) {
                _this.store.dispatch({
                    type: 'APOLLO_MUTATION_ERROR',
                    error: err,
                    mutationId: mutationId,
                });
                delete _this.queryDocuments[mutationId];
                reject(new ApolloError({
                    networkError: err,
                }));
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
        var _this = this;
        var _a = options.variables, variables = _a === void 0 ? {} : _a, _b = options.metadata, metadata = _b === void 0 ? null : _b, _c = options.fetchPolicy, fetchPolicy = _c === void 0 ? 'cache-first' : _c;
        var queryDoc = this.transformQueryDocument(options).queryDoc;
        var queryString = __WEBPACK_IMPORTED_MODULE_12_graphql_language_printer__["print"](queryDoc);
        var storeResult;
        var needToFetch = fetchPolicy === 'network-only';
        if ((fetchType !== FetchType.refetch && fetchPolicy !== 'network-only')) {
            var _d = diffQueryAgainstStore({
                query: queryDoc,
                store: this.reduxRootSelector(this.store.getState()).data,
                variables: variables,
                returnPartialData: true,
                fragmentMatcherFunction: this.fragmentMatcher.match,
                config: this.reducerConfig,
            }), isMissing = _d.isMissing, result = _d.result;
            needToFetch = isMissing || fetchPolicy === 'cache-and-network';
            storeResult = result;
        }
        var shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
        var requestId = this.generateRequestId();
        this.queryDocuments[queryId] = queryDoc;
        this.store.dispatch({
            type: 'APOLLO_QUERY_INIT',
            queryString: queryString,
            document: queryDoc,
            operationName: getOperationName(queryDoc),
            variables: variables,
            fetchPolicy: fetchPolicy,
            queryId: queryId,
            requestId: requestId,
            storePreviousVariables: shouldFetch,
            isPoll: fetchType === FetchType.poll,
            isRefetch: fetchType === FetchType.refetch,
            fetchMoreForQueryId: fetchMoreForQueryId,
            metadata: metadata,
        });
        var shouldDispatchClientResult = !shouldFetch || fetchPolicy === 'cache-and-network';
        if (shouldDispatchClientResult) {
            this.store.dispatch({
                type: 'APOLLO_QUERY_RESULT_CLIENT',
                result: { data: storeResult },
                variables: variables,
                document: queryDoc,
                operationName: getOperationName(queryDoc),
                complete: !shouldFetch,
                queryId: queryId,
                requestId: requestId,
            });
        }
        if (shouldFetch) {
            var networkResult = this.fetchRequest({
                requestId: requestId,
                queryId: queryId,
                document: queryDoc,
                options: options,
                fetchMoreForQueryId: fetchMoreForQueryId,
            }).catch(function (error) {
                if (isApolloError(error)) {
                    throw error;
                }
                else {
                    _this.store.dispatch({
                        type: 'APOLLO_QUERY_ERROR',
                        error: error,
                        queryId: queryId,
                        requestId: requestId,
                        fetchMoreForQueryId: fetchMoreForQueryId,
                    });
                    _this.removeFetchQueryPromise(requestId);
                    throw new ApolloError({
                        networkError: error,
                    });
                }
            });
            if (fetchPolicy !== 'cache-and-network') {
                return networkResult;
            }
        }
        return Promise.resolve({ data: storeResult });
    };
    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
        var _this = this;
        var lastResult;
        var previouslyHadError = false;
        return function (queryStoreValue) {
            if (!queryStoreValue) {
                return;
            }
            queryStoreValue = _this.getApolloState().queries[queryId];
            var storedQuery = _this.observableQueries[queryId];
            var fetchPolicy = storedQuery ? storedQuery.observableQuery.options.fetchPolicy : options.fetchPolicy;
            if (fetchPolicy === 'standby') {
                return;
            }
            var shouldNotifyIfLoading = queryStoreValue.previousVariables ||
                fetchPolicy === 'cache-only' || fetchPolicy === 'cache-and-network';
            var networkStatusChanged = lastResult && queryStoreValue.networkStatus !== lastResult.networkStatus;
            if (!isNetworkRequestInFlight(queryStoreValue.networkStatus) ||
                (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                shouldNotifyIfLoading) {
                if ((queryStoreValue.graphQLErrors && queryStoreValue.graphQLErrors.length > 0) ||
                    queryStoreValue.networkError) {
                    var apolloError_1 = new ApolloError({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    });
                    previouslyHadError = true;
                    if (observer.error) {
                        try {
                            observer.error(apolloError_1);
                        }
                        catch (e) {
                            setTimeout(function () { throw e; }, 0);
                        }
                    }
                    else {
                        setTimeout(function () { throw apolloError_1; }, 0);
                        if (!__WEBPACK_IMPORTED_MODULE_10__util_environment__["b" /* isProduction */]()) {
                            console.info('An unhandled error was thrown because no error handler is registered ' +
                                'for the query ' + queryStoreValue.queryString);
                        }
                    }
                }
                else {
                    try {
                        var _a = diffQueryAgainstStore({
                            store: _this.getDataWithOptimisticResults(),
                            query: _this.queryDocuments[queryId],
                            variables: queryStoreValue.previousVariables || queryStoreValue.variables,
                            config: _this.reducerConfig,
                            fragmentMatcherFunction: _this.fragmentMatcher.match,
                            previousResult: lastResult && lastResult.data,
                        }), data = _a.result, isMissing = _a.isMissing;
                        var resultFromStore = void 0;
                        if (isMissing && fetchPolicy !== 'cache-only') {
                            resultFromStore = {
                                data: lastResult && lastResult.data,
                                loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: true,
                            };
                        }
                        else {
                            resultFromStore = {
                                data: data,
                                loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: false,
                            };
                        }
                        if (observer.next) {
                            var isDifferentResult = !(lastResult &&
                                resultFromStore &&
                                lastResult.networkStatus === resultFromStore.networkStatus &&
                                lastResult.stale === resultFromStore.stale &&
                                lastResult.data === resultFromStore.data);
                            if (isDifferentResult || previouslyHadError) {
                                lastResult = resultFromStore;
                                try {
                                    observer.next(maybeDeepFreeze(resultFromStore));
                                }
                                catch (e) {
                                    setTimeout(function () { throw e; }, 0);
                                }
                            }
                        }
                        previouslyHadError = false;
                    }
                    catch (error) {
                        previouslyHadError = true;
                        if (observer.error) {
                            observer.error(new ApolloError({
                                networkError: error,
                            }));
                        }
                        return;
                    }
                }
            }
        };
    };
    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
        if (shouldSubscribe === void 0) { shouldSubscribe = true; }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option is no longer supported since Apollo Client 1.0.');
        }
        if (options.forceFetch) {
            throw new Error('forceFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.noFetch) {
            throw new Error('noFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.fetchPolicy === 'standby') {
            throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"');
        }
        var queryDefinition = getQueryDefinition(options.query);
        if (queryDefinition.variableDefinitions && queryDefinition.variableDefinitions.length) {
            var defaultValues = getDefaultValues(queryDefinition);
            options.variables = assign({}, defaultValues, options.variables);
        }
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var transformedOptions = QueryManager___assign({}, options);
        var observableQuery = new ObservableQuery_ObservableQuery({
            scheduler: this.scheduler,
            options: transformedOptions,
            shouldSubscribe: shouldSubscribe,
        });
        return observableQuery;
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
        if (!options.query) {
            throw new Error('query option is required. You must specify your GraphQL document in the query option.');
        }
        if (options.query.kind !== 'Document') {
            throw new Error('You must wrap the query string in a "gql" tag.');
        }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option only supported on watchQuery.');
        }
        if (options.pollInterval) {
            throw new Error('pollInterval option only supported on watchQuery.');
        }
        if (options.forceFetch) {
            throw new Error('forceFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.noFetch) {
            throw new Error('noFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (typeof options.notifyOnNetworkStatusChange !== 'undefined') {
            throw new Error('Cannot call "query" with "notifyOnNetworkStatusChange" option. Only "watchQuery" has that option.');
        }
        options.notifyOnNetworkStatusChange = false;
        var requestId = this.idCounter;
        var resPromise = new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resPromise, resolve, reject);
            return _this.watchQuery(options, false).result().then(function (result) {
                _this.removeFetchQueryPromise(requestId);
                resolve(result);
            }).catch(function (error) {
                _this.removeFetchQueryPromise(requestId);
                reject(error);
            });
        });
        return resPromise;
    };
    QueryManager.prototype.generateQueryId = function () {
        var queryId = this.idCounter.toString();
        this.idCounter++;
        return queryId;
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.store.dispatch({
            type: 'APOLLO_QUERY_STOP',
            queryId: queryId,
        });
    };
    QueryManager.prototype.getApolloState = function () {
        return this.reduxRootSelector(this.store.getState());
    };
    QueryManager.prototype.selectApolloState = function (store) {
        return this.reduxRootSelector(store.getState());
    };
    QueryManager.prototype.getInitialState = function () {
        return { data: this.getApolloState().data };
    };
    QueryManager.prototype.getDataWithOptimisticResults = function () {
        return getDataWithOptimisticResults(this.getApolloState());
    };
    QueryManager.prototype.addQueryListener = function (queryId, listener) {
        this.queryListeners[queryId] = this.queryListeners[queryId] || [];
        this.queryListeners[queryId].push(listener);
    };
    QueryManager.prototype.addFetchQueryPromise = function (requestId, promise, resolve, reject) {
        this.fetchQueryPromises[requestId.toString()] = { promise: promise, resolve: resolve, reject: reject };
    };
    QueryManager.prototype.removeFetchQueryPromise = function (requestId) {
        delete this.fetchQueryPromises[requestId.toString()];
    };
    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
        this.observableQueries[queryId] = { observableQuery: observableQuery };
        var queryDef = getQueryDefinition(observableQuery.options.query);
        if (queryDef.name && queryDef.name.value) {
            var queryName = queryDef.name.value;
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName] || [];
            this.queryIdsByName[queryName].push(observableQuery.queryId);
        }
    };
    QueryManager.prototype.removeObservableQuery = function (queryId) {
        var observableQuery = this.observableQueries[queryId].observableQuery;
        var definition = getQueryDefinition(observableQuery.options.query);
        var queryName = definition.name ? definition.name.value : null;
        delete this.observableQueries[queryId];
        if (queryName) {
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName].filter(function (val) {
                return !(observableQuery.queryId === val);
            });
        }
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        Object.keys(this.fetchQueryPromises).forEach(function (key) {
            var reject = _this.fetchQueryPromises[key].reject;
            reject(new Error('Store reset while query was in flight.'));
        });
        this.store.dispatch({
            type: 'APOLLO_STORE_RESET',
            observableQueryIds: Object.keys(this.observableQueries),
        });
        var observableQueryPromises = [];
        Object.keys(this.observableQueries).forEach(function (queryId) {
            var storeQuery = _this.reduxRootSelector(_this.store.getState()).queries[queryId];
            var fetchPolicy = _this.observableQueries[queryId].observableQuery.options.fetchPolicy;
            if (fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby') {
                observableQueryPromises.push(_this.observableQueries[queryId].observableQuery.refetch());
            }
        });
        return Promise.all(observableQueryPromises);
    };
    QueryManager.prototype.startQuery = function (queryId, options, listener) {
        this.addQueryListener(queryId, listener);
        this.fetchQuery(queryId, options)
            .catch(function (error) { return undefined; });
        return queryId;
    };
    QueryManager.prototype.startGraphQLSubscription = function (options) {
        var _this = this;
        var query = options.query;
        var transformedDoc = query;
        if (this.addTypename) {
            transformedDoc = addTypenameToDocument(transformedDoc);
        }
        var variables = assign({}, getDefaultValues(getOperationDefinition(query)), options.variables);
        var request = {
            query: transformedDoc,
            variables: variables,
            operationName: getOperationName(transformedDoc),
        };
        var subId;
        var observers = [];
        return new Observable(function (observer) {
            observers.push(observer);
            if (observers.length === 1) {
                var handler = function (error, result) {
                    if (error) {
                        observers.forEach(function (obs) {
                            if (obs.error) {
                                obs.error(error);
                            }
                        });
                    }
                    else {
                        _this.store.dispatch({
                            type: 'APOLLO_SUBSCRIPTION_RESULT',
                            document: transformedDoc,
                            operationName: getOperationName(transformedDoc),
                            result: { data: result },
                            variables: variables,
                            subscriptionId: subId,
                            extraReducers: _this.getExtraReducers(),
                        });
                        observers.forEach(function (obs) {
                            if (obs.next) {
                                obs.next(result);
                            }
                        });
                    }
                };
                subId = _this.networkInterface.subscribe(request, handler);
            }
            return {
                unsubscribe: function () {
                    observers = observers.filter(function (obs) { return obs !== observer; });
                    if (observers.length === 0) {
                        _this.networkInterface.unsubscribe(subId);
                    }
                },
                _networkSubscriptionId: subId,
            };
        });
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        delete this.queryListeners[queryId];
        delete this.queryDocuments[queryId];
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.removeQuery(queryId);
        this.stopQueryInStore(queryId);
    };
    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, isOptimistic) {
        if (isOptimistic === void 0) { isOptimistic = false; }
        var _a = this.getQueryParts(observableQuery), variables = _a.variables, document = _a.document;
        var lastResult = observableQuery.getLastResult();
        var queryOptions = observableQuery.options;
        var readOptions = {
            store: isOptimistic ? this.getDataWithOptimisticResults() : this.getApolloState().data,
            query: document,
            variables: variables,
            config: this.reducerConfig,
            previousResult: lastResult ? lastResult.data : undefined,
            fragmentMatcherFunction: this.fragmentMatcher.match,
        };
        try {
            var data = readQueryFromStore(readOptions);
            return maybeDeepFreeze({ data: data, partial: false });
        }
        catch (e) {
            return maybeDeepFreeze({ data: {}, partial: true });
        }
    };
    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable, isOptimistic) {
        if (isOptimistic === void 0) { isOptimistic = false; }
        var observableQuery;
        if (typeof queryIdOrObservable === 'string') {
            if (!this.observableQueries[queryIdOrObservable]) {
                throw new Error("ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
            }
            observableQuery = this.observableQueries[queryIdOrObservable].observableQuery;
        }
        else {
            observableQuery = queryIdOrObservable;
        }
        var _a = this.getQueryParts(observableQuery), variables = _a.variables, document = _a.document;
        var data = this.getCurrentQueryResult(observableQuery, isOptimistic).data;
        return {
            previousResult: data,
            variables: variables,
            document: document,
        };
    };
    QueryManager.prototype.getQueryParts = function (observableQuery) {
        var queryOptions = observableQuery.options;
        var transformedDoc = observableQuery.options.query;
        if (this.addTypename) {
            transformedDoc = addTypenameToDocument(transformedDoc);
        }
        return {
            variables: queryOptions.variables,
            document: transformedDoc,
        };
    };
    QueryManager.prototype.transformQueryDocument = function (options) {
        var queryDoc = options.query;
        if (this.addTypename) {
            queryDoc = addTypenameToDocument(queryDoc);
        }
        return {
            queryDoc: queryDoc,
        };
    };
    QueryManager.prototype.getExtraReducers = function () {
        var _this = this;
        return Object.keys(this.observableQueries).map(function (obsQueryId) {
            var query = _this.observableQueries[obsQueryId].observableQuery;
            var queryOptions = query.options;
            if (queryOptions.reducer) {
                return createStoreReducer(queryOptions.reducer, _this.addTypename ? addTypenameToDocument(queryOptions.query) : queryOptions.query, query.variables || {}, _this.reducerConfig);
            }
            return null;
        }).filter(function (reducer) { return reducer !== null; });
    };
    QueryManager.prototype.fetchRequest = function (_a) {
        var _this = this;
        var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
        var variables = options.variables;
        var request = {
            query: document,
            variables: variables,
            operationName: getOperationName(document),
        };
        var retPromise = new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, retPromise, resolve, reject);
            _this.deduplicator.query(request, _this.queryDeduplication)
                .then(function (result) {
                var extraReducers = _this.getExtraReducers();
                _this.store.dispatch({
                    type: 'APOLLO_QUERY_RESULT',
                    document: document,
                    operationName: getOperationName(document),
                    result: result,
                    queryId: queryId,
                    requestId: requestId,
                    fetchMoreForQueryId: fetchMoreForQueryId,
                    extraReducers: extraReducers,
                });
                _this.removeFetchQueryPromise(requestId);
                if (result.errors) {
                    throw new ApolloError({
                        graphQLErrors: result.errors,
                    });
                }
                return result;
            }).then(function (result) {
                var resultFromStore;
                if (fetchMoreForQueryId) {
                    resultFromStore = result.data;
                }
                else {
                    try {
                        resultFromStore = readQueryFromStore({
                            store: _this.getApolloState().data,
                            variables: variables,
                            query: document,
                            config: _this.reducerConfig,
                            fragmentMatcherFunction: _this.fragmentMatcher.match,
                        });
                    }
                    catch (e) { }
                }
                var reducerError = _this.getApolloState().reducerError;
                if (reducerError && reducerError.queryId === queryId) {
                    return Promise.reject(reducerError.error);
                }
                _this.removeFetchQueryPromise(requestId);
                resolve({ data: resultFromStore, loading: false, networkStatus: NetworkStatus.ready, stale: false });
                return Promise.resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
        return retPromise;
    };
    QueryManager.prototype.refetchQueryByName = function (queryName) {
        var _this = this;
        var refetchedQueries = this.queryIdsByName[queryName];
        if (refetchedQueries === undefined) {
            console.warn("Warning: unknown query with name " + queryName + " asked to refetch");
            return;
        }
        else {
            return Promise.all(refetchedQueries.map(function (queryId) { return _this.observableQueries[queryId].observableQuery.refetch(); }));
        }
    };
    QueryManager.prototype.broadcastQueries = function () {
        var _this = this;
        var queries = this.getApolloState().queries;
        Object.keys(this.queryListeners).forEach(function (queryId) {
            var listeners = _this.queryListeners[queryId];
            if (listeners) {
                listeners.forEach(function (listener) {
                    if (listener) {
                        var queryStoreValue = queries[queryId];
                        listener(queryStoreValue);
                    }
                });
            }
        });
    };
    QueryManager.prototype.generateRequestId = function () {
        var requestId = this.idCounter;
        this.idCounter++;
        return requestId;
    };
    return QueryManager;
}());

//# sourceMappingURL=QueryManager.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/ApolloClient.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_environment__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__version__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__version___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__version__);
var ApolloClient___assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};








var DEFAULT_REDUX_ROOT_KEY = 'apollo';
function defaultReduxRootSelector(state) {
    return state[DEFAULT_REDUX_ROOT_KEY];
}
function defaultDataIdFromObject(result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return result.__typename + ":" + result.id;
        }
        if (result._id !== undefined) {
            return result.__typename + ":" + result._id;
        }
    }
    return null;
}
var hasSuggestedDevtools = false;
var ApolloClient_ApolloClient = (function () {
    function ApolloClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.middleware = function () {
            return function (store) {
                _this.setStore(store);
                return function (next) { return function (action) {
                    var previousApolloState = _this.queryManager.selectApolloState(store);
                    var returnValue = next(action);
                    var newApolloState = _this.queryManager.selectApolloState(store);
                    if (newApolloState !== previousApolloState) {
                        _this.queryManager.broadcastNewStore(store.getState());
                    }
                    if (_this.devToolsHookCb) {
                        _this.devToolsHookCb({
                            action: action,
                            state: _this.queryManager.getApolloState(),
                            dataWithOptimisticResults: _this.queryManager.getDataWithOptimisticResults(),
                        });
                    }
                    return returnValue;
                }; };
            };
        };
        var dataIdFromObject = options.dataIdFromObject;
        var networkInterface = options.networkInterface, reduxRootSelector = options.reduxRootSelector, initialState = options.initialState, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.addTypename, addTypename = _c === void 0 ? true : _c, customResolvers = options.customResolvers, connectToDevTools = options.connectToDevTools, fragmentMatcher = options.fragmentMatcher, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d;
        if (typeof reduxRootSelector === 'function') {
            this.reduxRootSelector = reduxRootSelector;
        }
        else if (typeof reduxRootSelector !== 'undefined') {
            throw new Error('"reduxRootSelector" must be a function.');
        }
        if (typeof fragmentMatcher === 'undefined') {
            this.fragmentMatcher = new fragmentMatcher_HeuristicFragmentMatcher();
        }
        else {
            this.fragmentMatcher = fragmentMatcher;
        }
        if (networkInterface && typeof networkInterface.request === 'function') {
            this.networkInterface = ApolloClient___assign({}, networkInterface, { query: function (request) { return new Promise(function (resolve, reject) {
                    var subscription = networkInterface
                        .request(request)
                        .subscribe({
                        next: resolve,
                        error: reject,
                        complete: function () { return subscription.unsubscribe(); },
                    });
                }); } });
        }
        else {
            this.networkInterface = networkInterface ? networkInterface :
                createNetworkInterface({ uri: '/graphql' });
        }
        this.initialState = initialState ? initialState : {};
        this.addTypename = addTypename;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.dataId = dataIdFromObject = dataIdFromObject || defaultDataIdFromObject;
        this.dataIdFromObject = this.dataId;
        this.fieldWithArgs = getStoreKeyName;
        this.queryDeduplication = queryDeduplication;
        this.ssrMode = ssrMode;
        if (ssrForceFetchDelay) {
            setTimeout(function () { return _this.disableNetworkFetches = false; }, ssrForceFetchDelay);
        }
        this.reducerConfig = {
            dataIdFromObject: dataIdFromObject,
            customResolvers: customResolvers,
            addTypename: addTypename,
            fragmentMatcher: this.fragmentMatcher.match,
        };
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.setStore = this.setStore.bind(this);
        this.resetStore = this.resetStore.bind(this);
        var defaultConnectToDevTools = !__WEBPACK_IMPORTED_MODULE_4__util_environment__["b" /* isProduction */]() &&
            typeof window !== 'undefined' && (!window.__APOLLO_CLIENT__);
        if (typeof connectToDevTools === 'undefined' ? defaultConnectToDevTools : connectToDevTools) {
            window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && !__WEBPACK_IMPORTED_MODULE_4__util_environment__["b" /* isProduction */]()) {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' && window.document && window.top === window.self) {
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    if (navigator.userAgent.indexOf('Chrome') > -1) {
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = __WEBPACK_IMPORTED_MODULE_7__version__["version"];
    }
    ApolloClient.prototype.watchQuery = function (options) {
        this.initStore();
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = ApolloClient___assign({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.watchQuery(options);
    };
    ApolloClient.prototype.query = function (options) {
        this.initStore();
        if (options.fetchPolicy === 'cache-and-network') {
            throw new Error('cache-and-network fetchPolicy can only be used with watchQuery');
        }
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = ApolloClient___assign({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.query(options);
    };
    ApolloClient.prototype.mutate = function (options) {
        this.initStore();
        return this.queryManager.mutate(options);
    };
    ApolloClient.prototype.subscribe = function (options) {
        this.initStore();
        return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient.prototype.readQuery = function (options) {
        return this.initProxy().readQuery(options);
    };
    ApolloClient.prototype.readFragment = function (options) {
        return this.initProxy().readFragment(options);
    };
    ApolloClient.prototype.writeQuery = function (options) {
        return this.initProxy().writeQuery(options);
    };
    ApolloClient.prototype.writeFragment = function (options) {
        return this.initProxy().writeFragment(options);
    };
    ApolloClient.prototype.reducer = function () {
        return createApolloReducer(this.reducerConfig);
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.initStore = function () {
        var _this = this;
        if (this.store) {
            return;
        }
        if (this.reduxRootSelector) {
            throw new Error('Cannot initialize the store because "reduxRootSelector" is provided. ' +
                'reduxRootSelector should only be used when the store is created outside of the client. ' +
                'This may lead to unexpected results when querying the store internally. ' +
                "Please remove that option from ApolloClient constructor.");
        }
        this.setStore(createApolloStore({
            reduxRootKey: DEFAULT_REDUX_ROOT_KEY,
            initialState: this.initialState,
            config: this.reducerConfig,
            logger: function (store) { return function (next) { return function (action) {
                var result = next(action);
                if (_this.devToolsHookCb) {
                    _this.devToolsHookCb({
                        action: action,
                        state: _this.queryManager.getApolloState(),
                        dataWithOptimisticResults: _this.queryManager.getDataWithOptimisticResults(),
                    });
                }
                return result;
            }; }; },
        }));
    };
    ApolloClient.prototype.resetStore = function () {
        return this.queryManager ? this.queryManager.resetStore() : null;
    };
    ApolloClient.prototype.getInitialState = function () {
        this.initStore();
        return this.queryManager.getInitialState();
    };
    ApolloClient.prototype.setStore = function (store) {
        var reduxRootSelector;
        if (this.reduxRootSelector) {
            reduxRootSelector = this.reduxRootSelector;
        }
        else {
            reduxRootSelector = defaultReduxRootSelector;
        }
        if (typeof reduxRootSelector(store.getState()) === 'undefined') {
            throw new Error('Existing store does not use apolloReducer. Please make sure the store ' +
                'is properly configured and "reduxRootSelector" is correctly specified.');
        }
        this.store = store;
        this.queryManager = new QueryManager_QueryManager({
            networkInterface: this.networkInterface,
            reduxRootSelector: reduxRootSelector,
            store: store,
            addTypename: this.addTypename,
            reducerConfig: this.reducerConfig,
            queryDeduplication: this.queryDeduplication,
            fragmentMatcher: this.fragmentMatcher,
            ssrMode: this.ssrMode,
        });
    };
    ApolloClient.prototype.initProxy = function () {
        if (!this.proxy) {
            this.initStore();
            this.proxy = new proxy_ReduxDataProxy(this.store, this.reduxRootSelector || defaultReduxRootSelector, this.fragmentMatcher, this.reducerConfig);
        }
        return this.proxy;
    };
    return ApolloClient;
}());
/* harmony default export */ var ApolloClient_defaultExport = (ApolloClient_ApolloClient);
//# sourceMappingURL=ApolloClient.js.map
// CONCATENATED MODULE: ./node_modules/apollo-client/index.js
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__);
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createNetworkInterface", function() { return createNetworkInterface; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createBatchingNetworkInterface", function() { return createBatchingNetworkInterface; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createApolloStore", function() { return createApolloStore; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createApolloReducer", function() { return createApolloReducer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "readQueryFromStore", function() { return readQueryFromStore; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "writeQueryToStore", function() { return writeQueryToStore; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "addTypenameToDocument", function() { return addTypenameToDocument; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createFragmentMap", function() { return createFragmentMap; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NetworkStatus", function() { return NetworkStatus; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ApolloError", function() { return ApolloError; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getQueryDefinition", function() { return getQueryDefinition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getMutationDefinition", function() { return getMutationDefinition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getFragmentDefinitions", function() { return getFragmentDefinitions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "toIdValue", function() { return toIdValue; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IntrospectionFragmentMatcher", function() { return IntrospectionFragmentMatcher; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__, "print")) __webpack_require__.d(__webpack_exports__, "printAST", function() { return __WEBPACK_IMPORTED_MODULE_2_graphql_language_printer__["print"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HTTPFetchNetworkInterface", function() { return networkInterface_HTTPFetchNetworkInterface; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HTTPBatchedNetworkInterface", function() { return batchedNetworkInterface_HTTPBatchedNetworkInterface; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ObservableQuery", function() { return ObservableQuery_ObservableQuery; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ApolloClient", function() { return ApolloClient_defaultExport; });















/* harmony default export */ __webpack_exports__["default"] = (ApolloClient_defaultExport);
//# sourceMappingURL=index.js.map

/***/ }),
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */
false,
/* 683 */
false,
/* 684 */
false,
/* 685 */
false,
/* 686 */
false,
/* 687 */
false,
/* 688 */
false,
/* 689 */
false,
/* 690 */
false,
/* 691 */
false,
/* 692 */
false,
/* 693 */
false,
/* 694 */
false,
/* 695 */
false,
/* 696 */
false,
/* 697 */
false,
/* 698 */
false,
/* 699 */,
/* 700 */
false,
/* 701 */
false,
/* 702 */
false,
/* 703 */
false,
/* 704 */
false,
/* 705 */
false,
/* 706 */
false,
/* 707 */
false,
/* 708 */
false,
/* 709 */
false,
/* 710 */
false,
/* 711 */
false,
/* 712 */
false,
/* 713 */
false,
/* 714 */
false,
/* 715 */
false,
/* 716 */
false,
/* 717 */
false,
/* 718 */
false,
/* 719 */
false,
/* 720 */
false,
/* 721 */
false,
/* 722 */
false,
/* 723 */
false,
/* 724 */
false,
/* 725 */
false,
/* 726 */
false,
/* 727 */,
/* 728 */
false,
/* 729 */
false,
/* 730 */
false,
/* 731 */
false,
/* 732 */
false,
/* 733 */
false,
/* 734 */
false,
/* 735 */
false,
/* 736 */
false,
/* 737 */
false,
/* 738 */
false,
/* 739 */
false,
/* 740 */
false,
/* 741 */
false,
/* 742 */
false,
/* 743 */
false,
/* 744 */
false,
/* 745 */
false,
/* 746 */
false,
/* 747 */
false,
/* 748 */
false,
/* 749 */
false,
/* 750 */
false,
/* 751 */
false,
/* 752 */
false,
/* 753 */
false,
/* 754 */
false,
/* 755 */
false,
/* 756 */
false,
/* 757 */
false,
/* 758 */
false,
/* 759 */
false,
/* 760 */
false,
/* 761 */
false,
/* 762 */
false,
/* 763 */
false,
/* 764 */
false,
/* 765 */
false,
/* 766 */
false,
/* 767 */
false,
/* 768 */
false,
/* 769 */
false,
/* 770 */
false,
/* 771 */
false,
/* 772 */
false,
/* 773 */
false,
/* 774 */
false,
/* 775 */
false,
/* 776 */
false,
/* 777 */
false,
/* 778 */
false,
/* 779 */
false,
/* 780 */
false,
/* 781 */
false,
/* 782 */
false,
/* 783 */
false,
/* 784 */
false,
/* 785 */
false,
/* 786 */
false,
/* 787 */
false,
/* 788 */
false,
/* 789 */
false,
/* 790 */
false,
/* 791 */
false
]))
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC4yM2ZiZGZjNWNiNjViZWM4MGNiOS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2UvcHJpbnRlci5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9kYXRhL3N0b3JlVXRpbHMuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC91dGlsL2Fzc2lnbi5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3F1ZXJpZXMvZ2V0RnJvbUFTVC5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3V0aWwvY2xvbmVEZWVwLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvcXVlcmllcy9xdWVyeVRyYW5zZm9ybS5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3RyYW5zcG9ydC9uZXR3b3JrSW50ZXJmYWNlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvdHJhbnNwb3J0L2JhdGNoaW5nLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvdHJhbnNwb3J0L2JhdGNoZWROZXR3b3JrSW50ZXJmYWNlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvYWN0aW9ucy5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3F1ZXJpZXMvZGlyZWN0aXZlcy5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2RhdGEvd3JpdGVUb1N0b3JlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvb3B0aW1pc3RpYy1kYXRhL3N0b3JlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvdXRpbC9pc0VxdWFsLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS9yZWFkRnJvbVN0b3JlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS9wcm94eS5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2RhdGEvcmVwbGFjZVF1ZXJ5UmVzdWx0cy5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3V0aWwvZXJyb3JIYW5kbGluZy5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2RhdGEvc3RvcmUuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9xdWVyaWVzL25ldHdvcmtTdGF0dXMuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9xdWVyaWVzL3N0b3JlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvbXV0YXRpb25zL3N0b3JlLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvc3RvcmUuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC91dGlsL09ic2VydmFibGUuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9lcnJvcnMvQXBvbGxvRXJyb3IuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9jb3JlL3R5cGVzLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvdXRpbC9tYXliZURlZXBGcmVlemUuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9jb3JlL09ic2VydmFibGVRdWVyeS5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3V0aWwvd2Fybk9uY2UuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9kYXRhL2ZyYWdtZW50TWF0Y2hlci5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3RyYW5zcG9ydC9EZWR1cGxpY2F0b3IuanM/OGU5OTIxMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9kYXRhL3Jlc3VsdFJlZHVjZXJzLmpzPzhlOTkyMTEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvc2NoZWR1bGVyL3NjaGVkdWxlci5qcz84ZTk5MjExIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2NvcmUvUXVlcnlNYW5hZ2VyLmpzPzg2NjMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvQXBvbGxvQ2xpZW50LmpzP2M4ZGIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvaW5kZXguanM/YmI1ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnByaW50ID0gcHJpbnQ7XG5cbnZhciBfdmlzaXRvciA9IHJlcXVpcmUoJy4vdmlzaXRvcicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIEFTVCBpbnRvIGEgc3RyaW5nLCB1c2luZyBvbmUgc2V0IG9mIHJlYXNvbmFibGVcbiAqIGZvcm1hdHRpbmcgcnVsZXMuXG4gKi9cbmZ1bmN0aW9uIHByaW50KGFzdCkge1xuICByZXR1cm4gKDAsIF92aXNpdG9yLnZpc2l0KShhc3QsIHsgbGVhdmU6IHByaW50RG9jQVNUUmVkdWNlciB9KTtcbn0gLyoqXG4gICAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gICAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgKlxuICAgKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gICAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAgICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICAgKi9cblxudmFyIHByaW50RG9jQVNUUmVkdWNlciA9IHtcbiAgTmFtZTogZnVuY3Rpb24gTmFtZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gIH0sXG4gIFZhcmlhYmxlOiBmdW5jdGlvbiBWYXJpYWJsZShub2RlKSB7XG4gICAgcmV0dXJuICckJyArIG5vZGUubmFtZTtcbiAgfSxcblxuICAvLyBEb2N1bWVudFxuXG4gIERvY3VtZW50OiBmdW5jdGlvbiBEb2N1bWVudChub2RlKSB7XG4gICAgcmV0dXJuIGpvaW4obm9kZS5kZWZpbml0aW9ucywgJ1xcblxcbicpICsgJ1xcbic7XG4gIH0sXG5cbiAgT3BlcmF0aW9uRGVmaW5pdGlvbjogZnVuY3Rpb24gT3BlcmF0aW9uRGVmaW5pdGlvbihub2RlKSB7XG4gICAgdmFyIG9wID0gbm9kZS5vcGVyYXRpb247XG4gICAgdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgdmFyIHZhckRlZnMgPSB3cmFwKCcoJywgam9pbihub2RlLnZhcmlhYmxlRGVmaW5pdGlvbnMsICcsICcpLCAnKScpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gam9pbihub2RlLmRpcmVjdGl2ZXMsICcgJyk7XG4gICAgdmFyIHNlbGVjdGlvblNldCA9IG5vZGUuc2VsZWN0aW9uU2V0O1xuICAgIC8vIEFub255bW91cyBxdWVyaWVzIHdpdGggbm8gZGlyZWN0aXZlcyBvciB2YXJpYWJsZSBkZWZpbml0aW9ucyBjYW4gdXNlXG4gICAgLy8gdGhlIHF1ZXJ5IHNob3J0IGZvcm0uXG4gICAgcmV0dXJuICFuYW1lICYmICFkaXJlY3RpdmVzICYmICF2YXJEZWZzICYmIG9wID09PSAncXVlcnknID8gc2VsZWN0aW9uU2V0IDogam9pbihbb3AsIGpvaW4oW25hbWUsIHZhckRlZnNdKSwgZGlyZWN0aXZlcywgc2VsZWN0aW9uU2V0XSwgJyAnKTtcbiAgfSxcblxuXG4gIFZhcmlhYmxlRGVmaW5pdGlvbjogZnVuY3Rpb24gVmFyaWFibGVEZWZpbml0aW9uKF9yZWYpIHtcbiAgICB2YXIgdmFyaWFibGUgPSBfcmVmLnZhcmlhYmxlLFxuICAgICAgICB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBfcmVmLmRlZmF1bHRWYWx1ZTtcbiAgICByZXR1cm4gdmFyaWFibGUgKyAnOiAnICsgdHlwZSArIHdyYXAoJyA9ICcsIGRlZmF1bHRWYWx1ZSk7XG4gIH0sXG5cbiAgU2VsZWN0aW9uU2V0OiBmdW5jdGlvbiBTZWxlY3Rpb25TZXQoX3JlZjIpIHtcbiAgICB2YXIgc2VsZWN0aW9ucyA9IF9yZWYyLnNlbGVjdGlvbnM7XG4gICAgcmV0dXJuIGJsb2NrKHNlbGVjdGlvbnMpO1xuICB9LFxuXG4gIEZpZWxkOiBmdW5jdGlvbiBGaWVsZChfcmVmMykge1xuICAgIHZhciBhbGlhcyA9IF9yZWYzLmFsaWFzLFxuICAgICAgICBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgYXJncyA9IF9yZWYzLmFyZ3VtZW50cyxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYzLmRpcmVjdGl2ZXMsXG4gICAgICAgIHNlbGVjdGlvblNldCA9IF9yZWYzLnNlbGVjdGlvblNldDtcbiAgICByZXR1cm4gam9pbihbd3JhcCgnJywgYWxpYXMsICc6ICcpICsgbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIHNlbGVjdGlvblNldF0sICcgJyk7XG4gIH0sXG5cbiAgQXJndW1lbnQ6IGZ1bmN0aW9uIEFyZ3VtZW50KF9yZWY0KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmNC5uYW1lLFxuICAgICAgICB2YWx1ZSA9IF9yZWY0LnZhbHVlO1xuICAgIHJldHVybiBuYW1lICsgJzogJyArIHZhbHVlO1xuICB9LFxuXG4gIC8vIEZyYWdtZW50c1xuXG4gIEZyYWdtZW50U3ByZWFkOiBmdW5jdGlvbiBGcmFnbWVudFNwcmVhZChfcmVmNSkge1xuICAgIHZhciBuYW1lID0gX3JlZjUubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWY1LmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuICcuLi4nICsgbmFtZSArIHdyYXAoJyAnLCBqb2luKGRpcmVjdGl2ZXMsICcgJykpO1xuICB9LFxuXG4gIElubGluZUZyYWdtZW50OiBmdW5jdGlvbiBJbmxpbmVGcmFnbWVudChfcmVmNikge1xuICAgIHZhciB0eXBlQ29uZGl0aW9uID0gX3JlZjYudHlwZUNvbmRpdGlvbixcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWY2LmRpcmVjdGl2ZXMsXG4gICAgICAgIHNlbGVjdGlvblNldCA9IF9yZWY2LnNlbGVjdGlvblNldDtcbiAgICByZXR1cm4gam9pbihbJy4uLicsIHdyYXAoJ29uICcsIHR5cGVDb25kaXRpb24pLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIHNlbGVjdGlvblNldF0sICcgJyk7XG4gIH0sXG5cbiAgRnJhZ21lbnREZWZpbml0aW9uOiBmdW5jdGlvbiBGcmFnbWVudERlZmluaXRpb24oX3JlZjcpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWY3Lm5hbWUsXG4gICAgICAgIHR5cGVDb25kaXRpb24gPSBfcmVmNy50eXBlQ29uZGl0aW9uLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjcuZGlyZWN0aXZlcyxcbiAgICAgICAgc2VsZWN0aW9uU2V0ID0gX3JlZjcuc2VsZWN0aW9uU2V0O1xuICAgIHJldHVybiAnZnJhZ21lbnQgJyArIG5hbWUgKyAnIG9uICcgKyB0eXBlQ29uZGl0aW9uICsgJyAnICsgd3JhcCgnJywgam9pbihkaXJlY3RpdmVzLCAnICcpLCAnICcpICsgc2VsZWN0aW9uU2V0O1xuICB9LFxuXG4gIC8vIFZhbHVlXG5cbiAgSW50VmFsdWU6IGZ1bmN0aW9uIEludFZhbHVlKF9yZWY4KSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjgudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBGbG9hdFZhbHVlOiBmdW5jdGlvbiBGbG9hdFZhbHVlKF9yZWY5KSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjkudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBTdHJpbmdWYWx1ZTogZnVuY3Rpb24gU3RyaW5nVmFsdWUoX3JlZjEwKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjEwLnZhbHVlO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0sXG4gIEJvb2xlYW5WYWx1ZTogZnVuY3Rpb24gQm9vbGVhblZhbHVlKF9yZWYxMSkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYxMS52YWx1ZTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9LFxuICBOdWxsVmFsdWU6IGZ1bmN0aW9uIE51bGxWYWx1ZSgpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9LFxuICBFbnVtVmFsdWU6IGZ1bmN0aW9uIEVudW1WYWx1ZShfcmVmMTIpIHtcbiAgICB2YXIgdmFsdWUgPSBfcmVmMTIudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBMaXN0VmFsdWU6IGZ1bmN0aW9uIExpc3RWYWx1ZShfcmVmMTMpIHtcbiAgICB2YXIgdmFsdWVzID0gX3JlZjEzLnZhbHVlcztcbiAgICByZXR1cm4gJ1snICsgam9pbih2YWx1ZXMsICcsICcpICsgJ10nO1xuICB9LFxuICBPYmplY3RWYWx1ZTogZnVuY3Rpb24gT2JqZWN0VmFsdWUoX3JlZjE0KSB7XG4gICAgdmFyIGZpZWxkcyA9IF9yZWYxNC5maWVsZHM7XG4gICAgcmV0dXJuICd7JyArIGpvaW4oZmllbGRzLCAnLCAnKSArICd9JztcbiAgfSxcbiAgT2JqZWN0RmllbGQ6IGZ1bmN0aW9uIE9iamVjdEZpZWxkKF9yZWYxNSkge1xuICAgIHZhciBuYW1lID0gX3JlZjE1Lm5hbWUsXG4gICAgICAgIHZhbHVlID0gX3JlZjE1LnZhbHVlO1xuICAgIHJldHVybiBuYW1lICsgJzogJyArIHZhbHVlO1xuICB9LFxuXG4gIC8vIERpcmVjdGl2ZVxuXG4gIERpcmVjdGl2ZTogZnVuY3Rpb24gRGlyZWN0aXZlKF9yZWYxNikge1xuICAgIHZhciBuYW1lID0gX3JlZjE2Lm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMTYuYXJndW1lbnRzO1xuICAgIHJldHVybiAnQCcgKyBuYW1lICsgd3JhcCgnKCcsIGpvaW4oYXJncywgJywgJyksICcpJyk7XG4gIH0sXG5cbiAgLy8gVHlwZVxuXG4gIE5hbWVkVHlwZTogZnVuY3Rpb24gTmFtZWRUeXBlKF9yZWYxNykge1xuICAgIHZhciBuYW1lID0gX3JlZjE3Lm5hbWU7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH0sXG4gIExpc3RUeXBlOiBmdW5jdGlvbiBMaXN0VHlwZShfcmVmMTgpIHtcbiAgICB2YXIgdHlwZSA9IF9yZWYxOC50eXBlO1xuICAgIHJldHVybiAnWycgKyB0eXBlICsgJ10nO1xuICB9LFxuICBOb25OdWxsVHlwZTogZnVuY3Rpb24gTm9uTnVsbFR5cGUoX3JlZjE5KSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMTkudHlwZTtcbiAgICByZXR1cm4gdHlwZSArICchJztcbiAgfSxcblxuICAvLyBUeXBlIFN5c3RlbSBEZWZpbml0aW9uc1xuXG4gIFNjaGVtYURlZmluaXRpb246IGZ1bmN0aW9uIFNjaGVtYURlZmluaXRpb24oX3JlZjIwKSB7XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSBfcmVmMjAuZGlyZWN0aXZlcyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZXMgPSBfcmVmMjAub3BlcmF0aW9uVHlwZXM7XG4gICAgcmV0dXJuIGpvaW4oWydzY2hlbWEnLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKG9wZXJhdGlvblR5cGVzKV0sICcgJyk7XG4gIH0sXG5cbiAgT3BlcmF0aW9uVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIE9wZXJhdGlvblR5cGVEZWZpbml0aW9uKF9yZWYyMSkge1xuICAgIHZhciBvcGVyYXRpb24gPSBfcmVmMjEub3BlcmF0aW9uLFxuICAgICAgICB0eXBlID0gX3JlZjIxLnR5cGU7XG4gICAgcmV0dXJuIG9wZXJhdGlvbiArICc6ICcgKyB0eXBlO1xuICB9LFxuXG4gIFNjYWxhclR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBTY2FsYXJUeXBlRGVmaW5pdGlvbihfcmVmMjIpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyMi5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjIyLmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIGpvaW4oWydzY2FsYXInLCBuYW1lLCBqb2luKGRpcmVjdGl2ZXMsICcgJyldLCAnICcpO1xuICB9LFxuXG4gIE9iamVjdFR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBPYmplY3RUeXBlRGVmaW5pdGlvbihfcmVmMjMpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyMy5uYW1lLFxuICAgICAgICBpbnRlcmZhY2VzID0gX3JlZjIzLmludGVyZmFjZXMsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjMuZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjIzLmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ3R5cGUnLCBuYW1lLCB3cmFwKCdpbXBsZW1lbnRzICcsIGpvaW4oaW50ZXJmYWNlcywgJywgJykpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKGZpZWxkcyldLCAnICcpO1xuICB9LFxuXG4gIEZpZWxkRGVmaW5pdGlvbjogZnVuY3Rpb24gRmllbGREZWZpbml0aW9uKF9yZWYyNCkge1xuICAgIHZhciBuYW1lID0gX3JlZjI0Lm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMjQuYXJndW1lbnRzLFxuICAgICAgICB0eXBlID0gX3JlZjI0LnR5cGUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjQuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpICsgJzogJyArIHR5cGUgKyB3cmFwKCcgJywgam9pbihkaXJlY3RpdmVzLCAnICcpKTtcbiAgfSxcblxuICBJbnB1dFZhbHVlRGVmaW5pdGlvbjogZnVuY3Rpb24gSW5wdXRWYWx1ZURlZmluaXRpb24oX3JlZjI1KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjUubmFtZSxcbiAgICAgICAgdHlwZSA9IF9yZWYyNS50eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBfcmVmMjUuZGVmYXVsdFZhbHVlLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI1LmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIGpvaW4oW25hbWUgKyAnOiAnICsgdHlwZSwgd3JhcCgnPSAnLCBkZWZhdWx0VmFsdWUpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyldLCAnICcpO1xuICB9LFxuXG4gIEludGVyZmFjZVR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbihfcmVmMjYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyNi5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI2LmRpcmVjdGl2ZXMsXG4gICAgICAgIGZpZWxkcyA9IF9yZWYyNi5maWVsZHM7XG4gICAgcmV0dXJuIGpvaW4oWydpbnRlcmZhY2UnLCBuYW1lLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKGZpZWxkcyldLCAnICcpO1xuICB9LFxuXG4gIFVuaW9uVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIFVuaW9uVHlwZURlZmluaXRpb24oX3JlZjI3KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjcubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNy5kaXJlY3RpdmVzLFxuICAgICAgICB0eXBlcyA9IF9yZWYyNy50eXBlcztcbiAgICByZXR1cm4gam9pbihbJ3VuaW9uJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCAnPSAnICsgam9pbih0eXBlcywgJyB8ICcpXSwgJyAnKTtcbiAgfSxcblxuICBFbnVtVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIEVudW1UeXBlRGVmaW5pdGlvbihfcmVmMjgpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyOC5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI4LmRpcmVjdGl2ZXMsXG4gICAgICAgIHZhbHVlcyA9IF9yZWYyOC52YWx1ZXM7XG4gICAgcmV0dXJuIGpvaW4oWydlbnVtJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayh2YWx1ZXMpXSwgJyAnKTtcbiAgfSxcblxuICBFbnVtVmFsdWVEZWZpbml0aW9uOiBmdW5jdGlvbiBFbnVtVmFsdWVEZWZpbml0aW9uKF9yZWYyOSkge1xuICAgIHZhciBuYW1lID0gX3JlZjI5Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjkuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gam9pbihbbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpXSwgJyAnKTtcbiAgfSxcblxuICBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uKF9yZWYzMCkge1xuICAgIHZhciBuYW1lID0gX3JlZjMwLm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMzAuZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjMwLmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ2lucHV0JywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhmaWVsZHMpXSwgJyAnKTtcbiAgfSxcblxuICBUeXBlRXh0ZW5zaW9uRGVmaW5pdGlvbjogZnVuY3Rpb24gVHlwZUV4dGVuc2lvbkRlZmluaXRpb24oX3JlZjMxKSB7XG4gICAgdmFyIGRlZmluaXRpb24gPSBfcmVmMzEuZGVmaW5pdGlvbjtcbiAgICByZXR1cm4gJ2V4dGVuZCAnICsgZGVmaW5pdGlvbjtcbiAgfSxcblxuICBEaXJlY3RpdmVEZWZpbml0aW9uOiBmdW5jdGlvbiBEaXJlY3RpdmVEZWZpbml0aW9uKF9yZWYzMikge1xuICAgIHZhciBuYW1lID0gX3JlZjMyLm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMzIuYXJndW1lbnRzLFxuICAgICAgICBsb2NhdGlvbnMgPSBfcmVmMzIubG9jYXRpb25zO1xuICAgIHJldHVybiAnZGlyZWN0aXZlIEAnICsgbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpICsgJyBvbiAnICsgam9pbihsb2NhdGlvbnMsICcgfCAnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHaXZlbiBtYXliZUFycmF5LCBwcmludCBhbiBlbXB0eSBzdHJpbmcgaWYgaXQgaXMgbnVsbCBvciBlbXB0eSwgb3RoZXJ3aXNlXG4gKiBwcmludCBhbGwgaXRlbXMgdG9nZXRoZXIgc2VwYXJhdGVkIGJ5IHNlcGFyYXRvciBpZiBwcm92aWRlZFxuICovXG5mdW5jdGlvbiBqb2luKG1heWJlQXJyYXksIHNlcGFyYXRvcikge1xuICByZXR1cm4gbWF5YmVBcnJheSA/IG1heWJlQXJyYXkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH0pLmpvaW4oc2VwYXJhdG9yIHx8ICcnKSA6ICcnO1xufVxuXG4vKipcbiAqIEdpdmVuIGFycmF5LCBwcmludCBlYWNoIGl0ZW0gb24gaXRzIG93biBsaW5lLCB3cmFwcGVkIGluIGFuXG4gKiBpbmRlbnRlZCBcInsgfVwiIGJsb2NrLlxuICovXG5mdW5jdGlvbiBibG9jayhhcnJheSkge1xuICByZXR1cm4gYXJyYXkgJiYgYXJyYXkubGVuZ3RoICE9PSAwID8gaW5kZW50KCd7XFxuJyArIGpvaW4oYXJyYXksICdcXG4nKSkgKyAnXFxufScgOiAne30nO1xufVxuXG4vKipcbiAqIElmIG1heWJlU3RyaW5nIGlzIG5vdCBudWxsIG9yIGVtcHR5LCB0aGVuIHdyYXAgd2l0aCBzdGFydCBhbmQgZW5kLCBvdGhlcndpc2VcbiAqIHByaW50IGFuIGVtcHR5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gd3JhcChzdGFydCwgbWF5YmVTdHJpbmcsIGVuZCkge1xuICByZXR1cm4gbWF5YmVTdHJpbmcgPyBzdGFydCArIG1heWJlU3RyaW5nICsgKGVuZCB8fCAnJykgOiAnJztcbn1cblxuZnVuY3Rpb24gaW5kZW50KG1heWJlU3RyaW5nKSB7XG4gIHJldHVybiBtYXliZVN0cmluZyAmJiBtYXliZVN0cmluZy5yZXBsYWNlKC9cXG4vZywgJ1xcbiAgJyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ3JhcGhxbC9sYW5ndWFnZS9wcmludGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF1cblxuICAgIHZhciBpc0RhdGFWaWV3ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbiAgICB9XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgICB0aGlzLmFwcGVuZChoZWFkZXJbMF0sIGhlYWRlclsxXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV1cbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUrJywnK3ZhbHVlIDogdmFsdWVcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgIHJhd0hlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgIH1cblxuICAgIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xuICAgIHRoaXMuc3RhdHVzID0gJ3N0YXR1cycgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzIDogMjAwXG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICAgIHRoaXMuc3RhdHVzVGV4dCA9ICdzdGF0dXNUZXh0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXNUZXh0IDogJ09LJ1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKVxuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH1cblxuICBSZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIHZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XVxuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH1cblxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzXG4gIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3RcbiAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlXG5cbiAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdClcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxuXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG4gICAgICB9KVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxuICAgIH0pXG4gIH1cbiAgc2VsZi5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9mZXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gNTc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ1N0cmluZ1ZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzQm9vbGVhblZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdCb29sZWFuVmFsdWUnO1xufVxuZnVuY3Rpb24gaXNJbnRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnSW50VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNGbG9hdFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdGbG9hdFZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzVmFyaWFibGUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ1ZhcmlhYmxlJztcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ09iamVjdFZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzTGlzdFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdMaXN0VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNFbnVtVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0VudW1WYWx1ZSc7XG59XG5leHBvcnQgZnVuY3Rpb24gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGFyZ09iaiwgbmFtZSwgdmFsdWUsIHZhcmlhYmxlcykge1xuICAgIGlmIChpc0ludFZhbHVlKHZhbHVlKSB8fCBpc0Zsb2F0VmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IE51bWJlcih2YWx1ZS52YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQm9vbGVhblZhbHVlKHZhbHVlKSB8fCBpc1N0cmluZ1ZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YWx1ZS52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYmplY3RWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIG5lc3RlZEFyZ09ial8xID0ge307XG4gICAgICAgIHZhbHVlLmZpZWxkcy5tYXAoZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKG5lc3RlZEFyZ09ial8xLCBvYmoubmFtZSwgb2JqLnZhbHVlLCB2YXJpYWJsZXMpOyB9KTtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gbmVzdGVkQXJnT2JqXzE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVmFyaWFibGUodmFsdWUpKSB7XG4gICAgICAgIHZhciB2YXJpYWJsZVZhbHVlID0gKHZhcmlhYmxlcyB8fCB7fSlbdmFsdWUubmFtZS52YWx1ZV07XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhcmlhYmxlVmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTGlzdFZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YWx1ZS52YWx1ZXMubWFwKGZ1bmN0aW9uIChsaXN0VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBuZXN0ZWRBcmdBcnJheU9iaiA9IHt9O1xuICAgICAgICAgICAgdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKG5lc3RlZEFyZ0FycmF5T2JqLCBuYW1lLCBsaXN0VmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICAgICAgICByZXR1cm4gbmVzdGVkQXJnQXJyYXlPYmpbbmFtZS52YWx1ZV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0VudW1WYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gdmFsdWUudmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW5saW5lIGFyZ3VtZW50IFxcXCJcIiArIG5hbWUudmFsdWUgKyBcIlxcXCIgb2Yga2luZCBcXFwiXCIgKyB2YWx1ZS5raW5kICsgXCJcXFwiIGlzIG5vdCBzdXBwb3J0ZWQuXFxuICAgICAgICAgICAgICAgICAgICBVc2UgdmFyaWFibGVzIGluc3RlYWQgb2YgaW5saW5lIGFyZ3VtZW50cyB0byBvdmVyY29tZSB0aGlzIGxpbWl0YXRpb24uXCIpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdG9yZUtleU5hbWVGcm9tRmllbGQoZmllbGQsIHZhcmlhYmxlcykge1xuICAgIHZhciBkaXJlY3RpdmVzT2JqID0gbnVsbDtcbiAgICBpZiAoZmllbGQuZGlyZWN0aXZlcykge1xuICAgICAgICBkaXJlY3RpdmVzT2JqID0ge307XG4gICAgICAgIGZpZWxkLmRpcmVjdGl2ZXMuZm9yRWFjaChmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzT2JqW2RpcmVjdGl2ZS5uYW1lLnZhbHVlXSA9IHt9O1xuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS5hcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmUuYXJndW1lbnRzLmZvckVhY2goKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24oZGlyZWN0aXZlc09ialtkaXJlY3RpdmUubmFtZS52YWx1ZV0sIG5hbWUsIHZhbHVlLCB2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBhcmdPYmogPSBudWxsO1xuICAgIGlmIChmaWVsZC5hcmd1bWVudHMgJiYgZmllbGQuYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBhcmdPYmogPSB7fTtcbiAgICAgICAgZmllbGQuYXJndW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGFyZ09iaiwgbmFtZSwgdmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0U3RvcmVLZXlOYW1lKGZpZWxkLm5hbWUudmFsdWUsIGFyZ09iaiwgZGlyZWN0aXZlc09iaik7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RvcmVLZXlOYW1lKGZpZWxkTmFtZSwgYXJncywgZGlyZWN0aXZlcykge1xuICAgIGlmIChkaXJlY3RpdmVzICYmIGRpcmVjdGl2ZXNbJ2Nvbm5lY3Rpb24nXSAmJiBkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2tleSddKSB7XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmVzWydjb25uZWN0aW9uJ11bJ2tleSddO1xuICAgIH1cbiAgICBpZiAoYXJncykge1xuICAgICAgICB2YXIgc3RyaW5naWZpZWRBcmdzID0gSlNPTi5zdHJpbmdpZnkoYXJncyk7XG4gICAgICAgIHJldHVybiBmaWVsZE5hbWUgKyBcIihcIiArIHN0cmluZ2lmaWVkQXJncyArIFwiKVwiO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGROYW1lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlc3VsdEtleU5hbWVGcm9tRmllbGQoZmllbGQpIHtcbiAgICByZXR1cm4gZmllbGQuYWxpYXMgP1xuICAgICAgICBmaWVsZC5hbGlhcy52YWx1ZSA6XG4gICAgICAgIGZpZWxkLm5hbWUudmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNGaWVsZChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdJbmxpbmVGcmFnbWVudCc7XG59XG5leHBvcnQgZnVuY3Rpb24gZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQuZXJyb3JzICYmIHJlc3VsdC5lcnJvcnMubGVuZ3RoO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzSWRWYWx1ZShpZE9iamVjdCkge1xuICAgIHJldHVybiAoaWRPYmplY3QgIT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YgaWRPYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICAgIGlkT2JqZWN0LnR5cGUgPT09ICdpZCcpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRvSWRWYWx1ZShpZCwgZ2VuZXJhdGVkKSB7XG4gICAgaWYgKGdlbmVyYXRlZCA9PT0gdm9pZCAwKSB7IGdlbmVyYXRlZCA9IGZhbHNlOyB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2lkJyxcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBnZW5lcmF0ZWQ6IGdlbmVyYXRlZCxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzSnNvblZhbHVlKGpzb25PYmplY3QpIHtcbiAgICByZXR1cm4gKGpzb25PYmplY3QgIT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YganNvbk9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAganNvbk9iamVjdC50eXBlID09PSAnanNvbicpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmVVdGlscy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2RhdGEvc3RvcmVVdGlscy5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsImV4cG9ydCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAodHlwZW9mIChzb3VyY2UpID09PSAndW5kZWZpbmVkJyB8fCBzb3VyY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzc2lnbi5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3V0aWwvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24sIH0gZnJvbSAnLi4vZGF0YS9zdG9yZVV0aWxzJztcbmltcG9ydCB7IGFzc2lnbiB9IGZyb20gJy4uL3V0aWwvYXNzaWduJztcbmV4cG9ydCBmdW5jdGlvbiBnZXRNdXRhdGlvbkRlZmluaXRpb24oZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHZhciBtdXRhdGlvbkRlZiA9IG51bGw7XG4gICAgZG9jLmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nXG4gICAgICAgICAgICAmJiBkZWZpbml0aW9uLm9wZXJhdGlvbiA9PT0gJ211dGF0aW9uJykge1xuICAgICAgICAgICAgbXV0YXRpb25EZWYgPSBkZWZpbml0aW9uO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFtdXRhdGlvbkRlZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgY29udGFpbiBhIG11dGF0aW9uIGRlZmluaXRpb24uJyk7XG4gICAgfVxuICAgIHJldHVybiBtdXRhdGlvbkRlZjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RvY3VtZW50KGRvYykge1xuICAgIGlmIChkb2Mua2luZCAhPT0gJ0RvY3VtZW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RpbmcgYSBwYXJzZWQgR3JhcGhRTCBkb2N1bWVudC4gUGVyaGFwcyB5b3UgbmVlZCB0byB3cmFwIHRoZSBxdWVyeSBzdHJpbmcgaW4gYSBcXFwiZ3FsXFxcIiB0YWc/IGh0dHA6Ly9kb2NzLmFwb2xsb3N0YWNrLmNvbS9hcG9sbG8tY2xpZW50L2NvcmUuaHRtbCNncWxcIik7XG4gICAgfVxuICAgIHZhciBmb3VuZE9wZXJhdGlvbiA9IGZhbHNlO1xuICAgIGRvYy5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIHN3aXRjaCAoZGVmaW5pdGlvbi5raW5kKSB7XG4gICAgICAgICAgICBjYXNlICdGcmFnbWVudERlZmluaXRpb24nOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnT3BlcmF0aW9uRGVmaW5pdGlvbic6XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kT3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUXVlcmllcyBtdXN0IGhhdmUgZXhhY3RseSBvbmUgb3BlcmF0aW9uIGRlZmluaXRpb24uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvdW5kT3BlcmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2NoZW1hIHR5cGUgZGVmaW5pdGlvbnMgbm90IGFsbG93ZWQgaW4gcXVlcmllcy4gRm91bmQ6IFxcXCJcIiArIGRlZmluaXRpb24ua2luZCArIFwiXFxcIlwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wZXJhdGlvbk5hbWUoZG9jKSB7XG4gICAgdmFyIHJlcyA9IG51bGw7XG4gICAgZG9jLmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nICYmIGRlZmluaXRpb24ubmFtZSkge1xuICAgICAgICAgICAgcmVzID0gZGVmaW5pdGlvbi5uYW1lLnZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRGcmFnbWVudERlZmluaXRpb25zKGRvYykge1xuICAgIHZhciBmcmFnbWVudERlZmluaXRpb25zID0gZG9jLmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZnJhZ21lbnREZWZpbml0aW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWVyeURlZmluaXRpb24oZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHZhciBxdWVyeURlZiA9IG51bGw7XG4gICAgZG9jLmRlZmluaXRpb25zLm1hcChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbidcbiAgICAgICAgICAgICYmIGRlZmluaXRpb24ub3BlcmF0aW9uID09PSAncXVlcnknKSB7XG4gICAgICAgICAgICBxdWVyeURlZiA9IGRlZmluaXRpb247XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXF1ZXJ5RGVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBjb250YWluIGEgcXVlcnkgZGVmaW5pdGlvbi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5RGVmO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wZXJhdGlvbkRlZmluaXRpb24oZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHZhciBvcERlZiA9IG51bGw7XG4gICAgZG9jLmRlZmluaXRpb25zLm1hcChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicpIHtcbiAgICAgICAgICAgIG9wRGVmID0gZGVmaW5pdGlvbjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghb3BEZWYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGNvbnRhaW4gYSBxdWVyeSBkZWZpbml0aW9uLicpO1xuICAgIH1cbiAgICByZXR1cm4gb3BEZWY7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJhZ21lbnREZWZpbml0aW9uKGRvYykge1xuICAgIGlmIChkb2Mua2luZCAhPT0gJ0RvY3VtZW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RpbmcgYSBwYXJzZWQgR3JhcGhRTCBkb2N1bWVudC4gUGVyaGFwcyB5b3UgbmVlZCB0byB3cmFwIHRoZSBxdWVyeSBzdHJpbmcgaW4gYSBcXFwiZ3FsXFxcIiB0YWc/IGh0dHA6Ly9kb2NzLmFwb2xsb3N0YWNrLmNvbS9hcG9sbG8tY2xpZW50L2NvcmUuaHRtbCNncWxcIik7XG4gICAgfVxuICAgIGlmIChkb2MuZGVmaW5pdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZyYWdtZW50IG11c3QgaGF2ZSBleGFjdGx5IG9uZSBkZWZpbml0aW9uLicpO1xuICAgIH1cbiAgICB2YXIgZnJhZ21lbnREZWYgPSBkb2MuZGVmaW5pdGlvbnNbMF07XG4gICAgaWYgKGZyYWdtZW50RGVmLmtpbmQgIT09ICdGcmFnbWVudERlZmluaXRpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBiZSBhIGZyYWdtZW50IGRlZmluaXRpb24uJyk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudERlZjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGcmFnbWVudE1hcChmcmFnbWVudHMpIHtcbiAgICBpZiAoZnJhZ21lbnRzID09PSB2b2lkIDApIHsgZnJhZ21lbnRzID0gW107IH1cbiAgICB2YXIgc3ltVGFibGUgPSB7fTtcbiAgICBmcmFnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgc3ltVGFibGVbZnJhZ21lbnQubmFtZS52YWx1ZV0gPSBmcmFnbWVudDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3ltVGFibGU7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KGRvY3VtZW50LCBmcmFnbWVudE5hbWUpIHtcbiAgICB2YXIgYWN0dWFsRnJhZ21lbnROYW1lID0gZnJhZ21lbnROYW1lO1xuICAgIHZhciBmcmFnbWVudHMgPSBbXTtcbiAgICBkb2N1bWVudC5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm91bmQgYSBcIiArIGRlZmluaXRpb24ub3BlcmF0aW9uICsgXCIgb3BlcmF0aW9uXCIgKyAoZGVmaW5pdGlvbi5uYW1lID8gXCIgbmFtZWQgJ1wiICsgZGVmaW5pdGlvbi5uYW1lLnZhbHVlICsgXCInXCIgOiAnJykgKyBcIi4gXCIgK1xuICAgICAgICAgICAgICAgICdObyBvcGVyYXRpb25zIGFyZSBhbGxvd2VkIHdoZW4gdXNpbmcgYSBmcmFnbWVudCBhcyBhIHF1ZXJ5LiBPbmx5IGZyYWdtZW50cyBhcmUgYWxsb3dlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgZnJhZ21lbnRzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGFjdHVhbEZyYWdtZW50TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKGZyYWdtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvdW5kIFwiICsgZnJhZ21lbnRzLmxlbmd0aCArIFwiIGZyYWdtZW50cy4gYGZyYWdtZW50TmFtZWAgbXVzdCBiZSBwcm92aWRlZCB3aGVuIHRoZXJlIGlzIG5vdCBleGFjdGx5IDEgZnJhZ21lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGFjdHVhbEZyYWdtZW50TmFtZSA9IGZyYWdtZW50c1swXS5uYW1lLnZhbHVlO1xuICAgIH1cbiAgICB2YXIgcXVlcnkgPSBfX2Fzc2lnbih7fSwgZG9jdW1lbnQsIHsgZGVmaW5pdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBraW5kOiAnT3BlcmF0aW9uRGVmaW5pdGlvbicsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAncXVlcnknLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvblNldDoge1xuICAgICAgICAgICAgICAgICAgICBraW5kOiAnU2VsZWN0aW9uU2V0JyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdGcmFnbWVudFNwcmVhZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiAnTmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhY3R1YWxGcmFnbWVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgXS5jb25jYXQoZG9jdW1lbnQuZGVmaW5pdGlvbnMpIH0pO1xuICAgIHJldHVybiBxdWVyeTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVzKGRlZmluaXRpb24pIHtcbiAgICBpZiAoZGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zICYmIGRlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZXMgPSBkZWZpbml0aW9uLnZhcmlhYmxlRGVmaW5pdGlvbnNcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gX2EuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFibGUgPSBfYS52YXJpYWJsZSwgZGVmYXVsdFZhbHVlID0gX2EuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZU9iaiA9IHt9O1xuICAgICAgICAgICAgdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGRlZmF1bHRWYWx1ZU9iaiwgdmFyaWFibGUubmFtZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXNzaWduLmFwcGx5KHZvaWQgMCwgW3t9XS5jb25jYXQoZGVmYXVsdFZhbHVlcykpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRGcm9tQVNULmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvcXVlcmllcy9nZXRGcm9tQVNULmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwiZXhwb3J0IGZ1bmN0aW9uIGNsb25lRGVlcCh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBjbG9uZURlZXAoaXRlbSk7IH0pO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgbmV4dFZhbHVlID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWVba2V5XSA9IGNsb25lRGVlcCh2YWx1ZVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbG9uZURlZXAuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC91dGlsL2Nsb25lRGVlcC5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsImltcG9ydCB7IGNoZWNrRG9jdW1lbnQsIH0gZnJvbSAnLi9nZXRGcm9tQVNUJztcbmltcG9ydCB7IGNsb25lRGVlcCB9IGZyb20gJy4uL3V0aWwvY2xvbmVEZWVwJztcbnZhciBUWVBFTkFNRV9GSUVMRCA9IHtcbiAgICBraW5kOiAnRmllbGQnLFxuICAgIG5hbWU6IHtcbiAgICAgICAga2luZDogJ05hbWUnLFxuICAgICAgICB2YWx1ZTogJ19fdHlwZW5hbWUnLFxuICAgIH0sXG59O1xuZnVuY3Rpb24gYWRkVHlwZW5hbWVUb1NlbGVjdGlvblNldChzZWxlY3Rpb25TZXQsIGlzUm9vdCkge1xuICAgIGlmIChpc1Jvb3QgPT09IHZvaWQgMCkgeyBpc1Jvb3QgPSBmYWxzZTsgfVxuICAgIGlmIChzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucykge1xuICAgICAgICBpZiAoIWlzUm9vdCkge1xuICAgICAgICAgICAgdmFyIGFscmVhZHlIYXNUaGlzRmllbGQgPSBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5zb21lKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCcgJiYgc2VsZWN0aW9uLm5hbWUudmFsdWUgPT09ICdfX3R5cGVuYW1lJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFhbHJlYWR5SGFzVGhpc0ZpZWxkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMucHVzaChUWVBFTkFNRV9GSUVMRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLm5hbWUudmFsdWUubGFzdEluZGV4T2YoJ19fJywgMCkgIT09IDAgJiYgc2VsZWN0aW9uLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRUeXBlbmFtZVRvU2VsZWN0aW9uU2V0KHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5raW5kID09PSAnSW5saW5lRnJhZ21lbnQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkVHlwZW5hbWVUb1NlbGVjdGlvblNldChzZWxlY3Rpb24uc2VsZWN0aW9uU2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZUNvbm5lY3Rpb25EaXJlY3RpdmVGcm9tU2VsZWN0aW9uU2V0KHNlbGVjdGlvblNldCkge1xuICAgIGlmIChzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucykge1xuICAgICAgICBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ua2luZCA9PT0gJ0ZpZWxkJyAmJiBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmRpcmVjdGl2ZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZGlyZWN0aXZlcyA9IHNlbGVjdGlvbi5kaXJlY3RpdmVzLmZpbHRlcihmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWxsUmVtb3ZlID0gZGlyZWN0aXZlLm5hbWUudmFsdWUgPT09ICdjb25uZWN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbGxSZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGlyZWN0aXZlLmFyZ3VtZW50cyB8fCAhZGlyZWN0aXZlLmFyZ3VtZW50cy5zb21lKGZ1bmN0aW9uIChhcmcpIHsgcmV0dXJuIGFyZy5uYW1lLnZhbHVlID09PSAna2V5JzsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlbW92aW5nIGFuIEBjb25uZWN0aW9uIGRpcmVjdGl2ZSBldmVuIHRob3VnaCBpdCBkb2VzIG5vdCBoYXZlIGEga2V5LiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1lvdSBtYXkgd2FudCB0byB1c2UgdGhlIGtleSBwYXJhbWV0ZXIgdG8gc3BlY2lmeSBhIHN0b3JlIGtleS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXdpbGxSZW1vdmU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ua2luZCA9PT0gJ0ZpZWxkJykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNvbm5lY3Rpb25EaXJlY3RpdmVGcm9tU2VsZWN0aW9uU2V0KHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5raW5kID09PSAnSW5saW5lRnJhZ21lbnQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ29ubmVjdGlvbkRpcmVjdGl2ZUZyb21TZWxlY3Rpb25TZXQoc2VsZWN0aW9uLnNlbGVjdGlvblNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVHlwZW5hbWVUb0RvY3VtZW50KGRvYykge1xuICAgIGNoZWNrRG9jdW1lbnQoZG9jKTtcbiAgICB2YXIgZG9jQ2xvbmUgPSBjbG9uZURlZXAoZG9jKTtcbiAgICBkb2NDbG9uZS5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciBpc1Jvb3QgPSBkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJztcbiAgICAgICAgYWRkVHlwZW5hbWVUb1NlbGVjdGlvblNldChkZWZpbml0aW9uLnNlbGVjdGlvblNldCwgaXNSb290KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZG9jQ2xvbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ29ubmVjdGlvbkRpcmVjdGl2ZUZyb21Eb2N1bWVudChkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIGRvY0Nsb25lID0gY2xvbmVEZWVwKGRvYyk7XG4gICAgZG9jQ2xvbmUuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICByZW1vdmVDb25uZWN0aW9uRGlyZWN0aXZlRnJvbVNlbGVjdGlvblNldChkZWZpbml0aW9uLnNlbGVjdGlvblNldCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRvY0Nsb25lO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVlcnlUcmFuc2Zvcm0uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9xdWVyaWVzL3F1ZXJ5VHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCAnd2hhdHdnLWZldGNoJztcbmltcG9ydCB7IHByaW50IH0gZnJvbSAnZ3JhcGhxbC9sYW5ndWFnZS9wcmludGVyJztcbmltcG9ydCB7IHJlbW92ZUNvbm5lY3Rpb25EaXJlY3RpdmVGcm9tRG9jdW1lbnQsIH0gZnJvbSAnLi4vcXVlcmllcy9xdWVyeVRyYW5zZm9ybSc7XG5leHBvcnQgZnVuY3Rpb24gcHJpbnRSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gX19hc3NpZ24oe30sIHJlcXVlc3QsIHsgcXVlcnk6IHByaW50KHJlcXVlc3QucXVlcnkpIH0pO1xufVxudmFyIEJhc2VOZXR3b3JrSW50ZXJmYWNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNlTmV0d29ya0ludGVyZmFjZSh1cmksIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgaWYgKCF1cmkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSByZW1vdGUgZW5kcG9pbnQgaXMgcmVxdWlyZWQgZm9yIGEgbmV0d29yayBsYXllcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdXJpICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW1vdGUgZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5fb3B0cyA9IF9fYXNzaWduKHt9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJ3YXJlcyA9IFtdO1xuICAgIH1cbiAgICBCYXNlTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignQmFzZU5ldHdvcmtJbnRlcmZhY2Ugc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5JykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBCYXNlTmV0d29ya0ludGVyZmFjZTtcbn0oKSk7XG5leHBvcnQgeyBCYXNlTmV0d29ya0ludGVyZmFjZSB9O1xudmFyIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlNaWRkbGV3YXJlcyA9IGZ1bmN0aW9uIChyZXF1ZXN0QW5kT3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSByZXF1ZXN0QW5kT3B0aW9ucy5yZXF1ZXN0LCBvcHRpb25zID0gcmVxdWVzdEFuZE9wdGlvbnMub3B0aW9ucztcbiAgICAgICAgICAgIHZhciBxdWV1ZSA9IGZ1bmN0aW9uIChmdW5jcywgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gZnVuY3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBseU1pZGRsZXdhcmUuYXBwbHkoc2NvcGUsIFt7IHJlcXVlc3Q6IHJlcXVlc3QsIG9wdGlvbnM6IG9wdGlvbnMgfSwgbmV4dF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWV1ZShfdGhpcy5fbWlkZGxld2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLmFwcGx5QWZ0ZXJ3YXJlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzcG9uc2UgPSBfYS5yZXNwb25zZSwgb3B0aW9ucyA9IF9hLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VPYmplY3QgPSB7IHJlc3BvbnNlOiByZXNwb25zZSwgb3B0aW9uczogb3B0aW9ucyB9O1xuICAgICAgICAgICAgdmFyIHF1ZXVlID0gZnVuY3Rpb24gKGZ1bmNzLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBmdW5jcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLmFwcGx5QWZ0ZXJ3YXJlLmFwcGx5KHNjb3BlLCBbcmVzcG9uc2VPYmplY3QsIG5leHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcXVldWUoX3RoaXMuX2FmdGVyd2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLmZldGNoRnJvbVJlbW90ZUVuZHBvaW50ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gX2EucmVxdWVzdCwgb3B0aW9ucyA9IF9hLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBmZXRjaCh0aGlzLl91cmksIF9fYXNzaWduKHt9LCB0aGlzLl9vcHRzLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KHByaW50UmVxdWVzdChyZXF1ZXN0KSksIG1ldGhvZDogJ1BPU1QnIH0sIG9wdGlvbnMsIHsgaGVhZGVyczogX19hc3NpZ24oeyBBY2NlcHQ6ICcqLyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIG9wdGlvbnMuaGVhZGVycykgfSkpO1xuICAgIH07XG4gICAgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9fYXNzaWduKHt9LCB0aGlzLl9vcHRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlNaWRkbGV3YXJlcyh7XG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmFvKSB7XG4gICAgICAgICAgICBpZiAocmFvLnJlcXVlc3QucXVlcnkpIHtcbiAgICAgICAgICAgICAgICByYW8ucmVxdWVzdC5xdWVyeSA9IHJlbW92ZUNvbm5lY3Rpb25EaXJlY3RpdmVGcm9tRG9jdW1lbnQocmFvLnJlcXVlc3QucXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJhbztcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmFvKSB7IHJldHVybiBfdGhpcy5mZXRjaEZyb21SZW1vdGVFbmRwb2ludC5jYWxsKF90aGlzLCByYW8pOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfdGhpcy5hcHBseUFmdGVyd2FyZXMoe1xuICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfSk7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IF9hLnJlc3BvbnNlO1xuICAgICAgICAgICAgdmFyIGh0dHBSZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXNwb25zZS5qc29uKCkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0dHBFcnJvciA9IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiAtIFxcXCJcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICAgICAgaHR0cEVycm9yLnJlc3BvbnNlID0gaHR0cFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGh0dHBFcnJvci5wYXJzZUVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhyb3cgaHR0cEVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGF5bG9hZCkge1xuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmhhc093blByb3BlcnR5KCdkYXRhJykgJiYgIXBheWxvYWQuaGFzT3duUHJvcGVydHkoJ2Vycm9ycycpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmVyIHJlc3BvbnNlIHdhcyBtaXNzaW5nIGZvciBxdWVyeSAnXCIgKyByZXF1ZXN0LmRlYnVnTmFtZSArIFwiJy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAobWlkZGxld2FyZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1pZGRsZXdhcmUuYXBwbHlNaWRkbGV3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21pZGRsZXdhcmVzLnB1c2gobWlkZGxld2FyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pZGRsZXdhcmUgbXVzdCBpbXBsZW1lbnQgdGhlIGFwcGx5TWlkZGxld2FyZSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS51c2VBZnRlciA9IGZ1bmN0aW9uIChhZnRlcndhcmVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGFmdGVyd2FyZXMubWFwKGZ1bmN0aW9uIChhZnRlcndhcmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWZ0ZXJ3YXJlLmFwcGx5QWZ0ZXJ3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2FmdGVyd2FyZXMucHVzaChhZnRlcndhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBZnRlcndhcmUgbXVzdCBpbXBsZW1lbnQgdGhlIGFwcGx5QWZ0ZXJ3YXJlIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlO1xufShCYXNlTmV0d29ya0ludGVyZmFjZSkpO1xuZXhwb3J0IHsgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UodXJpT3JJbnRlcmZhY2VPcHRzLCBzZWNvbmRBcmdPcHRzKSB7XG4gICAgaWYgKHNlY29uZEFyZ09wdHMgPT09IHZvaWQgMCkgeyBzZWNvbmRBcmdPcHRzID0ge307IH1cbiAgICBpZiAoIXVyaU9ySW50ZXJmYWNlT3B0cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gb3B0aW9ucyBhcmd1bWVudCB0byBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlLicpO1xuICAgIH1cbiAgICB2YXIgdXJpO1xuICAgIHZhciBvcHRzO1xuICAgIGlmICh0eXBlb2YgdXJpT3JJbnRlcmZhY2VPcHRzID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJQYXNzaW5nIHRoZSBVUkkgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UgaXMgZGVwcmVjYXRlZCBhcyBvZiBBcG9sbG8gQ2xpZW50IDAuNS4gUGxlYXNlIHBhc3MgaXQgYXMgdGhlIFxcXCJ1cmlcXFwiIHByb3BlcnR5IG9mIHRoZSBuZXR3b3JrIGludGVyZmFjZSBvcHRpb25zLlwiKTtcbiAgICAgICAgb3B0cyA9IHNlY29uZEFyZ09wdHM7XG4gICAgICAgIHVyaSA9IHVyaU9ySW50ZXJmYWNlT3B0cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG9wdHMgPSB1cmlPckludGVyZmFjZU9wdHMub3B0cztcbiAgICAgICAgdXJpID0gdXJpT3JJbnRlcmZhY2VPcHRzLnVyaTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlKHVyaSwgb3B0cyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uZXR3b3JrSW50ZXJmYWNlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvdHJhbnNwb3J0L25ldHdvcmtJbnRlcmZhY2UuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJ2YXIgUXVlcnlCYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRdWVyeUJhdGNoZXIoX2EpIHtcbiAgICAgICAgdmFyIGJhdGNoSW50ZXJ2YWwgPSBfYS5iYXRjaEludGVydmFsLCBfYiA9IF9hLmJhdGNoTWF4LCBiYXRjaE1heCA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIGJhdGNoRmV0Y2hGdW5jdGlvbiA9IF9hLmJhdGNoRmV0Y2hGdW5jdGlvbjtcbiAgICAgICAgdGhpcy5xdWV1ZWRSZXF1ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXVlZFJlcXVlc3RzID0gW107XG4gICAgICAgIHRoaXMuYmF0Y2hJbnRlcnZhbCA9IGJhdGNoSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuYmF0Y2hNYXggPSBiYXRjaE1heDtcbiAgICAgICAgdGhpcy5iYXRjaEZldGNoRnVuY3Rpb24gPSBiYXRjaEZldGNoRnVuY3Rpb247XG4gICAgfVxuICAgIFF1ZXJ5QmF0Y2hlci5wcm90b3R5cGUuZW5xdWV1ZVJlcXVlc3QgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICB2YXIgZmV0Y2hSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5xdWV1ZWRSZXF1ZXN0cy5wdXNoKGZldGNoUmVxdWVzdCk7XG4gICAgICAgIGZldGNoUmVxdWVzdC5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZmV0Y2hSZXF1ZXN0LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgZmV0Y2hSZXF1ZXN0LnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnF1ZXVlZFJlcXVlc3RzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVF1ZXVlQ29uc3VtcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5xdWV1ZWRSZXF1ZXN0cy5sZW5ndGggPT09IHRoaXMuYmF0Y2hNYXgpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3VtZVF1ZXVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoUmVxdWVzdC5wcm9taXNlO1xuICAgIH07XG4gICAgUXVlcnlCYXRjaGVyLnByb3RvdHlwZS5jb25zdW1lUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXF1ZXN0cyA9IHRoaXMucXVldWVkUmVxdWVzdHMubWFwKGZ1bmN0aW9uIChxdWV1ZWRSZXF1ZXN0KSB7IHJldHVybiBxdWV1ZWRSZXF1ZXN0LnJlcXVlc3Q7IH0pO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgdmFyIHJlc29sdmVycyA9IFtdO1xuICAgICAgICB2YXIgcmVqZWN0ZXJzID0gW107XG4gICAgICAgIHRoaXMucXVldWVkUmVxdWVzdHMuZm9yRWFjaChmdW5jdGlvbiAoZmV0Y2hSZXF1ZXN0LCBpbmRleCkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChmZXRjaFJlcXVlc3QucHJvbWlzZSk7XG4gICAgICAgICAgICByZXNvbHZlcnMucHVzaChmZXRjaFJlcXVlc3QucmVzb2x2ZSk7XG4gICAgICAgICAgICByZWplY3RlcnMucHVzaChmZXRjaFJlcXVlc3QucmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucXVldWVkUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgdmFyIGJhdGNoZWRQcm9taXNlID0gdGhpcy5iYXRjaEZldGNoRnVuY3Rpb24ocmVxdWVzdHMpO1xuICAgICAgICBiYXRjaGVkUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlcnNbaW5kZXhdKHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3RlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVqZWN0ZXIsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0ZXJzW2luZGV4XShlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlcztcbiAgICB9O1xuICAgIFF1ZXJ5QmF0Y2hlci5wcm90b3R5cGUuc2NoZWR1bGVRdWV1ZUNvbnN1bXB0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5xdWV1ZWRSZXF1ZXN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5jb25zdW1lUXVldWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5iYXRjaEludGVydmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWVyeUJhdGNoZXI7XG59KCkpO1xuZXhwb3J0IHsgUXVlcnlCYXRjaGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXRjaGluZy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3RyYW5zcG9ydC9iYXRjaGluZy5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5pbXBvcnQgeyBCYXNlTmV0d29ya0ludGVyZmFjZSwgcHJpbnRSZXF1ZXN0LCB9IGZyb20gJy4vbmV0d29ya0ludGVyZmFjZSc7XG5pbXBvcnQgeyBRdWVyeUJhdGNoZXIsIH0gZnJvbSAnLi9iYXRjaGluZyc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuLi91dGlsL2Fzc2lnbic7XG52YXIgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZShfYSkge1xuICAgICAgICB2YXIgdXJpID0gX2EudXJpLCBfYiA9IF9hLmJhdGNoSW50ZXJ2YWwsIGJhdGNoSW50ZXJ2YWwgPSBfYiA9PT0gdm9pZCAwID8gMTAgOiBfYiwgX2MgPSBfYS5iYXRjaE1heCwgYmF0Y2hNYXggPSBfYyA9PT0gdm9pZCAwID8gMCA6IF9jLCBmZXRjaE9wdHMgPSBfYS5mZXRjaE9wdHM7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHVyaSwgZmV0Y2hPcHRzKSB8fCB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIGJhdGNoSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYXRjaEludGVydmFsIG11c3QgYmUgYSBudW1iZXIsIGdvdCBcIiArIGJhdGNoSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYmF0Y2hNYXggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYXRjaE1heCBtdXN0IGJlIGEgbnVtYmVyLCBnb3QgXCIgKyBiYXRjaE1heCk7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuYmF0Y2hlciA9IG5ldyBRdWVyeUJhdGNoZXIoe1xuICAgICAgICAgICAgYmF0Y2hJbnRlcnZhbDogYmF0Y2hJbnRlcnZhbCxcbiAgICAgICAgICAgIGJhdGNoTWF4OiBiYXRjaE1heCxcbiAgICAgICAgICAgIGJhdGNoRmV0Y2hGdW5jdGlvbjogX3RoaXMuYmF0Y2hRdWVyeS5iaW5kKF90aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhdGNoZXIuZW5xdWV1ZVJlcXVlc3QocmVxdWVzdCk7XG4gICAgfTtcbiAgICBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLmJhdGNoUXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfX2Fzc2lnbih7fSwgdGhpcy5fb3B0cyk7XG4gICAgICAgIHZhciBtaWRkbGV3YXJlUHJvbWlzZSA9IHRoaXMuYXBwbHlCYXRjaE1pZGRsZXdhcmVzKHtcbiAgICAgICAgICAgIHJlcXVlc3RzOiByZXF1ZXN0cyxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbWlkZGxld2FyZVByb21pc2UudGhlbihmdW5jdGlvbiAoYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5iYXRjaGVkRmV0Y2hGcm9tUmVtb3RlRW5kcG9pbnQoYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaHR0cFJlc3BvbnNlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWh0dHBSZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmFwcGx5QmF0Y2hBZnRlcndhcmVzKHsgcmVzcG9uc2VzOiBbaHR0cFJlc3BvbnNlXSwgb3B0aW9uczogYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaHR0cEVycm9yID0gbmV3IEVycm9yKFwiTmV0d29yayByZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBcIiArIGh0dHBSZXNwb25zZS5zdGF0dXMgKyBcIiAtIFxcXCJcIiArIGh0dHBSZXNwb25zZS5zdGF0dXNUZXh0ICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBFcnJvci5yZXNwb25zZSA9IGh0dHBSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBodHRwRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmpzb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VzLm1hcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2U6IHNlcnZlciByZXNwb25zZSBpcyBub3QgYW4gYXJyYXknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUJhdGNoQWZ0ZXJ3YXJlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZXM6IHJlc3BvbnNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2VBbmRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlQW5kT3B0aW9ucy5yZXNwb25zZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlCYXRjaE1pZGRsZXdhcmVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXF1ZXN0cyA9IF9hLnJlcXVlc3RzLCBvcHRpb25zID0gX2Eub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBxdWV1ZSA9IGZ1bmN0aW9uIChmdW5jcywgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gZnVuY3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBseUJhdGNoTWlkZGxld2FyZS5hcHBseShzY29wZSwgW3sgcmVxdWVzdHM6IHJlcXVlc3RzLCBvcHRpb25zOiBvcHRpb25zIH0sIG5leHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzOiByZXF1ZXN0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWV1ZShfdGhpcy5fbWlkZGxld2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlCYXRjaEFmdGVyd2FyZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3BvbnNlcyA9IF9hLnJlc3BvbnNlcywgb3B0aW9ucyA9IF9hLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VPYmplY3QgPSB7IHJlc3BvbnNlczogcmVzcG9uc2VzLCBvcHRpb25zOiBvcHRpb25zIH07XG4gICAgICAgICAgICB2YXIgcXVldWUgPSBmdW5jdGlvbiAoZnVuY3MsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IGZ1bmNzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYuYXBwbHlCYXRjaEFmdGVyd2FyZS5hcHBseShzY29wZSwgW3Jlc3BvbnNlT2JqZWN0LCBuZXh0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlT2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHF1ZXVlKF90aGlzLl9hZnRlcndhcmVzLnNsaWNlKCksIF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChtaWRkbGV3YXJlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWlkZGxld2FyZS5hcHBseUJhdGNoTWlkZGxld2FyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIF90aGlzLl9taWRkbGV3YXJlcy5wdXNoKG1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaCBtaWRkbGV3YXJlIG11c3QgaW1wbGVtZW50IHRoZSBhcHBseUJhdGNoTWlkZGxld2FyZSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnVzZUFmdGVyID0gZnVuY3Rpb24gKGFmdGVyd2FyZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgYWZ0ZXJ3YXJlcy5tYXAoZnVuY3Rpb24gKGFmdGVyd2FyZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZnRlcndhcmUuYXBwbHlCYXRjaEFmdGVyd2FyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIF90aGlzLl9hZnRlcndhcmVzLnB1c2goYWZ0ZXJ3YXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmF0Y2ggYWZ0ZXJ3YXJlIG11c3QgaW1wbGVtZW50IHRoZSBhcHBseUJhdGNoQWZ0ZXJ3YXJlIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYmF0Y2hlZEZldGNoRnJvbVJlbW90ZUVuZHBvaW50ID0gZnVuY3Rpb24gKGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgYXNzaWduKG9wdGlvbnMsIGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMub3B0aW9ucyk7XG4gICAgICAgIHZhciBwcmludGVkUmVxdWVzdHMgPSBiYXRjaFJlcXVlc3RBbmRPcHRpb25zLnJlcXVlc3RzLm1hcChmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHByaW50UmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmZXRjaCh0aGlzLl91cmksIF9fYXNzaWduKHt9LCB0aGlzLl9vcHRzLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KHByaW50ZWRSZXF1ZXN0cyksIG1ldGhvZDogJ1BPU1QnIH0sIG9wdGlvbnMsIHsgaGVhZGVyczogX19hc3NpZ24oeyBBY2NlcHQ6ICcqLyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIG9wdGlvbnMuaGVhZGVycykgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZTtcbn0oQmFzZU5ldHdvcmtJbnRlcmZhY2UpKTtcbmV4cG9ydCB7IEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhdGNoaW5nTmV0d29ya0ludGVyZmFjZShvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcGFzcyBhbiBvcHRpb25zIGFyZ3VtZW50IHRvIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlKHtcbiAgICAgICAgdXJpOiBvcHRpb25zLnVyaSxcbiAgICAgICAgYmF0Y2hJbnRlcnZhbDogb3B0aW9ucy5iYXRjaEludGVydmFsLFxuICAgICAgICBiYXRjaE1heDogb3B0aW9ucy5iYXRjaE1heCxcbiAgICAgICAgZmV0Y2hPcHRzOiBvcHRpb25zLm9wdHMgfHwge30sXG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXRjaGVkTmV0d29ya0ludGVyZmFjZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3RyYW5zcG9ydC9iYXRjaGVkTmV0d29ya0ludGVyZmFjZS5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsImV4cG9ydCBmdW5jdGlvbiBpc1F1ZXJ5UmVzdWx0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9SRVNVTFQnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVlcnlFcnJvckFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fUVVFUllfRVJST1InO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVlcnlJbml0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9JTklUJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1F1ZXJ5UmVzdWx0Q2xpZW50QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9SRVNVTFRfQ0xJRU5UJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1F1ZXJ5U3RvcEFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fUVVFUllfU1RPUCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNNdXRhdGlvbkluaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX01VVEFUSU9OX0lOSVQnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX01VVEFUSU9OX1JFU1VMVCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNNdXRhdGlvbkVycm9yQWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19NVVRBVElPTl9FUlJPUic7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNVcGRhdGVRdWVyeVJlc3VsdEFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fVVBEQVRFX1FVRVJZX1JFU1VMVCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdG9yZVJlc2V0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19TVE9SRV9SRVNFVCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdWJzY3JpcHRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1NVQlNDUklQVElPTl9SRVNVTFQnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzV3JpdGVBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1dSSVRFJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGlvbnMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9hY3Rpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwiZXhwb3J0IGZ1bmN0aW9uIHNob3VsZEluY2x1ZGUoc2VsZWN0aW9uLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAodmFyaWFibGVzID09PSB2b2lkIDApIHsgdmFyaWFibGVzID0ge307IH1cbiAgICBpZiAoIXNlbGVjdGlvbi5kaXJlY3RpdmVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgcmVzID0gdHJ1ZTtcbiAgICBzZWxlY3Rpb24uZGlyZWN0aXZlcy5mb3JFYWNoKGZ1bmN0aW9uIChkaXJlY3RpdmUpIHtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZS5uYW1lLnZhbHVlICE9PSAnc2tpcCcgJiYgZGlyZWN0aXZlLm5hbWUudmFsdWUgIT09ICdpbmNsdWRlJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkaXJlY3RpdmVBcmd1bWVudHMgPSBkaXJlY3RpdmUuYXJndW1lbnRzIHx8IFtdO1xuICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGRpcmVjdGl2ZS5uYW1lLnZhbHVlO1xuICAgICAgICBpZiAoZGlyZWN0aXZlQXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMgZm9yIHRoZSBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWZBcmd1bWVudCA9IGRpcmVjdGl2ZUFyZ3VtZW50c1swXTtcbiAgICAgICAgaWYgKCFpZkFyZ3VtZW50Lm5hbWUgfHwgaWZBcmd1bWVudC5uYW1lLnZhbHVlICE9PSAnaWYnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlmVmFsdWUgPSBkaXJlY3RpdmVBcmd1bWVudHNbMF0udmFsdWU7XG4gICAgICAgIHZhciBldmFsZWRWYWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWlmVmFsdWUgfHwgaWZWYWx1ZS5raW5kICE9PSAnQm9vbGVhblZhbHVlJykge1xuICAgICAgICAgICAgaWYgKGlmVmFsdWUua2luZCAhPT0gJ1ZhcmlhYmxlJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZSBtdXN0IGJlIGEgdmFyaWFibGUgb3IgYSBib29sIGVhbiB2YWx1ZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmFsZWRWYWx1ZSA9IHZhcmlhYmxlc1tpZlZhbHVlLm5hbWUudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChldmFsZWRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFyaWFibGUgcmVmZXJlbmNlZCBpbiBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmFsZWRWYWx1ZSA9IGlmVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGl2ZU5hbWUgPT09ICdza2lwJykge1xuICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSAhZXZhbGVkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFldmFsZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlyZWN0aXZlcy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3F1ZXJpZXMvZGlyZWN0aXZlcy5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBnZXREZWZhdWx0VmFsdWVzLCBnZXRPcGVyYXRpb25EZWZpbml0aW9uLCBnZXRRdWVyeURlZmluaXRpb24sIGdldEZyYWdtZW50RGVmaW5pdGlvbnMsIGNyZWF0ZUZyYWdtZW50TWFwLCB9IGZyb20gJy4uL3F1ZXJpZXMvZ2V0RnJvbUFTVCc7XG5pbXBvcnQgeyBzdG9yZUtleU5hbWVGcm9tRmllbGQsIHJlc3VsdEtleU5hbWVGcm9tRmllbGQsIGlzRmllbGQsIGlzSW5saW5lRnJhZ21lbnQsIH0gZnJvbSAnLi9zdG9yZVV0aWxzJztcbmltcG9ydCB7IGlzSWRWYWx1ZSwgfSBmcm9tICcuL3N0b3JlVXRpbHMnO1xuaW1wb3J0IHsgc2hvdWxkSW5jbHVkZSwgfSBmcm9tICcuLi9xdWVyaWVzL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgaXNQcm9kdWN0aW9uLCB9IGZyb20gJy4uL3V0aWwvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgYXNzaWduLCB9IGZyb20gJy4uL3V0aWwvYXNzaWduJztcbnZhciBXcml0ZUVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoV3JpdGVFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBXcml0ZUVycm9yKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudHlwZSA9ICdXcml0ZUVycm9yJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gV3JpdGVFcnJvcjtcbn0oRXJyb3IpKTtcbmZ1bmN0aW9uIGVuaGFuY2VFcnJvcldpdGhEb2N1bWVudChlcnJvciwgZG9jdW1lbnQpIHtcbiAgICB2YXIgZW5oYW5jZWRFcnJvciA9IG5ldyBXcml0ZUVycm9yKFwiRXJyb3Igd3JpdGluZyByZXN1bHQgdG8gc3RvcmUgZm9yIHF1ZXJ5IFwiICsgKGRvY3VtZW50LmxvYyAmJiBkb2N1bWVudC5sb2Muc291cmNlICYmIGRvY3VtZW50LmxvYy5zb3VyY2UuYm9keSkpO1xuICAgIGVuaGFuY2VkRXJyb3IubWVzc2FnZSArPSAnL24nICsgZXJyb3IubWVzc2FnZTtcbiAgICBlbmhhbmNlZEVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgcmV0dXJuIGVuaGFuY2VkRXJyb3I7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JpdGVRdWVyeVRvU3RvcmUoX2EpIHtcbiAgICB2YXIgcmVzdWx0ID0gX2EucmVzdWx0LCBxdWVyeSA9IF9hLnF1ZXJ5LCBfYiA9IF9hLnN0b3JlLCBzdG9yZSA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIGRhdGFJZEZyb21PYmplY3QgPSBfYS5kYXRhSWRGcm9tT2JqZWN0LCBfYyA9IF9hLmZyYWdtZW50TWFwLCBmcmFnbWVudE1hcCA9IF9jID09PSB2b2lkIDAgPyB7fSA6IF9jLCBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbiA9IF9hLmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uO1xuICAgIHZhciBxdWVyeURlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ocXVlcnkpO1xuICAgIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhxdWVyeURlZmluaXRpb24pLCB2YXJpYWJsZXMpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgZGF0YUlkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgIHNlbGVjdGlvblNldDogcXVlcnlEZWZpbml0aW9uLnNlbGVjdGlvblNldCxcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hcDogZnJhZ21lbnRNYXAsXG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IGVuaGFuY2VFcnJvcldpdGhEb2N1bWVudChlLCBxdWVyeSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlUmVzdWx0VG9TdG9yZShfYSkge1xuICAgIHZhciBkYXRhSWQgPSBfYS5kYXRhSWQsIHJlc3VsdCA9IF9hLnJlc3VsdCwgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgX2IgPSBfYS5zdG9yZSwgc3RvcmUgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkYXRhSWRGcm9tT2JqZWN0ID0gX2EuZGF0YUlkRnJvbU9iamVjdCwgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gPSBfYS5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbjtcbiAgICB2YXIgb3BlcmF0aW9uRGVmaW5pdGlvbiA9IGdldE9wZXJhdGlvbkRlZmluaXRpb24oZG9jdW1lbnQpO1xuICAgIHZhciBzZWxlY3Rpb25TZXQgPSBvcGVyYXRpb25EZWZpbml0aW9uLnNlbGVjdGlvblNldDtcbiAgICB2YXIgZnJhZ21lbnRNYXAgPSBjcmVhdGVGcmFnbWVudE1hcChnZXRGcmFnbWVudERlZmluaXRpb25zKGRvY3VtZW50KSk7XG4gICAgdmFyaWFibGVzID0gYXNzaWduKHt9LCBnZXREZWZhdWx0VmFsdWVzKG9wZXJhdGlvbkRlZmluaXRpb24pLCB2YXJpYWJsZXMpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICBkYXRhSWQ6IGRhdGFJZCxcbiAgICAgICAgICAgIHNlbGVjdGlvblNldDogc2VsZWN0aW9uU2V0LFxuICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgIHN0b3JlOiBzdG9yZSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBkYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWFwOiBmcmFnbWVudE1hcCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgZW5oYW5jZUVycm9yV2l0aERvY3VtZW50KGUsIGRvY3VtZW50KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKF9hKSB7XG4gICAgdmFyIHJlc3VsdCA9IF9hLnJlc3VsdCwgZGF0YUlkID0gX2EuZGF0YUlkLCBzZWxlY3Rpb25TZXQgPSBfYS5zZWxlY3Rpb25TZXQsIGNvbnRleHQgPSBfYS5jb250ZXh0O1xuICAgIHZhciB2YXJpYWJsZXMgPSBjb250ZXh0LnZhcmlhYmxlcywgc3RvcmUgPSBjb250ZXh0LnN0b3JlLCBkYXRhSWRGcm9tT2JqZWN0ID0gY29udGV4dC5kYXRhSWRGcm9tT2JqZWN0LCBmcmFnbWVudE1hcCA9IGNvbnRleHQuZnJhZ21lbnRNYXA7XG4gICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBpbmNsdWRlZCA9IHNob3VsZEluY2x1ZGUoc2VsZWN0aW9uLCB2YXJpYWJsZXMpO1xuICAgICAgICBpZiAoaXNGaWVsZChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0RmllbGRLZXkgPSByZXN1bHRLZXlOYW1lRnJvbUZpZWxkKHNlbGVjdGlvbik7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHRbcmVzdWx0RmllbGRLZXldO1xuICAgICAgICAgICAgaWYgKGluY2x1ZGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVGaWVsZFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUlkOiBkYXRhSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Byb2R1Y3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk1pc3NpbmcgZmllbGQgXCIgKyByZXN1bHRGaWVsZEtleSArIFwiIGluIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKS5zdWJzdHJpbmcoMCwgMTAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IChmcmFnbWVudE1hcCB8fCB7fSlbc2VsZWN0aW9uLm5hbWUudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmICghZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJhZ21lbnQgbmFtZWQgXCIgKyBzZWxlY3Rpb24ubmFtZS52YWx1ZSArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbiAmJiBmcmFnbWVudC50eXBlQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkVmFsdWUgPSB7IHR5cGU6ICdpZCcsIGlkOiAnc2VsZicsIGdlbmVyYXRlZDogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICB2YXIgZmFrZUNvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlOiB7ICdzZWxmJzogcmVzdWx0IH0sXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaGFzTWlzc2luZ0ZpZWxkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmVzb2x2ZXJzOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBjb250ZXh0LmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uKGlkVmFsdWUsIGZyYWdtZW50LnR5cGVDb25kaXRpb24ubmFtZS52YWx1ZSwgZmFrZUNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChmYWtlQ29udGV4dC5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXQVJOSU5HOiBoZXVyaXN0aWMgZnJhZ21lbnQgbWF0Y2hpbmcgZ29pbmcgb24hJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluY2x1ZGVkICYmIG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmcmFnbWVudC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJZDogZGF0YUlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0b3JlO1xufVxuZnVuY3Rpb24gaXNHZW5lcmF0ZWRJZChpZCkge1xuICAgIHJldHVybiAoaWRbMF0gPT09ICckJyk7XG59XG5mdW5jdGlvbiBtZXJnZVdpdGhHZW5lcmF0ZWQoZ2VuZXJhdGVkS2V5LCByZWFsS2V5LCBjYWNoZSkge1xuICAgIHZhciBnZW5lcmF0ZWQgPSBjYWNoZVtnZW5lcmF0ZWRLZXldO1xuICAgIHZhciByZWFsID0gY2FjaGVbcmVhbEtleV07XG4gICAgT2JqZWN0LmtleXMoZ2VuZXJhdGVkKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2VuZXJhdGVkW2tleV07XG4gICAgICAgIHZhciByZWFsVmFsdWUgPSByZWFsW2tleV07XG4gICAgICAgIGlmIChpc0lkVmFsdWUodmFsdWUpXG4gICAgICAgICAgICAmJiBpc0dlbmVyYXRlZElkKHZhbHVlLmlkKVxuICAgICAgICAgICAgJiYgaXNJZFZhbHVlKHJlYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIG1lcmdlV2l0aEdlbmVyYXRlZCh2YWx1ZS5pZCwgcmVhbFZhbHVlLmlkLCBjYWNoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGNhY2hlW2dlbmVyYXRlZEtleV07XG4gICAgICAgIGNhY2hlW3JlYWxLZXldID0gX19hc3NpZ24oe30sIGdlbmVyYXRlZCwgcmVhbCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB3cml0ZUZpZWxkVG9TdG9yZShfYSkge1xuICAgIHZhciBmaWVsZCA9IF9hLmZpZWxkLCB2YWx1ZSA9IF9hLnZhbHVlLCBkYXRhSWQgPSBfYS5kYXRhSWQsIGNvbnRleHQgPSBfYS5jb250ZXh0O1xuICAgIHZhciB2YXJpYWJsZXMgPSBjb250ZXh0LnZhcmlhYmxlcywgZGF0YUlkRnJvbU9iamVjdCA9IGNvbnRleHQuZGF0YUlkRnJvbU9iamVjdCwgc3RvcmUgPSBjb250ZXh0LnN0b3JlLCBmcmFnbWVudE1hcCA9IGNvbnRleHQuZnJhZ21lbnRNYXA7XG4gICAgdmFyIHN0b3JlVmFsdWU7XG4gICAgdmFyIHN0b3JlRmllbGROYW1lID0gc3RvcmVLZXlOYW1lRnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpO1xuICAgIHZhciBzaG91bGRNZXJnZSA9IGZhbHNlO1xuICAgIHZhciBnZW5lcmF0ZWRLZXkgPSAnJztcbiAgICBpZiAoIWZpZWxkLnNlbGVjdGlvblNldCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICBzdG9yZVZhbHVlID1cbiAgICAgICAgICAgIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgID8geyB0eXBlOiAnanNvbicsIGpzb246IHZhbHVlIH1cbiAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YXIgZ2VuZXJhdGVkSWQgPSBkYXRhSWQgKyBcIi5cIiArIHN0b3JlRmllbGROYW1lO1xuICAgICAgICBzdG9yZVZhbHVlID0gcHJvY2Vzc0FycmF5VmFsdWUodmFsdWUsIGdlbmVyYXRlZElkLCBmaWVsZC5zZWxlY3Rpb25TZXQsIGNvbnRleHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHZhbHVlRGF0YUlkID0gZGF0YUlkICsgXCIuXCIgKyBzdG9yZUZpZWxkTmFtZTtcbiAgICAgICAgdmFyIGdlbmVyYXRlZCA9IHRydWU7XG4gICAgICAgIGlmICghaXNHZW5lcmF0ZWRJZCh2YWx1ZURhdGFJZCkpIHtcbiAgICAgICAgICAgIHZhbHVlRGF0YUlkID0gJyQnICsgdmFsdWVEYXRhSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFJZEZyb21PYmplY3QpIHtcbiAgICAgICAgICAgIHZhciBzZW1hbnRpY0lkID0gZGF0YUlkRnJvbU9iamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoc2VtYW50aWNJZCAmJiBpc0dlbmVyYXRlZElkKHNlbWFudGljSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJRHMgcmV0dXJuZWQgYnkgZGF0YUlkRnJvbU9iamVjdCBjYW5ub3QgYmVnaW4gd2l0aCB0aGUgXCIkXCIgY2hhcmFjdGVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbWFudGljSWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZURhdGFJZCA9IHNlbWFudGljSWQ7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgICAgIGRhdGFJZDogdmFsdWVEYXRhSWQsXG4gICAgICAgICAgICByZXN1bHQ6IHZhbHVlLFxuICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmaWVsZC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICB9KTtcbiAgICAgICAgc3RvcmVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdpZCcsXG4gICAgICAgICAgICBpZDogdmFsdWVEYXRhSWQsXG4gICAgICAgICAgICBnZW5lcmF0ZWQ6IGdlbmVyYXRlZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHN0b3JlW2RhdGFJZF0gJiYgc3RvcmVbZGF0YUlkXVtzdG9yZUZpZWxkTmFtZV0gIT09IHN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlc2NhcGVkSWQgPSBzdG9yZVtkYXRhSWRdW3N0b3JlRmllbGROYW1lXTtcbiAgICAgICAgICAgIGlmIChpc0lkVmFsdWUoc3RvcmVWYWx1ZSkgJiYgc3RvcmVWYWx1ZS5nZW5lcmF0ZWRcbiAgICAgICAgICAgICAgICAmJiBpc0lkVmFsdWUoZXNjYXBlZElkKSAmJiAhZXNjYXBlZElkLmdlbmVyYXRlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN0b3JlIGVycm9yOiB0aGUgYXBwbGljYXRpb24gYXR0ZW1wdGVkIHRvIHdyaXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3ZpZGVkIGlkXCIgK1xuICAgICAgICAgICAgICAgICAgICAoXCIgYnV0IHRoZSBzdG9yZSBhbHJlYWR5IGNvbnRhaW5zIGFuIGlkIG9mIFwiICsgZXNjYXBlZElkLmlkICsgXCIgZm9yIHRoaXMgb2JqZWN0LlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNJZFZhbHVlKGVzY2FwZWRJZCkgJiYgZXNjYXBlZElkLmdlbmVyYXRlZCkge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlZEtleSA9IGVzY2FwZWRJZC5pZDtcbiAgICAgICAgICAgICAgICBzaG91bGRNZXJnZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG5ld1N0b3JlT2JqID0gX19hc3NpZ24oe30sIHN0b3JlW2RhdGFJZF0sIChfYiA9IHt9LCBfYltzdG9yZUZpZWxkTmFtZV0gPSBzdG9yZVZhbHVlLCBfYikpO1xuICAgIGlmIChzaG91bGRNZXJnZSkge1xuICAgICAgICBtZXJnZVdpdGhHZW5lcmF0ZWQoZ2VuZXJhdGVkS2V5LCBzdG9yZVZhbHVlLmlkLCBzdG9yZSk7XG4gICAgfVxuICAgIGlmICghc3RvcmVbZGF0YUlkXSB8fCBzdG9yZVZhbHVlICE9PSBzdG9yZVtkYXRhSWRdW3N0b3JlRmllbGROYW1lXSkge1xuICAgICAgICBzdG9yZVtkYXRhSWRdID0gbmV3U3RvcmVPYmo7XG4gICAgfVxuICAgIHZhciBfYjtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NBcnJheVZhbHVlKHZhbHVlLCBnZW5lcmF0ZWRJZCwgc2VsZWN0aW9uU2V0LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpdGVtRGF0YUlkID0gZ2VuZXJhdGVkSWQgKyBcIi5cIiArIGluZGV4O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NBcnJheVZhbHVlKGl0ZW0sIGl0ZW1EYXRhSWQsIHNlbGVjdGlvblNldCwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdlbmVyYXRlZCA9IHRydWU7XG4gICAgICAgIGlmIChjb250ZXh0LmRhdGFJZEZyb21PYmplY3QpIHtcbiAgICAgICAgICAgIHZhciBzZW1hbnRpY0lkID0gY29udGV4dC5kYXRhSWRGcm9tT2JqZWN0KGl0ZW0pO1xuICAgICAgICAgICAgaWYgKHNlbWFudGljSWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtRGF0YUlkID0gc2VtYW50aWNJZDtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgZGF0YUlkOiBpdGVtRGF0YUlkLFxuICAgICAgICAgICAgcmVzdWx0OiBpdGVtLFxuICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBzZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGlkU3RvcmVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdpZCcsXG4gICAgICAgICAgICBpZDogaXRlbURhdGFJZCxcbiAgICAgICAgICAgIGdlbmVyYXRlZDogZ2VuZXJhdGVkLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaWRTdG9yZVZhbHVlO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d3JpdGVUb1N0b3JlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS93cml0ZVRvU3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IGlzTXV0YXRpb25Jbml0QWN0aW9uLCBpc011dGF0aW9uUmVzdWx0QWN0aW9uLCBpc011dGF0aW9uRXJyb3JBY3Rpb24sIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBkYXRhLCB9IGZyb20gJy4uL2RhdGEvc3RvcmUnO1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi4vdXRpbC9hc3NpZ24nO1xudmFyIG9wdGltaXN0aWNEZWZhdWx0U3RhdGUgPSBbXTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKHN0b3JlKSB7XG4gICAgaWYgKHN0b3JlLm9wdGltaXN0aWMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdG9yZS5kYXRhO1xuICAgIH1cbiAgICB2YXIgcGF0Y2hlcyA9IHN0b3JlLm9wdGltaXN0aWMubWFwKGZ1bmN0aW9uIChvcHQpIHsgcmV0dXJuIG9wdC5kYXRhOyB9KTtcbiAgICByZXR1cm4gYXNzaWduLmFwcGx5KHZvaWQgMCwgW3t9LCBzdG9yZS5kYXRhXS5jb25jYXQocGF0Y2hlcykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9wdGltaXN0aWMocHJldmlvdXNTdGF0ZSwgYWN0aW9uLCBzdG9yZSwgY29uZmlnKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0gb3B0aW1pc3RpY0RlZmF1bHRTdGF0ZTsgfVxuICAgIGlmIChpc011dGF0aW9uSW5pdEFjdGlvbihhY3Rpb24pICYmIGFjdGlvbi5vcHRpbWlzdGljUmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIG9wdGltaXN0aWNSZXNwb25zZSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24ub3B0aW1pc3RpY1Jlc3BvbnNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvcHRpbWlzdGljUmVzcG9uc2UgPSBhY3Rpb24ub3B0aW1pc3RpY1Jlc3BvbnNlKGFjdGlvbi52YXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0aW1pc3RpY1Jlc3BvbnNlID0gYWN0aW9uLm9wdGltaXN0aWNSZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmFrZU11dGF0aW9uUmVzdWx0QWN0aW9uID0ge1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19NVVRBVElPTl9SRVNVTFQnLFxuICAgICAgICAgICAgcmVzdWx0OiB7IGRhdGE6IG9wdGltaXN0aWNSZXNwb25zZSB9LFxuICAgICAgICAgICAgZG9jdW1lbnQ6IGFjdGlvbi5tdXRhdGlvbixcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGFjdGlvbi5vcGVyYXRpb25OYW1lLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgbXV0YXRpb25JZDogYWN0aW9uLm11dGF0aW9uSWQsXG4gICAgICAgICAgICBleHRyYVJlZHVjZXJzOiBhY3Rpb24uZXh0cmFSZWR1Y2VycyxcbiAgICAgICAgICAgIHVwZGF0ZVF1ZXJpZXM6IGFjdGlvbi51cGRhdGVRdWVyaWVzLFxuICAgICAgICAgICAgdXBkYXRlOiBhY3Rpb24udXBkYXRlLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgb3B0aW1pc3RpY0RhdGEgPSBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKF9fYXNzaWduKHt9LCBzdG9yZSwgeyBvcHRpbWlzdGljOiBwcmV2aW91c1N0YXRlIH0pKTtcbiAgICAgICAgdmFyIHBhdGNoID0gZ2V0T3B0aW1pc3RpY0RhdGFQYXRjaChvcHRpbWlzdGljRGF0YSwgZmFrZU11dGF0aW9uUmVzdWx0QWN0aW9uLCBzdG9yZS5xdWVyaWVzLCBzdG9yZS5tdXRhdGlvbnMsIGNvbmZpZyk7XG4gICAgICAgIHZhciBvcHRpbWlzdGljU3RhdGUgPSB7XG4gICAgICAgICAgICBhY3Rpb246IGZha2VNdXRhdGlvblJlc3VsdEFjdGlvbixcbiAgICAgICAgICAgIGRhdGE6IHBhdGNoLFxuICAgICAgICAgICAgbXV0YXRpb25JZDogYWN0aW9uLm11dGF0aW9uSWQsXG4gICAgICAgIH07XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IHByZXZpb3VzU3RhdGUuY29uY2F0KFtvcHRpbWlzdGljU3RhdGVdKTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmICgoaXNNdXRhdGlvbkVycm9yQWN0aW9uKGFjdGlvbikgfHwgaXNNdXRhdGlvblJlc3VsdEFjdGlvbihhY3Rpb24pKVxuICAgICAgICAmJiBwcmV2aW91c1N0YXRlLnNvbWUoZnVuY3Rpb24gKGNoYW5nZSkgeyByZXR1cm4gY2hhbmdlLm11dGF0aW9uSWQgPT09IGFjdGlvbi5tdXRhdGlvbklkOyB9KSkge1xuICAgICAgICByZXR1cm4gcm9sbGJhY2tPcHRpbWlzdGljRGF0YShmdW5jdGlvbiAoY2hhbmdlKSB7IHJldHVybiBjaGFuZ2UubXV0YXRpb25JZCA9PT0gYWN0aW9uLm11dGF0aW9uSWQ7IH0sIHByZXZpb3VzU3RhdGUsIHN0b3JlLCBjb25maWcpO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbn1cbmZ1bmN0aW9uIGdldE9wdGltaXN0aWNEYXRhUGF0Y2gocHJldmlvdXNEYXRhLCBvcHRpbWlzdGljQWN0aW9uLCBxdWVyaWVzLCBtdXRhdGlvbnMsIGNvbmZpZykge1xuICAgIHZhciBvcHRpbWlzdGljRGF0YSA9IGRhdGEocHJldmlvdXNEYXRhLCBvcHRpbWlzdGljQWN0aW9uLCBxdWVyaWVzLCBtdXRhdGlvbnMsIGNvbmZpZyk7XG4gICAgdmFyIHBhdGNoID0ge307XG4gICAgT2JqZWN0LmtleXMob3B0aW1pc3RpY0RhdGEpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAob3B0aW1pc3RpY0RhdGFba2V5XSAhPT0gcHJldmlvdXNEYXRhW2tleV0pIHtcbiAgICAgICAgICAgIHBhdGNoW2tleV0gPSBvcHRpbWlzdGljRGF0YVtrZXldO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGNoO1xufVxuZnVuY3Rpb24gcm9sbGJhY2tPcHRpbWlzdGljRGF0YShmaWx0ZXJGbiwgcHJldmlvdXNTdGF0ZSwgc3RvcmUsIGNvbmZpZykge1xuICAgIGlmIChwcmV2aW91c1N0YXRlID09PSB2b2lkIDApIHsgcHJldmlvdXNTdGF0ZSA9IG9wdGltaXN0aWNEZWZhdWx0U3RhdGU7IH1cbiAgICB2YXIgb3B0aW1pc3RpY0RhdGEgPSBhc3NpZ24oe30sIHN0b3JlLmRhdGEpO1xuICAgIHZhciBuZXdTdGF0ZSA9IHByZXZpb3VzU3RhdGVcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gIWZpbHRlckZuKGl0ZW0pOyB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgdmFyIHBhdGNoID0gZ2V0T3B0aW1pc3RpY0RhdGFQYXRjaChvcHRpbWlzdGljRGF0YSwgY2hhbmdlLmFjdGlvbiwgc3RvcmUucXVlcmllcywgc3RvcmUubXV0YXRpb25zLCBjb25maWcpO1xuICAgICAgICBhc3NpZ24ob3B0aW1pc3RpY0RhdGEsIHBhdGNoKTtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgZGF0YTogcGF0Y2ggfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1N0YXRlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9vcHRpbWlzdGljLWRhdGEvc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJleHBvcnQgZnVuY3Rpb24gaXNFcXVhbChhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChhICE9IG51bGwgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIGIgIT0gbnVsbCAmJiB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgICAgIGlmIChhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXNFcXVhbChhW2tleV0sIGJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKCFhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRXF1YWwuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC91dGlsL2lzRXF1YWwuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCBncmFwaHFsQW55d2hlcmUgZnJvbSAnZ3JhcGhxbC1hbnl3aGVyZSc7XG5pbXBvcnQgeyBpc0pzb25WYWx1ZSwgaXNJZFZhbHVlLCB9IGZyb20gJy4vc3RvcmVVdGlscyc7XG5pbXBvcnQgeyBnZXRTdG9yZUtleU5hbWUsIH0gZnJvbSAnLi9zdG9yZVV0aWxzJztcbmltcG9ydCB7IGdldERlZmF1bHRWYWx1ZXMsIGdldFF1ZXJ5RGVmaW5pdGlvbiwgfSBmcm9tICcuLi9xdWVyaWVzL2dldEZyb21BU1QnO1xuaW1wb3J0IHsgaXNFcXVhbCwgfSBmcm9tICcuLi91dGlsL2lzRXF1YWwnO1xuaW1wb3J0IHsgYXNzaWduLCB9IGZyb20gJy4uL3V0aWwvYXNzaWduJztcbmV4cG9ydCB2YXIgSURfS0VZID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ2lkJykgOiAnQEBpZCc7XG5leHBvcnQgZnVuY3Rpb24gcmVhZFF1ZXJ5RnJvbVN0b3JlKG9wdGlvbnMpIHtcbiAgICB2YXIgb3B0c1BhdGNoID0geyByZXR1cm5QYXJ0aWFsRGF0YTogZmFsc2UgfTtcbiAgICByZXR1cm4gZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKF9fYXNzaWduKHt9LCBvcHRpb25zLCBvcHRzUGF0Y2gpKS5yZXN1bHQ7XG59XG52YXIgcmVhZFN0b3JlUmVzb2x2ZXIgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBpZFZhbHVlLCBhcmdzLCBjb250ZXh0LCBfYSkge1xuICAgIHZhciByZXN1bHRLZXkgPSBfYS5yZXN1bHRLZXksIGRpcmVjdGl2ZXMgPSBfYS5kaXJlY3RpdmVzO1xuICAgIGFzc2VydElkVmFsdWUoaWRWYWx1ZSk7XG4gICAgdmFyIG9iaklkID0gaWRWYWx1ZS5pZDtcbiAgICB2YXIgb2JqID0gY29udGV4dC5zdG9yZVtvYmpJZF07XG4gICAgdmFyIHN0b3JlS2V5TmFtZSA9IGdldFN0b3JlS2V5TmFtZShmaWVsZE5hbWUsIGFyZ3MsIGRpcmVjdGl2ZXMpO1xuICAgIHZhciBmaWVsZFZhbHVlID0gKG9iaiB8fCB7fSlbc3RvcmVLZXlOYW1lXTtcbiAgICBpZiAodHlwZW9mIGZpZWxkVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChjb250ZXh0LmN1c3RvbVJlc29sdmVycyAmJiBvYmogJiYgKG9iai5fX3R5cGVuYW1lIHx8IG9iaklkID09PSAnUk9PVF9RVUVSWScpKSB7XG4gICAgICAgICAgICB2YXIgdHlwZW5hbWUgPSBvYmouX190eXBlbmFtZSB8fCAnUXVlcnknO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBjb250ZXh0LmN1c3RvbVJlc29sdmVyc1t0eXBlbmFtZV07XG4gICAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXNvbHZlciA9IHR5cGVbZmllbGROYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVyKG9iaiwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29udGV4dC5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZmluZCBmaWVsZCBcIiArIHN0b3JlS2V5TmFtZSArIFwiIG9uIG9iamVjdCAoXCIgKyBvYmpJZCArIFwiKSBcIiArIEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgMikgKyBcIi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5oYXNNaXNzaW5nRmllbGQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGlzSnNvblZhbHVlKGZpZWxkVmFsdWUpKSB7XG4gICAgICAgIGlmIChpZFZhbHVlLnByZXZpb3VzUmVzdWx0ICYmIGlzRXF1YWwoaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdFtyZXN1bHRLZXldLCBmaWVsZFZhbHVlLmpzb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdFtyZXN1bHRLZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlLmpzb247XG4gICAgfVxuICAgIGlmIChpZFZhbHVlLnByZXZpb3VzUmVzdWx0KSB7XG4gICAgICAgIGZpZWxkVmFsdWUgPSBhZGRQcmV2aW91c1Jlc3VsdFRvSWRWYWx1ZXMoZmllbGRWYWx1ZSwgaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdFtyZXN1bHRLZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkVmFsdWU7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZRdWVyeUFnYWluc3RTdG9yZShfYSkge1xuICAgIHZhciBzdG9yZSA9IF9hLnN0b3JlLCBxdWVyeSA9IF9hLnF1ZXJ5LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIHByZXZpb3VzUmVzdWx0ID0gX2EucHJldmlvdXNSZXN1bHQsIF9iID0gX2EucmV0dXJuUGFydGlhbERhdGEsIHJldHVyblBhcnRpYWxEYXRhID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgX2MgPSBfYS5yb290SWQsIHJvb3RJZCA9IF9jID09PSB2b2lkIDAgPyAnUk9PVF9RVUVSWScgOiBfYywgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gPSBfYS5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbiwgY29uZmlnID0gX2EuY29uZmlnO1xuICAgIHZhciBxdWVyeURlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ocXVlcnkpO1xuICAgIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhxdWVyeURlZmluaXRpb24pLCB2YXJpYWJsZXMpO1xuICAgIHZhciBjb250ZXh0ID0ge1xuICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiByZXR1cm5QYXJ0aWFsRGF0YSxcbiAgICAgICAgY3VzdG9tUmVzb2x2ZXJzOiAoY29uZmlnICYmIGNvbmZpZy5jdXN0b21SZXNvbHZlcnMpIHx8IHt9LFxuICAgICAgICBoYXNNaXNzaW5nRmllbGQ6IGZhbHNlLFxuICAgIH07XG4gICAgdmFyIHJvb3RJZFZhbHVlID0ge1xuICAgICAgICB0eXBlOiAnaWQnLFxuICAgICAgICBpZDogcm9vdElkLFxuICAgICAgICBwcmV2aW91c1Jlc3VsdDogcHJldmlvdXNSZXN1bHQsXG4gICAgfTtcbiAgICB2YXIgcmVzdWx0ID0gZ3JhcGhxbEFueXdoZXJlKHJlYWRTdG9yZVJlc29sdmVyLCBxdWVyeSwgcm9vdElkVmFsdWUsIGNvbnRleHQsIHZhcmlhYmxlcywge1xuICAgICAgICBmcmFnbWVudE1hdGNoZXI6IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICByZXN1bHRNYXBwZXI6IHJlc3VsdE1hcHBlcixcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgaXNNaXNzaW5nOiBjb250ZXh0Lmhhc01pc3NpbmdGaWVsZCxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydElkVmFsdWUoaWRWYWx1ZSkge1xuICAgIGlmICghaXNJZFZhbHVlKGlkVmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVuY291bnRlcmVkIGEgc3ViLXNlbGVjdGlvbiBvbiB0aGUgcXVlcnksIGJ1dCB0aGUgc3RvcmUgZG9lc24ndCBoYXZlIGFuIG9iamVjdCByZWZlcmVuY2UuIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbiBkdXJpbmcgbm9ybWFsIHVzZSB1bmxlc3MgeW91IGhhdmUgY3VzdG9tIGNvZGUgdGhhdCBpcyBkaXJlY3RseSBtYW5pcHVsYXRpbmcgdGhlIHN0b3JlOyBwbGVhc2UgZmlsZSBhbiBpc3N1ZS5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkUHJldmlvdXNSZXN1bHRUb0lkVmFsdWVzKHZhbHVlLCBwcmV2aW91c1Jlc3VsdCkge1xuICAgIGlmIChpc0lkVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbih7fSwgdmFsdWUsIHsgcHJldmlvdXNSZXN1bHQ6IHByZXZpb3VzUmVzdWx0IH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YXIgaWRUb1ByZXZpb3VzUmVzdWx0XzEgPSB7fTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldmlvdXNSZXN1bHQpKSB7XG4gICAgICAgICAgICBwcmV2aW91c1Jlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbVtJRF9LRVldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkVG9QcmV2aW91c1Jlc3VsdF8xW2l0ZW1bSURfS0VZXV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtUHJldmlvdXNSZXN1bHQgPSBwcmV2aW91c1Jlc3VsdCAmJiBwcmV2aW91c1Jlc3VsdFtpXTtcbiAgICAgICAgICAgIGlmIChpc0lkVmFsdWUoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtUHJldmlvdXNSZXN1bHQgPSBpZFRvUHJldmlvdXNSZXN1bHRfMVtpdGVtLmlkXSB8fCBpdGVtUHJldmlvdXNSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWRkUHJldmlvdXNSZXN1bHRUb0lkVmFsdWVzKGl0ZW0sIGl0ZW1QcmV2aW91c1Jlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiByZXN1bHRNYXBwZXIocmVzdWx0RmllbGRzLCBpZFZhbHVlKSB7XG4gICAgaWYgKGlkVmFsdWUucHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRSZXN1bHRLZXlzXzEgPSBPYmplY3Qua2V5cyhyZXN1bHRGaWVsZHMpO1xuICAgICAgICB2YXIgc2FtZUFzUHJldmlvdXNSZXN1bHQgPSBPYmplY3Qua2V5cyhpZFZhbHVlLnByZXZpb3VzUmVzdWx0KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoc2FtZUtleXMsIGtleSkgeyByZXR1cm4gc2FtZUtleXMgJiYgY3VycmVudFJlc3VsdEtleXNfMS5pbmRleE9mKGtleSkgPiAtMTsgfSwgdHJ1ZSkgJiZcbiAgICAgICAgICAgIGN1cnJlbnRSZXN1bHRLZXlzXzEucmVkdWNlKGZ1bmN0aW9uIChzYW1lLCBrZXkpIHsgcmV0dXJuIChzYW1lICYmIGFyZU5lc3RlZEFycmF5SXRlbXNTdHJpY3RseUVxdWFsKHJlc3VsdEZpZWxkc1trZXldLCBpZFZhbHVlLnByZXZpb3VzUmVzdWx0W2tleV0pKTsgfSwgdHJ1ZSk7XG4gICAgICAgIGlmIChzYW1lQXNQcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkVmFsdWUucHJldmlvdXNSZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdEZpZWxkcywgSURfS0VZLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBpZFZhbHVlLmlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRGaWVsZHM7XG59XG5mdW5jdGlvbiBhcmVOZXN0ZWRBcnJheUl0ZW1zU3RyaWN0bHlFcXVhbChhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShhKSB8fCAhQXJyYXkuaXNBcnJheShiKSB8fCBhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gYS5yZWR1Y2UoZnVuY3Rpb24gKHNhbWUsIGl0ZW0sIGkpIHsgcmV0dXJuIHNhbWUgJiYgYXJlTmVzdGVkQXJyYXlJdGVtc1N0cmljdGx5RXF1YWwoaXRlbSwgYltpXSk7IH0sIHRydWUpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhZEZyb21TdG9yZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2RhdGEvcmVhZEZyb21TdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50LCBnZXRPcGVyYXRpb25OYW1lIH0gZnJvbSAnLi4vcXVlcmllcy9nZXRGcm9tQVNUJztcbmltcG9ydCB7IGdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMgfSBmcm9tICcuLi9vcHRpbWlzdGljLWRhdGEvc3RvcmUnO1xuaW1wb3J0IHsgcmVhZFF1ZXJ5RnJvbVN0b3JlIH0gZnJvbSAnLi9yZWFkRnJvbVN0b3JlJztcbmltcG9ydCB7IHdyaXRlUmVzdWx0VG9TdG9yZSB9IGZyb20gJy4vd3JpdGVUb1N0b3JlJztcbmltcG9ydCB7IGFkZFR5cGVuYW1lVG9Eb2N1bWVudCB9IGZyb20gJy4uL3F1ZXJpZXMvcXVlcnlUcmFuc2Zvcm0nO1xudmFyIFJlZHV4RGF0YVByb3h5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWR1eERhdGFQcm94eShzdG9yZSwgcmVkdXhSb290U2VsZWN0b3IsIGZyYWdtZW50TWF0Y2hlciwgcmVkdWNlckNvbmZpZykge1xuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgICAgIHRoaXMucmVkdXhSb290U2VsZWN0b3IgPSByZWR1eFJvb3RTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5yZWR1Y2VyQ29uZmlnID0gcmVkdWNlckNvbmZpZztcbiAgICAgICAgdGhpcy5mcmFnbWVudE1hdGNoZXIgPSBmcmFnbWVudE1hdGNoZXI7XG4gICAgfVxuICAgIFJlZHV4RGF0YVByb3h5LnByb3RvdHlwZS5yZWFkUXVlcnkgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gX2EucXVlcnksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgaWYgKHRoaXMucmVkdWNlckNvbmZpZy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgcm9vdElkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgICAgICBzdG9yZTogZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cyh0aGlzLnJlZHV4Um9vdFNlbGVjdG9yKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKSkpLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5mcmFnbWVudE1hdGNoZXIubWF0Y2gsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWR1eERhdGFQcm94eS5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBpZCA9IF9hLmlkLCBmcmFnbWVudCA9IF9hLmZyYWdtZW50LCBmcmFnbWVudE5hbWUgPSBfYS5mcmFnbWVudE5hbWUsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdmFyIHF1ZXJ5ID0gZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KGZyYWdtZW50LCBmcmFnbWVudE5hbWUpO1xuICAgICAgICB2YXIgZGF0YSA9IGdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHModGhpcy5yZWR1eFJvb3RTZWxlY3Rvcih0aGlzLnN0b3JlLmdldFN0YXRlKCkpKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2lkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFF1ZXJ5RnJvbVN0b3JlKHtcbiAgICAgICAgICAgIHJvb3RJZDogaWQsXG4gICAgICAgICAgICBzdG9yZTogZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVkdXhEYXRhUHJveHkucHJvdG90eXBlLndyaXRlUXVlcnkgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBfYS5kYXRhLCBxdWVyeSA9IF9hLnF1ZXJ5LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fV1JJVEUnLFxuICAgICAgICAgICAgd3JpdGVzOiBbe1xuICAgICAgICAgICAgICAgICAgICByb290SWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUocXVlcnkpLFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyB8fCB7fSxcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWR1eERhdGFQcm94eS5wcm90b3R5cGUud3JpdGVGcmFnbWVudCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZGF0YSA9IF9hLmRhdGEsIGlkID0gX2EuaWQsIGZyYWdtZW50ID0gX2EuZnJhZ21lbnQsIGZyYWdtZW50TmFtZSA9IF9hLmZyYWdtZW50TmFtZSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB2YXIgZG9jdW1lbnQgPSBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQoZnJhZ21lbnQsIGZyYWdtZW50TmFtZSk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KGRvY3VtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fV1JJVEUnLFxuICAgICAgICAgICAgd3JpdGVzOiBbe1xuICAgICAgICAgICAgICAgICAgICByb290SWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShkb2N1bWVudCksXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBSZWR1eERhdGFQcm94eTtcbn0oKSk7XG5leHBvcnQgeyBSZWR1eERhdGFQcm94eSB9O1xudmFyIFRyYW5zYWN0aW9uRGF0YVByb3h5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmFuc2FjdGlvbkRhdGFQcm94eShkYXRhLCByZWR1Y2VyQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IF9fYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgdGhpcy5yZWR1Y2VyQ29uZmlnID0gcmVkdWNlckNvbmZpZztcbiAgICAgICAgdGhpcy53cml0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkID0gZmFsc2U7XG4gICAgfVxuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RmluaXNoZWQoKTtcbiAgICAgICAgdmFyIHdyaXRlcyA9IHRoaXMud3JpdGVzO1xuICAgICAgICB0aGlzLndyaXRlcyA9IFtdO1xuICAgICAgICB0aGlzLmlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gd3JpdGVzO1xuICAgIH07XG4gICAgVHJhbnNhY3Rpb25EYXRhUHJveHkucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB0aGlzLmFzc2VydE5vdEZpbmlzaGVkKCk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFF1ZXJ5RnJvbVN0b3JlKHtcbiAgICAgICAgICAgIHJvb3RJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgc3RvcmU6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5yZWR1Y2VyQ29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBpZCA9IF9hLmlkLCBmcmFnbWVudCA9IF9hLmZyYWdtZW50LCBmcmFnbWVudE5hbWUgPSBfYS5mcmFnbWVudE5hbWUsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdGhpcy5hc3NlcnROb3RGaW5pc2hlZCgpO1xuICAgICAgICBpZiAoIWZyYWdtZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZyYWdtZW50IG9wdGlvbiBpcyByZXF1aXJlZC4gUGxlYXNlIHBhc3MgYSBHcmFwaFFMIGZyYWdtZW50IHRvIHJlYWRGcmFnbWVudC4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KGZyYWdtZW50LCBmcmFnbWVudE5hbWUpO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2lkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgcm9vdElkOiBpZCxcbiAgICAgICAgICAgIHN0b3JlOiBkYXRhLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLnJlZHVjZXJDb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBkYXRhID0gX2EuZGF0YSwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB0aGlzLmFzc2VydE5vdEZpbmlzaGVkKCk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGx5V3JpdGUoe1xuICAgICAgICAgICAgcm9vdElkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgICAgICByZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICBkb2N1bWVudDogcXVlcnksXG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKHF1ZXJ5KSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS53cml0ZUZyYWdtZW50ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBkYXRhID0gX2EuZGF0YSwgaWQgPSBfYS5pZCwgZnJhZ21lbnQgPSBfYS5mcmFnbWVudCwgZnJhZ21lbnROYW1lID0gX2EuZnJhZ21lbnROYW1lLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RmluaXNoZWQoKTtcbiAgICAgICAgaWYgKCFmcmFnbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmcmFnbWVudCBvcHRpb24gaXMgcmVxdWlyZWQuIFBsZWFzZSBwYXNzIGEgR3JhcGhRTCBmcmFnbWVudCB0byB3cml0ZUZyYWdtZW50LicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBxdWVyeSA9IGdldEZyYWdtZW50UXVlcnlEb2N1bWVudChmcmFnbWVudCwgZnJhZ21lbnROYW1lKTtcbiAgICAgICAgaWYgKHRoaXMucmVkdWNlckNvbmZpZy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwbHlXcml0ZSh7XG4gICAgICAgICAgICByb290SWQ6IGlkLFxuICAgICAgICAgICAgcmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShxdWVyeSksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyB8fCB7fSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUuYXNzZXJ0Tm90RmluaXNoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgdHJhbnNhY3Rpb24gbWV0aG9kcyBhZnRlciB0aGUgdHJhbnNhY3Rpb24gaGFzIGZpbmlzaGVkLicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUuYXBwbHlXcml0ZSA9IGZ1bmN0aW9uICh3cml0ZSkge1xuICAgICAgICB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgcmVzdWx0OiB3cml0ZS5yZXN1bHQsXG4gICAgICAgICAgICBkYXRhSWQ6IHdyaXRlLnJvb3RJZCxcbiAgICAgICAgICAgIGRvY3VtZW50OiB3cml0ZS5kb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogd3JpdGUudmFyaWFibGVzLFxuICAgICAgICAgICAgc3RvcmU6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IHRoaXMucmVkdWNlckNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0IHx8IChmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9KSxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLnJlZHVjZXJDb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy53cml0ZXMucHVzaCh3cml0ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gVHJhbnNhY3Rpb25EYXRhUHJveHk7XG59KCkpO1xuZXhwb3J0IHsgVHJhbnNhY3Rpb25EYXRhUHJveHkgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb3h5LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS9wcm94eS5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgd3JpdGVSZXN1bHRUb1N0b3JlLCB9IGZyb20gJy4vd3JpdGVUb1N0b3JlJztcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlUXVlcnlSZXN1bHRzKHN0YXRlLCBfYSwgY29uZmlnKSB7XG4gICAgdmFyIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgbmV3UmVzdWx0ID0gX2EubmV3UmVzdWx0O1xuICAgIHZhciBjbG9uZWRTdGF0ZSA9IF9fYXNzaWduKHt9LCBzdGF0ZSk7XG4gICAgcmV0dXJuIHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgIHJlc3VsdDogbmV3UmVzdWx0LFxuICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgc3RvcmU6IGNsb25lZFN0YXRlLFxuICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBsYWNlUXVlcnlSZXN1bHRzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS9yZXBsYWNlUXVlcnlSZXN1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwiZXhwb3J0IGZ1bmN0aW9uIHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvckhhbmRsaW5nLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvdXRpbC9lcnJvckhhbmRsaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBpc1F1ZXJ5UmVzdWx0QWN0aW9uLCBpc011dGF0aW9uUmVzdWx0QWN0aW9uLCBpc1VwZGF0ZVF1ZXJ5UmVzdWx0QWN0aW9uLCBpc1N0b3JlUmVzZXRBY3Rpb24sIGlzU3Vic2NyaXB0aW9uUmVzdWx0QWN0aW9uLCBpc1dyaXRlQWN0aW9uLCB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgd3JpdGVSZXN1bHRUb1N0b3JlLCB9IGZyb20gJy4vd3JpdGVUb1N0b3JlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uRGF0YVByb3h5LCB9IGZyb20gJy4uL2RhdGEvcHJveHknO1xuaW1wb3J0IHsgZ2V0T3BlcmF0aW9uTmFtZSwgfSBmcm9tICcuLi9xdWVyaWVzL2dldEZyb21BU1QnO1xuaW1wb3J0IHsgZ3JhcGhRTFJlc3VsdEhhc0Vycm9yLCB9IGZyb20gJy4vc3RvcmVVdGlscyc7XG5pbXBvcnQgeyByZXBsYWNlUXVlcnlSZXN1bHRzLCB9IGZyb20gJy4vcmVwbGFjZVF1ZXJ5UmVzdWx0cyc7XG5pbXBvcnQgeyBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUsIH0gZnJvbSAnLi9yZWFkRnJvbVN0b3JlJztcbmltcG9ydCB7IHRyeUZ1bmN0aW9uT3JMb2dFcnJvciwgfSBmcm9tICcuLi91dGlsL2Vycm9ySGFuZGxpbmcnO1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGEocHJldmlvdXNTdGF0ZSwgYWN0aW9uLCBxdWVyaWVzLCBtdXRhdGlvbnMsIGNvbmZpZykge1xuICAgIGlmIChwcmV2aW91c1N0YXRlID09PSB2b2lkIDApIHsgcHJldmlvdXNTdGF0ZSA9IHt9OyB9XG4gICAgdmFyIGNvbnN0QWN0aW9uID0gYWN0aW9uO1xuICAgIGlmIChpc1F1ZXJ5UmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgaWYgKCFxdWVyaWVzW2FjdGlvbi5xdWVyeUlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5yZXF1ZXN0SWQgPCBxdWVyaWVzW2FjdGlvbi5xdWVyeUlkXS5sYXN0UmVxdWVzdElkIHx8IGFjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWdyYXBoUUxSZXN1bHRIYXNFcnJvcihhY3Rpb24ucmVzdWx0KSkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5U3RvcmVWYWx1ZSA9IHF1ZXJpZXNbYWN0aW9uLnF1ZXJ5SWRdO1xuICAgICAgICAgICAgdmFyIGNsb25lZFN0YXRlID0gX19hc3NpZ24oe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgdmFyIG5ld1N0YXRlXzEgPSB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogYWN0aW9uLnJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBhY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeVN0b3JlVmFsdWUudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjbG9uZWRTdGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5leHRyYVJlZHVjZXJzKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4dHJhUmVkdWNlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVkdWNlcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZV8xID0gcmVkdWNlcihuZXdTdGF0ZV8xLCBjb25zdEFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVfMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1N1YnNjcmlwdGlvblJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIGlmICghZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKGFjdGlvbi5yZXN1bHQpKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVkU3RhdGUgPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgICAgICB2YXIgbmV3U3RhdGVfMiA9IHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBhY3Rpb24ucmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgZGF0YUlkOiAnUk9PVF9TVUJTQ1JJUFRJT04nLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBhY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjbG9uZWRTdGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5leHRyYVJlZHVjZXJzKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4dHJhUmVkdWNlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVkdWNlcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZV8yID0gcmVkdWNlcihuZXdTdGF0ZV8yLCBjb25zdEFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVfMjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc011dGF0aW9uUmVzdWx0QWN0aW9uKGNvbnN0QWN0aW9uKSkge1xuICAgICAgICBpZiAoIWNvbnN0QWN0aW9uLnJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSBtdXRhdGlvbnNbY29uc3RBY3Rpb24ubXV0YXRpb25JZF07XG4gICAgICAgICAgICB2YXIgY2xvbmVkU3RhdGUgPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgICAgICB2YXIgbmV3U3RhdGVfMyA9IHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBjb25zdEFjdGlvbi5yZXN1bHQuZGF0YSxcbiAgICAgICAgICAgICAgICBkYXRhSWQ6ICdST09UX01VVEFUSU9OJyxcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogY29uc3RBY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeVN0b3JlVmFsdWUudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjbG9uZWRTdGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHVwZGF0ZVF1ZXJpZXNfMSA9IGNvbnN0QWN0aW9uLnVwZGF0ZVF1ZXJpZXM7XG4gICAgICAgICAgICBpZiAodXBkYXRlUXVlcmllc18xKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModXBkYXRlUXVlcmllc18xKS5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IHF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmU6IHByZXZpb3VzU3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkuZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgfSksIGN1cnJlbnRRdWVyeVJlc3VsdCA9IF9hLnJlc3VsdCwgaXNNaXNzaW5nID0gX2EuaXNNaXNzaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNNaXNzaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZHVjZXIgPSB1cGRhdGVRdWVyaWVzXzFbcXVlcnlJZF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UXVlcnlSZXN1bHQgPSB0cnlGdW5jdGlvbk9yTG9nRXJyb3IoZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVkdWNlcihjdXJyZW50UXVlcnlSZXN1bHQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uUmVzdWx0OiBjb25zdEFjdGlvbi5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6IGdldE9wZXJhdGlvbk5hbWUocXVlcnkuZG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlWYXJpYWJsZXM6IHF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFF1ZXJ5UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZV8zID0gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IG5leHRRdWVyeVJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnkuZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmU6IG5ld1N0YXRlXzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogY29uZmlnLmRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnN0QWN0aW9uLnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVfMSA9IGNvbnN0QWN0aW9uLnVwZGF0ZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJveHlfMSA9IG5ldyBUcmFuc2FjdGlvbkRhdGFQcm94eShuZXdTdGF0ZV8zLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmdW5jdGlvbiAoKSB7IHJldHVybiB1cGRhdGVfMShwcm94eV8xLCBjb25zdEFjdGlvbi5yZXN1bHQpOyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgd3JpdGVzID0gcHJveHlfMS5maW5pc2goKTtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZV8zID0gZGF0YShuZXdTdGF0ZV8zLCB7IHR5cGU6ICdBUE9MTE9fV1JJVEUnLCB3cml0ZXM6IHdyaXRlcyB9LCBxdWVyaWVzLCBtdXRhdGlvbnMsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uc3RBY3Rpb24uZXh0cmFSZWR1Y2Vycykge1xuICAgICAgICAgICAgICAgIGNvbnN0QWN0aW9uLmV4dHJhUmVkdWNlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVkdWNlcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZV8zID0gcmVkdWNlcihuZXdTdGF0ZV8zLCBjb25zdEFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVfMztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1VwZGF0ZVF1ZXJ5UmVzdWx0QWN0aW9uKGNvbnN0QWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gcmVwbGFjZVF1ZXJ5UmVzdWx0cyhwcmV2aW91c1N0YXRlLCBjb25zdEFjdGlvbiwgY29uZmlnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdG9yZVJlc2V0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1dyaXRlQWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi53cml0ZXMucmVkdWNlKGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIHdyaXRlKSB7IHJldHVybiB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgcmVzdWx0OiB3cml0ZS5yZXN1bHQsXG4gICAgICAgICAgICBkYXRhSWQ6IHdyaXRlLnJvb3RJZCxcbiAgICAgICAgICAgIGRvY3VtZW50OiB3cml0ZS5kb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogd3JpdGUudmFyaWFibGVzLFxuICAgICAgICAgICAgc3RvcmU6IGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgIH0pOyB9LCBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS9zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsImV4cG9ydCB2YXIgTmV0d29ya1N0YXR1cztcbihmdW5jdGlvbiAoTmV0d29ya1N0YXR1cykge1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcImxvYWRpbmdcIl0gPSAxXSA9IFwibG9hZGluZ1wiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcInNldFZhcmlhYmxlc1wiXSA9IDJdID0gXCJzZXRWYXJpYWJsZXNcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJmZXRjaE1vcmVcIl0gPSAzXSA9IFwiZmV0Y2hNb3JlXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wicmVmZXRjaFwiXSA9IDRdID0gXCJyZWZldGNoXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wicG9sbFwiXSA9IDZdID0gXCJwb2xsXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wicmVhZHlcIl0gPSA3XSA9IFwicmVhZHlcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJlcnJvclwiXSA9IDhdID0gXCJlcnJvclwiO1xufSkoTmV0d29ya1N0YXR1cyB8fCAoTmV0d29ya1N0YXR1cyA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KG5ldHdvcmtTdGF0dXMpIHtcbiAgICByZXR1cm4gbmV0d29ya1N0YXR1cyA8IDc7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uZXR3b3JrU3RhdHVzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvcXVlcmllcy9uZXR3b3JrU3RhdHVzLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBpc1F1ZXJ5SW5pdEFjdGlvbiwgaXNRdWVyeVJlc3VsdEFjdGlvbiwgaXNRdWVyeUVycm9yQWN0aW9uLCBpc1F1ZXJ5UmVzdWx0Q2xpZW50QWN0aW9uLCBpc1F1ZXJ5U3RvcEFjdGlvbiwgaXNTdG9yZVJlc2V0QWN0aW9uLCB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZ3JhcGhRTFJlc3VsdEhhc0Vycm9yLCB9IGZyb20gJy4uL2RhdGEvc3RvcmVVdGlscyc7XG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnLi4vdXRpbC9pc0VxdWFsJztcbmltcG9ydCB7IE5ldHdvcmtTdGF0dXMgfSBmcm9tICcuL25ldHdvcmtTdGF0dXMnO1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJpZXMocHJldmlvdXNTdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0ge307IH1cbiAgICBpZiAoaXNRdWVyeUluaXRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIHZhciBwcmV2aW91c1F1ZXJ5ID0gcHJldmlvdXNTdGF0ZVthY3Rpb24ucXVlcnlJZF07XG4gICAgICAgIGlmIChwcmV2aW91c1F1ZXJ5ICYmIHByZXZpb3VzUXVlcnkucXVlcnlTdHJpbmcgIT09IGFjdGlvbi5xdWVyeVN0cmluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlcm5hbCBFcnJvcjogbWF5IG5vdCB1cGRhdGUgZXhpc3RpbmcgcXVlcnkgc3RyaW5nIGluIHN0b3JlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU2V0VmFyaWFibGVzID0gZmFsc2U7XG4gICAgICAgIHZhciBwcmV2aW91c1ZhcmlhYmxlcyA9IG51bGw7XG4gICAgICAgIGlmIChhY3Rpb24uc3RvcmVQcmV2aW91c1ZhcmlhYmxlcyAmJlxuICAgICAgICAgICAgcHJldmlvdXNRdWVyeSAmJlxuICAgICAgICAgICAgcHJldmlvdXNRdWVyeS5uZXR3b3JrU3RhdHVzICE9PSBOZXR3b3JrU3RhdHVzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIGlmICghaXNFcXVhbChwcmV2aW91c1F1ZXJ5LnZhcmlhYmxlcywgYWN0aW9uLnZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgICAgICBpc1NldFZhcmlhYmxlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNWYXJpYWJsZXMgPSBwcmV2aW91c1F1ZXJ5LnZhcmlhYmxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3TmV0d29ya1N0YXR1cyA9IE5ldHdvcmtTdGF0dXMubG9hZGluZztcbiAgICAgICAgaWYgKGlzU2V0VmFyaWFibGVzKSB7XG4gICAgICAgICAgICBuZXdOZXR3b3JrU3RhdHVzID0gTmV0d29ya1N0YXR1cy5zZXRWYXJpYWJsZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmlzUG9sbCkge1xuICAgICAgICAgICAgbmV3TmV0d29ya1N0YXR1cyA9IE5ldHdvcmtTdGF0dXMucG9sbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24uaXNSZWZldGNoKSB7XG4gICAgICAgICAgICBuZXdOZXR3b3JrU3RhdHVzID0gTmV0d29ya1N0YXR1cy5yZWZldGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbi5pc1BvbGwpIHtcbiAgICAgICAgICAgIG5ld05ldHdvcmtTdGF0dXMgPSBOZXR3b3JrU3RhdHVzLnBvbGw7XG4gICAgICAgIH1cbiAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnF1ZXJ5SWRdID0ge1xuICAgICAgICAgICAgcXVlcnlTdHJpbmc6IGFjdGlvbi5xdWVyeVN0cmluZyxcbiAgICAgICAgICAgIGRvY3VtZW50OiBhY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IGFjdGlvbi52YXJpYWJsZXMsXG4gICAgICAgICAgICBwcmV2aW91c1ZhcmlhYmxlczogcHJldmlvdXNWYXJpYWJsZXMsXG4gICAgICAgICAgICBuZXR3b3JrRXJyb3I6IG51bGwsXG4gICAgICAgICAgICBncmFwaFFMRXJyb3JzOiBbXSxcbiAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IG5ld05ldHdvcmtTdGF0dXMsXG4gICAgICAgICAgICBsYXN0UmVxdWVzdElkOiBhY3Rpb24ucmVxdWVzdElkLFxuICAgICAgICAgICAgbWV0YWRhdGE6IGFjdGlvbi5tZXRhZGF0YSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSwgeyBuZXR3b3JrU3RhdHVzOiBOZXR3b3JrU3RhdHVzLmZldGNoTW9yZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUXVlcnlSZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICBpZiAoIXByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLnJlcXVlc3RJZCA8IHByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdLmxhc3RSZXF1ZXN0SWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgdmFyIHJlc3VsdEhhc0dyYXBoUUxFcnJvcnMgPSBncmFwaFFMUmVzdWx0SGFzRXJyb3IoYWN0aW9uLnJlc3VsdCk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5xdWVyeUlkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSwgeyBuZXR3b3JrRXJyb3I6IG51bGwsIGdyYXBoUUxFcnJvcnM6IHJlc3VsdEhhc0dyYXBoUUxFcnJvcnMgPyBhY3Rpb24ucmVzdWx0LmVycm9ycyA6IFtdLCBwcmV2aW91c1ZhcmlhYmxlczogbnVsbCwgbmV0d29ya1N0YXR1czogTmV0d29ya1N0YXR1cy5yZWFkeSB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSwgeyBuZXR3b3JrU3RhdHVzOiBOZXR3b3JrU3RhdHVzLnJlYWR5IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNRdWVyeUVycm9yQWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgaWYgKCFwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5yZXF1ZXN0SWQgPCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXS5sYXN0UmVxdWVzdElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5xdWVyeUlkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSwgeyBuZXR3b3JrRXJyb3I6IGFjdGlvbi5lcnJvciwgbmV0d29ya1N0YXR1czogTmV0d29ya1N0YXR1cy5lcnJvciB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSwgeyBuZXR3b3JrRXJyb3I6IGFjdGlvbi5lcnJvciwgbmV0d29ya1N0YXR1czogTmV0d29ya1N0YXR1cy5lcnJvciB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUXVlcnlSZXN1bHRDbGllbnRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICBpZiAoIXByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5xdWVyeUlkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSwgeyBuZXR3b3JrRXJyb3I6IG51bGwsIHByZXZpb3VzVmFyaWFibGVzOiBudWxsLCBuZXR3b3JrU3RhdHVzOiBhY3Rpb24uY29tcGxldGUgPyBOZXR3b3JrU3RhdHVzLnJlYWR5IDogTmV0d29ya1N0YXR1cy5sb2FkaW5nIH0pO1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUXVlcnlTdG9wQWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24oe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBkZWxldGUgbmV3U3RhdGVbYWN0aW9uLnF1ZXJ5SWRdO1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RvcmVSZXNldEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiByZXNldFF1ZXJ5U3RhdGUocHJldmlvdXNTdGF0ZSwgYWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG59XG5mdW5jdGlvbiByZXNldFF1ZXJ5U3RhdGUoc3RhdGUsIGFjdGlvbikge1xuICAgIHZhciBvYnNlcnZhYmxlUXVlcnlJZHMgPSBhY3Rpb24ub2JzZXJ2YWJsZVF1ZXJ5SWRzO1xuICAgIHZhciBuZXdRdWVyaWVzID0gT2JqZWN0LmtleXMoc3RhdGUpLmZpbHRlcihmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICByZXR1cm4gKG9ic2VydmFibGVRdWVyeUlkcy5pbmRleE9mKHF1ZXJ5SWQpID4gLTEpO1xuICAgIH0pLnJlZHVjZShmdW5jdGlvbiAocmVzLCBrZXkpIHtcbiAgICAgICAgcmVzW2tleV0gPSBfX2Fzc2lnbih7fSwgc3RhdGVba2V5XSwgeyBuZXR3b3JrU3RhdHVzOiBOZXR3b3JrU3RhdHVzLmxvYWRpbmcgfSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBuZXdRdWVyaWVzO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9xdWVyaWVzL3N0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBpc011dGF0aW9uSW5pdEFjdGlvbiwgaXNNdXRhdGlvblJlc3VsdEFjdGlvbiwgaXNNdXRhdGlvbkVycm9yQWN0aW9uLCBpc1N0b3JlUmVzZXRBY3Rpb24sIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5leHBvcnQgZnVuY3Rpb24gbXV0YXRpb25zKHByZXZpb3VzU3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChwcmV2aW91c1N0YXRlID09PSB2b2lkIDApIHsgcHJldmlvdXNTdGF0ZSA9IHt9OyB9XG4gICAgaWYgKGlzTXV0YXRpb25Jbml0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24oe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ubXV0YXRpb25JZF0gPSB7XG4gICAgICAgICAgICBtdXRhdGlvblN0cmluZzogYWN0aW9uLm11dGF0aW9uU3RyaW5nLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSA9IF9fYXNzaWduKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSwgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IG51bGwgfSk7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNNdXRhdGlvbkVycm9yQWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24oe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ubXV0YXRpb25JZF0gPSBfX2Fzc2lnbih7fSwgcHJldmlvdXNTdGF0ZVthY3Rpb24ubXV0YXRpb25JZF0sIHsgbG9hZGluZzogZmFsc2UsIGVycm9yOiBhY3Rpb24uZXJyb3IgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RvcmVSZXNldEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L211dGF0aW9ucy9zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGNvbXBvc2UgYXMgcmVkdXhDb21wb3NlLCBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2VycywgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBkYXRhLCB9IGZyb20gJy4vZGF0YS9zdG9yZSc7XG5pbXBvcnQgeyBxdWVyaWVzLCB9IGZyb20gJy4vcXVlcmllcy9zdG9yZSc7XG5pbXBvcnQgeyBtdXRhdGlvbnMsIH0gZnJvbSAnLi9tdXRhdGlvbnMvc3RvcmUnO1xuaW1wb3J0IHsgb3B0aW1pc3RpYywgZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cywgfSBmcm9tICcuL29wdGltaXN0aWMtZGF0YS9zdG9yZSc7XG5leHBvcnQgeyBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzIH07XG5pbXBvcnQgeyBpc1F1ZXJ5UmVzdWx0QWN0aW9uLCBpc011dGF0aW9uUmVzdWx0QWN0aW9uLCBpc1N1YnNjcmlwdGlvblJlc3VsdEFjdGlvbiwgfSBmcm9tICcuL2FjdGlvbnMnO1xudmFyIGNyYXNoUmVwb3J0ZXIgPSBmdW5jdGlvbiAoc3RvcmUpIHsgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7IHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYXVnaHQgYW4gZXhjZXB0aW9uIScsIGVycik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbn07IH07IH07XG52YXIgY3JlYXRlUmVkdWNlckVycm9yID0gZnVuY3Rpb24gKGVycm9yLCBhY3Rpb24pIHtcbiAgICB2YXIgcmVkdWNlckVycm9yID0geyBlcnJvcjogZXJyb3IgfTtcbiAgICBpZiAoaXNRdWVyeVJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJlZHVjZXJFcnJvci5xdWVyeUlkID0gYWN0aW9uLnF1ZXJ5SWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3Vic2NyaXB0aW9uUmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmVkdWNlckVycm9yLnN1YnNjcmlwdGlvbklkID0gYWN0aW9uLnN1YnNjcmlwdGlvbklkO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc011dGF0aW9uUmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmVkdWNlckVycm9yLm11dGF0aW9uSWQgPSBhY3Rpb24ubXV0YXRpb25JZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlZHVjZXJFcnJvcjtcbn07XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBvbGxvUmVkdWNlcihjb25maWcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYXBvbGxvUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7IHN0YXRlID0ge307IH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBxdWVyaWVzOiBxdWVyaWVzKHN0YXRlLnF1ZXJpZXMsIGFjdGlvbiksXG4gICAgICAgICAgICAgICAgbXV0YXRpb25zOiBtdXRhdGlvbnMoc3RhdGUubXV0YXRpb25zLCBhY3Rpb24pLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEoc3RhdGUuZGF0YSwgYWN0aW9uLCBzdGF0ZS5xdWVyaWVzLCBzdGF0ZS5tdXRhdGlvbnMsIGNvbmZpZyksXG4gICAgICAgICAgICAgICAgb3B0aW1pc3RpYzogW10sXG4gICAgICAgICAgICAgICAgcmVkdWNlckVycm9yOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5ld1N0YXRlLm9wdGltaXN0aWMgPSBvcHRpbWlzdGljKHN0YXRlLm9wdGltaXN0aWMsIGFjdGlvbiwgbmV3U3RhdGUsIGNvbmZpZyk7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZGF0YSA9PT0gbmV3U3RhdGUuZGF0YSAmJlxuICAgICAgICAgICAgICAgIHN0YXRlLm11dGF0aW9ucyA9PT0gbmV3U3RhdGUubXV0YXRpb25zICYmXG4gICAgICAgICAgICAgICAgc3RhdGUucXVlcmllcyA9PT0gbmV3U3RhdGUucXVlcmllcyAmJlxuICAgICAgICAgICAgICAgIHN0YXRlLm9wdGltaXN0aWMgPT09IG5ld1N0YXRlLm9wdGltaXN0aWMgJiZcbiAgICAgICAgICAgICAgICBzdGF0ZS5yZWR1Y2VyRXJyb3IgPT09IG5ld1N0YXRlLnJlZHVjZXJFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAocmVkdWNlckVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oe30sIHN0YXRlLCB7IHJlZHVjZXJFcnJvcjogY3JlYXRlUmVkdWNlckVycm9yKHJlZHVjZXJFcnJvciwgYWN0aW9uKSB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBvbGxvU3RvcmUoX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi5yZWR1eFJvb3RLZXksIHJlZHV4Um9vdEtleSA9IF9jID09PSB2b2lkIDAgPyAnYXBvbGxvJyA6IF9jLCBpbml0aWFsU3RhdGUgPSBfYi5pbml0aWFsU3RhdGUsIF9kID0gX2IuY29uZmlnLCBjb25maWcgPSBfZCA9PT0gdm9pZCAwID8ge30gOiBfZCwgX2UgPSBfYi5yZXBvcnRDcmFzaGVzLCByZXBvcnRDcmFzaGVzID0gX2UgPT09IHZvaWQgMCA/IHRydWUgOiBfZSwgbG9nZ2VyID0gX2IubG9nZ2VyO1xuICAgIHZhciBlbmhhbmNlcnMgPSBbXTtcbiAgICB2YXIgbWlkZGxld2FyZXMgPSBbXTtcbiAgICBpZiAocmVwb3J0Q3Jhc2hlcykge1xuICAgICAgICBtaWRkbGV3YXJlcy5wdXNoKGNyYXNoUmVwb3J0ZXIpO1xuICAgIH1cbiAgICBpZiAobG9nZ2VyKSB7XG4gICAgICAgIG1pZGRsZXdhcmVzLnB1c2gobG9nZ2VyKTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZXdhcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZW5oYW5jZXJzLnB1c2goYXBwbHlNaWRkbGV3YXJlLmFwcGx5KHZvaWQgMCwgbWlkZGxld2FyZXMpKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBhbnlXaW5kb3cgPSB3aW5kb3c7XG4gICAgICAgIGlmIChhbnlXaW5kb3cuZGV2VG9vbHNFeHRlbnNpb24pIHtcbiAgICAgICAgICAgIGVuaGFuY2Vycy5wdXNoKGFueVdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbigpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY29tcG9zZSA9IHJlZHV4Q29tcG9zZTtcbiAgICBpZiAoaW5pdGlhbFN0YXRlICYmIGluaXRpYWxTdGF0ZVtyZWR1eFJvb3RLZXldICYmIGluaXRpYWxTdGF0ZVtyZWR1eFJvb3RLZXldWydxdWVyaWVzJ10pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcG9sbG8gaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGNvbnRhaW4gcXVlcmllcywgb25seSBkYXRhJyk7XG4gICAgfVxuICAgIGlmIChpbml0aWFsU3RhdGUgJiYgaW5pdGlhbFN0YXRlW3JlZHV4Um9vdEtleV0gJiYgaW5pdGlhbFN0YXRlW3JlZHV4Um9vdEtleV1bJ211dGF0aW9ucyddKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXBvbGxvIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBjb250YWluIG11dGF0aW9ucywgb25seSBkYXRhJyk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVTdG9yZShjb21iaW5lUmVkdWNlcnMoKF9mID0ge30sIF9mW3JlZHV4Um9vdEtleV0gPSBjcmVhdGVBcG9sbG9SZWR1Y2VyKGNvbmZpZyksIF9mKSksIGluaXRpYWxTdGF0ZSwgY29tcG9zZS5hcHBseSh2b2lkIDAsIGVuaGFuY2VycykpO1xuICAgIHZhciBfZjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJpbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcbmZ1bmN0aW9uIGlzU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUgIT09IHVuZGVmaW5lZDtcbn1cbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZXJGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJGdW5jdGlvbiA9IHN1YnNjcmliZXJGdW5jdGlvbjtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbk9yQ2xlYW51cEZ1bmN0aW9uID0gdGhpcy5zdWJzY3JpYmVyRnVuY3Rpb24ob2JzZXJ2ZXIpO1xuICAgICAgICBpZiAoaXNTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uT3JDbGVhbnVwRnVuY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uT3JDbGVhbnVwRnVuY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBzdWJzY3JpcHRpb25PckNsZWFudXBGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydCB7IE9ic2VydmFibGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmFibGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC91dGlsL09ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmV4cG9ydCBmdW5jdGlvbiBpc0Fwb2xsb0Vycm9yKGVycikge1xuICAgIHJldHVybiBlcnIuaGFzT3duUHJvcGVydHkoJ2dyYXBoUUxFcnJvcnMnKTtcbn1cbnZhciBnZW5lcmF0ZUVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGVyci5ncmFwaFFMRXJyb3JzKSAmJiBlcnIuZ3JhcGhRTEVycm9ycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgZXJyLmdyYXBoUUxFcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoZ3JhcGhRTEVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ3JhcGhRTEVycm9yID8gZ3JhcGhRTEVycm9yLm1lc3NhZ2UgOiAnRXJyb3IgbWVzc2FnZSBub3QgZm91bmQuJztcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJHcmFwaFFMIGVycm9yOiBcIiArIGVycm9yTWVzc2FnZSArIFwiXFxuXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZXJyLm5ldHdvcmtFcnJvcikge1xuICAgICAgICBtZXNzYWdlICs9ICdOZXR3b3JrIGVycm9yOiAnICsgZXJyLm5ldHdvcmtFcnJvci5tZXNzYWdlICsgJ1xcbic7XG4gICAgfVxuICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59O1xudmFyIEFwb2xsb0Vycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXBvbGxvRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXBvbGxvRXJyb3IoX2EpIHtcbiAgICAgICAgdmFyIGdyYXBoUUxFcnJvcnMgPSBfYS5ncmFwaFFMRXJyb3JzLCBuZXR3b3JrRXJyb3IgPSBfYS5uZXR3b3JrRXJyb3IsIGVycm9yTWVzc2FnZSA9IF9hLmVycm9yTWVzc2FnZSwgZXh0cmFJbmZvID0gX2EuZXh0cmFJbmZvO1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBlcnJvck1lc3NhZ2UpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmdyYXBoUUxFcnJvcnMgPSBncmFwaFFMRXJyb3JzIHx8IFtdO1xuICAgICAgICBfdGhpcy5uZXR3b3JrRXJyb3IgPSBuZXR3b3JrRXJyb3IgfHwgbnVsbDtcbiAgICAgICAgaWYgKCFlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgIF90aGlzLm1lc3NhZ2UgPSBnZW5lcmF0ZUVycm9yTWVzc2FnZShfdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5tZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmV4dHJhSW5mbyA9IGV4dHJhSW5mbztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQXBvbGxvRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnQgeyBBcG9sbG9FcnJvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBvbGxvRXJyb3IuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9lcnJvcnMvQXBvbGxvRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJleHBvcnQgdmFyIEZldGNoVHlwZTtcbihmdW5jdGlvbiAoRmV0Y2hUeXBlKSB7XG4gICAgRmV0Y2hUeXBlW0ZldGNoVHlwZVtcIm5vcm1hbFwiXSA9IDFdID0gXCJub3JtYWxcIjtcbiAgICBGZXRjaFR5cGVbRmV0Y2hUeXBlW1wicmVmZXRjaFwiXSA9IDJdID0gXCJyZWZldGNoXCI7XG4gICAgRmV0Y2hUeXBlW0ZldGNoVHlwZVtcInBvbGxcIl0gPSAzXSA9IFwicG9sbFwiO1xufSkoRmV0Y2hUeXBlIHx8IChGZXRjaFR5cGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9jb3JlL3R5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwiaW1wb3J0IHsgaXNEZXZlbG9wbWVudCwgaXNUZXN0LCB9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuZnVuY3Rpb24gZGVlcEZyZWV6ZShvKSB7XG4gICAgT2JqZWN0LmZyZWV6ZShvKTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KHByb3ApXG4gICAgICAgICAgICAmJiBvW3Byb3BdICE9PSBudWxsXG4gICAgICAgICAgICAmJiAodHlwZW9mIG9bcHJvcF0gPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvW3Byb3BdID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgJiYgIU9iamVjdC5pc0Zyb3plbihvW3Byb3BdKSkge1xuICAgICAgICAgICAgZGVlcEZyZWV6ZShvW3Byb3BdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvO1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF5YmVEZWVwRnJlZXplKG9iaikge1xuICAgIGlmIChpc0RldmVsb3BtZW50KCkgfHwgaXNUZXN0KCkpIHtcbiAgICAgICAgcmV0dXJuIGRlZXBGcmVlemUob2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1heWJlRGVlcEZyZWV6ZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3V0aWwvbWF5YmVEZWVwRnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQXBvbGxvRXJyb3IsIH0gZnJvbSAnLi4vZXJyb3JzL0Fwb2xsb0Vycm9yJztcbmltcG9ydCB7IEZldGNoVHlwZSwgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHRyeUZ1bmN0aW9uT3JMb2dFcnJvciB9IGZyb20gJy4uL3V0aWwvZXJyb3JIYW5kbGluZyc7XG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnLi4vdXRpbC9pc0VxdWFsJztcbmltcG9ydCBtYXliZURlZXBGcmVlemUgZnJvbSAnLi4vdXRpbC9tYXliZURlZXBGcmVlemUnO1xuaW1wb3J0IHsgTmV0d29ya1N0YXR1cywgaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0LCB9IGZyb20gJy4uL3F1ZXJpZXMvbmV0d29ya1N0YXR1cyc7XG5pbXBvcnQgeyBnZXRPcGVyYXRpb25OYW1lLCB9IGZyb20gJy4uL3F1ZXJpZXMvZ2V0RnJvbUFTVCc7XG52YXIgT2JzZXJ2YWJsZVF1ZXJ5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT2JzZXJ2YWJsZVF1ZXJ5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVRdWVyeShfYSkge1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gX2Euc2NoZWR1bGVyLCBvcHRpb25zID0gX2Eub3B0aW9ucywgX2IgPSBfYS5zaG91bGRTdWJzY3JpYmUsIHNob3VsZFN1YnNjcmliZSA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBxdWVyeU1hbmFnZXIgPSBzY2hlZHVsZXIucXVlcnlNYW5hZ2VyO1xuICAgICAgICB2YXIgcXVlcnlJZCA9IHF1ZXJ5TWFuYWdlci5nZW5lcmF0ZVF1ZXJ5SWQoKTtcbiAgICAgICAgdmFyIHN1YnNjcmliZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm9uU3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdWJzY3JpYmVyRnVuY3Rpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgX3RoaXMudmFyaWFibGVzID0gX3RoaXMub3B0aW9ucy52YXJpYWJsZXMgfHwge307XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMucXVlcnlNYW5hZ2VyID0gcXVlcnlNYW5hZ2VyO1xuICAgICAgICBfdGhpcy5xdWVyeUlkID0gcXVlcnlJZDtcbiAgICAgICAgX3RoaXMuc2hvdWxkU3Vic2NyaWJlID0gc2hvdWxkU3Vic2NyaWJlO1xuICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgX3RoaXMuc3Vic2NyaXB0aW9uSGFuZGxlcyA9IFtdO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT2JzZXJ2ZXJzID0gdGhhdC5vYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvYnMpIHsgcmV0dXJuIG9icyAhPT0gb2JzZXJ2ZXI7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRPYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnF1ZXJ5TWFuYWdlci5yZW1vdmVRdWVyeSh0aGF0LnF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhhdC5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuY3VycmVudFJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0Q3VycmVudFF1ZXJ5UmVzdWx0KHRoaXMsIHRydWUpLCBkYXRhID0gX2EuZGF0YSwgcGFydGlhbCA9IF9hLnBhcnRpYWw7XG4gICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSB0aGlzLnF1ZXJ5TWFuYWdlci5nZXRBcG9sbG9TdGF0ZSgpLnF1ZXJpZXNbdGhpcy5xdWVyeUlkXTtcbiAgICAgICAgaWYgKHF1ZXJ5U3RvcmVWYWx1ZSAmJiAoKHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzICYmIHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICBxdWVyeVN0b3JlVmFsdWUubmV0d29ya0Vycm9yKSkge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICBncmFwaFFMRXJyb3JzOiBxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycyxcbiAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHt9LCBsb2FkaW5nOiBmYWxzZSwgbmV0d29ya1N0YXR1czogcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMsIGVycm9yOiBlcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBxdWVyeUxvYWRpbmcgPSAhcXVlcnlTdG9yZVZhbHVlIHx8IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzID09PSBOZXR3b3JrU3RhdHVzLmxvYWRpbmc7XG4gICAgICAgIHZhciBsb2FkaW5nID0gKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScgJiYgcXVlcnlMb2FkaW5nKVxuICAgICAgICAgICAgfHwgKHBhcnRpYWwgJiYgdGhpcy5vcHRpb25zLmZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScpO1xuICAgICAgICB2YXIgbmV0d29ya1N0YXR1cztcbiAgICAgICAgaWYgKHF1ZXJ5U3RvcmVWYWx1ZSkge1xuICAgICAgICAgICAgbmV0d29ya1N0YXR1cyA9IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV0d29ya1N0YXR1cyA9IGxvYWRpbmcgPyBOZXR3b3JrU3RhdHVzLmxvYWRpbmcgOiBOZXR3b3JrU3RhdHVzLnJlYWR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgbG9hZGluZzogaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KG5ldHdvcmtTdGF0dXMpLFxuICAgICAgICAgICAgbmV0d29ya1N0YXR1czogbmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgIHBhcnRpYWw6IHBhcnRpYWwsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLmdldExhc3RSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RSZXN1bHQ7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnJlZmV0Y2ggPSBmdW5jdGlvbiAodmFyaWFibGVzKSB7XG4gICAgICAgIHRoaXMudmFyaWFibGVzID0gX19hc3NpZ24oe30sIHRoaXMudmFyaWFibGVzLCB2YXJpYWJsZXMpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtb25seScpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2NhY2hlLW9ubHkgZmV0Y2hQb2xpY3kgb3B0aW9uIHNob3VsZCBub3QgYmUgdXNlZCB0b2dldGhlciB3aXRoIHF1ZXJ5IHJlZmV0Y2guJykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucy52YXJpYWJsZXMgPSBfX2Fzc2lnbih7fSwgdGhpcy5vcHRpb25zLnZhcmlhYmxlcywgdGhpcy52YXJpYWJsZXMpO1xuICAgICAgICB2YXIgY29tYmluZWRPcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgeyBmZXRjaFBvbGljeTogJ25ldHdvcmstb25seScgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5mZXRjaFF1ZXJ5KHRoaXMucXVlcnlJZCwgY29tYmluZWRPcHRpb25zLCBGZXRjaFR5cGUucmVmZXRjaClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuIG1heWJlRGVlcEZyZWV6ZShyZXN1bHQpOyB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuZmV0Y2hNb3JlID0gZnVuY3Rpb24gKGZldGNoTW9yZU9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFmZXRjaE1vcmVPcHRpb25zLnVwZGF0ZVF1ZXJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwZGF0ZVF1ZXJ5IG9wdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBmdW5jdGlvbiBkZWZpbmVzIGhvdyB0byB1cGRhdGUgdGhlIHF1ZXJ5IGRhdGEgd2l0aCB0aGUgbmV3IHJlc3VsdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcWlkID0gX3RoaXMucXVlcnlNYW5hZ2VyLmdlbmVyYXRlUXVlcnlJZCgpO1xuICAgICAgICAgICAgdmFyIGNvbWJpbmVkT3B0aW9ucyA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZmV0Y2hNb3JlT3B0aW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkT3B0aW9ucyA9IGZldGNoTW9yZU9wdGlvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzID0gX19hc3NpZ24oe30sIF90aGlzLnZhcmlhYmxlcywgZmV0Y2hNb3JlT3B0aW9ucy52YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkT3B0aW9ucyA9IF9fYXNzaWduKHt9LCBfdGhpcy5vcHRpb25zLCBmZXRjaE1vcmVPcHRpb25zLCB7IHZhcmlhYmxlczogdmFyaWFibGVzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tYmluZWRPcHRpb25zID0gX19hc3NpZ24oe30sIGNvbWJpbmVkT3B0aW9ucywgeyBxdWVyeTogY29tYmluZWRPcHRpb25zLnF1ZXJ5LCBmZXRjaFBvbGljeTogJ25ldHdvcmstb25seScgfSk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucXVlcnlNYW5hZ2VyLmZldGNoUXVlcnkocWlkLCBjb21iaW5lZE9wdGlvbnMsIEZldGNoVHlwZS5ub3JtYWwsIF90aGlzLnF1ZXJ5SWQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGZldGNoTW9yZVJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBmZXRjaE1vcmVSZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIHZhciByZWR1Y2VyID0gZmV0Y2hNb3JlT3B0aW9ucy51cGRhdGVRdWVyeTtcbiAgICAgICAgICAgIHZhciBtYXBGbiA9IGZ1bmN0aW9uIChwcmV2aW91c1Jlc3VsdCwgX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeVZhcmlhYmxlcyA9IHZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlcihwcmV2aW91c1Jlc3VsdCwge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaE1vcmVSZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5VmFyaWFibGVzOiBxdWVyeVZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy51cGRhdGVRdWVyeShtYXBGbik7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hNb3JlUmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc3Vic2NyaWJlVG9Nb3JlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydEdyYXBoUUxTdWJzY3JpcHRpb24oe1xuICAgICAgICAgICAgcXVlcnk6IG9wdGlvbnMuZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudXBkYXRlUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZHVjZXJfMSA9IG9wdGlvbnMudXBkYXRlUXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXBGbiA9IGZ1bmN0aW9uIChwcmV2aW91c1Jlc3VsdCwgX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlcl8xKHByZXZpb3VzUmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uRGF0YTogeyBkYXRhOiBkYXRhIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlUXVlcnkobWFwRm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgR3JhcGhRTCBzdWJzY3JpcHRpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkhhbmRsZXMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5zdWJzY3JpcHRpb25IYW5kbGVzLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdWJzY3JpcHRpb25IYW5kbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIHZhciBvbGRPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfX2Fzc2lnbih7fSwgdGhpcy5vcHRpb25zLCBvcHRzKTtcbiAgICAgICAgaWYgKG9wdHMucG9sbEludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZyhvcHRzLnBvbGxJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0cy5wb2xsSW50ZXJ2YWwgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHJ5RmV0Y2ggPSAob2xkT3B0aW9ucy5mZXRjaFBvbGljeSAhPT0gJ25ldHdvcmstb25seScgJiYgb3B0cy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpXG4gICAgICAgICAgICB8fCAob2xkT3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLW9ubHknICYmIG9wdHMuZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5JylcbiAgICAgICAgICAgIHx8IChvbGRPcHRpb25zLmZldGNoUG9saWN5ID09PSAnc3RhbmRieScgJiYgb3B0cy5mZXRjaFBvbGljeSAhPT0gJ3N0YW5kYnknKVxuICAgICAgICAgICAgfHwgZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFZhcmlhYmxlcyh0aGlzLm9wdGlvbnMudmFyaWFibGVzLCB0cnlGZXRjaCwgb3B0cy5mZXRjaFJlc3VsdHMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5zZXRWYXJpYWJsZXMgPSBmdW5jdGlvbiAodmFyaWFibGVzLCB0cnlGZXRjaCwgZmV0Y2hSZXN1bHRzKSB7XG4gICAgICAgIGlmICh0cnlGZXRjaCA9PT0gdm9pZCAwKSB7IHRyeUZldGNoID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGZldGNoUmVzdWx0cyA9PT0gdm9pZCAwKSB7IGZldGNoUmVzdWx0cyA9IHRydWU7IH1cbiAgICAgICAgdmFyIG5ld1ZhcmlhYmxlcyA9IF9fYXNzaWduKHt9LCB0aGlzLnZhcmlhYmxlcywgdmFyaWFibGVzKTtcbiAgICAgICAgaWYgKGlzRXF1YWwobmV3VmFyaWFibGVzLCB0aGlzLnZhcmlhYmxlcykgJiYgIXRyeUZldGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vYnNlcnZlcnMubGVuZ3RoID09PSAwIHx8ICFmZXRjaFJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHJlc29sdmUoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFyaWFibGVzID0gbmV3VmFyaWFibGVzO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnZhcmlhYmxlcyA9IG5ld1ZhcmlhYmxlcztcbiAgICAgICAgICAgIGlmICh0aGlzLm9ic2VydmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHJlc29sdmUoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeSh0aGlzLnF1ZXJ5SWQsIF9fYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIHsgdmFyaWFibGVzOiB0aGlzLnZhcmlhYmxlcyB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiBtYXliZURlZXBGcmVlemUocmVzdWx0KTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUudXBkYXRlUXVlcnkgPSBmdW5jdGlvbiAobWFwRm4pIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0UXVlcnlXaXRoUHJldmlvdXNSZXN1bHQodGhpcy5xdWVyeUlkKSwgcHJldmlvdXNSZXN1bHQgPSBfYS5wcmV2aW91c1Jlc3VsdCwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkb2N1bWVudCA9IF9hLmRvY3VtZW50O1xuICAgICAgICB2YXIgbmV3UmVzdWx0ID0gdHJ5RnVuY3Rpb25PckxvZ0Vycm9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hcEZuKHByZXZpb3VzUmVzdWx0LCB7IHZhcmlhYmxlczogdmFyaWFibGVzIH0pOyB9KTtcbiAgICAgICAgaWYgKG5ld1Jlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fVVBEQVRFX1FVRVJZX1JFU1VMVCcsXG4gICAgICAgICAgICAgICAgbmV3UmVzdWx0OiBuZXdSZXN1bHQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUoZG9jdW1lbnQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc3RvcFBvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudGx5UG9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvbGxJbnRlcnZhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50bHlQb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc3RhcnRQb2xsaW5nID0gZnVuY3Rpb24gKHBvbGxJbnRlcnZhbCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtZmlyc3QnIHx8ICh0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUXVlcmllcyB0aGF0IHNwZWNpZnkgdGhlIGNhY2hlLWZpcnN0IGFuZCBjYWNoZS1vbmx5IGZldGNoUG9saWNpZXMgY2Fubm90IGFsc28gYmUgcG9sbGluZyBxdWVyaWVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudGx5UG9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMucG9sbEludGVydmFsID0gcG9sbEludGVydmFsO1xuICAgICAgICB0aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLnN0YXJ0UG9sbGluZ1F1ZXJ5KHRoaXMub3B0aW9ucywgdGhpcy5xdWVyeUlkKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUub25TdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICAgIGlmIChvYnNlcnZlci5uZXh0ICYmIHRoaXMubGFzdFJlc3VsdCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmxhc3RSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYnNlcnZlci5lcnJvciAmJiB0aGlzLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IodGhpcy5sYXN0RXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VXBRdWVyeSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXRRdWVyeVN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vYnNlcnZlcnMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID09PSBvYnNlcnZlcjsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBfdGhpcy5vYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvYnMpIHsgcmV0dXJuIG9icyAhPT0gb2JzZXJ2ZXI7IH0pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRlYXJEb3duUXVlcnkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0UXVlcnlTdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldFVwUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZFN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuYWRkT2JzZXJ2YWJsZVF1ZXJ5KHRoaXMucXVlcnlJZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy5vcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLWZpcnN0JyB8fCAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtb25seScpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdWVyaWVzIHRoYXQgc3BlY2lmeSB0aGUgY2FjaGUtZmlyc3QgYW5kIGNhY2hlLW9ubHkgZmV0Y2hQb2xpY2llcyBjYW5ub3QgYWxzbyBiZSBwb2xsaW5nIHF1ZXJpZXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlci5zdGFydFBvbGxpbmdRdWVyeSh0aGlzLm9wdGlvbnMsIHRoaXMucXVlcnlJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9ic2VydmVyID0ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmxhc3RSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgX3RoaXMub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9icy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnMuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIGVycm9yJywgZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMubGFzdEVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydFF1ZXJ5KHRoaXMucXVlcnlJZCwgdGhpcy5vcHRpb25zLCB0aGlzLnF1ZXJ5TWFuYWdlci5xdWVyeUxpc3RlbmVyRm9yT2JzZXJ2ZXIodGhpcy5xdWVyeUlkLCB0aGlzLm9wdGlvbnMsIG9ic2VydmVyKSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnRlYXJEb3duUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudGx5UG9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkhhbmRsZXMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7IHJldHVybiBzdWIudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uSGFuZGxlcyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5zdG9wUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkU3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5yZW1vdmVPYnNlcnZhYmxlUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGVRdWVyeTtcbn0oT2JzZXJ2YWJsZSkpO1xuZXhwb3J0IHsgT2JzZXJ2YWJsZVF1ZXJ5IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlUXVlcnkuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXBvbGxvLWNsaWVudC9jb3JlL09ic2VydmFibGVRdWVyeS5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsImltcG9ydCB7IGlzUHJvZHVjdGlvbiwgaXNUZXN0IH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG52YXIgaGF2ZVdhcm5lZCA9IE9iamVjdC5jcmVhdGUoe30pO1xuZXhwb3J0IGZ1bmN0aW9uIHdhcm5PbmNlSW5EZXZlbG9wbWVudChtc2csIHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSAnd2Fybic7IH1cbiAgICBpZiAoaXNQcm9kdWN0aW9uKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWhhdmVXYXJuZWRbbXNnXSkge1xuICAgICAgICBpZiAoIWlzVGVzdCgpKSB7XG4gICAgICAgICAgICBoYXZlV2FybmVkW21zZ10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13YXJuT25jZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3V0aWwvd2Fybk9uY2UuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJpbXBvcnQgeyBpc1Rlc3QsIH0gZnJvbSAnLi4vdXRpbC9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyB3YXJuT25jZUluRGV2ZWxvcG1lbnQsIH0gZnJvbSAnLi4vdXRpbC93YXJuT25jZSc7XG52YXIgSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlcihvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaW50cm9zcGVjdGlvblF1ZXJ5UmVzdWx0RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5wb3NzaWJsZVR5cGVzTWFwID0gdGhpcy5wYXJzZUludHJvc3BlY3Rpb25SZXN1bHQob3B0aW9ucy5pbnRyb3NwZWN0aW9uUXVlcnlSZXN1bHREYXRhKTtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdGNoID0gdGhpcy5tYXRjaC5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uIChpZFZhbHVlLCB0eXBlQ29uZGl0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1JlYWR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZyYWdtZW50TWF0Y2hlci5tYXRjaCgpIHdhcyBjYWxsZWQgYmVmb3JlIEZyYWdtZW50TWF0Y2hlci5pbml0KCknKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JqID0gY29udGV4dC5zdG9yZVtpZFZhbHVlLmlkXTtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9iai5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgbWF0Y2ggZnJhZ21lbnQgYmVjYXVzZSBfX3R5cGVuYW1lIHByb3BlcnR5IGlzIG1pc3Npbmc6IFwiICsgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5fX3R5cGVuYW1lID09PSB0eXBlQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW1wbGVtZW50aW5nVHlwZXMgPSB0aGlzLnBvc3NpYmxlVHlwZXNNYXBbdHlwZUNvbmRpdGlvbl07XG4gICAgICAgIGlmIChpbXBsZW1lbnRpbmdUeXBlcyAmJiBpbXBsZW1lbnRpbmdUeXBlcy5pbmRleE9mKG9iai5fX3R5cGVuYW1lKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyLnByb3RvdHlwZS5wYXJzZUludHJvc3BlY3Rpb25SZXN1bHQgPSBmdW5jdGlvbiAoaW50cm9zcGVjdGlvblJlc3VsdERhdGEpIHtcbiAgICAgICAgdmFyIHR5cGVNYXAgPSB7fTtcbiAgICAgICAgaW50cm9zcGVjdGlvblJlc3VsdERhdGEuX19zY2hlbWEudHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgICAgaWYgKHR5cGUua2luZCA9PT0gJ1VOSU9OJyB8fCB0eXBlLmtpbmQgPT09ICdJTlRFUkZBQ0UnKSB7XG4gICAgICAgICAgICAgICAgdHlwZU1hcFt0eXBlLm5hbWVdID0gdHlwZS5wb3NzaWJsZVR5cGVzLm1hcChmdW5jdGlvbiAoaW1wbGVtZW50aW5nVHlwZSkgeyByZXR1cm4gaW1wbGVtZW50aW5nVHlwZS5uYW1lOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0eXBlTWFwO1xuICAgIH07XG4gICAgcmV0dXJuIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXI7XG59KCkpO1xuZXhwb3J0IHsgSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlciB9O1xudmFyIGhhdmVXYXJuZWQgPSBmYWxzZTtcbnZhciBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlcigpIHtcbiAgICB9XG4gICAgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyLnByb3RvdHlwZS5lbnN1cmVSZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyLnByb3RvdHlwZS5jYW5CeXBhc3NJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAoaWRWYWx1ZSwgdHlwZUNvbmRpdGlvbiwgY29udGV4dCkge1xuICAgICAgICB2YXIgb2JqID0gY29udGV4dC5zdG9yZVtpZFZhbHVlLmlkXTtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9iai5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIWhhdmVXYXJuZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJZb3UncmUgdXNpbmcgZnJhZ21lbnRzIGluIHlvdXIgcXVlcmllcywgYnV0IGVpdGhlciBkb24ndCBoYXZlIHRoZSBhZGRUeXBlbmFtZTpcXG4gIHRydWUgb3B0aW9uIHNldCBpbiBBcG9sbG8gQ2xpZW50LCBvciB5b3UgYXJlIHRyeWluZyB0byB3cml0ZSBhIGZyYWdtZW50IHRvIHRoZSBzdG9yZSB3aXRob3V0IHRoZSBfX3R5cGVuYW1lLlxcbiAgIFBsZWFzZSB0dXJuIG9uIHRoZSBhZGRUeXBlbmFtZSBvcHRpb24gYW5kIGluY2x1ZGUgX190eXBlbmFtZSB3aGVuIHdyaXRpbmcgZnJhZ21lbnRzIHNvIHRoYXQgQXBvbGxvIENsaWVudFxcbiAgIGNhbiBhY2N1cmF0ZWx5IG1hdGNoIGZyYWdtZW50cy5cIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgZmluZCBfX3R5cGVuYW1lIG9uIEZyYWdtZW50ICcsIHR5cGVDb25kaXRpb24sIG9iaik7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiREVQUkVDQVRJT04gV0FSTklORzogdXNpbmcgZnJhZ21lbnRzIHdpdGhvdXQgX190eXBlbmFtZSBpcyB1bnN1cHBvcnRlZCBiZWhhdmlvciBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmUgdmVyc2lvbnMgb2YgQXBvbGxvIGNsaWVudC4gWW91IHNob3VsZCBmaXggdGhpcyBhbmQgc2V0IGFkZFR5cGVuYW1lIHRvIHRydWUgbm93LlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVGVzdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhdmVXYXJuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQucmV0dXJuUGFydGlhbERhdGEgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5fX3R5cGVuYW1lID09PSB0eXBlQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3YXJuT25jZUluRGV2ZWxvcG1lbnQoXCJZb3UgYXJlIHVzaW5nIHRoZSBzaW1wbGUgKGhldXJpc3RpYykgZnJhZ21lbnQgbWF0Y2hlciwgYnV0IHlvdXIgcXVlcmllcyBjb250YWluIHVuaW9uIG9yIGludGVyZmFjZSB0eXBlcy5cXG4gICAgIEFwb2xsbyBDbGllbnQgd2lsbCBub3QgYmUgYWJsZSB0byBhYmxlIHRvIGFjY3VyYXRlbHkgbWFwIGZyYWdtZW50cy5cIiArXG4gICAgICAgICAgICBcIlRvIG1ha2UgdGhpcyBlcnJvciBnbyBhd2F5LCB1c2UgdGhlIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIgYXMgZGVzY3JpYmVkIGluIHRoZSBkb2NzOiBcIiArXG4gICAgICAgICAgICBcImh0dHA6Ly9kZXYuYXBvbGxvZGF0YS5jb20vcmVhY3QvaW5pdGlhbGl6YXRpb24uaHRtbCNmcmFnbWVudC1tYXRjaGVyXCIsICdlcnJvcicpO1xuICAgICAgICBjb250ZXh0LnJldHVyblBhcnRpYWxEYXRhID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyO1xufSgpKTtcbmV4cG9ydCB7IEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJhZ21lbnRNYXRjaGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Fwb2xsby1jbGllbnQvZGF0YS9mcmFnbWVudE1hdGNoZXIuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJpbXBvcnQgeyBwcmludCwgfSBmcm9tICdncmFwaHFsL2xhbmd1YWdlL3ByaW50ZXInO1xudmFyIERlZHVwbGljYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVkdXBsaWNhdG9yKG5ldHdvcmtJbnRlcmZhY2UpIHtcbiAgICAgICAgdGhpcy5uZXR3b3JrSW50ZXJmYWNlID0gbmV0d29ya0ludGVyZmFjZTtcbiAgICAgICAgdGhpcy5pbkZsaWdodFJlcXVlc3RQcm9taXNlcyA9IHt9O1xuICAgIH1cbiAgICBEZWR1cGxpY2F0b3IucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHJlcXVlc3QsIGRlZHVwbGljYXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChkZWR1cGxpY2F0ZSA9PT0gdm9pZCAwKSB7IGRlZHVwbGljYXRlID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoIWRlZHVwbGljYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXR3b3JrSW50ZXJmYWNlLnF1ZXJ5KHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLmdldEtleShyZXF1ZXN0KTtcbiAgICAgICAgaWYgKCF0aGlzLmluRmxpZ2h0UmVxdWVzdFByb21pc2VzW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuaW5GbGlnaHRSZXF1ZXN0UHJvbWlzZXNba2V5XSA9IHRoaXMubmV0d29ya0ludGVyZmFjZS5xdWVyeShyZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbkZsaWdodFJlcXVlc3RQcm9taXNlc1trZXldXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuaW5GbGlnaHRSZXF1ZXN0UHJvbWlzZXNba2V5XTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZGVsZXRlIF90aGlzLmluRmxpZ2h0UmVxdWVzdFByb21pc2VzW2tleV07XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGVkdXBsaWNhdG9yLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gcHJpbnQocmVxdWVzdC5xdWVyeSkgKyBcInxcIiArIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudmFyaWFibGVzKSArIFwifFwiICsgcmVxdWVzdC5vcGVyYXRpb25OYW1lO1xuICAgIH07XG4gICAgcmV0dXJuIERlZHVwbGljYXRvcjtcbn0oKSk7XG5leHBvcnQgeyBEZWR1cGxpY2F0b3IgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlZHVwbGljYXRvci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3RyYW5zcG9ydC9EZWR1cGxpY2F0b3IuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJpbXBvcnQgeyBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUsIH0gZnJvbSAnLi9yZWFkRnJvbVN0b3JlJztcbmltcG9ydCB7IHdyaXRlUmVzdWx0VG9TdG9yZSwgfSBmcm9tICcuL3dyaXRlVG9TdG9yZSc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RvcmVSZWR1Y2VyKHJlc3VsdFJlZHVjZXIsIGRvY3VtZW50LCB2YXJpYWJsZXMsIGNvbmZpZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmUsIGFjdGlvbikge1xuICAgICAgICB2YXIgX2EgPSBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoe1xuICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICByZXR1cm5QYXJ0aWFsRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH0pLCByZXN1bHQgPSBfYS5yZXN1bHQsIGlzTWlzc2luZyA9IF9hLmlzTWlzc2luZztcbiAgICAgICAgaWYgKGlzTWlzc2luZykge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXh0UmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbmV4dFJlc3VsdCA9IHJlc3VsdFJlZHVjZXIocmVzdWx0LCBhY3Rpb24sIHZhcmlhYmxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmhhbmRsZWQgZXJyb3IgaW4gcmVzdWx0IHJlZHVjZXInLCBlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5leHRSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogbmV4dFJlc3VsdCxcbiAgICAgICAgICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXN1bHRSZWR1Y2Vycy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2RhdGEvcmVzdWx0UmVkdWNlcnMuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IEZldGNoVHlwZSwgfSBmcm9tICcuLi9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGVRdWVyeSB9IGZyb20gJy4uL2NvcmUvT2JzZXJ2YWJsZVF1ZXJ5JztcbmltcG9ydCB7IE5ldHdvcmtTdGF0dXMgfSBmcm9tICcuLi9xdWVyaWVzL25ldHdvcmtTdGF0dXMnO1xudmFyIFF1ZXJ5U2NoZWR1bGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRdWVyeVNjaGVkdWxlcihfYSkge1xuICAgICAgICB2YXIgcXVlcnlNYW5hZ2VyID0gX2EucXVlcnlNYW5hZ2VyO1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlciA9IHF1ZXJ5TWFuYWdlcjtcbiAgICAgICAgdGhpcy5wb2xsaW5nVGltZXJzID0ge307XG4gICAgICAgIHRoaXMuaW5GbGlnaHRRdWVyaWVzID0ge307XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFF1ZXJpZXMgPSB7fTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbFF1ZXJpZXMgPSB7fTtcbiAgICB9XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmNoZWNrSW5GbGlnaHQgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICB2YXIgcXVlcmllcyA9IHRoaXMucXVlcnlNYW5hZ2VyLmdldEFwb2xsb1N0YXRlKCkucXVlcmllcztcbiAgICAgICAgcmV0dXJuIHF1ZXJpZXNbcXVlcnlJZF0gJiYgcXVlcmllc1txdWVyeUlkXS5uZXR3b3JrU3RhdHVzICE9PSBOZXR3b3JrU3RhdHVzLnJlYWR5O1xuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmZldGNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgZmV0Y2hUeXBlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBfdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeShxdWVyeUlkLCBvcHRpb25zLCBmZXRjaFR5cGUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuc3RhcnRQb2xsaW5nUXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucywgcXVlcnlJZCwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gc3RhcnQgYSBwb2xsaW5nIHF1ZXJ5IHdpdGhvdXQgYSBwb2xsaW5nIGludGVydmFsLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5TWFuYWdlci5zc3JNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlJZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdGVyZWRRdWVyaWVzW3F1ZXJ5SWRdID0gb3B0aW9ucztcbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5hZGRRdWVyeUxpc3RlbmVyKHF1ZXJ5SWQsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFF1ZXJ5T25JbnRlcnZhbChxdWVyeUlkLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5SWQ7XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuc3RvcFBvbGxpbmdRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJlZ2lzdGVyZWRRdWVyaWVzW3F1ZXJ5SWRdO1xuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmZldGNoUXVlcmllc09uSW50ZXJ2YWwgPSBmdW5jdGlvbiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdID0gdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdLmZpbHRlcihmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5yZWdpc3RlcmVkUXVlcmllcy5oYXNPd25Qcm9wZXJ0eShxdWVyeUlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5jaGVja0luRmxpZ2h0KHF1ZXJ5SWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcXVlcnlPcHRpb25zID0gX3RoaXMucmVnaXN0ZXJlZFF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICB2YXIgcG9sbGluZ09wdGlvbnMgPSBfX2Fzc2lnbih7fSwgcXVlcnlPcHRpb25zKTtcbiAgICAgICAgICAgIHBvbGxpbmdPcHRpb25zLmZldGNoUG9saWN5ID0gJ25ldHdvcmstb25seSc7XG4gICAgICAgICAgICBfdGhpcy5mZXRjaFF1ZXJ5KHF1ZXJ5SWQsIHBvbGxpbmdPcHRpb25zLCBGZXRjaFR5cGUucG9sbCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmludGVydmFsUXVlcmllc1tpbnRlcnZhbF0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucG9sbGluZ1RpbWVyc1tpbnRlcnZhbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxRdWVyaWVzW2ludGVydmFsXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmFkZFF1ZXJ5T25JbnRlcnZhbCA9IGZ1bmN0aW9uIChxdWVyeUlkLCBxdWVyeU9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGludGVydmFsID0gcXVlcnlPcHRpb25zLnBvbGxJbnRlcnZhbDtcbiAgICAgICAgaWYgKCFpbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBwb2xsIGludGVydmFsIGlzIHJlcXVpcmVkIHRvIHN0YXJ0IHBvbGxpbmcgcXVlcnkgd2l0aCBpZCAnXCIgKyBxdWVyeUlkICsgXCInLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbFF1ZXJpZXMuaGFzT3duUHJvcGVydHkoaW50ZXJ2YWwudG9TdHJpbmcoKSkgJiYgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxRdWVyaWVzW2ludGVydmFsXS5wdXNoKHF1ZXJ5SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdID0gW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgdGhpcy5wb2xsaW5nVGltZXJzW2ludGVydmFsXSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5mZXRjaFF1ZXJpZXNPbkludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLnJlZ2lzdGVyUG9sbGluZ1F1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5T3B0aW9ucykge1xuICAgICAgICBpZiAoIXF1ZXJ5T3B0aW9ucy5wb2xsSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHJlZ2lzdGVyIGEgbm9uLXBvbGxpbmcgcXVlcnkgd2l0aCB0aGUgc2NoZWR1bGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVF1ZXJ5KHtcbiAgICAgICAgICAgIHNjaGVkdWxlcjogdGhpcyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHF1ZXJ5T3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUXVlcnlTY2hlZHVsZXI7XG59KCkpO1xuZXhwb3J0IHsgUXVlcnlTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L3NjaGVkdWxlci9zY2hlZHVsZXIuanNcbi8vIG1vZHVsZSBpZCA9IG51bGxcbi8vIG1vZHVsZSBjaHVua3MgPSAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IERlZHVwbGljYXRvciwgfSBmcm9tICcuLi90cmFuc3BvcnQvRGVkdXBsaWNhdG9yJztcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICcuLi91dGlsL2lzRXF1YWwnO1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi4vdXRpbC9hc3NpZ24nO1xuaW1wb3J0IHsgRmV0Y2hUeXBlLCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgTmV0d29ya1N0YXR1cywgaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0LCB9IGZyb20gJy4uL3F1ZXJpZXMvbmV0d29ya1N0YXR1cyc7XG5pbXBvcnQgeyBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzLCB9IGZyb20gJy4uL3N0b3JlJztcbmltcG9ydCB7IGdldFF1ZXJ5RGVmaW5pdGlvbiwgZ2V0T3BlcmF0aW9uRGVmaW5pdGlvbiwgZ2V0T3BlcmF0aW9uTmFtZSwgZ2V0RGVmYXVsdFZhbHVlcywgZ2V0TXV0YXRpb25EZWZpbml0aW9uLCB9IGZyb20gJy4uL3F1ZXJpZXMvZ2V0RnJvbUFTVCc7XG5pbXBvcnQgeyBhZGRUeXBlbmFtZVRvRG9jdW1lbnQsIH0gZnJvbSAnLi4vcXVlcmllcy9xdWVyeVRyYW5zZm9ybSc7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZVJlZHVjZXIsIH0gZnJvbSAnLi4vZGF0YS9yZXN1bHRSZWR1Y2Vycyc7XG5pbXBvcnQgeyBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIsIH0gZnJvbSAnLi4vZGF0YS9mcmFnbWVudE1hdGNoZXInO1xuaW1wb3J0IHsgaXNQcm9kdWN0aW9uLCB9IGZyb20gJy4uL3V0aWwvZW52aXJvbm1lbnQnO1xuaW1wb3J0IG1heWJlRGVlcEZyZWV6ZSBmcm9tICcuLi91dGlsL21heWJlRGVlcEZyZWV6ZSc7XG5pbXBvcnQgeyBwcmludCB9IGZyb20gJ2dyYXBocWwvbGFuZ3VhZ2UvcHJpbnRlcic7XG5pbXBvcnQgeyByZWFkUXVlcnlGcm9tU3RvcmUsIH0gZnJvbSAnLi4vZGF0YS9yZWFkRnJvbVN0b3JlJztcbmltcG9ydCB7IGRpZmZRdWVyeUFnYWluc3RTdG9yZSwgfSBmcm9tICcuLi9kYXRhL3JlYWRGcm9tU3RvcmUnO1xuaW1wb3J0IHsgUXVlcnlTY2hlZHVsZXIsIH0gZnJvbSAnLi4vc2NoZWR1bGVyL3NjaGVkdWxlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB9IGZyb20gJy4uL3V0aWwvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0Fwb2xsb0Vycm9yLCBBcG9sbG9FcnJvciwgfSBmcm9tICcuLi9lcnJvcnMvQXBvbGxvRXJyb3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZVF1ZXJ5IH0gZnJvbSAnLi9PYnNlcnZhYmxlUXVlcnknO1xudmFyIFF1ZXJ5TWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUXVlcnlNYW5hZ2VyKF9hKSB7XG4gICAgICAgIHZhciBuZXR3b3JrSW50ZXJmYWNlID0gX2EubmV0d29ya0ludGVyZmFjZSwgc3RvcmUgPSBfYS5zdG9yZSwgcmVkdXhSb290U2VsZWN0b3IgPSBfYS5yZWR1eFJvb3RTZWxlY3RvciwgX2IgPSBfYS5yZWR1Y2VyQ29uZmlnLCByZWR1Y2VyQ29uZmlnID0gX2IgPT09IHZvaWQgMCA/IHsgbXV0YXRpb25CZWhhdmlvclJlZHVjZXJzOiB7fSB9IDogX2IsIGZyYWdtZW50TWF0Y2hlciA9IF9hLmZyYWdtZW50TWF0Y2hlciwgX2MgPSBfYS5hZGRUeXBlbmFtZSwgYWRkVHlwZW5hbWUgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBfZCA9IF9hLnF1ZXJ5RGVkdXBsaWNhdGlvbiwgcXVlcnlEZWR1cGxpY2F0aW9uID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2QsIF9lID0gX2Euc3NyTW9kZSwgc3NyTW9kZSA9IF9lID09PSB2b2lkIDAgPyBmYWxzZSA6IF9lO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkQ291bnRlciA9IDE7XG4gICAgICAgIHRoaXMubmV0d29ya0ludGVyZmFjZSA9IG5ldHdvcmtJbnRlcmZhY2U7XG4gICAgICAgIHRoaXMuZGVkdXBsaWNhdG9yID0gbmV3IERlZHVwbGljYXRvcihuZXR3b3JrSW50ZXJmYWNlKTtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLnJlZHV4Um9vdFNlbGVjdG9yID0gcmVkdXhSb290U2VsZWN0b3I7XG4gICAgICAgIHRoaXMucmVkdWNlckNvbmZpZyA9IHJlZHVjZXJDb25maWc7XG4gICAgICAgIHRoaXMucG9sbGluZ1RpbWVycyA9IHt9O1xuICAgICAgICB0aGlzLnF1ZXJ5TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMucXVlcnlEb2N1bWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy5hZGRUeXBlbmFtZSA9IGFkZFR5cGVuYW1lO1xuICAgICAgICB0aGlzLnF1ZXJ5RGVkdXBsaWNhdGlvbiA9IHF1ZXJ5RGVkdXBsaWNhdGlvbjtcbiAgICAgICAgdGhpcy5zc3JNb2RlID0gc3NyTW9kZTtcbiAgICAgICAgaWYgKHR5cGVvZiBmcmFnbWVudE1hdGNoZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50TWF0Y2hlciA9IG5ldyBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRNYXRjaGVyID0gZnJhZ21lbnRNYXRjaGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gbmV3IFF1ZXJ5U2NoZWR1bGVyKHtcbiAgICAgICAgICAgIHF1ZXJ5TWFuYWdlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZmV0Y2hRdWVyeVByb21pc2VzID0ge307XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXMgPSB7fTtcbiAgICAgICAgdGhpcy5xdWVyeUlkc0J5TmFtZSA9IHt9O1xuICAgICAgICBpZiAodGhpcy5zdG9yZVsnc3Vic2NyaWJlJ10pIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3RvcmVEYXRhXzE7XG4gICAgICAgICAgICB0aGlzLnN0b3JlWydzdWJzY3JpYmUnXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzU3RvcmVEYXRhID0gY3VycmVudFN0b3JlRGF0YV8xIHx8IHt9O1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1N0b3JlSGFzRGF0YSA9IE9iamVjdC5rZXlzKHByZXZpb3VzU3RvcmVEYXRhKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0b3JlRGF0YV8xID0gX3RoaXMuZ2V0QXBvbGxvU3RhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbChwcmV2aW91c1N0b3JlRGF0YSwgY3VycmVudFN0b3JlRGF0YV8xKSAmJiBwcmV2aW91c1N0b3JlSGFzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYnJvYWRjYXN0TmV3U3RvcmUgPSBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RRdWVyaWVzKCk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLm11dGF0ZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbXV0YXRpb24gPSBfYS5tdXRhdGlvbiwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBvcHRpbWlzdGljUmVzcG9uc2UgPSBfYS5vcHRpbWlzdGljUmVzcG9uc2UsIHVwZGF0ZVF1ZXJpZXNCeU5hbWUgPSBfYS51cGRhdGVRdWVyaWVzLCBfYiA9IF9hLnJlZmV0Y2hRdWVyaWVzLCByZWZldGNoUXVlcmllcyA9IF9iID09PSB2b2lkIDAgPyBbXSA6IF9iLCB1cGRhdGVXaXRoUHJveHlGbiA9IF9hLnVwZGF0ZTtcbiAgICAgICAgdmFyIG11dGF0aW9uSWQgPSB0aGlzLmdlbmVyYXRlUXVlcnlJZCgpO1xuICAgICAgICBpZiAodGhpcy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgbXV0YXRpb24gPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQobXV0YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhnZXRNdXRhdGlvbkRlZmluaXRpb24obXV0YXRpb24pKSwgdmFyaWFibGVzKTtcbiAgICAgICAgdmFyIG11dGF0aW9uU3RyaW5nID0gcHJpbnQobXV0YXRpb24pO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHF1ZXJ5OiBtdXRhdGlvbixcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShtdXRhdGlvbiksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucXVlcnlEb2N1bWVudHNbbXV0YXRpb25JZF0gPSBtdXRhdGlvbjtcbiAgICAgICAgdmFyIHVwZGF0ZVF1ZXJpZXMgPSB7fTtcbiAgICAgICAgaWYgKHVwZGF0ZVF1ZXJpZXNCeU5hbWUpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZVF1ZXJpZXNCeU5hbWUpLmZvckVhY2goZnVuY3Rpb24gKHF1ZXJ5TmFtZSkgeyByZXR1cm4gKF90aGlzLnF1ZXJ5SWRzQnlOYW1lW3F1ZXJ5TmFtZV0gfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVRdWVyaWVzW3F1ZXJ5SWRdID0gdXBkYXRlUXVlcmllc0J5TmFtZVtxdWVyeU5hbWVdO1xuICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19NVVRBVElPTl9JTklUJyxcbiAgICAgICAgICAgIG11dGF0aW9uU3RyaW5nOiBtdXRhdGlvblN0cmluZyxcbiAgICAgICAgICAgIG11dGF0aW9uOiBtdXRhdGlvbixcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShtdXRhdGlvbiksXG4gICAgICAgICAgICBtdXRhdGlvbklkOiBtdXRhdGlvbklkLFxuICAgICAgICAgICAgb3B0aW1pc3RpY1Jlc3BvbnNlOiBvcHRpbWlzdGljUmVzcG9uc2UsXG4gICAgICAgICAgICBleHRyYVJlZHVjZXJzOiB0aGlzLmdldEV4dHJhUmVkdWNlcnMoKSxcbiAgICAgICAgICAgIHVwZGF0ZVF1ZXJpZXM6IHVwZGF0ZVF1ZXJpZXMsXG4gICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZVdpdGhQcm94eUZuLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLm5ldHdvcmtJbnRlcmZhY2UucXVlcnkocmVxdWVzdClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoUUxFcnJvcnM6IHJlc3VsdC5lcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX01VVEFUSU9OX0VSUk9SJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uSWQ6IG11dGF0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMucXVlcnlEb2N1bWVudHNbbXV0YXRpb25JZF07XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX01VVEFUSU9OX1JFU1VMVCcsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbklkOiBtdXRhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogbXV0YXRpb24sXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUobXV0YXRpb24pLFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyB8fCB7fSxcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFSZWR1Y2VyczogX3RoaXMuZ2V0RXh0cmFSZWR1Y2VycygpLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVRdWVyaWVzOiB1cGRhdGVRdWVyaWVzLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IHVwZGF0ZVdpdGhQcm94eUZuLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByZWR1Y2VyRXJyb3IgPSBfdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLnJlZHVjZXJFcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAocmVkdWNlckVycm9yICYmIHJlZHVjZXJFcnJvci5tdXRhdGlvbklkID09PSBtdXRhdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWR1Y2VyRXJyb3IuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVmZXRjaFF1ZXJpZXNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZmV0Y2hRdWVyaWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsgX3RoaXMucmVmZXRjaFF1ZXJ5QnlOYW1lKG5hbWUpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZmV0Y2hRdWVyaWVzLmZvckVhY2goZnVuY3Rpb24gKHB1cmVRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBwdXJlUXVlcnkucXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiBwdXJlUXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnF1ZXJ5RG9jdW1lbnRzW211dGF0aW9uSWRdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fTVVUQVRJT05fRVJST1InLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyLFxuICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbklkOiBtdXRhdGlvbklkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5xdWVyeURvY3VtZW50c1ttdXRhdGlvbklkXTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBlcnIsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5mZXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9wdGlvbnMsIGZldGNoVHlwZSwgZmV0Y2hNb3JlRm9yUXVlcnlJZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2EgPSBvcHRpb25zLnZhcmlhYmxlcywgdmFyaWFibGVzID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9iID0gb3B0aW9ucy5tZXRhZGF0YSwgbWV0YWRhdGEgPSBfYiA9PT0gdm9pZCAwID8gbnVsbCA6IF9iLCBfYyA9IG9wdGlvbnMuZmV0Y2hQb2xpY3ksIGZldGNoUG9saWN5ID0gX2MgPT09IHZvaWQgMCA/ICdjYWNoZS1maXJzdCcgOiBfYztcbiAgICAgICAgdmFyIHF1ZXJ5RG9jID0gdGhpcy50cmFuc2Zvcm1RdWVyeURvY3VtZW50KG9wdGlvbnMpLnF1ZXJ5RG9jO1xuICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBwcmludChxdWVyeURvYyk7XG4gICAgICAgIHZhciBzdG9yZVJlc3VsdDtcbiAgICAgICAgdmFyIG5lZWRUb0ZldGNoID0gZmV0Y2hQb2xpY3kgPT09ICduZXR3b3JrLW9ubHknO1xuICAgICAgICBpZiAoKGZldGNoVHlwZSAhPT0gRmV0Y2hUeXBlLnJlZmV0Y2ggJiYgZmV0Y2hQb2xpY3kgIT09ICduZXR3b3JrLW9ubHknKSkge1xuICAgICAgICAgICAgdmFyIF9kID0gZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKHtcbiAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnlEb2MsXG4gICAgICAgICAgICAgICAgc3RvcmU6IHRoaXMucmVkdXhSb290U2VsZWN0b3IodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKS5kYXRhLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIH0pLCBpc01pc3NpbmcgPSBfZC5pc01pc3NpbmcsIHJlc3VsdCA9IF9kLnJlc3VsdDtcbiAgICAgICAgICAgIG5lZWRUb0ZldGNoID0gaXNNaXNzaW5nIHx8IGZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnO1xuICAgICAgICAgICAgc3RvcmVSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3VsZEZldGNoID0gbmVlZFRvRmV0Y2ggJiYgZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5JyAmJiBmZXRjaFBvbGljeSAhPT0gJ3N0YW5kYnknO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gdGhpcy5nZW5lcmF0ZVJlcXVlc3RJZCgpO1xuICAgICAgICB0aGlzLnF1ZXJ5RG9jdW1lbnRzW3F1ZXJ5SWRdID0gcXVlcnlEb2M7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9JTklUJyxcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nOiBxdWVyeVN0cmluZyxcbiAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeURvYyxcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUocXVlcnlEb2MpLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBmZXRjaFBvbGljeTogZmV0Y2hQb2xpY3ksXG4gICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgICAgICAgICBzdG9yZVByZXZpb3VzVmFyaWFibGVzOiBzaG91bGRGZXRjaCxcbiAgICAgICAgICAgIGlzUG9sbDogZmV0Y2hUeXBlID09PSBGZXRjaFR5cGUucG9sbCxcbiAgICAgICAgICAgIGlzUmVmZXRjaDogZmV0Y2hUeXBlID09PSBGZXRjaFR5cGUucmVmZXRjaCxcbiAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hvdWxkRGlzcGF0Y2hDbGllbnRSZXN1bHQgPSAhc2hvdWxkRmV0Y2ggfHwgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1hbmQtbmV0d29yayc7XG4gICAgICAgIGlmIChzaG91bGREaXNwYXRjaENsaWVudFJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9SRVNVTFRfQ0xJRU5UJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHsgZGF0YTogc3RvcmVSZXN1bHQgfSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnlEb2MsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShxdWVyeURvYyksXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICFzaG91bGRGZXRjaCxcbiAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZEZldGNoKSB7XG4gICAgICAgICAgICB2YXIgbmV0d29ya1Jlc3VsdCA9IHRoaXMuZmV0Y2hSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeURvYyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBcG9sbG9FcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX1FVRVJZX0VSUk9SJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5SWQ6IHF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVGZXRjaFF1ZXJ5UHJvbWlzZShyZXF1ZXN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1hbmQtbmV0d29yaycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya1Jlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogc3RvcmVSZXN1bHQgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnF1ZXJ5TGlzdGVuZXJGb3JPYnNlcnZlciA9IGZ1bmN0aW9uIChxdWVyeUlkLCBvcHRpb25zLCBvYnNlcnZlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGFzdFJlc3VsdDtcbiAgICAgICAgdmFyIHByZXZpb3VzbHlIYWRFcnJvciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHF1ZXJ5U3RvcmVWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFxdWVyeVN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVyeVN0b3JlVmFsdWUgPSBfdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLnF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICB2YXIgc3RvcmVkUXVlcnkgPSBfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXTtcbiAgICAgICAgICAgIHZhciBmZXRjaFBvbGljeSA9IHN0b3JlZFF1ZXJ5ID8gc3RvcmVkUXVlcnkub2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMuZmV0Y2hQb2xpY3kgOiBvcHRpb25zLmZldGNoUG9saWN5O1xuICAgICAgICAgICAgaWYgKGZldGNoUG9saWN5ID09PSAnc3RhbmRieScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2hvdWxkTm90aWZ5SWZMb2FkaW5nID0gcXVlcnlTdG9yZVZhbHVlLnByZXZpb3VzVmFyaWFibGVzIHx8XG4gICAgICAgICAgICAgICAgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5JyB8fCBmZXRjaFBvbGljeSA9PT0gJ2NhY2hlLWFuZC1uZXR3b3JrJztcbiAgICAgICAgICAgIHZhciBuZXR3b3JrU3RhdHVzQ2hhbmdlZCA9IGxhc3RSZXN1bHQgJiYgcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMgIT09IGxhc3RSZXN1bHQubmV0d29ya1N0YXR1cztcbiAgICAgICAgICAgIGlmICghaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzKSB8fFxuICAgICAgICAgICAgICAgIChuZXR3b3JrU3RhdHVzQ2hhbmdlZCAmJiBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSkgfHxcbiAgICAgICAgICAgICAgICBzaG91bGROb3RpZnlJZkxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzICYmIHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwb2xsb0Vycm9yXzEgPSBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcXVlcnlTdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c2x5SGFkRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoYXBvbGxvRXJyb3JfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBhcG9sbG9FcnJvcl8xOyB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcm9kdWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ0FuIHVuaGFuZGxlZCBlcnJvciB3YXMgdGhyb3duIGJlY2F1c2Ugbm8gZXJyb3IgaGFuZGxlciBpcyByZWdpc3RlcmVkICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yIHRoZSBxdWVyeSAnICsgcXVlcnlTdG9yZVZhbHVlLnF1ZXJ5U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGRpZmZRdWVyeUFnYWluc3RTdG9yZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmU6IF90aGlzLmdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogX3RoaXMucXVlcnlEb2N1bWVudHNbcXVlcnlJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeVN0b3JlVmFsdWUucHJldmlvdXNWYXJpYWJsZXMgfHwgcXVlcnlTdG9yZVZhbHVlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IF90aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IF90aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1Jlc3VsdDogbGFzdFJlc3VsdCAmJiBsYXN0UmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgZGF0YSA9IF9hLnJlc3VsdCwgaXNNaXNzaW5nID0gX2EuaXNNaXNzaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdEZyb21TdG9yZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01pc3NpbmcgJiYgZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEZyb21TdG9yZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbGFzdFJlc3VsdCAmJiBsYXN0UmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGlzTmV0d29ya1JlcXVlc3RJbkZsaWdodChxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJvbVN0b3JlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBpc05ldHdvcmtSZXF1ZXN0SW5GbGlnaHQocXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrU3RhdHVzOiBxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0RpZmZlcmVudFJlc3VsdCA9ICEobGFzdFJlc3VsdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRGcm9tU3RvcmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdC5uZXR3b3JrU3RhdHVzID09PSByZXN1bHRGcm9tU3RvcmUubmV0d29ya1N0YXR1cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVzdWx0LnN0YWxlID09PSByZXN1bHRGcm9tU3RvcmUuc3RhbGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdC5kYXRhID09PSByZXN1bHRGcm9tU3RvcmUuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGlmZmVyZW50UmVzdWx0IHx8IHByZXZpb3VzbHlIYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVzdWx0ID0gcmVzdWx0RnJvbVN0b3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChtYXliZURlZXBGcmVlemUocmVzdWx0RnJvbVN0b3JlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzbHlIYWRFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNseUhhZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS53YXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNob3VsZFN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc2hvdWxkU3Vic2NyaWJlID09PSB2b2lkIDApIHsgc2hvdWxkU3Vic2NyaWJlID0gdHJ1ZTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZXR1cm5QYXJ0aWFsRGF0YSBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBzaW5jZSBBcG9sbG8gQ2xpZW50IDEuMC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5mb3JjZUZldGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvcmNlRmV0Y2ggb3B0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgQXBvbGxvIENsaWVudCAxLjAuIFVzZSBmZXRjaFBvbGljeSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm5vRmV0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm9GZXRjaCBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBzaW5jZSBBcG9sbG8gQ2xpZW50IDEuMC4gVXNlIGZldGNoUG9saWN5IGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdzdGFuZGJ5Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGllbnQud2F0Y2hRdWVyeSBjYW5ub3QgYmUgY2FsbGVkIHdpdGggZmV0Y2hQb2xpY3kgc2V0IHRvIFwic3RhbmRieVwiJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHF1ZXJ5RGVmaW5pdGlvbiA9IGdldFF1ZXJ5RGVmaW5pdGlvbihvcHRpb25zLnF1ZXJ5KTtcbiAgICAgICAgaWYgKHF1ZXJ5RGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zICYmIHF1ZXJ5RGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZXMgPSBnZXREZWZhdWx0VmFsdWVzKHF1ZXJ5RGVmaW5pdGlvbik7XG4gICAgICAgICAgICBvcHRpb25zLnZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZGVmYXVsdFZhbHVlcywgb3B0aW9ucy52YXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lZE9wdGlvbnMgPSBfX2Fzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlUXVlcnkgPSBuZXcgT2JzZXJ2YWJsZVF1ZXJ5KHtcbiAgICAgICAgICAgIHNjaGVkdWxlcjogdGhpcy5zY2hlZHVsZXIsXG4gICAgICAgICAgICBvcHRpb25zOiB0cmFuc2Zvcm1lZE9wdGlvbnMsXG4gICAgICAgICAgICBzaG91bGRTdWJzY3JpYmU6IHNob3VsZFN1YnNjcmliZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlUXVlcnk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFvcHRpb25zLnF1ZXJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3F1ZXJ5IG9wdGlvbiBpcyByZXF1aXJlZC4gWW91IG11c3Qgc3BlY2lmeSB5b3VyIEdyYXBoUUwgZG9jdW1lbnQgaW4gdGhlIHF1ZXJ5IG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5xdWVyeS5raW5kICE9PSAnRG9jdW1lbnQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHdyYXAgdGhlIHF1ZXJ5IHN0cmluZyBpbiBhIFwiZ3FsXCIgdGFnLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnJldHVyblBhcnRpYWxEYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JldHVyblBhcnRpYWxEYXRhIG9wdGlvbiBvbmx5IHN1cHBvcnRlZCBvbiB3YXRjaFF1ZXJ5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2xsSW50ZXJ2YWwgb3B0aW9uIG9ubHkgc3VwcG9ydGVkIG9uIHdhdGNoUXVlcnkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2VGZXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JjZUZldGNoIG9wdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIHNpbmNlIEFwb2xsbyBDbGllbnQgMS4wLiBVc2UgZmV0Y2hQb2xpY3kgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5ub0ZldGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vRmV0Y2ggb3B0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgQXBvbGxvIENsaWVudCAxLjAuIFVzZSBmZXRjaFBvbGljeSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIFwicXVlcnlcIiB3aXRoIFwibm90aWZ5T25OZXR3b3JrU3RhdHVzQ2hhbmdlXCIgb3B0aW9uLiBPbmx5IFwid2F0Y2hRdWVyeVwiIGhhcyB0aGF0IG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSA9IGZhbHNlO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gdGhpcy5pZENvdW50ZXI7XG4gICAgICAgIHZhciByZXNQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMuYWRkRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkLCByZXNQcm9taXNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLndhdGNoUXVlcnkob3B0aW9ucywgZmFsc2UpLnJlc3VsdCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzUHJvbWlzZTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVRdWVyeUlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcXVlcnlJZCA9IHRoaXMuaWRDb3VudGVyLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuaWRDb3VudGVyKys7XG4gICAgICAgIHJldHVybiBxdWVyeUlkO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdG9wUXVlcnlJblN0b3JlID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1FVRVJZX1NUT1AnLFxuICAgICAgICAgICAgcXVlcnlJZDogcXVlcnlJZCxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldEFwb2xsb1N0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWR1eFJvb3RTZWxlY3Rvcih0aGlzLnN0b3JlLmdldFN0YXRlKCkpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zZWxlY3RBcG9sbG9TdGF0ZSA9IGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWR1eFJvb3RTZWxlY3RvcihzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4geyBkYXRhOiB0aGlzLmdldEFwb2xsb1N0YXRlKCkuZGF0YSB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cyh0aGlzLmdldEFwb2xsb1N0YXRlKCkpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5hZGRRdWVyeUxpc3RlbmVyID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMucXVlcnlMaXN0ZW5lcnNbcXVlcnlJZF0gPSB0aGlzLnF1ZXJ5TGlzdGVuZXJzW3F1ZXJ5SWRdIHx8IFtdO1xuICAgICAgICB0aGlzLnF1ZXJ5TGlzdGVuZXJzW3F1ZXJ5SWRdLnB1c2gobGlzdGVuZXIpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5hZGRGZXRjaFF1ZXJ5UHJvbWlzZSA9IGZ1bmN0aW9uIChyZXF1ZXN0SWQsIHByb21pc2UsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGlzLmZldGNoUXVlcnlQcm9taXNlc1tyZXF1ZXN0SWQudG9TdHJpbmcoKV0gPSB7IHByb21pc2U6IHByb21pc2UsIHJlc29sdmU6IHJlc29sdmUsIHJlamVjdDogcmVqZWN0IH07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlID0gZnVuY3Rpb24gKHJlcXVlc3RJZCkge1xuICAgICAgICBkZWxldGUgdGhpcy5mZXRjaFF1ZXJ5UHJvbWlzZXNbcmVxdWVzdElkLnRvU3RyaW5nKCldO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5hZGRPYnNlcnZhYmxlUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb2JzZXJ2YWJsZVF1ZXJ5KSB7XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF0gPSB7IG9ic2VydmFibGVRdWVyeTogb2JzZXJ2YWJsZVF1ZXJ5IH07XG4gICAgICAgIHZhciBxdWVyeURlZiA9IGdldFF1ZXJ5RGVmaW5pdGlvbihvYnNlcnZhYmxlUXVlcnkub3B0aW9ucy5xdWVyeSk7XG4gICAgICAgIGlmIChxdWVyeURlZi5uYW1lICYmIHF1ZXJ5RGVmLm5hbWUudmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeU5hbWUgPSBxdWVyeURlZi5uYW1lLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdID0gdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdLnB1c2gob2JzZXJ2YWJsZVF1ZXJ5LnF1ZXJ5SWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmFibGVRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlUXVlcnkgPSB0aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRdLm9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgdmFyIGRlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ob2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMucXVlcnkpO1xuICAgICAgICB2YXIgcXVlcnlOYW1lID0gZGVmaW5pdGlvbi5uYW1lID8gZGVmaW5pdGlvbi5uYW1lLnZhbHVlIDogbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgIGlmIChxdWVyeU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXSA9IHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXS5maWx0ZXIoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhKG9ic2VydmFibGVRdWVyeS5xdWVyeUlkID09PSB2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucmVzZXRTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mZXRjaFF1ZXJ5UHJvbWlzZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHJlamVjdCA9IF90aGlzLmZldGNoUXVlcnlQcm9taXNlc1trZXldLnJlamVjdDtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1N0b3JlIHJlc2V0IHdoaWxlIHF1ZXJ5IHdhcyBpbiBmbGlnaHQuJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1NUT1JFX1JFU0VUJyxcbiAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeUlkczogT2JqZWN0LmtleXModGhpcy5vYnNlcnZhYmxlUXVlcmllcyksXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZhYmxlUXVlcmllcykuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgdmFyIHN0b3JlUXVlcnkgPSBfdGhpcy5yZWR1eFJvb3RTZWxlY3RvcihfdGhpcy5zdG9yZS5nZXRTdGF0ZSgpKS5xdWVyaWVzW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgdmFyIGZldGNoUG9saWN5ID0gX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF0ub2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMuZmV0Y2hQb2xpY3k7XG4gICAgICAgICAgICBpZiAoZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5JyAmJiBmZXRjaFBvbGljeSAhPT0gJ3N0YW5kYnknKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVF1ZXJ5UHJvbWlzZXMucHVzaChfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXS5vYnNlcnZhYmxlUXVlcnkucmVmZXRjaCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChvYnNlcnZhYmxlUXVlcnlQcm9taXNlcyk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnN0YXJ0UXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgbGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5hZGRRdWVyeUxpc3RlbmVyKHF1ZXJ5SWQsIGxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXJ5KHF1ZXJ5SWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiB1bmRlZmluZWQ7IH0pO1xuICAgICAgICByZXR1cm4gcXVlcnlJZDtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RhcnRHcmFwaFFMU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVkRG9jID0gcXVlcnk7XG4gICAgICAgIGlmICh0aGlzLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZERvYyA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudCh0cmFuc2Zvcm1lZERvYyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhnZXRPcGVyYXRpb25EZWZpbml0aW9uKHF1ZXJ5KSksIG9wdGlvbnMudmFyaWFibGVzKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBxdWVyeTogdHJhbnNmb3JtZWREb2MsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUodHJhbnNmb3JtZWREb2MpLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgc3ViSWQ7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnMuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX1NVQlNDUklQVElPTl9SRVNVTFQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiB0cmFuc2Zvcm1lZERvYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKHRyYW5zZm9ybWVkRG9jKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHsgZGF0YTogcmVzdWx0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uSWQ6IHN1YklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhUmVkdWNlcnM6IF90aGlzLmdldEV4dHJhUmVkdWNlcnMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzdWJJZCA9IF90aGlzLm5ldHdvcmtJbnRlcmZhY2Uuc3Vic2NyaWJlKHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMgPSBvYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvYnMpIHsgcmV0dXJuIG9icyAhPT0gb2JzZXJ2ZXI7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubmV0d29ya0ludGVyZmFjZS51bnN1YnNjcmliZShzdWJJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9uZXR3b3JrU3Vic2NyaXB0aW9uSWQ6IHN1YklkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlMaXN0ZW5lcnNbcXVlcnlJZF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5RG9jdW1lbnRzW3F1ZXJ5SWRdO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdG9wUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVF1ZXJ5KHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLnN0b3BRdWVyeUluU3RvcmUocXVlcnlJZCk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldEN1cnJlbnRRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlUXVlcnksIGlzT3B0aW1pc3RpYykge1xuICAgICAgICBpZiAoaXNPcHRpbWlzdGljID09PSB2b2lkIDApIHsgaXNPcHRpbWlzdGljID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRRdWVyeVBhcnRzKG9ic2VydmFibGVRdWVyeSksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudDtcbiAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSBvYnNlcnZhYmxlUXVlcnkuZ2V0TGFzdFJlc3VsdCgpO1xuICAgICAgICB2YXIgcXVlcnlPcHRpb25zID0gb2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnM7XG4gICAgICAgIHZhciByZWFkT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHN0b3JlOiBpc09wdGltaXN0aWMgPyB0aGlzLmdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoKSA6IHRoaXMuZ2V0QXBvbGxvU3RhdGUoKS5kYXRhLFxuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0OiBsYXN0UmVzdWx0ID8gbGFzdFJlc3VsdC5kYXRhIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByZWFkUXVlcnlGcm9tU3RvcmUocmVhZE9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIG1heWJlRGVlcEZyZWV6ZSh7IGRhdGE6IGRhdGEsIHBhcnRpYWw6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF5YmVEZWVwRnJlZXplKHsgZGF0YToge30sIHBhcnRpYWw6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0UXVlcnlXaXRoUHJldmlvdXNSZXN1bHQgPSBmdW5jdGlvbiAocXVlcnlJZE9yT2JzZXJ2YWJsZSwgaXNPcHRpbWlzdGljKSB7XG4gICAgICAgIGlmIChpc09wdGltaXN0aWMgPT09IHZvaWQgMCkgeyBpc09wdGltaXN0aWMgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5SWRPck9ic2VydmFibGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZE9yT2JzZXJ2YWJsZV0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYnNlcnZhYmxlUXVlcnkgd2l0aCB0aGlzIGlkIGRvZXNuJ3QgZXhpc3Q6IFwiICsgcXVlcnlJZE9yT2JzZXJ2YWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYnNlcnZhYmxlUXVlcnkgPSB0aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRPck9ic2VydmFibGVdLm9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeSA9IHF1ZXJ5SWRPck9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRRdWVyeVBhcnRzKG9ic2VydmFibGVRdWVyeSksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudDtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdldEN1cnJlbnRRdWVyeVJlc3VsdChvYnNlcnZhYmxlUXVlcnksIGlzT3B0aW1pc3RpYykuZGF0YTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBkb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldFF1ZXJ5UGFydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZVF1ZXJ5KSB7XG4gICAgICAgIHZhciBxdWVyeU9wdGlvbnMgPSBvYnNlcnZhYmxlUXVlcnkub3B0aW9ucztcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVkRG9jID0gb2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMucXVlcnk7XG4gICAgICAgIGlmICh0aGlzLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZERvYyA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudCh0cmFuc2Zvcm1lZERvYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnlPcHRpb25zLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIGRvY3VtZW50OiB0cmFuc2Zvcm1lZERvYyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUudHJhbnNmb3JtUXVlcnlEb2N1bWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBxdWVyeURvYyA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgIGlmICh0aGlzLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeURvYyA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeURvYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHF1ZXJ5RG9jOiBxdWVyeURvYyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0RXh0cmFSZWR1Y2VycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXMpLm1hcChmdW5jdGlvbiAob2JzUXVlcnlJZCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbb2JzUXVlcnlJZF0ub2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICAgICAgdmFyIHF1ZXJ5T3B0aW9ucyA9IHF1ZXJ5Lm9wdGlvbnM7XG4gICAgICAgICAgICBpZiAocXVlcnlPcHRpb25zLnJlZHVjZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlU3RvcmVSZWR1Y2VyKHF1ZXJ5T3B0aW9ucy5yZWR1Y2VyLCBfdGhpcy5hZGRUeXBlbmFtZSA/IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeU9wdGlvbnMucXVlcnkpIDogcXVlcnlPcHRpb25zLnF1ZXJ5LCBxdWVyeS52YXJpYWJsZXMgfHwge30sIF90aGlzLnJlZHVjZXJDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAocmVkdWNlcikgeyByZXR1cm4gcmVkdWNlciAhPT0gbnVsbDsgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmZldGNoUmVxdWVzdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gX2EucmVxdWVzdElkLCBxdWVyeUlkID0gX2EucXVlcnlJZCwgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGZldGNoTW9yZUZvclF1ZXJ5SWQgPSBfYS5mZXRjaE1vcmVGb3JRdWVyeUlkO1xuICAgICAgICB2YXIgdmFyaWFibGVzID0gb3B0aW9ucy52YXJpYWJsZXM7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKGRvY3VtZW50KSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJldFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRGZXRjaFF1ZXJ5UHJvbWlzZShyZXF1ZXN0SWQsIHJldFByb21pc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICBfdGhpcy5kZWR1cGxpY2F0b3IucXVlcnkocmVxdWVzdCwgX3RoaXMucXVlcnlEZWR1cGxpY2F0aW9uKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmFSZWR1Y2VycyA9IF90aGlzLmdldEV4dHJhUmVkdWNlcnMoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fUVVFUllfUkVTVUxUJyxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKGRvY3VtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5SWQ6IHF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICBmZXRjaE1vcmVGb3JRdWVyeUlkOiBmZXRjaE1vcmVGb3JRdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICBleHRyYVJlZHVjZXJzOiBleHRyYVJlZHVjZXJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoUUxFcnJvcnM6IHJlc3VsdC5lcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEZyb21TdG9yZTtcbiAgICAgICAgICAgICAgICBpZiAoZmV0Y2hNb3JlRm9yUXVlcnlJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRGcm9tU3RvcmUgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRGcm9tU3RvcmUgPSByZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlOiBfdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZzogX3RoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogX3RoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcmVkdWNlckVycm9yID0gX3RoaXMuZ2V0QXBvbGxvU3RhdGUoKS5yZWR1Y2VyRXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKHJlZHVjZXJFcnJvciAmJiByZWR1Y2VyRXJyb3IucXVlcnlJZCA9PT0gcXVlcnlJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVkdWNlckVycm9yLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogcmVzdWx0RnJvbVN0b3JlLCBsb2FkaW5nOiBmYWxzZSwgbmV0d29ya1N0YXR1czogTmV0d29ya1N0YXR1cy5yZWFkeSwgc3RhbGU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXRQcm9taXNlO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5yZWZldGNoUXVlcnlCeU5hbWUgPSBmdW5jdGlvbiAocXVlcnlOYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZWZldGNoZWRRdWVyaWVzID0gdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdO1xuICAgICAgICBpZiAocmVmZXRjaGVkUXVlcmllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiB1bmtub3duIHF1ZXJ5IHdpdGggbmFtZSBcIiArIHF1ZXJ5TmFtZSArIFwiIGFza2VkIHRvIHJlZmV0Y2hcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocmVmZXRjaGVkUXVlcmllcy5tYXAoZnVuY3Rpb24gKHF1ZXJ5SWQpIHsgcmV0dXJuIF90aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRdLm9ic2VydmFibGVRdWVyeS5yZWZldGNoKCk7IH0pKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5icm9hZGNhc3RRdWVyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcmllcyA9IHRoaXMuZ2V0QXBvbGxvU3RhdGUoKS5xdWVyaWVzO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5TGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gX3RoaXMucXVlcnlMaXN0ZW5lcnNbcXVlcnlJZF07XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHF1ZXJ5U3RvcmVWYWx1ZSA9IHF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihxdWVyeVN0b3JlVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZW5lcmF0ZVJlcXVlc3RJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RJZCA9IHRoaXMuaWRDb3VudGVyO1xuICAgICAgICB0aGlzLmlkQ291bnRlcisrO1xuICAgICAgICByZXR1cm4gcmVxdWVzdElkO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXJ5TWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBRdWVyeU1hbmFnZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXJ5TWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2NvcmUvUXVlcnlNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIiwidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlLCB9IGZyb20gJy4vdHJhbnNwb3J0L25ldHdvcmtJbnRlcmZhY2UnO1xuaW1wb3J0IHsgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyLCB9IGZyb20gJy4vZGF0YS9mcmFnbWVudE1hdGNoZXInO1xuaW1wb3J0IHsgY3JlYXRlQXBvbGxvU3RvcmUsIGNyZWF0ZUFwb2xsb1JlZHVjZXIsIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBRdWVyeU1hbmFnZXIsIH0gZnJvbSAnLi9jb3JlL1F1ZXJ5TWFuYWdlcic7XG5pbXBvcnQgeyBpc1Byb2R1Y3Rpb24sIH0gZnJvbSAnLi91dGlsL2Vudmlyb25tZW50JztcbmltcG9ydCB7IGdldFN0b3JlS2V5TmFtZSwgfSBmcm9tICcuL2RhdGEvc3RvcmVVdGlscyc7XG5pbXBvcnQgeyBSZWR1eERhdGFQcm94eSwgfSBmcm9tICcuL2RhdGEvcHJveHknO1xuaW1wb3J0IHsgdmVyc2lvbiwgfSBmcm9tICcuL3ZlcnNpb24nO1xudmFyIERFRkFVTFRfUkVEVVhfUk9PVF9LRVkgPSAnYXBvbGxvJztcbmZ1bmN0aW9uIGRlZmF1bHRSZWR1eFJvb3RTZWxlY3RvcihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZVtERUZBVUxUX1JFRFVYX1JPT1RfS0VZXTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHREYXRhSWRGcm9tT2JqZWN0KHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQuX190eXBlbmFtZSkge1xuICAgICAgICBpZiAocmVzdWx0LmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuX190eXBlbmFtZSArIFwiOlwiICsgcmVzdWx0LmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQuX2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuX190eXBlbmFtZSArIFwiOlwiICsgcmVzdWx0Ll9pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbnZhciBoYXNTdWdnZXN0ZWREZXZ0b29scyA9IGZhbHNlO1xudmFyIEFwb2xsb0NsaWVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBvbGxvQ2xpZW50KG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0b3JlKHN0b3JlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHsgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzQXBvbGxvU3RhdGUgPSBfdGhpcy5xdWVyeU1hbmFnZXIuc2VsZWN0QXBvbGxvU3RhdGUoc3RvcmUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBuZXh0KGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdBcG9sbG9TdGF0ZSA9IF90aGlzLnF1ZXJ5TWFuYWdlci5zZWxlY3RBcG9sbG9TdGF0ZShzdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdBcG9sbG9TdGF0ZSAhPT0gcHJldmlvdXNBcG9sbG9TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucXVlcnlNYW5hZ2VyLmJyb2FkY2FzdE5ld1N0b3JlKHN0b3JlLmdldFN0YXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kZXZUb29sc0hvb2tDYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGV2VG9vbHNIb29rQ2Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0QXBvbGxvU3RhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIH07IH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZGF0YUlkRnJvbU9iamVjdCA9IG9wdGlvbnMuZGF0YUlkRnJvbU9iamVjdDtcbiAgICAgICAgdmFyIG5ldHdvcmtJbnRlcmZhY2UgPSBvcHRpb25zLm5ldHdvcmtJbnRlcmZhY2UsIHJlZHV4Um9vdFNlbGVjdG9yID0gb3B0aW9ucy5yZWR1eFJvb3RTZWxlY3RvciwgaW5pdGlhbFN0YXRlID0gb3B0aW9ucy5pbml0aWFsU3RhdGUsIF9hID0gb3B0aW9ucy5zc3JNb2RlLCBzc3JNb2RlID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5zc3JGb3JjZUZldGNoRGVsYXksIHNzckZvcmNlRmV0Y2hEZWxheSA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIF9jID0gb3B0aW9ucy5hZGRUeXBlbmFtZSwgYWRkVHlwZW5hbWUgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBjdXN0b21SZXNvbHZlcnMgPSBvcHRpb25zLmN1c3RvbVJlc29sdmVycywgY29ubmVjdFRvRGV2VG9vbHMgPSBvcHRpb25zLmNvbm5lY3RUb0RldlRvb2xzLCBmcmFnbWVudE1hdGNoZXIgPSBvcHRpb25zLmZyYWdtZW50TWF0Y2hlciwgX2QgPSBvcHRpb25zLnF1ZXJ5RGVkdXBsaWNhdGlvbiwgcXVlcnlEZWR1cGxpY2F0aW9uID0gX2QgPT09IHZvaWQgMCA/IHRydWUgOiBfZDtcbiAgICAgICAgaWYgKHR5cGVvZiByZWR1eFJvb3RTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5yZWR1eFJvb3RTZWxlY3RvciA9IHJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWR1eFJvb3RTZWxlY3RvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJyZWR1eFJvb3RTZWxlY3RvclwiIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50TWF0Y2hlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRNYXRjaGVyID0gbmV3IEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudE1hdGNoZXIgPSBmcmFnbWVudE1hdGNoZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ldHdvcmtJbnRlcmZhY2UgJiYgdHlwZW9mIG5ldHdvcmtJbnRlcmZhY2UucmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5uZXR3b3JrSW50ZXJmYWNlID0gX19hc3NpZ24oe30sIG5ldHdvcmtJbnRlcmZhY2UsIHsgcXVlcnk6IGZ1bmN0aW9uIChyZXF1ZXN0KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBuZXR3b3JrSW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVxdWVzdChyZXF1ZXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7IH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtJbnRlcmZhY2UgPSBuZXR3b3JrSW50ZXJmYWNlID8gbmV0d29ya0ludGVyZmFjZSA6XG4gICAgICAgICAgICAgICAgY3JlYXRlTmV0d29ya0ludGVyZmFjZSh7IHVyaTogJy9ncmFwaHFsJyB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZSA/IGluaXRpYWxTdGF0ZSA6IHt9O1xuICAgICAgICB0aGlzLmFkZFR5cGVuYW1lID0gYWRkVHlwZW5hbWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZU5ldHdvcmtGZXRjaGVzID0gc3NyTW9kZSB8fCBzc3JGb3JjZUZldGNoRGVsYXkgPiAwO1xuICAgICAgICB0aGlzLmRhdGFJZCA9IGRhdGFJZEZyb21PYmplY3QgPSBkYXRhSWRGcm9tT2JqZWN0IHx8IGRlZmF1bHREYXRhSWRGcm9tT2JqZWN0O1xuICAgICAgICB0aGlzLmRhdGFJZEZyb21PYmplY3QgPSB0aGlzLmRhdGFJZDtcbiAgICAgICAgdGhpcy5maWVsZFdpdGhBcmdzID0gZ2V0U3RvcmVLZXlOYW1lO1xuICAgICAgICB0aGlzLnF1ZXJ5RGVkdXBsaWNhdGlvbiA9IHF1ZXJ5RGVkdXBsaWNhdGlvbjtcbiAgICAgICAgdGhpcy5zc3JNb2RlID0gc3NyTW9kZTtcbiAgICAgICAgaWYgKHNzckZvcmNlRmV0Y2hEZWxheSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgPSBmYWxzZTsgfSwgc3NyRm9yY2VGZXRjaERlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHVjZXJDb25maWcgPSB7XG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBkYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgY3VzdG9tUmVzb2x2ZXJzOiBjdXN0b21SZXNvbHZlcnMsXG4gICAgICAgICAgICBhZGRUeXBlbmFtZTogYWRkVHlwZW5hbWUsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXI6IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLndhdGNoUXVlcnkgPSB0aGlzLndhdGNoUXVlcnkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tdXRhdGUgPSB0aGlzLm11dGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNldFN0b3JlID0gdGhpcy5zZXRTdG9yZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc2V0U3RvcmUgPSB0aGlzLnJlc2V0U3RvcmUuYmluZCh0aGlzKTtcbiAgICAgICAgdmFyIGRlZmF1bHRDb25uZWN0VG9EZXZUb29scyA9ICFpc1Byb2R1Y3Rpb24oKSAmJlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKCF3aW5kb3cuX19BUE9MTE9fQ0xJRU5UX18pO1xuICAgICAgICBpZiAodHlwZW9mIGNvbm5lY3RUb0RldlRvb2xzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRDb25uZWN0VG9EZXZUb29scyA6IGNvbm5lY3RUb0RldlRvb2xzKSB7XG4gICAgICAgICAgICB3aW5kb3cuX19BUE9MTE9fQ0xJRU5UX18gPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzU3VnZ2VzdGVkRGV2dG9vbHMgJiYgIWlzUHJvZHVjdGlvbigpKSB7XG4gICAgICAgICAgICBoYXNTdWdnZXN0ZWREZXZ0b29scyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy50b3AgPT09IHdpbmRvdy5zZWxmKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19BUE9MTE9fREVWVE9PTFNfR0xPQkFMX0hPT0tfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRG93bmxvYWQgdGhlIEFwb2xsbyBEZXZUb29scyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yIGEgYmV0dGVyIGRldmVsb3BtZW50IGV4cGVyaWVuY2U6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2Nocm9tZS5nb29nbGUuY29tL3dlYnN0b3JlL2RldGFpbC9hcG9sbG8tY2xpZW50LWRldmVsb3Blci10L2pka2tua2tiZWJiYXBpbGdvZWNjY2lnbGtmYm1ibmZtJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53YXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZU5ldHdvcmtGZXRjaGVzICYmIG9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICduZXR3b3JrLW9ubHknKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gX19hc3NpZ24oe30sIG9wdGlvbnMsIHsgZmV0Y2hQb2xpY3k6ICdjYWNoZS1maXJzdCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlNYW5hZ2VyLndhdGNoUXVlcnkob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1hbmQtbmV0d29yaycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FjaGUtYW5kLW5ldHdvcmsgZmV0Y2hQb2xpY3kgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIHdhdGNoUXVlcnknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgJiYgb3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfX2Fzc2lnbih7fSwgb3B0aW9ucywgeyBmZXRjaFBvbGljeTogJ2NhY2hlLWZpcnN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIucXVlcnkob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLm11dGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5tdXRhdGUob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydEdyYXBoUUxTdWJzY3JpcHRpb24ob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRQcm94eSgpLnJlYWRRdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb3h5KCkucmVhZEZyYWdtZW50KG9wdGlvbnMpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb3h5KCkud3JpdGVRdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUud3JpdGVGcmFnbWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRQcm94eSgpLndyaXRlRnJhZ21lbnQob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlZHVjZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVBcG9sbG9SZWR1Y2VyKHRoaXMucmVkdWNlckNvbmZpZyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLl9fYWN0aW9uSG9va0ZvckRldlRvb2xzID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHRoaXMuZGV2VG9vbHNIb29rQ2IgPSBjYjtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuaW5pdFN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlZHV4Um9vdFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbml0aWFsaXplIHRoZSBzdG9yZSBiZWNhdXNlIFwicmVkdXhSb290U2VsZWN0b3JcIiBpcyBwcm92aWRlZC4gJyArXG4gICAgICAgICAgICAgICAgJ3JlZHV4Um9vdFNlbGVjdG9yIHNob3VsZCBvbmx5IGJlIHVzZWQgd2hlbiB0aGUgc3RvcmUgaXMgY3JlYXRlZCBvdXRzaWRlIG9mIHRoZSBjbGllbnQuICcgK1xuICAgICAgICAgICAgICAgICdUaGlzIG1heSBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cyB3aGVuIHF1ZXJ5aW5nIHRoZSBzdG9yZSBpbnRlcm5hbGx5LiAnICtcbiAgICAgICAgICAgICAgICBcIlBsZWFzZSByZW1vdmUgdGhhdCBvcHRpb24gZnJvbSBBcG9sbG9DbGllbnQgY29uc3RydWN0b3IuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RvcmUoY3JlYXRlQXBvbGxvU3RvcmUoe1xuICAgICAgICAgICAgcmVkdXhSb290S2V5OiBERUZBVUxUX1JFRFVYX1JPT1RfS0VZLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOiB0aGlzLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgbG9nZ2VyOiBmdW5jdGlvbiAoc3RvcmUpIHsgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7IHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5leHQoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZGV2VG9vbHNIb29rQ2IpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGV2VG9vbHNIb29rQ2Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogX3RoaXMucXVlcnlNYW5hZ2VyLmdldEFwb2xsb1N0YXRlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cygpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH07IH07IH0sXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVzZXRTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlNYW5hZ2VyID8gdGhpcy5xdWVyeU1hbmFnZXIucmVzZXRTdG9yZSgpIDogbnVsbDtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXRTdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnNldFN0b3JlID0gZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHZhciByZWR1eFJvb3RTZWxlY3RvcjtcbiAgICAgICAgaWYgKHRoaXMucmVkdXhSb290U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJlZHV4Um9vdFNlbGVjdG9yID0gdGhpcy5yZWR1eFJvb3RTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlZHV4Um9vdFNlbGVjdG9yID0gZGVmYXVsdFJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVkdXhSb290U2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4aXN0aW5nIHN0b3JlIGRvZXMgbm90IHVzZSBhcG9sbG9SZWR1Y2VyLiBQbGVhc2UgbWFrZSBzdXJlIHRoZSBzdG9yZSAnICtcbiAgICAgICAgICAgICAgICAnaXMgcHJvcGVybHkgY29uZmlndXJlZCBhbmQgXCJyZWR1eFJvb3RTZWxlY3RvclwiIGlzIGNvcnJlY3RseSBzcGVjaWZpZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlciA9IG5ldyBRdWVyeU1hbmFnZXIoe1xuICAgICAgICAgICAgbmV0d29ya0ludGVyZmFjZTogdGhpcy5uZXR3b3JrSW50ZXJmYWNlLFxuICAgICAgICAgICAgcmVkdXhSb290U2VsZWN0b3I6IHJlZHV4Um9vdFNlbGVjdG9yLFxuICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgYWRkVHlwZW5hbWU6IHRoaXMuYWRkVHlwZW5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyQ29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICBxdWVyeURlZHVwbGljYXRpb246IHRoaXMucXVlcnlEZWR1cGxpY2F0aW9uLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiB0aGlzLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIHNzck1vZGU6IHRoaXMuc3NyTW9kZSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLmluaXRQcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3h5KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRTdG9yZSgpO1xuICAgICAgICAgICAgdGhpcy5wcm94eSA9IG5ldyBSZWR1eERhdGFQcm94eSh0aGlzLnN0b3JlLCB0aGlzLnJlZHV4Um9vdFNlbGVjdG9yIHx8IGRlZmF1bHRSZWR1eFJvb3RTZWxlY3RvciwgdGhpcy5mcmFnbWVudE1hdGNoZXIsIHRoaXMucmVkdWNlckNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJveHk7XG4gICAgfTtcbiAgICByZXR1cm4gQXBvbGxvQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEFwb2xsb0NsaWVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFwb2xsb0NsaWVudC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L0Fwb2xsb0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gbnVsbFxuLy8gbW9kdWxlIGNodW5rcyA9ICIsImltcG9ydCB7IGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UsIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UsIH0gZnJvbSAnLi90cmFuc3BvcnQvbmV0d29ya0ludGVyZmFjZSc7XG5pbXBvcnQgeyBjcmVhdGVCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2UsIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZSwgfSBmcm9tICcuL3RyYW5zcG9ydC9iYXRjaGVkTmV0d29ya0ludGVyZmFjZSc7XG5pbXBvcnQgeyBwcmludCwgfSBmcm9tICdncmFwaHFsL2xhbmd1YWdlL3ByaW50ZXInO1xuaW1wb3J0IHsgY3JlYXRlQXBvbGxvU3RvcmUsIGNyZWF0ZUFwb2xsb1JlZHVjZXIsIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlUXVlcnksIH0gZnJvbSAnLi9jb3JlL09ic2VydmFibGVRdWVyeSc7XG5pbXBvcnQgeyByZWFkUXVlcnlGcm9tU3RvcmUsIH0gZnJvbSAnLi9kYXRhL3JlYWRGcm9tU3RvcmUnO1xuaW1wb3J0IHsgd3JpdGVRdWVyeVRvU3RvcmUsIH0gZnJvbSAnLi9kYXRhL3dyaXRlVG9TdG9yZSc7XG5pbXBvcnQgeyBnZXRRdWVyeURlZmluaXRpb24sIGdldE11dGF0aW9uRGVmaW5pdGlvbiwgZ2V0RnJhZ21lbnREZWZpbml0aW9ucywgY3JlYXRlRnJhZ21lbnRNYXAsIH0gZnJvbSAnLi9xdWVyaWVzL2dldEZyb21BU1QnO1xuaW1wb3J0IHsgTmV0d29ya1N0YXR1cywgfSBmcm9tICcuL3F1ZXJpZXMvbmV0d29ya1N0YXR1cyc7XG5pbXBvcnQgeyBhZGRUeXBlbmFtZVRvRG9jdW1lbnQsIH0gZnJvbSAnLi9xdWVyaWVzL3F1ZXJ5VHJhbnNmb3JtJztcbmltcG9ydCB7IEFwb2xsb0Vycm9yLCB9IGZyb20gJy4vZXJyb3JzL0Fwb2xsb0Vycm9yJztcbmltcG9ydCBBcG9sbG9DbGllbnQgZnJvbSAnLi9BcG9sbG9DbGllbnQnO1xuaW1wb3J0IHsgdG9JZFZhbHVlLCB9IGZyb20gJy4vZGF0YS9zdG9yZVV0aWxzJztcbmltcG9ydCB7IEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIsIH0gZnJvbSAnLi9kYXRhL2ZyYWdtZW50TWF0Y2hlcic7XG5leHBvcnQgeyBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlLCBjcmVhdGVCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2UsIGNyZWF0ZUFwb2xsb1N0b3JlLCBjcmVhdGVBcG9sbG9SZWR1Y2VyLCByZWFkUXVlcnlGcm9tU3RvcmUsIHdyaXRlUXVlcnlUb1N0b3JlLCBhZGRUeXBlbmFtZVRvRG9jdW1lbnQsIGNyZWF0ZUZyYWdtZW50TWFwLCBOZXR3b3JrU3RhdHVzLCBBcG9sbG9FcnJvciwgZ2V0UXVlcnlEZWZpbml0aW9uLCBnZXRNdXRhdGlvbkRlZmluaXRpb24sIGdldEZyYWdtZW50RGVmaW5pdGlvbnMsIHRvSWRWYWx1ZSwgSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlciwgcHJpbnQgYXMgcHJpbnRBU1QsIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UsIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZSwgT2JzZXJ2YWJsZVF1ZXJ5LCBBcG9sbG9DbGllbnQsIH07XG5leHBvcnQgZGVmYXVsdCBBcG9sbG9DbGllbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSBudWxsXG4vLyBtb2R1bGUgY2h1bmtzID0gIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RVQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbnRCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL09BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==