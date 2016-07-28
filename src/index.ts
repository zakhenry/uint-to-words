/**
 * Main public method to convert a number into the english string representation
 * @param number
 * @returns {string}
 */
export function uintToWords(number: number): string {

  if (!Number.isInteger(number)){
    throw new TypeError('Input must be an integer');
  }

  if (number < 0){
    throw new RangeError('Input must be greater or equal to zero');
  }

  if (number > 999999999){
    throw new RangeError('Input must be less than one billion');
  }

  return '';
}