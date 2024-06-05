/* PROBLEM
Write a program that cleans up user-entered phone numbers so that they can be sent as SMS messages.
Other than digits, the number may also contain special characters such as spaces, dashes, dots, and
parentheses that should be ignored.

Inputs: a string containing a phone number
Output: a cleaned up phone number

Questions:
- Should the output be a string of the 10 digit number?
- Will an argument always be passed?
- Can other special characters be included other than spaces, ( ) . -?
- Will there always be at least one digit?
- Is a number invalid if parentheses exist around digits other than the first 3?

Rules:
- The number must contain 10 or 11 digits.
  - If 11 digits long, the first number must be 1, and should be trimmed out.
- Any other number is bad.
*/

const { printTestResults } = require("../testing/testingFunctions.cjs");

// EXAMPLES
const examples = [
  {
    in: ['100 102 2045'],
    out: '1001022045',
  },
  {
    in: ['100-102-2045'],
    out: '1001022045',
  },
  {
    in: ['(100) 102 2045'],
    out: '1001022045',
  },
  {
    in: ['(100) 102-2045'],
    out: '1001022045',
  },
  {
    in: ['(100)102-2045'],
    out: '1001022045',
  },
  {
    in: ['(100)-102 2045'],
    out: '1001022045',
  },
  {
    in: ['(100)-102--2045'],
    out: '1001022045',
  },
  {
    in: [' 1001022045.'],
    out: '1001022045',
  },
  {
    in: ['#1001022045.'],
    out: '1001022045',
  },
  {
    in: ['#(100).102-.2045.'],
    out: '1001022045',
  },
  {
    in: ['+1 100 102 2045'],
    out: '1001022045',
  },
  {
    in: ['+2 100 102 2045'],
    out: '0000000000',
  },
  {
    in: ['100 102 204567'],
    out: '0000000000',
  },
  {
    in: ['102-2045'],
    out: '0000000000',
  },
  {
    in: ['101022045'],
    out: '0000000000',
  },
  {
    in: ['+2 100 102 2045'],
    out: '0000000000',
  },
  {
    in: [''],
    out: '0000000000',
  },
  {
    in: [],
    out: '0000000000',
  },
];

/* DATA STRUCTURE
  Store the string characters in an array which is filtered for numeric values only
*/

/* ALGORITHM

1. If the input is empty or not passed, quit
2. Cast the input to a string
3. Split the string into characters
4. Filter the character array:
  - Verify the character is a digit
5. If the filtered array is not exactly 10 or 11 digits long, return error string
6. If 11 digits long:
  - If the first digit is not '1', return error string
  - Return the other 10 digits as a joined string
  else:
    - return the digits as a joined string

*/

// CODE

const cleanPhoneNumber = (rawNumber) => {
  const DEFAULT_NUMBER = '0000000000';
  if (!rawNumber) return DEFAULT_NUMBER;

  const chars = String(rawNumber).split('');
  const digits = chars.filter((char) => /^\d$/.test(char));
  if (digits.length < 10 || digits.length > 11) return DEFAULT_NUMBER;
  if (digits.length === 11 && digits[0] !== '1') return DEFAULT_NUMBER;

  return digits.slice(-10).join('');
};

printTestResults(examples, cleanPhoneNumber, { failsOnly: true });