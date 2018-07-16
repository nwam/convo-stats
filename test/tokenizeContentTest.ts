import {loadJson} from './testUtil';
import {Message} from '../src/message';

let data = loadJson();

let message = new Message(data.messages[0]);
message.tokenizeContent();
console.log(message.content);
