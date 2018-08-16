'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorHash = require('color-hash');

var _colorHash2 = _interopRequireDefault(_colorHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorHash = new _colorHash2.default();

exports.default = function (peerId) {
  return colorHash.hex(peerId.substring(Math.round(peerId.length / 2)));
};