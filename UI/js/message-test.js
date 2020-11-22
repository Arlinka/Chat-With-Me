console.group("CLASSES TEST:");
const message = new Message("New text");

const message2 = new Message('Second text', 'Linda');

const messageList = new MessageList([message], 'Arlinka');
console.log("messageList.messages", messageList.messages);

messageList.messages = [];
console.log("messageList.messages", messageList.messages);

messageList.messages = messagesData.map(msg => new Message(msg.text, msg.to, msg.id, msg.author, msg.createAt, msg.isPersonal));
console.log("messageList.messages", messageList.messages);

messageList.add(message2.text, message2.to, '', message2.author, message2.createAt, message2.isPersonal);
console.log("messageList.add", messageList.messages);

messageList.edit('15', 'new text', 'Mita');
console.log("messageList.edit", messageList.messages);

messageList.get("12");
console.log("messageList.get", messageList.get("12"));

console.log(
  messageList.getPage(2, 6, {
  author: "Arlin",
}), 'FILTER MESSAGES BY AUTHOR'
);

console.log(
  messageList.getPage(2, 8, {
    dateFrom: new Date("1995-12-17T03:24:00"),
  }),
  "FILTER MESSAGES BY DATE FROM"
);

console.log(
  messageList.getPage(2, 8, {
    dateTo: new Date("2020-12-17T03:24:00"),
  }),
  "FILTER MESSAGES BY DATE TO"
);

console.log(
  messageList.getPage(0, 8, {
    text: "work",
  }),
  "FILTER MESSAGES BY TEXT"
);

console.log(
  messageList.getPage(0, 10, {
    author: "Arlin",
    text: "work",
    dateFrom: new Date("1995-12-17T03:24:00"),
    dateTo: new Date("2020-12-17T03:24:00"),
  }),
  "FILTER MESSAGES BY ALL FILTERS"
);

console.log("messageList.remove", messageList.remove("5"));

// messageList.clear();
//console.log(messageList.messages);

console.groupEnd();
