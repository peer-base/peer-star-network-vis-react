'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _networkVisualization = require('./network-visualization');

var _networkVisualization2 = _interopRequireDefault(_networkVisualization);

var _peerColor = require('./peer-color');

var _peerColor2 = _interopRequireDefault(_peerColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkVis = function (_Component) {
  (0, _inherits3.default)(NetworkVis, _Component);

  function NetworkVis(props) {
    (0, _classCallCheck3.default)(this, NetworkVis);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NetworkVis.__proto__ || Object.getPrototypeOf(NetworkVis)).call(this, props));

    _this.state = {
      initialized: false
    };
    return _this;
  }

  (0, _createClass3.default)(NetworkVis, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.collaboration) {
        return null;
      }

      var statsTable = null;
      var stats = this.state.selectedPeer && this.state[this.state.selectedPeer];

      if (stats) {
        var inboundConnectionCount = stats.connections.inbound.size;
        var inboundConnections = Array.from(stats.connections.inbound).sort().map(function (peerId) {
          return _react2.default.createElement(
            'li',
            null,
            shortPeerId(peerId)
          );
        });

        var outboundConnectionCount = stats.connections.outbound.size;
        var outboundConnections = Array.from(stats.connections.outbound).sort().map(function (peerId) {
          return _react2.default.createElement(
            'li',
            null,
            shortPeerId(peerId)
          );
        });

        stats = _react2.default.createElement(
          'tbody',
          { className: 'small' },
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { colspan: '2', className: 'text-left' },
              _react2.default.createElement(
                'h6',
                null,
                'Connections'
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { scope: 'row' },
              inboundConnectionCount,
              ' inbound connections from:'
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'ul',
                null,
                inboundConnections
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { scope: 'row' },
              outboundConnectionCount,
              ' outbound connections to:'
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'ul',
                null,
                outboundConnections
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { colspan: '2', scope: 'column', className: 'text-left' },
              _react2.default.createElement(
                'h6',
                null,
                'Traffic (bits/sec)'
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Total in'
            ),
            _react2.default.createElement(
              'td',
              null,
              this.toBPS(stats.traffic.total.in)
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Total out'
            ),
            _react2.default.createElement(
              'td',
              null,
              this.toBPS(stats.traffic.total.out)
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { colspan: '2', scope: 'column', className: 'text-left' },
              _react2.default.createElement(
                'h6',
                null,
                'Traffic by peer (bits/sec)'
              )
            )
          ),
          Array.from(stats.traffic.perPeer).map(function (_ref) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                peerId = _ref2[0],
                stats = _ref2[1];

            return _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                shortPeerId(peerId)
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'table',
                  null,
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'th',
                        { scope: 'row' },
                        'In:'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        _this2.toBPS(stats.in)
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'th',
                        { scope: 'row' },
                        'Out:'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        _this2.toBPS(stats.out)
                      )
                    )
                  )
                )
              )
            );
          }),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { colspan: '2', scope: 'column', className: 'text-left' },
              _react2.default.createElement(
                'h6',
                null,
                'Messages (messages / min)'
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Total in'
            ),
            _react2.default.createElement(
              'td',
              null,
              stats.messages.total.in
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Total out'
            ),
            _react2.default.createElement(
              'td',
              null,
              stats.messages.total.out
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { colspan: '2', scope: 'column', className: 'text-left' },
              _react2.default.createElement(
                'h6',
                null,
                'Messages by peer (messages / min)'
              )
            )
          ),
          Array.from(stats.messages.perPeer).map(function (_ref3) {
            var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
                peerId = _ref4[0],
                stats = _ref4[1];

            return _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                shortPeerId(peerId)
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'table',
                  null,
                  _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'th',
                        { scope: 'row' },
                        'In:'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        stats.in
                      )
                    ),
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'th',
                        { scope: 'row' },
                        'Out:'
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        stats.out
                      )
                    )
                  )
                )
              )
            );
          })
        );

        statsTable = _react2.default.createElement(
          'table',
          { className: 'table table-sm table-dark', style: {
              width: '33%',
              float: 'left',
              overflow: 'hidden'
            } },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { scope: 'column', colspan: '2' },
                'Collaboration ',
                this.props.collaboration.name
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                { scope: 'column', colspan: '2' },
                'Stats for ',
                shortPeerId(this.state.selectedPeer)
              )
            )
          ),
          stats
        );
      }

      return _react2.default.createElement(
        'div',
        { style: { width: '100%', height: '600px' } },
        _react2.default.createElement('svg', { style: {
            border: '0.5px solid grey',
            height: '600px',
            width: '66%',
            float: 'left'
          }, ref: 'graph' }),
        this.state.selectedPeer ? statsTable ? statsTable : _react2.default.createElement(
          'p',
          null,
          'Waiting for stats...'
        ) : _react2.default.createElement(
          'p',
          null,
          'Click on peer...'
        )
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this3 = this;

      if (!this.state.initialized && this.refs.graph && this.props.collaboration) {
        var collaboration = this.props.collaboration;

        if (collaboration.app.ipfs.isOnline()) {
          this.initVisualization();
        } else {
          collaboration.app.ipfs.once('ready', function () {
            return _this3.initVisualization();
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._vis) {
        this._vis.stop();
        this._vis.removeAllListeners('selected peer');
        this._vis.removeAllListeners('peer stats updated');
        this._vis = null;
      }
    }
  }, {
    key: 'initVisualization',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({ initialized: true });
                _context.next = 3;
                return (0, _networkVisualization2.default)(this.props.collaboration, this.refs.graph);

              case 3:
                this._vis = _context.sent;

                this._vis.on('selected peer', function (peerId) {
                  console.log('peer selected', peerId);
                  _this4.setState({ selectedPeer: peerId });
                });
                this._vis.on('peer stats updated', function (_ref6) {
                  var peerId = _ref6.peerId,
                      stats = _ref6.stats;

                  var stateMod = {};
                  stateMod[peerId] = stats;
                  _this4.setState(stateMod);
                });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initVisualization() {
        return _ref5.apply(this, arguments);
      }

      return initVisualization;
    }()
  }, {
    key: 'toBPS',
    value: function toBPS(bytes) {
      return toFixed(bytes * 8 / 60, this.props.bpsDecimals || 0);
    }
  }]);
  return NetworkVis;
}(_react.Component);

function shortPeerId(peerId) {
  var shortId = peerId.slice(0, 6) + '…' + peerId.slice(peerId.length - 6);
  var color = (0, _peerColor2.default)(peerId);
  return _react2.default.createElement(
    'span',
    { style: { color: color } },
    shortId
  );
}

function toFixed(value, precision) {
  var precision = precision || 0,
      power = Math.pow(10, precision),
      absValue = Math.abs(Math.round(value * power)),
      result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

  if (precision > 0) {
    var fraction = String(absValue % power),
        padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
    result += '.' + padding + fraction;
  }
  return result;
}

exports.default = NetworkVis;