import {utf8Decode} from './util';

enum MediaType {
  Textual,
  Photo,
  Video,
  Gif,
  Share,
  Unknown,
}

export class Message {
  sender: string;
  time: Date;
  mediaType: MediaType;
  content: any;
  extras: any;

  constructor(message) {
    this.sender = getSender(message);
    this.time = getTime(message);
    this.mediaType = getMediaType(message);
    this.content = getContent(message, this.mediaType);
    this.extras = getExtras(message);
  }

  tokenizeContent() {
    if (this.mediaType == MediaType.Textual) {
      this.content = this.content.split(' ');
    }
  }

}

/** Functions for scraping info out of Messenger JSON */

function getSender(message): string {
  return message.sender_name;
}

function getTime(message): Date {
  return new Date(message.timestamp * 1000);
}

function getMediaType(message): MediaType {
  if ('content' in message) {return MediaType.Textual};
  if ('photos' in message) {return MediaType.Photo};
  if ('videos' in message) {return MediaType.Video};
  if ('gifs' in message) {return MediaType.Gif};
  if ('share' in message) {return MediaType.Share};
  return MediaType.Unknown;
}

function getContent(message, mediaType: MediaType): any {
  switch (mediaType) {
    case MediaType.Textual: {return utf8Decode(message.content);}
    case MediaType.Photo: {return message.photos;}
    case MediaType.Video: {return message.videos;}
    case MediaType.Gif: {return message.gifs;}
    case MediaType.Share: {return message.share;}
  }
  return null;
}

function getExtras(message): any {
  if ('share' in message) {
    return message.share;
  }
  return {};
}
