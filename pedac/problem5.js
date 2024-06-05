/* DESCRIPTION

Implement encoding and decoding for the rail fence cipher.

The Rail Fence cipher: A message is written downwards on successive rails of an
imaginary fence, then moving when we get to the bottom, like so:
0 1 2 3 4 5 6 7 8 9101112131415161718192021222324
W . . . E . . . C . . . R . . . L . . . T . . . E
. E . R . D . S . O . E . E . F . E . A . O . C .
. . A . . . I . . . V . . . D . . . E . . . N . .

? . . . . . . . ?
. ? . . . . . ? . ?
. . ? . . . ? . . . ?
. . . ? . ? . . . . . ?
. . . . ? . . . . . . . ?

The message is then read off in rows:

WECRLTEERDSOEEFEAOCAIVDEN

To decrypt the message you take the zig-zag shape and fill the ciphertext along the rows.

ENCODING
inputs: a string containing an unencoded message and a number of rails
output: an encoded message

DECODING
input: an encoded message and a number of rails
output: the original message

DATA STRUCTURE
Use an array containing a string for each row

ALGORITHM: ENCODING
HIGH LEVEL
- Initialize the data structure `rails`
- initialize a targetRail variable to 0 and direction to 1
- Iterate over the message's characters with index `i`:
  - append the character to `rails[targetRail]`
  - if `targetRail === rails.length`, set direction to -1
  - if `targetRail === 0`, set direction to 1
  - reassign targetRail to `targetRail + direction`
- join the strings in the `rails` array and return the result


ALGORITHM: DECODING
HIGH LEVEL
1. Take an encoded message and rail count
2. Initialize an array `rails` to length `railCount` filled with subarrays of length
   equal to the length of the encoded message, all initialized to '.'
3. Iterate over `rails` to get the indices of letters in each row with index `i`:
  - set `railsBelow` to the number of rails underneath the current one
  - each row begins with i and has an additional every `(railsBelow) * 2` until its max length
  - assign characters in order from the input string to the row at indices determined above
4. Join the rows with spaces and log them one at a time
*/

// EXAMPLES
const { printTestResults } = require('../testing/testingFunctions.cjs');

const encodingExamples = [
  {
    in: ['WE ARE DISCOVERED FLEE AT ONCE', 3],
    out: 'WECRLTEERDSOEEFEAOCAIVDEN',
  },
];

const decodingExamples = [
  {
    in: ['WECRLTEERDSOEEFEAOCAIVDEN', 3],
    out: 'WE ARE DISCOVERED FLEE AT ONCE',
  },
];

// CODE

function railFenceEncode(message, railCount) {
  const rails = new Array(railCount).fill('');
  const filteredMessage = message.replaceAll(/\s+/g, '');
  let targetRail = 0, direction = 1;
  for (let i = 0; i < filteredMessage.length; i += 1) {
    const char = filteredMessage[i];
    rails[targetRail] += char;
    if (targetRail === 0) direction = 1;
    else if (targetRail === rails.length - 1) direction = -1;
    targetRail += direction;
  }
  return rails.join('');
}

function getUpdateIndexes(startIndex, spacesBetween, maxIndex) {
  const updates = [];
  let lastIndex = startIndex;
  while (lastIndex <= maxIndex) {
    updates.push(lastIndex);
    lastIndex += spacesBetween;
  }
  return updates;
}

function railFenceDecode(message, railCount) {
  const messageChars = message.split('');
  const rails = new Array(railCount).fill(null)
    .map(() => new Array(message.length).fill(null));
  const written = rails.map((rail, i) => {
    const railsBelow = rails.length - i - 1;
    const spacesBetween = railsBelow === 0 ? (railCount - 1) * 2 : railsBelow * 2;
    const startIndex = i;
    const charsOnRail = Math.floor((message.length) / spacesBetween);
    const updateIndexes = getUpdateIndexes(startIndex, spacesBetween, message.length);
    // console.log({message, railCount, startIndex, charsOnRail, spacesBetween});

    return rail.map((_, j) => {
      if (updateIndexes.includes(j)) {
        return messageChars.shift();
      }
      return '.';
    })
  });
  written.map((rail) => rail.join(' ')).forEach((rail) => console.log(rail));
}

// printTestResults(encodingExamples, railFenceEncode);

// railFenceDecode('adsf', 2);
decodingExamples.forEach((example) => railFenceDecode(...example.in));
// console.log(getUpdateIndexes(0, 4, 'WECRLTEERDSOEEFEAOCAIVDEN'.length));