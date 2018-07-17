import {loadJson} from './testUtil';
import {Convo} from '../src/convo';

let data = loadJson('../data/goons.json');
let convo = new Convo(data);
console.log(convo.getTokenCount(/^#.*$/));
