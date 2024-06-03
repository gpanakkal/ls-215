/**
 * Write a function that performs octal to decimal conversion.
 * When invoked on a string that contains an octal number,
 * return the decimal version of that value as a number.
 * Implement the conversion yourself.
 * 
 * 
 */

function octalToDecimal(octalNum) {
  const octalDigits = String(octalNum).split('').reverse();
  const digitDecimalValues = octalDigits.map((octalDigit, i) => octalDigit * 8 ** i);
  return digitDecimalValues.reduce((sum, curr) => sum + curr, 0);
}

console.log(octalToDecimal('1'));           // 1
console.log(octalToDecimal('10'));          // 8
console.log(octalToDecimal('130'));         // 88
console.log(octalToDecimal('17'));          // 15
console.log(octalToDecimal('2047'));        // 1063
console.log(octalToDecimal('011'));         // 9