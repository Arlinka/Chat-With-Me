class Message {
  constructor(
    text = "",
    to = null,
    id = null,
    author = null,
    createAt = null,
    isPersonal = null
  ) {
    this._id = id || newId();
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

  editMessage({ text, to }) {
    this._text = text;
    this._to = to;
    this.isPersonal = !!to;
  }
}
