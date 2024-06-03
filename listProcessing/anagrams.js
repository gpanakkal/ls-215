/**
 * Write a function that takes a word and an array of words,
 * returning an array containing all the words from the input array that are
 * anagrams of the word argument.
 * 
 * Algorithm:
 * 1. Create a reference string by sorting the input word's letters alphabetically.
 * 2. Filter the input array by comparing each word in the array by removing spaces, 
 * sorting alphabetically, and comparing it to the input string
 * 3. return the filtered array
 */

function anagram(word, list) {
  const formatWord = (str) => str.replaceAll(' ', '').split('').sort().join('');
  const reference = formatWord(word);
  return list.filter((el) => formatWord(el) === reference);
}

console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]