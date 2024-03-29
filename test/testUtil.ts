import * as fs from 'fs';

const DATADIR = '../data';
const FILENAME = `${DATADIR}/test.json`;

export function loadJson(filename = FILENAME) {
  let contents = fs.readFileSync(filename, 'utf8');
  return JSON.parse(contents)
}
