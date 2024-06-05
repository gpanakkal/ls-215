const { printTestResults } = require('../testing/testingFunctions.cjs')
/* PROBLEM
Write a function that takes any two version numbers of any of the following forms and 
compares them, returning 1 if version1 > version2, -1 if version 1 < version2, or 
0 if version1 === version2.

Valid forms:
1
1.0
1.2
3.2.3
3.0.0
4.2.3.0

Example ordering:
0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

If the version number contains any characters other than digits or ., return null

input: two version strings
output: integer (1, -1, 0) or null

Questions:
- Are version numbers limited to three decimal points ('.')?
- Are negative numbers forbidden?
- Can periods be found at the start or end of version numbers?
- Can version numbers be empty?

Rules:
- Segments can be multiple digits long
- if a segment is '0', it has the same ordering impact as if it didn't exist; 1 === 1.0
- Version numbers must begin and end with digits
- All numbers must be positive, since negative signs are forbidden characters
- Earlier segments take priority in sorting, e.g., 4.2 > 3.5
*/

// #region EXAMPLES

const examples = [
  {
    in: ['1', '1.0'],
    out: 0,
  },
  {
    in: ['1', '1.0.0.1'],
    out: -1,
  },
  {
    in: ['1', '1.2'],
    out: -1,
  },
  {
    in: ['3.2.3', '1.2'],
    out: 1,
  },
  {
    in: ['1.2.0.0', '1.2'],
    out: 0,
  },
  {
    in: ['1.18.2', '13.37'],
    out: -1,
  },
  {
    in: ['1', '-1.2'],
    out: null,
  },
  {
    in: ['v1', 'v1.2'],
    out: null,
  },
  {
    in: ['', '1.2'],
    out: null,
  },
  {
    in: ['1.', '18.2'],
    out: null,
  },
  {
    in: ['.1', '18.2'],
    out: null,
  },
  {
    in: ['1..1', '18.2'],
    out: null,
  },
  {
    in: ['0.1', '0.1.0'],
    out: 0,
  },
  {
    in: [0.1, 1.0],
    out: -1,
  },
  {
    in: [NaN, '1.0'],
    out: null,
  },
  {
    in: [Infinity, '1.0'],
    out: null,
  },
];


// #endregion

/* DATA STRUCTURE
Want ordering (for comparing segments in prioritized order)

Use an array for each parsed version number
*/

/* ALGORITHM

HIGH-LEVEL
1. Validate the versions numbers
2. Exit if one or both are invalid
3. Parse version numbers into the correct data structure
4. Compare version numbers, segment by segment:
   - If one segment's value is higher, that version is higher
   - If one segment is undefined, treat it as zero for comparison
   - If both segments are undefined, the versions are equal

DETAILED
compareVersions(version1, version): -1 | 0 | 1 | null
1. Validate both version numbers invoking isValidVersionNumber
2. If one or both are invalid, return null
3. Split version numbers into arrays on '.': `version1Arr`, `version2Arr`
4. Identify the longer version number
5. Iterating over the longer version number, with index `i`:
   - assign version1Arr[i] and version2Arr[i] to variables segment1 and segment2
   - if one segment is undefined, reassign it to 0
   - if segment1 > segment2, return 1
   - if segment1 < segment2, return -1
6. return 0

isValidVersionNumber(version): boolean
1. Check the version:
  - must start and end with a digit
  - must contain only digits and decimal points
  - may contain any number of additional segments of digits
2. If all the conditions above are true, return true; else false.
*/

// CODE
const isValidVersion = (version) => /^\d+(\.\d+)*$/.test(version);

function compareVersions(version1, version2) {
  const [v1str, v2str] = [String(version1), String(version2)];
  if (!isValidVersion(v1str) || !isValidVersion(v2str)) return null;

  const [v1Arr, v2Arr] = [v1str.split('.').map(Number), v2str.split('.').map(Number)];
  const longest = Math.max(v1Arr.length, v2Arr.length);
  for (let i = 0; i < longest; i += 1) {
    let [segment1, segment2] = [v1Arr[i] ?? 0, v2Arr[i] ?? 0];
    if (segment1 < segment2) return -1;
    if (segment1 > segment2) return 1;
  }
  return 0;
}

// examples.forEach((example) => {
//   console.log({version: example.in[0], isValid: isValidVersion(example.in[0])});
//   console.log({version: example.in[1], isValid: isValidVersion(example.in[1])});
// });
printTestResults(examples, compareVersions, true);