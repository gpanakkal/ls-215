let names = ['Heather', 'Gisella', 'Katsuki', 'Hua', 'Katy', 'Kathleen', 'Otakar'];

const first = names.map((name) => name[0]);
const counts = first.reduce((counts, current) => {
  counts[current] = current in counts ? counts[current] + 1 : 1;
  return counts;
}, {});

console.log(counts);
const max = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
console.log(max);
