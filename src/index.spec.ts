import * as chai from 'chai';
import { uintToWords } from './index';

const expect = chai.expect;

describe('basic library functionality', () => {

  it('converts a number into a string', () => {

    expect(uintToWords(10)).to.be.a('string');

  });

  it('throws error when input is not a string', () => {

    const test = () => uintToWords('not-a-number' as any);

    expect(test).to.throw(TypeError, 'Input must be an integer');

  });

  it('throws error when input not a positive integer', () => {

    const test = () => uintToWords(-10);

    expect(test).to.throw(RangeError, 'Input must be greater or equal to zero');

  });

  it('throws error when input is too large (>1bn)', () => {

    const test = () => uintToWords(1000000000);

    expect(test).to.throw(RangeError, 'Input must be less than one billion');

  });

});