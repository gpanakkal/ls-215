/* DESCRIPTION

A collection of spelling blocks has two letters per block, as in G:T.
Each block can be used only once in forming a word, and only one letter can be used per block.

Write a function that takes a word string as an argument and returns true if the word can be
spelled using the set of blocks, or false otherwise. Case-insensitive.

Input: a string containing a word
Output: boolean

Rules:
- Each block can be used only once
- Using a letter in a block uses the entire block
- Blocks are provided

Questions:
- what if the passed string is empty?
- What if no string is passed?
*/

const { printTestResults } = require("../testing/testingFunctions.cjs");

// EXAMPLES
const examples = [
  {
    in: ['BATCH'],
    out: true,
  },
  {
    in: ['BUTCH'],
    out: false,
  },
  {
    in: ['jest'],
    out: true,
  },
  {
    in: [''],
    out: null,
  },
  {
    in: [],
    out: null,
  },
  {
    in: ['123st'],
    out: false,
  },
];

/* DATA STRUCTURE
Store blocks as strings of letters in an array, e.g., block X:K is stored 'XK'
*/

/* ALGORITHM
HIGH LEVEL
1. If the input is empty or not passed, quit
2. Iterate over the input string's characters `char`:
  - Search the blocks array for a string containing `char`
  - If `char` is not found, return false
  - Remove the block containing `char` from `blocks`
3. Return true
*/

// CODE

function isBlockWord(str) {
  if (!str) return null;
  const BLOCKS = ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM'];

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    const findIndex = BLOCKS.findIndex((block) => block.includes(char.toUpperCase()));
    if (findIndex === -1) {
      console.log({str, char, findIndex})
      return false};
    BLOCKS.splice(findIndex, 1);
  }
  return true;
}

printTestResults(examples, isBlockWord);