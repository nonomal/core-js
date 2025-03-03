/* eslint-disable prefer-spread -- required for testing */
QUnit.test('String.fromCodePoint', assert => {
  const { fromCodePoint } = String;
  assert.isFunction(fromCodePoint);
  assert.arity(fromCodePoint, 1);
  assert.name(fromCodePoint, 'fromCodePoint');
  assert.looksNative(fromCodePoint);
  assert.nonEnumerable(String, 'fromCodePoint');
  assert.same(fromCodePoint(''), '\0');
  assert.same(fromCodePoint(), '');
  assert.same(fromCodePoint(-0), '\0');
  assert.same(fromCodePoint(0), '\0');
  assert.same(fromCodePoint(0x1D306), '\uD834\uDF06');
  assert.same(fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
  assert.same(fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
  assert.same(fromCodePoint(false), '\0');
  assert.same(fromCodePoint(null), '\0');
  assert.throws(() => fromCodePoint('_'), RangeError);
  assert.throws(() => fromCodePoint('+Infinity'), RangeError);
  assert.throws(() => fromCodePoint('-Infinity'), RangeError);
  assert.throws(() => fromCodePoint(-1), RangeError);
  assert.throws(() => fromCodePoint(0x10FFFF + 1), RangeError);
  assert.throws(() => fromCodePoint(3.14), RangeError);
  assert.throws(() => fromCodePoint(3e-2), RangeError);
  assert.throws(() => fromCodePoint(-Infinity), RangeError);
  assert.throws(() => fromCodePoint(Infinity), RangeError);
  assert.throws(() => fromCodePoint(NaN), RangeError);
  assert.throws(() => fromCodePoint(undefined), RangeError);
  assert.throws(() => fromCodePoint({}), RangeError);
  assert.throws(() => fromCodePoint(/./), RangeError);
  let number = 0x60;
  assert.same(fromCodePoint({
    valueOf() {
      return ++number;
    },
  }), 'a');
  assert.same(number, 0x61);
  // one code unit per symbol
  let counter = 2 ** 15 * 3 / 2;
  let result = [];
  while (--counter >= 0) result.push(0);
  // should not throw
  fromCodePoint.apply(null, result);
  counter = 2 ** 15 * 3 / 2;
  result = [];
  while (--counter >= 0) result.push(0xFFFF + 1);
  // should not throw
  fromCodePoint.apply(null, result);
});
