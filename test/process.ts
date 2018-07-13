import * as fs from 'fs';

const DATADIR = '../data';
const FILENAME = `${DATADIR}/goons.json`;

function load_json(filename: string) {
  let contents = fs.readFileSync(FILENAME, 'utf8');
  return JSON.parse(contents)
}

let data = load_json(FILENAME);
