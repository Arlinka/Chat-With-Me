class ActiveUsersView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(users) {
    const activeUsers = document.getElementById(this.containerId);
      currUser = JSON.parse(localStorage.getItem("currentUser"));
      currentUser = currUser;
    if (!!currUser) {
      const id = users.findIndex(
        (user) => user == currUser
      );
      if (id != -1) {
        let user = users.splice(id, 1);
        users.unshift(user[0]);
      } else {
        users.unshift(currUser);
      }
    }
       activeUsers.innerHTML = users
      .map((user) => `<li id="${user}">${user}</li>`)
      .join("\n");
   
  }
}
