export function getMessageCount(data) {
  let messageCount = {};

  for (let message of data.messages) {
    let sender = message.sender_name;
    sender in messageCount || (messageCount[sender] = 0)
    messageCount[sender]++;
  }

  return messageCount;
}
