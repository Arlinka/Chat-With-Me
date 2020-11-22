class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  formatDate(date) {
    const checkDate = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };

    return `${checkDate(date.getDate())}.${checkDate(
      date.getMonth() + 1
    )}.${checkDate(date.getFullYear())}, ${checkDate(
      date.getHours()
    )}:${checkDate(date.getMinutes())}`;
  }

  display(msgs) {
    const messageItems = document.getElementById(this.containerId);
    messageItems.innerHTML = msgs
      .map(
        (item) => `<div class="message-item 
        ${item._author === currentUser ? "message-own" : "message-foreign"}
        ${item.isPersonal ? "message-privat" : ""}">
        <div class="user-name">${item._author}</div>
        ${item.isPersonal ? "<div class='message-acceptor'>" + item._to + "</div>" : ""}
            ${
              item._author === currentUser
                ? '<div class="message-edit-buttons"><i class="fa fa-pencil"></i> <i class="fa fa-trash"></i></div>'
                : ""
            }  
              <p>${item.text}</p>
            <div class="message-date"> ${this.formatDate(item.createAt)}</div>
        </div>`
      )
      .join("\n");
  }
}
