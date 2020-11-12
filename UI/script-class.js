class Message {
  _currentUser = "Arlinka";

  _i = 1;
  _newId = () => `${this._i++}`;

  constructor(
    text = "",
    id = null,
    author = null,
    createAt = null,
    isPersonal = null,
    to = null
  ) {
    this._id = id || this._newId();
    this.text = text || "";
    this._author = author || this._currentUser;
    this._createAt = createAt || new Date();
    this.isPersonal = isPersonal ?? !!to;
    this._to = to;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    try {
      if (this._id !== id) throw new Error("Can't change field");
    } catch (e) {
      console.log(e.message);
    }
  }

  set createdAt(createdAt) {
    if (this._createdAt !== createdAt) throw new Error("Can't change field");
  }

  get createAt() {
    return this._createAt;
  }

  set author(author) {
    try {
      if (this._author !== author) throw new Error("Can't change field");
    } catch (e) {
      console.log(e.message);
    }
  }

  get author() {
    return this._author;
  }

  set to(to) {
    this._to = to;
    this.isPersonal = !!to;
  }

  get to() {
    return this._to;
  }

  set text(text) {
    this._text = text;
  }

  get text() {
    return this._text;
  }

  writeMessage() {
    console.log(
      `${this.id}.${this.author}: ${this.text}, ${this.isPersonal} to ${this.to} `
    );
  }

  editMessage(editObj = {}) {
    const { text, to } = editObj;
    this.to = to;
    this.text = text;
  }
}

class MessageList {
  _messages = [];

  constructor(messages) {
    this._messages = messages;
    messages.forEach((msg) =>
      MessageList.validateMessage(msg) ? this._messages.push(msg) : false
    );
    this._author = currentUser;
  }

  getPage(skip = 0, top = 10, filterConfig) {
    if (skip < 0 || top < 0) return false;

    let filtredMessages = this._messages.slice();

    if (filterConfig) {
      if (filterConfig.author) {
        filtredMessages = filtredMessages.filter((message) =>
          message.author.includes(filterConfig.author)
        );
        if (!filtredMessages[0]) {
          return false;
        }
      }

      if (filterConfig.dateFrom) {
        filtredMessages = filtredMessages.filter(
          (message) =>
            new Date(message.createdAt) > new Date(filterConfig.dateFrom)
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
      return false;
    }
    return sortedMessages;
  }

  validateMessage(msg) {
    return msg.text && msg.text.length <= 200 && typeof msg.text == "string";
  }

  addMessage(
    text = "",
    id = null,
    author = null,
    createAt = null,
    isPersonal = null,
    to = null
  ) {
    const a = new Message(text, id, author, createAt, isPersonal, to);
    if (a.validateMessage()) {
      this._messages.push(a);
    }
  }

  editMessage(idnew, text, to) {
    const message = this._messages.find(({ id }) => idnew === id);
    if (message) {
      const obj = { text: text, to: to };
      message.editMessage(obj);
      return true;
    }
    return false;
  }
}

let message = new Message("New text");
console.log(message);
