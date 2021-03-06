var _ = require('lodash');
var assert = require('assert');

var utils = require('../lib/utils');

function hookMaker(name) {
  return function() {
    return utils.hookObject(name, 'test', arguments);
  };
}

describe('hook utilities', function() {
  it('.hookObject', function() {
    // find
    assert.deepEqual(hookMaker('find')({ some: 'thing' }, _.noop), {
      params: { some: 'thing' },
      method: 'find',
      type: 'test',
      callback: _.noop
    });

    // get
    assert.deepEqual(hookMaker('get')(1, { some: 'thing' }, _.noop), {
      id: 1,
      params: { some: 'thing' },
      method: 'get',
      type: 'test',
      callback: _.noop
    });

    // remove
    assert.deepEqual(hookMaker('remove')(1, { some: 'thing' }, _.noop), {
      id: 1,
      params: { some: 'thing' },
      method: 'remove',
      type: 'test',
      callback: _.noop
    });

    // create
    assert.deepEqual(hookMaker('create')({ my: 'data' }, { some: 'thing' }, _.noop), {
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'create',
      type: 'test',
      callback: _.noop
    });

    // update
    assert.deepEqual(hookMaker('update')(2, { my: 'data' }, { some: 'thing' }, _.noop), {
      id: 2,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'update',
      type: 'test',
      callback: _.noop
    });

    // patch
    assert.deepEqual(hookMaker('patch')(2, { my: 'data' }, { some: 'thing' }, _.noop), {
      id: 2,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'patch',
      type: 'test',
      callback: _.noop
    });
  });

  it('.makeArguments', function() {
    var args = utils.makeArguments({
      id: 2,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'update',
      callback: _.noop
    });

    assert.deepEqual(args, [2, { my: 'data' }, { some: 'thing' }, _.noop]);

    args = utils.makeArguments({
      id: 0,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'update',
      callback: _.noop
    });

    assert.deepEqual(args, [0, { my: 'data' }, { some: 'thing' }, _.noop]);

    args = utils.makeArguments({
      params: { some: 'thing' },
      method: 'find',
      callback: _.noop
    });

    assert.deepEqual(args, [
      { some: 'thing' },
      _.noop
    ]);
  });

  it('.convertHookData', function() {
    assert.deepEqual(utils.convertHookData('test'), {
      all: [ 'test' ]
    });

    assert.deepEqual(utils.convertHookData([ 'test', 'me' ]), {
      all: [ 'test', 'me' ]
    });

    assert.deepEqual(utils.convertHookData({
      all: 'thing',
      other: 'value',
      hi: [ 'foo', 'bar' ]
    }), {
      all: [ 'thing' ],
      other: [ 'value' ],
      hi: [ 'foo', 'bar' ]
    });
  });
});
