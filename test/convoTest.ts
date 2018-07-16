import {loadJson} from './testUtil';
import {Convo} from '../src/convo';

let data = loadJson();
let convo = new Convo(data);
console.log(convo);
