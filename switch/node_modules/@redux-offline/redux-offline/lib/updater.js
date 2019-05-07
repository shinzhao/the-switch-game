'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceReducer = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global $Shape */

var enqueue = function enqueue(state, action) {
  var transaction = state.lastTransaction + 1;
  var stamped = (0, _extends3.default)({}, action, { meta: (0, _extends3.default)({}, action.meta, { transaction: transaction }) });
  var outbox = state.outbox;

  return (0, _extends3.default)({}, state, {
    lastTransaction: transaction,
    outbox: [].concat((0, _toConsumableArray3.default)(outbox), [stamped])
  });
};

var dequeue = function dequeue(state) {
  var _state$outbox = (0, _toArray3.default)(state.outbox),
      rest = _state$outbox.slice(1);

  return (0, _extends3.default)({}, state, {
    outbox: rest,
    retryCount: 0,
    busy: false
  });
};

var initialState = {
  busy: false,
  lastTransaction: 0,
  online: false,
  outbox: [],
  retryCount: 0,
  retryScheduled: false,
  netInfo: {
    isConnectionExpensive: null,
    reach: 'NONE'
  }
};

// @TODO: the typing of this is all kinds of wack

var offlineUpdater = function offlineUpdater() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  // Update online/offline status
  if (action.type === _constants.OFFLINE_STATUS_CHANGED && action.payload && typeof action.payload.online === 'boolean') {
    return (0, _extends3.default)({}, state, {
      online: action.payload.online,
      netInfo: action.payload.netInfo
    });
  }

  if (action.type === _constants.PERSIST_REHYDRATE) {
    return (0, _extends3.default)({}, state, action.payload.offline, {
      online: state.online,
      netInfo: state.netInfo,
      retryScheduled: initialState.retryScheduled,
      retryCount: initialState.retryCount,
      busy: initialState.busy
    });
  }

  if (action.type === _constants.OFFLINE_SCHEDULE_RETRY) {
    return (0, _extends3.default)({}, state, {
      busy: false,
      retryScheduled: true,
      retryCount: state.retryCount + 1
    });
  }

  if (action.type === _constants.OFFLINE_COMPLETE_RETRY) {
    return (0, _extends3.default)({}, state, { retryScheduled: false });
  }

  if (action.type === _constants.OFFLINE_BUSY && action.payload && typeof action.payload.busy === 'boolean') {
    return (0, _extends3.default)({}, state, { busy: action.payload.busy });
  }

  // Add offline actions to queue
  if (action.meta && action.meta.offline) {
    return enqueue(state, action);
  }

  // Remove completed actions from queue (success or fail)
  if (action.meta && action.meta.completed === true) {
    return dequeue(state);
  }

  if (action.type === _constants.RESET_STATE) {
    return (0, _extends3.default)({}, initialState, { online: state.online, netInfo: state.netInfo });
  }

  return state;
};

var enhanceReducer = exports.enhanceReducer = function enhanceReducer(reducer, config) {
  return function (state, action) {
    var offlineState = void 0;
    var restState = void 0;
    if (typeof state !== 'undefined') {
      offlineState = config.offlineStateLens(state).get;
      restState = config.offlineStateLens(state).set();
    }

    return config.offlineStateLens(reducer(restState, action)).set(offlineUpdater(offlineState, action));
  };
};