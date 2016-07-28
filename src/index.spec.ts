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

describe('basic number conversions', () => {

  it(`returns 'zero' when number is 0`, () => {
    expect(uintToWords(0)).to.equal(`zero`);
  });

  it(`returns 'ten' when number is 10`, () => {
    expect(uintToWords(10)).to.equal(`ten`);
  });

  it(`returns 'eighteen' when number is 18`, () => {
    expect(uintToWords(18)).to.equal(`eighteen`);
  });

  it(`returns 'twenty three' when number is 23`, () => {
    expect(uintToWords(23)).to.equal(`twenty three`);
  });

  it(`returns 'one hundred and one' when number is 101`, () => {
    expect(uintToWords(101)).to.equal(`one hundred and one`);
  });

  it(`returns 'two hundred' when number is 200`, () => {
    expect(uintToWords(200)).to.equal(`two hundred`);
  });

});

describe('complex conversions', () => {

  it(`returns 'one thousand' when number is 1000`, () => {
    expect(uintToWords(1000)).to.equal(`one thousand`);
  });

  it(`returns 'two thousand and one' when number is 2001`, () => {
    expect(uintToWords(2001)).to.equal(`two thousand and one`);
  });

  it(`returns 'two thousand and forty two' when number is 2042`, () => {
    expect(uintToWords(2042)).to.equal(`two thousand and forty two`);
  });

  it(`returns 'three thousand one hundred and five' when number is 3105`, () => {
    expect(uintToWords(3105)).to.equal(`three thousand one hundred and five`);
  });

  it(`returns 'one million' when number is 1000000`, () => {
    expect(uintToWords(1000000)).to.equal(`one million`);
  });

  it(`returns 'one million and one' when number is 1000001`, () => {
    expect(uintToWords(1000001)).to.equal(`one million and one`);
  });

  it(`returns 'nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine' when number is 999999999`, () => {
    expect(uintToWords(999999999))
      .to
      .equal(`nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine`);
  });

});