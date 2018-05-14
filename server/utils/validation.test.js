const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(12541)).toBe(false);
    expect(isRealString(true)).toBe(false);
    expect(isRealString({name: 'Jan'})).toBe(false);
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('            ')).toBe(false);
  });

  it('should allow string with non space characters', () => {
    expect(isRealString('Jan')).toBe(true);
    expect(isRealString('Room')).toBe(true);
    expect(isRealString('blup')).toBe(true);
    expect(isRealString('abc')).toBe(true);
    expect(isRealString('123')).toBe(true);
  });
});
