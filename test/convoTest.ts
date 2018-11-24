import {loadTestJson} from './testUtil';
import {Convo} from '../src/convo';

let data = loadTestJson();
let convo = new Convo(data);
console.log(convo);
