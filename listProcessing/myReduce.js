const myReduce = (arr, callback, initialValue) => {
  let accumulator = initialValue;
  for (let i = 0; i < arr.length; i += 1) {
    if (accumulator === undefined) {
      accumulator = arr[i];
      continue;
    }
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}

[1, 2, 3].reduce((sum, current) => sum + current, 0);
console.log(myReduce([1, 2, 3, 4], (prev, el) => prev * el));

function longestWord(words) {
  return myReduce(words, function (result, currentWord) {
    return currentWord.length >= result.length ? currentWord : result;
  });
}

function longestWord2(words) {
  return words.reduce(function (result, currentWord) {
    return currentWord.length >= result.length ? currentWord : result;
  });
}

console.log(longestWord(['abc', 'launch', 'targets', '']))
console.log(longestWord2(['abc', 'launch', 'targets', '']))
console.log([1,2,3,4].reduce((prev, el) => prev * el))