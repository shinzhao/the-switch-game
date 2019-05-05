'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require('./actions');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var complete = function complete(action, success, payload) {
  return (0, _extends3.default)({}, action, {
    payload: payload,
    meta: (0, _extends3.default)({}, action.meta, { success: success, completed: true })
  });
};

var send = function send(action, dispatch, config) {
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var metadata = action.meta.offline;
  dispatch((0, _actions.busy)(true));
  return config.effect(metadata.effect, action).then(function (result) {
    var commitAction = metadata.commit || (0, _extends3.default)({}, config.defaultCommit, {
      meta: (0, _extends3.default)({}, config.defaultCommit.meta, { offlineAction: action })
    });
    try {
      dispatch(complete(commitAction, true, result));
    } catch (e) {
      dispatch(complete({ type: _constants.JS_ERROR, payload: e }, false));
    }
  }).catch(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(error) {
      var rollbackAction, mustDiscard, delay;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rollbackAction = metadata.rollback || (0, _extends3.default)({}, config.defaultRollback, {
                meta: (0, _extends3.default)({}, config.defaultRollback.meta, { offlineAction: action })
              });

              // discard

              mustDiscard = true;
              _context.prev = 2;
              _context.next = 5;
              return config.discard(error, action, retries);

            case 5:
              mustDiscard = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](2);

              console.warn(_context.t0);

            case 11:
              if (mustDiscard) {
                _context.next = 16;
                break;
              }

              delay = config.retry(action, retries);

              if (!(delay != null)) {
                _context.next = 16;
                break;
              }

              dispatch((0, _actions.scheduleRetry)(delay));
              return _context.abrupt('return');

            case 16:

              dispatch(complete(rollbackAction, false, error));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 8]]);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = send;