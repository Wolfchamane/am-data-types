const assert = require('assert');
const AmDataTypesBase = require('../../src/Base');

let sut = AmDataTypesBase.create('Base');
assert.equal(sut instanceof AmDataTypesBase, true, 'AmDataTypesBase is registered as "Base"');
assert.equal(sut.value, null, 'AmDataTypesBase.value -> returns "null" by default');
sut.value = '*';
assert.equal(sut.value, '*', 'AmDataTypesBase.value -> returns "*"');
sut = AmDataTypesBase.create('Base', '*');
assert.equal(sut.value, '*', 'AmDataTypesBase() with value');
