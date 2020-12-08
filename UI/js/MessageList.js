class MessageList {
  constructor(messages, currentUser) {
    this._messages = [];
    if (messages) {
      messages.forEach((msg) =>
        MessageList.validate(msg)
          ? this._messages.push({
              ...msg,
              isPersonal: msg.isPersonal || !!msg.to,
            })
          : false
      );
    }
    this._author = currentUser;
  }

  get messages() {
    return this._messages;
  }

  set messages(messages) {
    if (messages.length === 0) this._messages = [];
    else
      messages.forEach((msg) => {
        if (MessageList.validate(msg)) this._messages.push(msg);
        else false;
      });
  }

  getPage(skip = 0, top = 10, filterConfig) {
    if (skip < 0 || top < 0) return false;

    let filtredMessages = this._messages.slice();

    if (filterConfig) {
      if (filterConfig.author) {
        filtredMessages = filtredMessages.filter(
          (message) =>
            message._author && message._author.includes(filterConfig.author)
        );
        if (!filtredMessages[0]) {
          return false;
        }
      }

      if (filterConfig.dateFrom) {
        console.log(filterConfig.dateFrom, "dateFrom");
        filtredMessages = filtredMessages.filter(
          (message) => message._createAt > filterConfig.dateFrom
        );
      }

      if (filterConfig.dateTo) {
        filtredMessages = filtredMessages.filter(
          (message) => message._createAt < filterConfig.dateTo
        );
      }

      if (filterConfig.text) {
        filtredMessages = filtredMessages.filter((message) =>
          message._text.includes(filterConfig.text)
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

  static validate(msg) {
    return msg.text && msg.text.length <= 200 && typeof msg.text == "string";
  }

  add(
    text = "",
    to = null,
    id = newId(),
    author = null,
    createdAt = null,
    isPersonal = null
  ) {
    const mess = new Message(text, to, id, author, createdAt, isPersonal);
    if (this.isValid(mess)) {
      this._messages.push(mess);
    }
  }

  isValid(message) {
    return MessageList.validate(message);
  }

  edit(idnew, text, to) {
    const message = this._messages.find(({ id }) => idnew === id);
    if (message) {
      const obj = { text, to };
      message.editMessage(obj);
      return true;
    }
    return false;
  }

  get(id) {
    return this.messages.find((message) => message.id === id) ?? false;
  }

  remove(id) {
    let message = this.get(id);
    if (message) {
      const index = this.messages.findIndex((message) => message.id === id);
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }

  addAll(msg) {
    const messagesEmpty = [];
    msg.forEach((msg) => {
      if (MessageList.validate(msg)) this.messages.push(msg);
      else messagesEmpty.push(msg);
    });
    return messagesEmpty;
  }

  clear() {
    this.messages = [];
  }
}
