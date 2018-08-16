'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _peerColor = require('./peer-color');

var _peerColor2 = _interopRequireDefault(_peerColor);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d3 = require('d3');

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(collaboration, graph) {
    var id, emitter, nodes, links, svg, bbox, width, height, simulation, g, link, node, restart, onPeerStatsUpdated, onMembershipChanged, ticked, dragStarted, dragged, dragEnded, syncFromStats;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            syncFromStats = function syncFromStats(peerId, stats) {
              var changed = false;
              var found = nodes.find(function (node) {
                return node.id === peerId;
              });
              if (!found) {
                return false;
              }

              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                var _loop2 = function _loop2() {
                  var connectedToPeerId = _step2.value;

                  console.log('links:', links);
                  var link = links.find(function (link) {
                    return link.source.id === peerId && link.target.id === connectedToPeerId;
                  });
                  if (!link) {
                    var targetExists = nodes.find(function (node) {
                      return node.id === connectedToPeerId;
                    });
                    if (targetExists) {
                      changed = true;
                      var peerTraffic = stats.traffic.perPeer.get(connectedToPeerId);
                      var outboundTraffic = peerTraffic && peerTraffic.out || 0;
                      console.log('outboundTraffic:', outboundTraffic);
                      links.push({ source: peerId, target: connectedToPeerId, traffic: outboundTraffic });
                    }
                  } else {
                    var _peerTraffic = stats.traffic.perPeer.get(connectedToPeerId);
                    var _outboundTraffic = _peerTraffic && _peerTraffic.out || 0;
                    if (_outboundTraffic !== link.traffic) {
                      link.traffic = _outboundTraffic;
                      changed = true;
                    }
                  }
                };

                for (var _iterator2 = stats.connections.outbound[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _loop2();
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              return changed;
            };

            dragEnded = function dragEnded(d) {
              if (!d3.event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            };

            dragged = function dragged(d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            };

            dragStarted = function dragStarted(d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            };

            ticked = function ticked() {
              if (!node) {
                return;
              }

              link.attr('x1', function (d) {
                return d.source.x;
              }).attr('y1', function (d) {
                return d.source.y;
              }).attr('x2', function (d) {
                return d.target.x - (d.target.x - d.source.x) / 2;
              }).attr('y2', function (d) {
                return d.target.y - (d.target.y - d.source.y) / 2;
              });

              node.attr('cx', function (d) {
                return d.x;
              }).attr('cy', function (d) {
                return d.y;
              });
            };

            _context.next = 7;
            return collaboration.app.ipfs.id();

          case 7:
            id = _context.sent.id;
            emitter = new _events2.default();
            nodes = [{ id: id, me: true }];
            links = [];
            svg = d3.select(graph);
            bbox = svg.node().getBoundingClientRect();
            width = bbox.width, height = bbox.height;

            console.log('width:', width);
            console.log('height:', height);

            simulation = d3.forceSimulation().force('link', d3.forceLink(links).id(function (d) {
              return d.id;
            }).distance(100)).force('charge', d3.forceManyBody().strength(-50)).force('center', d3.forceCenter(0, 0)).alphaTarget(1).on('tick', ticked);
            g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
            link = g.append('g').selectAll('.link');
            node = g.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node');

            restart = function restart() {
              // Apply the general update pattern to the nodes.
              node = node.data(nodes, function (d) {
                return d.id;
              });
              node.exit().remove();
              node = node.enter().append('circle')
              // .data('id', (d) => d.id)
              .attr('class', 'node').attr('id', function (d) {
                return d.id;
              }).attr('fill', function (d) {
                return (0, _peerColor2.default)(d.id);
              }).attr('r', function (node) {
                return node.me ? 16 : 8;
              }).merge(node).on('click', function () {
                node.attr('stroke', '#fff');
                var selection = d3.select(this);
                console.log('selection:', selection);
                selection.attr('stroke', '#000');
                emitter.emit('selected peer', this.id);
              }).call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded));

              // Apply the general update pattern to the links.
              link = link.data(links, function (d) {
                return d.source.id + '-' + d.target.id;
              });
              link.attr('stroke', function (d) {
                return (0, _peerColor2.default)(d.source.id);
              });
              link.attr('stroke-width', function (d) {
                return Math.max(Math.sqrt(d.traffic / 5), 0.5);
              });
              link.exit().remove();
              link = link.enter().append('line').merge(link);

              // Update and restart the simulation.
              simulation.nodes(nodes);
              simulation.force('link').links(links);
              simulation.alpha(1).restart();
            };

            onPeerStatsUpdated = function onPeerStatsUpdated(peerId, stats) {
              console.log('peer updated', peerId, stats);
              var changed = syncFromStats(peerId, stats);
              if (changed) {
                restart();
              }
              emitter.emit('peer stats updated', { peerId: peerId, stats: stats });
            };

            collaboration.stats.on('peer updated', onPeerStatsUpdated);

            onMembershipChanged = function onMembershipChanged(peers) {
              console.log('membership changed', peers);
              var changed = false;
              nodes = nodes.filter(function (node) {
                return node.me || peers.has(node.id);
              });
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                var _loop = function _loop() {
                  var peerId = _step.value;

                  var found = nodes.find(function (node) {
                    return node.id === peerId;
                  });
                  if (!found) {
                    changed = true;
                    nodes.push({ id: peerId });
                  }
                };

                for (var _iterator = peers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              links = links.filter(function (link) {
                var has = peers.has(link.source.id) && peers.has(link.target.id);
                if (!has) {
                  changed = true;
                }
                return has;
              });

              if (changed) {
                restart();
              }
            };

            restart();

            collaboration.on('membership changed', onMembershipChanged);

            return _context.abrupt('return', Object.assign(emitter, {
              stop: function stop() {
                collaboration.stats.removeListener('peer updated', onPeerStatsUpdated);
                collaboration.removeListener('membership changed', onMembershipChanged);
                simulation.on('tick', null);
              }
            }));

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function initVisualization(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return initVisualization;
}();