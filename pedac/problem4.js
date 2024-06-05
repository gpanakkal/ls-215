/* DESCRIPTION

Given a list of numbers in a short-hand range where only the significant part of the
next number is written because we know the numbers are always increasing, e.g.,:
"1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21], return a list of complete numbers.

Sequential numbers are compressed to ranges using "-", ":", "..", e.g., (1, 2, 3) can be '1-3'

Input: a list of numbers as a string
Output: a list of complete numbers

Questions:
- What if list empty/not provided?
- What if a range spans multiple omitted digits? e.g., (9, 10, 11) becomes 9-1? What if the
  earlier digits in the range are lower than the final one, e.g., one through twelve becomes 1-2?
- Should the returned numbers be of number or string type?
- Could invalid characters be in the input? How should they be handled?
- What if two numbers in a range are the same, e.g., 1:1? Is that 1 to 11, or 1 to 1?

Rules
- If 
*/

const { printTestResults } = require("../testing/testingFunctions.cjs");

// EXAMPLES
const sequentials = (start, end) => {
  const [startNum, endNum] = [Number(start), Number(end)];
  const rawNums = new Array(endNum - startNum + 1).fill(null).map((_, index) => String(index + startNum));
  const targetLength = rawNums[0].toString().length;
  const formattedNums = rawNums.map((fullNum) => Number(fullNum.slice(fullNum.length - targetLength)));
  return formattedNums;
};

const examples = [
  {
    in: ["1, 3, 7, 2, 4, 1"],
    out: [1, 3, 7, 12, 14, 21],
  },
  {
    in: ["1-3, 1-2"],
    out: [1, 2, 3, 11, 12],
  },
  {
    in: ["1:5:2"],
    out: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    in: ["104-2"],
    out: [104, 105, 106, 107, 108, 109, 110, 111, 112],
  },
  {
    in: ["104-02"],
    out: sequentials(104, 202),
  },
  {
    in: ["545, 64:11"],
    out: [545].concat(sequentials(564, 611)),
  },
  {
    in: [""],
    out: [],
  },
  {
    in: [],
    out: null,
  },
  {
    in: ["8545, 64:11, 22-3:15"],
    out: [8545].concat(sequentials(8564, 8611), sequentials(8622, 8715)),
  },
];

/* DATA STRUCTURE
Array to push numbers to
*/

/* ALGORITHM
HIGH LEVEL
1. If no input passed quit
2. If the input is empty return an empty array
3. Split the input string on commas
4. reduce over the array to spread ranges
  - 
5. Iterate again over the array to append insignificant digits as needed

DETAILED
1. If no input passed quit
2. If the input is empty return an empty array
3. Split the input string on commas
4. Reduce the split string's elements with element `segment` and index `i` and `initialValue = []`:
  - If the string contains a non-separator, non-digit character, return the accumulator
  - split the segment into a range invoking parseRange
  - loop over the split range: 
    - get the previousNumber `acc[acc.length - 1]`
    - get the insignificant digits from `previousNumber` and `segment`
    - prepend insignificant digits to `segment`
    - push the result to the accumulator
  - return the accumulator
5. Return the reduced array

8:4:2 should become [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
rangeSplit(rangeString): string[]
1. Split on the separators to get `rangeSplit`
2. Reduce the split:
    For each pair of consecutive numbers in the split:
      - Get the significant digits for the range from the last number in `acc`
      - If the numbers in the pair have fewer digits, add digits from the previous number to pad
        the start

3. Eliminate consecutive duplicates

(564, 100) => 600
(120, 02) => 222
getDifference(previousNumber, segment): string
- Get n leading digits of `previousNumber` missing from `segment`
1. Convert both numbers to number
2. 

DETAILED 2
1. If no input passed quit
2. If the input is empty return an empty array
3. Split the input string on commas
4. Reduce the mapped array to a new array:
  - If the segment contains separators: 
    - return accumulator with return value of rangeSplit concatenated
  - Else:
    - Return the accumulator with the modified segment concatenated to it

rangeSplit(previous, range)
- take the accumulator's last number and add significant digits, e.g., 564, 46:100 => 646:700
- get the sequential values for each range
*/

// CODE
const SEPARATORS = ['-', ':', '..'];
const separatorPattern = new RegExp(`[${SEPARATORS.join('')}]`);
const containsInvalidCharacters = (str) => new RegExp(`[^${SEPARATORS.join('')}\\d]`).test(str);

// get the smallest number larger than `previous` that ends in `current`
const nextMatch = (previous, current) => {
  if (!previous) return Number(current);
  if (Number(current) === 100) current = '00'; 
  const [prevNum, currNum] = [Number(previous), Number(current)];
  const places = (10 ** (String(current).length))
  const rounded = Math.floor(prevNum / places);
  const firstMatch = (rounded * 10 ** String(current).length) + currNum;
  const secondMatch = ((rounded + 1) * 10 ** String(current).length) + currNum;
  const finalMatch = firstMatch < prevNum ? secondMatch : firstMatch;
  return finalMatch; 
}

const rangeSplit = (range, previousNum = undefined) => {
  const split = range.split(separatorPattern);
  if (split.length === 1) return split;
  return split.reduce((acc, curr, i) => {
    if (i === split.length - 1) return acc;
    const previous = Number(acc[acc.length - 1]) || Number(previousNum) || 0;
    let current = i === 0 ? Number(curr) : Number(curr) + 1; 
    if (current < previous) {
      current = nextMatch(previous, current);
    }
    let rangeEnd = nextMatch(current, split[i + 1]);
    if (rangeEnd < current) rangeEnd = nextMatch(current, rangeEnd);
    return acc.concat(sequentials(current, rangeEnd).map(String));
  }, []);
}

function getCompleteRange(shorthandRange) {
  if (shorthandRange === undefined || shorthandRange === null) return null;
  if (shorthandRange.length === 0) return [];
  const segments = shorthandRange.split(',').map((segment) => segment.trim());
  const spreadRanges = segments.reduce((acc, segment) => {
    if (containsInvalidCharacters(segment)) return acc;
    // const range = rangeSplit(segment);
    return acc.concat(rangeSplit(segment));
  }, []);
  const fullNumbers = spreadRanges.reduce((acc, num, i) => {
    const previous = acc[i - 1];
    return acc.concat(previous ? nextMatch(previous, num) : num);
  }, []);
  return fullNumbers.map(Number);
}

printTestResults(examples, getCompleteRange, { failsOnly: true });
