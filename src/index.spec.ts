import { foo } from './index';
import * as chai from 'chai';

const expect = chai.expect;

describe('a test suite', () => {

  it('foo should be bar', () => {

    expect(foo).to.eq('bar');

  });

});