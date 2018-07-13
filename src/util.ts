/* Dictionary to two arrays */
export function dict22arr(dict) {
  let keys = [];
  let values = [];
  for (let key in dict) {
    keys.push(key);
    values.push(dict[key]);
  }
  return [keys, values];
}
