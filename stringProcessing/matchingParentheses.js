/**
 * Take a string and return true if it contains properly balanced parentheses,
 * false otherwise.
 * 
 * - string must end with leftCount = rightCount
 * - if rightCount ever exceeds leftCount, return false
 * - 
 */
const isBalanced = (str) => {
  let leftCount = 0, rightCount = 0;
  for (let i = 0; i <= str.length; i += 1) {
    if (str[i] === '(') leftCount += 1;
    else if (str[i] === ')') rightCount += 1;
    if (rightCount > leftCount) return false;
  }
  return leftCount === rightCount;
};

console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false