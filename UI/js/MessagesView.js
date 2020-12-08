class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  formatDate(date) {
    date = new Date(date);
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
    currUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser = currUser;
    messageItems.innerHTML = msgs
      .filter(
        (item) =>
         item._author &&
          (item.to === currentUser ||
          item.to == null ||
          item._author === currentUser)

        // (item) =>
        //   (item.to &&
        //     currentUser &&
        //     item.to.toLowerCase() === currentUser.toLowerCase()) ||
        //   item.to == null ||
        //   (currentUser && item._author &&
        //     item._author.toLowerCase() === currentUser.toLowerCase())
      )
      .map(
        (item) => `<div class="message-item 
        ${
          !!item._author && item._author === currentUser
            ? "message-own"
            : "message-foreign"
        }
        ${item.isPersonal ? "message-privat" : ""}" id="${item.id}">
        <div class="user-name">${item._author}</div>
        ${
          !!item && item.isPersonal
            ? "<div class='message-acceptor'>" + item._to + "</div>"
            : ""
        }
            ${
              !!item && item._author === currentUser
                ? '<div class="message-edit-buttons"><i class="fa fa-pencil"></i> <i class="fa fa-trash"></i></div>'
                : ""
            }  
              <p>${item.text}</p>
            <div class="message-date"> ${this.formatDate(item._createAt)}</div>
        </div>`
      )
      .join("\n");
  }
}
