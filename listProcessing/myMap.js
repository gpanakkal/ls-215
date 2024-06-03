const myMap = (arr, callback, context = undefined) => {
  const mapped = [];
  for (let i = 0; i < arr.length; i += 1) {
    const result = callback.call(context ?? this, arr[i], i, arr);
    mapped.push(result);
  }
  return mapped;
}