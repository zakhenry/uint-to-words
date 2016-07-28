/**
 * Main public method to convert a number into the english string representation
 * @param input
 * @returns {string}
 */
export function uintToWords(input: number): string {

  return new Converter(input).convert();
}

class Converter {

  private readonly input: number;

  constructor(inputNumber: number) {
    this.input = inputNumber;
    this.validate();
  }

  /**
   * Validate the input, throws instanceof Error if invalid
   * @returns {boolean}
   */
  protected validate(): boolean {

    if (!Number.isInteger(this.input)) {
      throw new TypeError('Input must be an integer');
    }

    if (this.input < 0) {
      throw new RangeError('Input must be greater or equal to zero');
    }

    if (this.input > 999999999) {
      throw new RangeError('Input must be less than one billion');
    }

    return true;
  }

  /**
   * Return the finally converted value
   * @returns {string}
   */
  public convert(): string {
    return '';
  }

}