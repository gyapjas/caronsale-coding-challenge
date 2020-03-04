import 'mocha';
import { expect } from 'chai';

import { hashPassword } from './passwordHelper';

describe('#hashPassword', () => {
  // small tip: use this spec when u need to login into API on WEB, dont forget NOT to check-in into repo
  // change 1st `foo` to plain password and u will see the hashed one in error message as spec fails 
  const hashedFoo = 'a5916f44d73131c21b7b447b36936a1ee31022115baa5cb683b8a420463ee55942755971ccd7d35a8a61993ee1ff6555abf8bf2556f15e8e59467d273c3b12e1'
  it(`should return ${hashedFoo}, when password is \`foo\` and cycles not given`, () => {
    expect(hashPassword('foo')).eq(hashedFoo);
  });

  it('should return without `cycles` the same as if `cycles` equal 5 would be given (default)', () => {
    expect(hashPassword('foo')).eq(hashPassword('foo', 5));
  })

  it('should return plainPassword, when `cycles` less than 0', () => {
    expect(hashPassword('foo', -100)).eq('foo');
  });

  it('should return plainPassword, when `cycles` equal 0', () => {
    expect(hashPassword('foo', 0)).eq('foo');
  });

  it('should return plainPassword, when `cycles` greater than 100', () => {
    expect(hashPassword('foo', 101)).eq('foo');
  });

  it('should return for faulty plainPassword the same as for empty string', () => {
    expect(hashPassword(undefined)).eq(hashPassword(''));
    expect(hashPassword(null)).eq(hashPassword(''));
  });
});
