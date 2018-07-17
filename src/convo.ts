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
    let messageCount = this.createParticipantDict(Number);
    for (const message of this.messages) {
      messageCount[message.sender]++;
    }
    return messageCount;
  }

  getTokenSummary(regex = /.*/) {
    let summary = this.createParticipantDict(Number);
    for (const message of this.messages) {
      if (message.mediaType == MediaType.Textual) {
        for (const token of message.content) {
          if (regex.test(token)) {
            summary[message.sender]++;
          }
        }
      }
    }
    return summary;
  }

  getTokenCount(regex = /.*/) {
    let counts = this.createParticipantDict(Array);
    let tokens = {};
    let numTokens = 0;
    for (const message of this.messages) {
      if (message.mediaType == MediaType.Textual) {
        for (const token of message.content) {
          if (regex.test(token)) {

            // Token matched regex
            if (! tokens[token]) {
              tokens[token] = numTokens++;
              for (const participant in counts) {
                counts[participant].push(0);
              }
            }            
            const tokenId = tokens[token];
            counts[message.sender][tokenId]++;
          }
        }
      }
    }
    const tokenArray = new Array(numTokens);
    for (const tokenName in tokens) {
      tokenArray[tokens[tokenName]] = tokenName;
    }
    return [tokenArray, counts];
  }

  getTokenCount2(regex = /.*/) {
    let counts = {};
    for (const message of this.messages) {
      if (message.mediaType == MediaType.Textual) {
        for (const token of message.content) {
          if (regex.test(token)) {
            token in counts || (counts[token] = this.createParticipantDict(0));
            counts[token][message.sender]++;
          }
        }
      }
    }
    return counts;
  }

  private createParticipantDict(constr) {
    let d = {};
    this.participants.forEach(participant => {
      d[participant] = new constr;
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
