"use strict";

const messagesModule = (function () {

  const messages = [
    {
      id: newId(),
      text: "Good morning everyone!",
      createdAt: new Date("2020-10-06T20:01:00"),
      author: "Arlinka",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "We've moved to Telegram. Come and join us there!",
      createdAt: new Date("2020-02-10T13:02:00"),
      author: "Arlinka",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "Anyone to help there?",
      createdAt: new Date("2022-11-25T20:13:00"),
      author: "kvg-mur",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "It's not working.",
      createdAt: new Date("2006-10-12T13:26:00"),
      author: "ORDANAX",
      isPersonal: true,
      to: "Arlinka",
    },
    {
      id: newId(),
      text: "I agree.",
      createdAt: new Date("2017-02-02T11:30:00"),
      author: "Arlinka",
      isPersonal: true,
      to: "ORDANAX",
    },
    {
      id: newId(),
      text: "Thanks, hope it's a nice day everywhere.",
      createdAt: new Date("2012-08-30T04:19:00"),
      author: "Irvalgilana",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "I have to remember now.",
      createdAt: new Date("2018-07-12T12:17:00"),
      author: "kvg-mur",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "Yeah, that's why he didn't want to continue there.",
      createdAt: new Date("2020-06-01T11:11:00"),
      author: "ORDANAX",
      isPersonal: false,
    },
    {
      id: newId(),
      text:
        "I think you should change it back to the other device and then check only on the volume preference.",
      createdAt: new Date("2001-07-27T20:27:00"),
      author: "mvaleryi",
      isPersonal: true,
      to: "kvg-mur",
    },
    {
      id: newId(),
      text: "There's almost no noise and your voice sound very clear.",
      createdAt: new Date("2000-07-27T04:15:00"),
      author: "kvg-mur ",
      isPersonal: true,
      to: "mvaleryi",
    },
    {
      id: newId(),
      text:
        "I can usually make out what they say, but I might or might not be able to make sense of the rhyming slang.",
      createdAt: new Date("2019-04-06T02:02:00"),
      author: "mvaleryi",
      isPersonal: true,
      to: "kvg-mur",
    },
    {
      id: newId(),
      text: "I can only use it with him though.",
      createdAt: new Date("2018-11-18T18:18:00"),
      author: "Chris Blade",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "I also like to know some words in other languages.",
      createdAt: new Date("2019-02-10T11:00:00"),
      author: "ORDANAX",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "So, if you practice you remember them if not will forget.",
      createdAt: new Date("2020-01-02T03:32:00"),
      author: "alexbabashov",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "Not too bad. I'm working on my German right now. What about you?",
      createdAt: new Date("2012-01-04T17:17:00"),
      author: "Arlinka",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "Hope you're doing great.",
      createdAt: new Date("2006-08-19T07:29:00"),
      author: "Irvalgilana ",
      isPersonal: true,
      to: "Arlinka",
    },
    {
      id: newId(),
      text:
        "Yes, they have a very extensive selection of languages, and some other courses as well.",
      createdAt: new Date("2007-11-25T13:52:00"),
      author: "Allhazeread",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "So you have decided the path of the polyglot, that's great.",
      createdAt: new Date("2020-08-29T10:45:00"),
      author: "kvg-mur",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "Have a nice chat guys.",
      createdAt: new Date("2009-05-24T11:11:00"),
      author: "ORDANAX",
      isPersonal: false,
    },
    {
      id: newId(),
      text: "And you!",
      createdAt: new Date("2018-12-04T21:49:00"),
      author: "Arlinka",
      isPersonal: true,
      to: "ORDANAX",
    },
  ];

  const getMessages = (skip = 0, top = 10, filterConfig) => {
    let filteredMessages = messages.slice();

    if (filterConfig) {
      if (filterConfig.author) {
        filteredMessages = filteredMessages.filter((message) =>
          message.author
            .toLowerCase()
            .includes(filterConfig.author.toLowerCase())
        );
      }

      if (filterConfig.dateFrom) {
        filteredMessages = filteredMessages.filter(
          (message) => message.createdAt > filterConfig.dateFrom
        );
      }

      if (filterConfig.dateTo) {
        filteredMessages = filteredMessages.filter(
          (message) => message.createdAt < filterConfig.dateTo
        );
      }

      if (filterConfig.text) {
        filteredMessages = filteredMessages.filter((message) =>
          message.text.toLowerCase().includes(filterConfig.text.toLowerCase())
        );
      }
    }

    let sortedMessages = filteredMessages.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });
    sortedMessages = sortedMessages.splice(skip, top);

    return sortedMessages;
  };

  const getMessage = (id) => {
    return messages.find((message) => message.id === id);
  };

  const validateMessage = (msg) => {
    return msg.text && msg.text.length <= 200 && typeof msg.text == "string";
  };

  const addMessage = (msg) => {
    if (validateMessage(msg)) {
      msg.id = newId();
      msg.createdAt = new Date();
      msg.author = currentAuthor;
      msg.to ? (msg.isPersonal = true) : (msg.isPersonal = false);
      messages.push(msg);
      return true;
    }
    return false;
  };

  const editMessage = (id, msg) => {
    let message = getMessage(id);
    if (message && validateMessage(msg)) {
      message.text = msg.text;
      if (msg.to) {
        message.isPersonal = true;
      } else {
        message.isPersonal = false;
      }
      message.to = msg.to ?? message.to;
      return true;
    }
    return false;
  };

  const removeMessage = (id) => {
    let message = getMessage(id);
    if (message) {
      const index = messages.findIndex((message) => message.id === id);
      console.log(index);
      messages.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    messages,
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
console.log(messagesModule.getMessages(1, 3, { author: "arlinka" }));
console.log(
  messagesModule.getMessages(0, 3, { author: "ORDANAX", text: "work" })
);
console.log(messagesModule.getMessages(1, 20, { author: "NoAuthor" }));
console.log(
  messagesModule.getMessages(0, 2, {
    text: "work",
    dateFrom: "2000-09-11T18:18:00",
  })
);
console.groupEnd();

console.group("Get Message method:");
console.log(messagesModule.getMessage("5"));
console.log(messagesModule.getMessage("10"));
console.groupEnd();

console.group("Validate Message method:");
console.log(messagesModule.validateMessage(messagesModule.messages[5]));
console.groupEnd();

console.group("Add Message method:");
console.log(messagesModule.addMessage({ text: "It's a new message" }));
console.log(messagesModule.addMessage({ text: "Hi, ORDANAX!", to: "ORDANAX" }));
console.log(messagesModule.addMessage({ text: "", to: "ORDANAX" }));
console.groupEnd();

console.group("Edit Message method:");
console.log(
  messagesModule.editMessage("14", {
    text: "It's a new text",
    to: "sdfs",
  })
);
console.log(messagesModule.editMessage("100", { text: "2" }));
console.groupEnd();

console.group("Remove Message method:");
console.log(messagesModule.removeMessage("7"));
console.log(messagesModule.removeMessage("50"));
console.groupEnd();
