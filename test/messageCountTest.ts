import {getMessageCount} from '../src/process';
import {expect} from 'chai';
import {loadTestJson} from './testUtil';

let data = loadTestJson();

let messageCount = getMessageCount(data);
console.log(messageCount);
