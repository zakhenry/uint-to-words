# uint-to-words
Converts unsigned integers into english words

## Install
```sh
npm i uint-to-words --save
```

## Usage
*with Typescript*
```javascript
import { uintToWords } from 'uint-to-words';

console.log(uintToWords(101));
// "one hundred and one"

```
*with Javascript*
```javascript
const { uintToWords } = require('uint-to-words');

console.log(uintToWords(101));
// "one hundred and one"
```

## Limitations
Currently supports integers `0 - 999,999,999`. Will throw `RangeError` if out of range, or `TypeError` if input is not an int.
