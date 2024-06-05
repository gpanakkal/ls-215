/*
1. A distinct string is a string that is present only once in an array. Given an 
array `arr` and integer `k`, return the `k`th distinct string present in `arr`. 
If there are fewer than `k` distinct strings, return an empty string.

Questions:
- Will both arguments always be provided?
- Will the first argument always be an array?
- Will the second argument always be an integer?
- Will the second argument ever be 0?
- Will the second argument ever be negative?
- Will the input array contain at least one element?
x Will the input array contain non-string elements?
- Could the array ever be sparse? If so, how should missing elements be handled?
- Is there a limit on how many elements the array can contain?
- Does case matter?
- Will strings of lengths other than 1 be passed?
  - Do empty strings qualify as distinct?

2. Given an array of integers `nums`, return the third largest number in the array.
If the third largest number does not exist, return the greatest number.
You are not allowed to sort the array.

Questions:
- Will the argument always be provided?
- Will the argument always be an array?
- Could the array contain non-integer values or be sparse?
- Could the array be empty? How should that be handled?
- How should duplicate values be handled? In [3, 3, 1] is '1' the third-largest value?

3. Write a function that prints all prime numbers present as substrings in a given string.

Questions:
- Will exactly one argument always be passed?
- If the argument is not a string, should it be coerced to one and treated as a string?
- How should overlapping prime numbers be handled? Should '137' be output as [13, 7, 137]?
- Should consecutive digits be treated as belonging to a single number without further subdivision?
- If no primes are found, should I return an empty array or some sort of error value?
- Can negative numbers be in the string? If so, how should they be handled?

4. Take a 2-D array and turn it into a flat array with all duplicated elements removed.
Treat numbers and number strings as duplicates, and keep the one that comes first in the result.

Questions:
- Will exactly one argument always be passed?
- Can the array be sparse? How should that be handled? 
  - Should sparsity be preserved/lost?
- Can non-primitive values be included in the subarrays? 
  - If so, should those be compared by value or reference?
- Should nullish values be treated the same way?
x What about NaN?
x Could the top-level array contain non-array elements?
x Could the top-level array contain any number of subarrays?
*/