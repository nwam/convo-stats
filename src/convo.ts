import {Message, MediaType} from './message';

import {utf8Decode} from './util';

export class Convo {
  name: string;
  participants: Set<string>;
  messages: Message[];

  constructor(convo) {
    this.name = getName(convo);
    this.messages = getMessages(convo);
    this.setParticipants();
  }

  getMessageCount() {
    let messageCount = this.createParticipantDict(0);
    for (const message of this.messages) {
      messageCount[message.sender]++;
    }
    return messageCount;
  }

  getTokenCount() {
    let tokenCount = this.createParticipantDict(0);
    for (const message of this.messages) {
      if (message.mediaType == MediaType.Textual) {
        tokenCount[message.sender] += message.content.length;
      }
    }
    return tokenCount;
  }

  private createParticipantDict(obj) {
    let d = {};
    this.participants.forEach( participant => {
      d[participant] = obj;
    });
    return d;
  }

  private setParticipants() {
    let participants = new Set();
    for (const message of this.messages) {
      participants.add(message.sender);
    }
    this.participants = participants;
  }

}

/** Functions for scraping info out of Messenger JSON */

function getName(convo): string {
  return utf8Decode(convo.title);
}

function getMessages(convo): Message[] {
  let messages = new Array<Message>();
  for (const message of convo.messages) {
    messages.push(new Message(message));
  }
  return messages;
}
