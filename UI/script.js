"use strict";

const messages = [
  {
    id: "1",
    text: "Good morning everyone!",
    createdAt: new Date("2020-10-06T20:01:00"),
    author: "Arlinka",
    isPersonal: false,
  },
  {
    id: "2",
    text: "We've moved to Telegram. Come and join us there!",
    createdAt: new Date("2020-02-10T13:02:00"),
    author: "Arlinka",
    isPersonal: false,
  },
  {
    id: "3",
    text: "Anyone to help there?",
    createdAt: new Date("2022-11-25T20:13:00"),
    author: "kvg-mur",
    isPersonal: false,
  },
  {
    id: "4",
    text: "It's not working.",
    createdAt: new Date("2006-10-12T13:26:00"),
    author: "ORDANAX",
    isPersonal: true,
    to: "Arlinka",
  },
  {
    id: "5",
    text: "I agree.",
    createdAt: new Date("2017-02-02T11:30:00"),
    author: "Arlinka",
    isPersonal: true,
    to: "ORDANAX",
  },
  {
    id: "6",
    text: "Thanks, hope it's a nice day everywhere.",
    createdAt: new Date("2012-08-30T04:19:00"),
    author: "Irvalgilana",
    isPersonal: false,
  },
  {
    id: "7",
    text: "I have to remember now.",
    createdAt: new Date("2018-07-12T12:17:00"),
    author: "kvg-mur",
    isPersonal: false,
  },
  {
    id: "8",
    text: "Yeah, that's why he didn't want to continue there.",
    createdAt: new Date("2020-06-01T11:11:00"),
    author: "ORDANAX",
    isPersonal: false,
  },
  {
    id: "9",
    text:
      "I think you should change it back to the other device and then check only on the volume preference.",
    createdAt: new Date("2001-07-27T20:27:00"),
    author: "mvaleryi",
    isPersonal: true,
    to: "kvg-mur",
  },
  {
    id: "10",
    text: "There's almost no noise and your voice sound very clear.",
    createdAt: new Date("2000-07-27T04:15:00"),
    author: "kvg-mur ",
    isPersonal: true,
    to: "mvaleryi",
  },
  {
    id: "11",
    text:
      "I can usually make out what they say, but I might or might not be able to make sense of the rhyming slang.",
    createdAt: new Date("2019-04-06T02:02:00"),
    author: "mvaleryi",
    isPersonal: true,
    to: "kvg-mur",
  },
  {
    id: "12",
    text: "I can only use it with him though.",
    createdAt: new Date("2018-11-18T18:18:00"),
    author: "Chris Blade",
    isPersonal: false,
  },
  {
    id: "13",
    text: "I also like to know some words in other languages.",
    createdAt: new Date("2019-02-10T11:00:00"),
    author: "ORDANAX",
    isPersonal: false,
  },
  {
    id: "14",
    text: "So, if you practice you remember them if not will forget.",
    createdAt: new Date("2020-01-02T03:32:00"),
    author: "alexbabashov",
    isPersonal: false,
  },
  {
    id: "15",
    text: "Not too bad. I'm working on my German right now. What about you?",
    createdAt: new Date("2012-01-04T17:17:00"),
    author: "Arlinka",
    isPersonal: false,
  },
  {
    id: "16",
    text: "Hope you're doing great.",
    createdAt: new Date("2006-08-19T07:29:00"),
    author: "Irvalgilana ",
    isPersonal: true,
    to: "Arlinka",
  },
  {
    id: "17",
    text:
      "Yes, they have a very extensive selection of languages, and some other courses as well.",
    createdAt: new Date("2007-11-25T13:52:00"),
    author: "Allhazeread",
    isPersonal: false,
  },
  {
    id: "18",
    text: "So you have decided the path of the polyglot, that's great.",
    createdAt: new Date("2020-08-29T10:45:00"),
    author: "kvg-mur",
    isPersonal: false,
  },
  {
    id: "19",
    text: "Have a nice chat guys.",
    createdAt: new Date("2009-05-24T11:11:00"),
    author: "ORDANAX",
    isPersonal: false,
  },
  {
    id: "20",
    text: "And you!",
    createdAt: new Date("2018-12-04T21:49:00"),
    author: "Arlinka",
    isPersonal: true,
    to: "ORDANAX",
  },
];

const messagesModule = (function () {
  const findMessageById = (id) => {
    const messageId = messages.find((message) => message.id === id);
    return messageId;
  };

  const noId = () => {
    return `Id isn't entered or not available :( Try with string id > ${messages.length}`;
  };

  const getMessages = (skip = 0, top = 10, filterConfig) => {
    if (skip < 0 || top < 0)
      return "Please try with positive parameter for pagination";

    let filtredMessages = messages.slice();

    if (filterConfig) {
      if (filterConfig.author) {
        filtredMessages = filtredMessages.filter((message) =>
          message.author.includes(filterConfig.author)
        );
        if (!filtredMessages[0]) {
          return "This author doesn't exist";
        }
      }

      if (filterConfig.dateFrom) {
        filtredMessages = filtredMessages.filter(
          (message) =>
            Date.parse(message.createdAt) > Date.parse(filterConfig.dateFrom)
        );
      }

      if (filterConfig.dateTo) {
        filtredMessages = filtredMessages.filter(
          (message) =>
            Date.parse(message.createdAt) < Date.parse(filterConfig.dateTo)
        );
      }

      if (filterConfig.text) {
        filtredMessages = filtredMessages.filter((message) =>
          message.text.includes(filterConfig.text)
        );
      }
    }

    let sortedMessages = filtredMessages.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });

    sortedMessages = sortedMessages.splice(skip, top);

    if (!sortedMessages[0]) {
      return "No messages found after filtering :(";
    }
    return sortedMessages;
  };

  const getMessage = (id) => {
    if (findMessageById(id)) {
      const messageId = findMessageById(id);
      return `Message with id #${id}: \n${messageId.text}`;
    }
    return noId();
  };

  const validateMessage = (msg) => {
    if (
      !(
        msg.id &&
        findMessageById(msg.id) != msg.id &&
        typeof msg.id == "string" &&
        parseInt(msg.id) > 0
      )
    ) {
      console.log(noId());
      return false;
    }

    if (!(msg.text && msg.text.length <= 200 && typeof msg.text == "string")) {
      console.log("No string text propetry or length is not available.");
      return false;
    }

    if (
      !(
        msg.createdAt &&
        msg.createdAt instanceof Date &&
        !isNaN(msg.createdAt) &&
        msg.createdAt < new Date()
      )
    ) {
      console.log("No date");
      return false;
    }

    if (!(msg.author && msg.author != "" && typeof msg.author == "string")) {
      return false;
    }

    if (typeof msg.isPersonal != "boolean") {
      return false;
    }

    if (msg.to && typeof msg.to != "string") {
      return false;
    }

    return true;
  };

  const addMessage = (msg) => {
    if (findMessageById(msg.id)) {
      msg.id = String(messages.length + 1);
      if (validateMessage(msg)) {
        messages.push(msg);
        return true;
      }
    }
    console.log("Data entered incorrectly :(");
    return false;
  };

  const editMessage = (id, msg) => {
    if (findMessageById(id)) {
      let message = findMessageById(id);
      message.text = msg.text || message.text;
      message.isPersonal = msg.isPersonal ?? message.isPersonal;
      message.to = msg.to ?? message.to;
      return true;
    }
    console.log(noId());
    return false;
  };

  function removeMessage(id) {
    if (findMessageById(id)) {
      --id;
      let removedMessages = messages.splice(id, 1);
      return `Removed message #${id + 1}: ${removedMessages[0].text}`;
    } else {
      return noId();
    }
  }

  return {
    findMessageById,
    noId,
    getMessages,
    getMessage,
    validateMessage,
    addMessage,
    editMessage,
    removeMessage,
  };
})();

// CHECK Methods:
console.group("Get Messages method:");
console.log(messagesModule.getMessages(0, 10));
console.log(messagesModule.getMessages(10));
console.log(messagesModule.getMessages(-1, -10));
console.log(messagesModule.getMessages(1, 3, { author: "Arlinka" }));
console.log(
  messagesModule.getMessages(0, 3, { author: "ORDANAX", text: "work" })
);
console.log(messagesModule.getMessages(1, 20, { author: "NoAutor" }));
console.log(
  messagesModule.getMessages(0, 2, {
    text: "work",
    dateFrom: "2000-09-11T18:18:00",
  })
);
console.groupEnd();

console.group("Get Message method:");
console.log(messagesModule.getMessage("5"));
console.log(messagesModule.getMessage(10));
console.log(messagesModule.getMessage(-10));
console.groupEnd();

console.group("Validate Message method:");
console.log(messagesModule.validateMessage(messages[5]));
console.log(
  messagesModule.validateMessage({
    text: "work",
    dateFrom: "2000-09-11T18:18:00",
  })
);
console.groupEnd();

console.group("Add Message method:");
console.log(
  messagesModule.addMessage({
    id: "5",
    text: "Its's a new message",
    isPersonal: false,
    createdAt: new Date("2020-10-31T17:40:10"),
    author: "Alla",
  })
);
console.groupEnd();

console.group("Edit Message method:");
console.log(
  messagesModule.editMessage("16", {
    text: "Its's a new text",
    isPersonal: true,
    to: "sdfs",
  })
);
console.log(messagesModule.editMessage("100", { text: "hi" }));
console.groupEnd();

console.group("Remove Message method:");
console.log(messagesModule.removeMessage("1"));
console.log(messagesModule.removeMessage("50"));
console.groupEnd();
