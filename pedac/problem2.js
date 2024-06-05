/* PROBLEM
The Luhn formula is a simple checksum formula to validate a variety of ID numbers, such as
credit card numbers and Canadian Social Insurance Numbers. The formula verifies a number against
its included check digit, which is usually appended to a partial number to generate the full number.
This number must pass the following test:

Counting from the rightmost digit and moving left, double the value of every second digit.
For any digit that becomes 10 or more, subtract 9 from the result.
e.g., 1111 becomes 2121 and 8763 becomes 7733

Add all the digits together: 1111 -> 2121 -> 6; 8763 -> 7733 -> 20
Iff the checksum ends in 0, the number is valid.

Write a program that given a number in string format, checks if a number is valid per the Luhn formula.

Input: string containing digits and possibly non-digit characters
Output: boolean

Questions:
- Will there always be a string?
- If a string contains several separated numbers, should they be treated as one by concatenation?

*/

const { printTestResults } = require("../testing/testingFunctions.cjs");

// EXAMPLES
const examples = [
  {
    in: ['1111'],
    out: false,
  },
  {
    in: ['8763'],
    out: true,
  },
  {
    in: ['101'],
    out: false,
  },
  {
    in: ['5967'],
    out: true,
  },
  {
    in: [' 5967 8763 '],
    out: true,
  },
  {
    in: [''],
    out: false,
  },
  {
    in: [],
    out: false,
  },
  {
    in: ['a1b2'],
    out: false,
  },
  {
    in: ['a8b3'],
    out: true,
  },
];

/* DATA STRUCTURE
Array of digit characters
*/

/* ALGORITHM
HIGH LEVEL
1. If the input is empty or not passed, quit
2. Cast the input to a string
3. Get the digits as an array of numbers in reverse order
4. Iterate over the array with index i:
  - if i is even, convert the digit to a number and double it
5. Sum the digits
6. If the sum is divisible evenly by 10, return true; else return false

DETAIL
getStringDigits:
1. Split the string into characters
2. Filter out non-digit characters
3. Cast characters to numbers and return the array
*/
function luhnChecksum(rawNum) {
  if (!rawNum) return false;

  const digits = String(rawNum).match(/\d/g);
  const reversed = digits.join('').split('').reverse().map(Number);
  const transformed = reversed.map((digit, i) => {
    if (i % 2 === 0) return digit;
    const doubled = digit * 2;
    return doubled >= 10 ? doubled - 9 : doubled;
  });
  const sum = transformed.reduce((sum, digit) => sum + digit);
  return sum % 10 === 0;
}

printTestResults(examples, luhnChecksum, { failsOnly: true });