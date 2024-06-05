/* PROBLEM

In the game of chess, a queen can attack pieces which are on the same row,
column, or diagonal. Positions on the board equate to coordinate numbers.
Given a setup like so:

_ _ _ _ _ _ _ _ 
_ _ _ _ _ _ _ _ 
_ _ _ W _ _ _ _ 
_ _ _ _ _ _ _ _ 
_ _ _ _ _ _ _ _ 
_ _ _ _ _ _ B _ 
_ _ _ _ _ _ _ _ 
_ _ _ _ _ _ _ _ 

The white queen's position equates to (2, 3) and the black queen is at 
(5, 6). In this example the queens are on the same diagonal, and therefore
can attack each other.

Write a function which, given a string representation of the board with the
two queens, returns true or false depending on whether the quens can attack
each other or not.

Input: string representation of the board
Output: true/false

Questions:
- Do W represent the white queen and B the black queen?
- Are coordinates zero-indexed or one-indexed?
- What does the coordinate representation mean?
- How is the board going to be represented exactly? 
  - A single string with/without newlines? An array of row strings? Something else?
- Will there always be exactly two queens? 
- Could there be other pieces?

Rules:
- Coordinates represented as (row, column), zero indexed
- 8x8 board; coordinates span (0 - 7, 0 - 7)
- Only queens will be on the board
- Queens may be missing
  - return undefined if one or both queens are missing
- Queens are W for white queen and B for black queen
- Queens can attack each other if on the:
  - same row: first coordinate is the same
  - same column: second coordinate is the same
  - same diagonal: absolute values of the row differences and column differences are the sames

*/
// #region EXAMPLES
const p = console.log;
p(queensCanAttack('________\n' +
                  '________\n' +
                  '___W____\n' +
                  '________\n' +
                  '________\n' +
                  '______B_\n' +
                  '________\n' +
                  '________\n') === true);

p(queensCanAttack('________\n' +
                  '________\n' +
                  'B__W____\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n') === true);

p(queensCanAttack('________\n' +
                  '________\n' +
                  'B_______\n' +
                  '________\n' +
                  '________\n' +
                  'W_______\n' +
                  '________\n' +
                  '________\n') === true);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '____B___\n' +
                  '________\n' +
                  '________\n' +
                  '_W______\n' +
                  '________\n' +
                  '________\n') === true);

p(queensCanAttack('B_______\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '_______W\n') === true);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '____B___\n' +
                  '________\n' +
                  '________\n' +
                  'W_______\n' +
                  '________\n' +
                  '________\n') === false);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  'W_______\n' +
                  '________\n' +
                  '_______B\n') === false);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  'W_______\n' +
                  '________\n' +
                  '_______B\n') === false);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '_______B\n') === undefined);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  'W_______\n' +
                  '________\n' +
                  '________\n') === undefined);

p(queensCanAttack('________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n' +
                  '________\n') === undefined);
// #endregion

/* DATA STRUCTURE
- Ideally would access cell values using coordinates [x][y]
- Store the board as an array of strings, where each string represents one row
*/

/* ALGORITHM

HIGH LEVEL:
1. Parse the board into the correct data structure
2. Get the coordinates of each queen
3. Stop if we don't have at least two queens
4. Check if they're on the same row, column, or diagonal

DETAILED:
MAIN FUNCTION:
1. Split the board input into an array on newline characters
2. Get coords invoking getQueenCoordinates
3. If coords are undefined, return undefined
4. Check if they can attack each other invoking queenCanReach
5. Return the return value of queenCanReach

getQueenCoordinates(boardArr): { W: [row, column], B: [row, column] }
- Declare coordsW and coordsB
- Iterate over `row` of `boardArr`:
  - if W or B exists in `row`: 
    - get column index by position in string
    - assign [row index, column index] to the corresponding coords variable
- If either coordsW or coordsB are undefined, return undefined
- Return { W: coordsW, B: coordsB }

queenCanReach(startCoords, endCoords): boolean
- If both coordinate pairs have the same row, return true
- If both coordinate pairs have the same column, return true
- Take the differences between row and column values
- If the absolute value of the differences is equal, return true
- Return false
*/

// CODE
function queensCanAttack(board) {
  const boardArr = board.split('\n');
  const queenCoords = getQueenCoordinates(boardArr);
  if (!queenCoords) return undefined;

  return queenCanReach(queenCoords.W, queenCoords.B);
}

function getQueenCoordinates(boardArr) {
  let coordsW, coordsB;
  boardArr.forEach((row, rowIndex) => {
    const queenExists = row.match(/[WB]/);
    if (!queenExists) return;
    const whiteQueenColumn = row.indexOf('W');
    const blackQueenColumn = row.indexOf('B');
    if (whiteQueenColumn !== -1) coordsW = [rowIndex, whiteQueenColumn];
    if (blackQueenColumn !== -1) coordsB = [rowIndex, blackQueenColumn];
  });

  if (!coordsW || !coordsB) return undefined;

  return { W: coordsW, B: coordsB };
}

function queenCanReach(startCoords, endCoords) {
  const sameRow = startCoords[0] === endCoords[0];
  if (sameRow) return true;
  const sameColumn = startCoords[1] === endCoords[1];
  if (sameColumn) return true;
  const rowDiff = endCoords[0] - startCoords[0];
  const colDiff = endCoords[1] - startCoords[1];
  if (Math.abs(rowDiff) === Math.abs(colDiff)) return true;
  return false;
}