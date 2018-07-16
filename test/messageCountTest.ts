import {loadJson} from './testUtil';
import {getMessageCount} from '../src/process';

let data = loadJson();

let messageCount = getMessageCount(data);
console.log(messageCount);
