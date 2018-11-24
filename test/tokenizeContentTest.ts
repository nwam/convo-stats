import {loadTestJson} from './testUtil';
import {Message} from '../src/message';

let data = loadTestJson();

let message = new Message(data.messages[0]);
for (let character of message.content[10]) {
  console.log(character);
}
