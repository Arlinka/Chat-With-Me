const messagesL = new MessageList([...messageList.messages]);
const messagesList = [...messagesL._messages];

const headerView = new HeaderView("current-user");
const messagesView = new MessagesView("messages-item");
const activeUsersView = new ActiveUsersView("users-online");

const userList = new UserList([...usersAll], [...usersOnline]);

const setCurrentUser = (user) => headerView.display(user);

const showActiveUsers = (usersView, currentUserList) => {
  usersView.display(currentUserList);
};

const showMessages = (skip = 0, top = 10, filterConfig) => {
  messagesView.display(messageList.getPage(skip, top, filterConfig));
};

const addMessage = (msg) => {
  if (MessageList.add(msg)) {
    MessageList.add(msg);
    showMessages(0, 10);
  }
};

const removeMessage = (id) => {
  const index = messagesList.findIndex((message) => message._id === id);
  if (index != -1) {
    messagesList.splice(index, 1);
    messagesView.display(messageList.getPage(0, 20));
  }
};

const editMessage = (id, msg, to) => {
  messagesList = MessageList.prototype.edit(id, msg, to);
  messagesView.display(messageList.getPage(0, 20));
};
