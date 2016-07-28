import { BASE_NUMBERS, TENS, SEPARATOR } from './phrases';
/**
 * Main public method to convert a number into the english string representation
 * @param input
 * @returns {string}
 */
export function uintToWords(input: number): string {

  return new Converter(input).convert();
}

class Converter {

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
   * Return the finally converted value
   * @returns {string}
   */
  public convert(): string {

    if (this.input === 0){
      return BASE_NUMBERS[0]; //zero is a special case, exit early
    }

    const chunkedThousands:number[] = this.chunkThousands();
    const convertedChunks:string[] = chunkedThousands.map((chunk:number) =>
      Converter.convertHundreds(chunk));

    return convertedChunks.join(', ');
  }

  protected chunkThousands(): number[] {

    let thousands:number[] = [];
    let stringInput: string = String(this.input);
    do {
      let chunk   = stringInput.slice(-3);
      stringInput = stringInput.slice(0, -3);
      thousands.unshift(Number(chunk));

    } while (stringInput.length > 0);

    return thousands;

  }

  private static convertHundreds(input:number): string {

    let output = '';

    if (input >= 100){
      output += BASE_NUMBERS[Math.floor(input / 100)] + ' hundred';
    }

    const lastTwo = input % 100;

    if (lastTwo === 0){
      return output; //zero is handled as a special case
    }

    if(input >= 100){ //hundred value added
      output += ` ${SEPARATOR} `;
    }

    if (lastTwo < 20) { // handle teens etc
      output += BASE_NUMBERS[lastTwo];
    } else {
      output += TENS[Math.floor(lastTwo / 10)];
      if (lastTwo % 10 > 0) {
        output += ' ' + BASE_NUMBERS[lastTwo % 10];
      }
    }

    return output;

  }

}