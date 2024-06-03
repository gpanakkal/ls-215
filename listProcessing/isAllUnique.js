const isAllUnique = (str) => {
  const formatted = str.toLowerCase().split('').filter((el) => el !== ' ');
  const seen = {};
  for (let i = 0; i < formatted.length; i += 1) {
    if ((formatted[i] in seen)) return false;
    seen[formatted[i]] = true;
  }
  return true;
}

console.log(isAllUnique('The quick brown fox jumped over a lazy dog'));  // false
console.log(isAllUnique('123,456,789'));                                 // false
console.log(isAllUnique('The big apple'));                               // false
console.log(isAllUnique('The big apPlE'));                               // false
console.log(isAllUnique('!@#$%^&*()'));                                  // true
console.log(isAllUnique('abcdefghijklmnopqrstuvwxyz'));                  // true