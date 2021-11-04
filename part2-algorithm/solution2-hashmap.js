function countEqualElements(array) {
  let count = 0;
  let map = new Map();
  for (let i = 0; i < array.length; i++) {
    if (map.has(array[i])) {
      count += map.get(array[i]);
      map.set(array[i], map.get(array[i]) + 1);
    } else {
      map.set(array[i], 1);
    }
  }
  return count;
}
