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

export function utf8Decode(s: string) {
  return decodeURIComponent(escape(s));
}
