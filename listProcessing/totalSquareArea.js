/**
 * Write a function totalArea that takes an array of rectangles and returns the total area covered by all the rectangles.
 * 
 * Algo:
 * 1. Map the array to the product of each subarray
 * 2. Reduce the array to the sum of the products
 */

const totalArea = (arr) => {
  const products = arr.map(([length, width]) => length * width);
  return products.reduce((sum, current) => sum + current, 0);
};

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

totalArea(rectangles);    // 141

/**
 * Write a function that calculates the total area of all the squares in the passed array, ignoring non-square rectangles.
 */
const totalSquareArea = (arr) => {
  const squares = arr.filter(([length, width]) => length === width);
  return totalArea(squares);
}

totalSquareArea(rectangles);    // 121