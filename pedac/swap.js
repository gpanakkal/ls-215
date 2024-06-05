/* PROBLEM
Write a function 'swap' that takes a string argument and returns a new string where the alphabetic
characters have taken the place of the numeric characters and vice versa

input: string containing numbers and characters
output: string

Questions
- What if the string is missing either numbers or characters?
- What about other characters?

Rules
- If there is a mismatch in the number of letters or numbers, the remainder of the larger set are unchanged.
- The nth letter is swapped with the nth number.

DATA STRUCTURE
- Two arrays (letters and numbers) containing objects of form { character, originalIndex }

ALGORITHM
1. Parse the input string into the data structures
  - Iterate through each character, assigning it to the appropriate structure
2. Iterate through the shorter of the two arrays with index `i`:
  - add a key newIndex holding the originalIndex of the character at the same `i` on the other array if one exists, or its own originalIndex otherwise.
3. Create a new array merging the two data structures, sort it on newIndex ascending
4. Map the merged array to the character key on each element
5. Join the mapped array into a string and return it

*/
// EXAMPLES
const { printTestResults } = require('../testing/testingFunctions.cjs');

const examples = [
  {
    in: ['1a2b3c'],
    out: 'a1b2c3',
  },
  {
    in: ['abcd123'],
    out: '123dabc',
  },
  {
    in: ['ab12345cd'],
    out: '12abcd534',
  },
  {
    in: ['123'],
    out: '123',
  },
  {
    in: ['abc'],
    out: 'abc',
  },
  {
    in: [''],
    out: '',
  },
  {
    in: ['123-4a#b$'],
    out: 'ab3-41#2$',
  },
];

function swap(str) {
  const letters = [], numbers = [], otherChars = [];
  [].forEach.call(str, (char, i) => {
    const isLetter = /[a-z]/i.test(char);
    const isNumber = /\d/.test(char);
    const record = { character: char, originalIndex: i };
    if (isLetter) letters.push(record);
    else if (isNumber) numbers.push(record);
    else otherChars.push(record);
  });
  const longest = Math.max(letters.length, numbers.length);
  for (let i = 0; i < longest; i += 1) {
    const [letter, number, other] = [letters[i], numbers[i], otherChars[i]];
    if (letter) letter.newIndex = number?.originalIndex ?? letter.originalIndex;
    if (number) number.newIndex = letter?.originalIndex ?? number.originalIndex;
    if (other) other.newIndex = other.originalIndex;
  };
  const merged = [...letters, ...numbers, ...otherChars].sort((a, b) => a.newIndex - b.newIndex);
  const chars = merged.map((entry) => entry.character);
  console.log({input: str, merged, chars})
  return chars.join('');
};

printTestResults(examples, swap, { failsOnly: false });
