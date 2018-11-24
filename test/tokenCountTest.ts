import {loadTestJson} from './testUtil';
import {Convo} from '../src/convo';

let data = loadTestJson('../data/goons.json');
let convo = new Convo(data);
console.log(convo.getTokenCount(/^.*$/));
