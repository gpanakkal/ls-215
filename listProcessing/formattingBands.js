/**
 * Write a function to clean up the following data as follows:
 * - change country to Canada for all
 * - capitalize band names
 * - remove dots from band names
 */

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processBands(data) {
  const capitalize = (str) => str.split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  const processed = data.slice();
  processed.forEach((datum) => {
    datum.country = 'Canada';
    datum.name = datum.name.replaceAll('.', '');
    datum.name = capitalize(datum.name);
  });

  return processed;
}

console.log(processBands(bands));

// should return:
[
  { name: 'Sunset Rubdown', country: 'Canada', active: false },
  { name: 'Women', country: 'Canada', active: false },
  { name: 'A Silver Mt Zion', country: 'Canada', active: true },
]