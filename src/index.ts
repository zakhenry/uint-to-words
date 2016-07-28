import { BASE_NUMBERS, TENS, SEPARATOR, POWERS_OF_TEN } from './phrases';
/**
 * Main public method to convert a number into the english string representation
 * @param input
 * @returns {string}
 */
export function uintToWords(input: number): string {

  return new Converter(input).convert();
}

/**
 * Main conversion class, exported so you can use it directly if desired.
 */
export class Converter {

  /** The original input, constrained to readonly so it can't be accidentally changed */
  protected readonly input: number;

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
   * Process and the finally return the converted value
   * @returns {string}
   */
  public convert(): string {

    if (this.input === 0) {
      return BASE_NUMBERS[0]; //zero is a special case, exit early
    }

    const chunkedThousands: number[] = this.chunkThousands();
    const convertedChunks: string[]  = chunkedThousands.map((chunk: number) => {
      return this.convertHundreds(chunk)
    });

    return this.addSeparators(convertedChunks, chunkedThousands).join(' ');
  }

  /**
   * With provided chunked thousands, insert the separators based on rules of English
   * @param convertedChunks
   * @param chunkedThousands
   * @returns {string[]}
   */
  protected addSeparators(convertedChunks: string[], chunkedThousands: number[]): string[] {
    return convertedChunks.reduce((output: string[], chunk: string, index: number) => {

      //empty chunk like the thousands in 1,000,001
      if (!chunk) {
        return output;
      }

      output.push(chunk);

      //push in the 'thousands', 'millions' etc designators
      if (index < convertedChunks.length - 1) {
        output.push(POWERS_OF_TEN[convertedChunks.length - index + 1]);
      }

      //edge case of adding the penultimate 'and' to the output when number is over 1k
      if (index == convertedChunks.length - 1 //looking at the last chunk
        && chunkedThousands.length > 1 // there are thousands or greater in the output
        && chunkedThousands[index] < 100) { // the final chunk is below 100 so it needs an 'and'
        output.splice(output.length - 1, 0, SEPARATOR);
      }

      return output;
    }, []);
  }

  /**
   * Break up the input into chunks, eg 1,234,567 will become [1, 234, 567]
   * Possible room for performance improvement here as casting to string and back isn't the most
   * efficient
   * @returns {number[]}
   */
  protected chunkThousands(): number[] {

    let chunks: number[]    = [];
    let stringInput: string = String(this.input);
    do {
      let chunk   = stringInput.slice(-3);
      stringInput = stringInput.slice(0, -3);
      chunks.unshift(Number(chunk)); // unshift to maintain the natural order

    } while (stringInput.length > 0);

    return chunks;
  }

  /**
   * Process numbers under 1000 as there is multiple edge cases separate to the greater number
   * system
   * @param input
   * @returns {any}
   */
  protected convertHundreds(input: number): string {

    // zero is handled as a special case
    if (input === 0) {
      return null;
    }

    let output = '';

    // start with the 'X hundred' designator if appropriate
    if (input >= 100) {
      output += BASE_NUMBERS[Math.floor(input / 100)] + ' hundred';
    }

    //get the last two numbers, eg 123 % 100 == 23
    const lastTwo = input % 100;

    // case where the number is 200 for example, no further processing needed
    if (lastTwo === 0) {
      return output;
    }

    // add the 'and' eg in  'one hundred and one'
    if (input >= 100) {
      output += ` ${SEPARATOR} `;
    }

    // teens are statically defined in English, so just look them up
    if (lastTwo < 20) {
      output += BASE_NUMBERS[lastTwo];
    } else {
      // find and concat the tens value, eg forty
      output += TENS[Math.floor(lastTwo / 10)];
      // add the final digit only if required, eg 90 isn't 'ninety zero'
      if (lastTwo % 10 > 0) {
        output += ' ' + BASE_NUMBERS[lastTwo % 10];
      }
    }

    return output;
  }

}