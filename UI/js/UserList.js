class UserList {
  constructor(users, activeUsers) {
    this._users = users;
    this._activeUsers = activeUsers;
  }

  set users(users) {
    this._users = users;
  }

  get users() {
    return this._users;
  }

  set activeUsers(activeUser) {
    this._activeUsers = activeUser;
  }

  get activeUsers() {
    return this._activeUsers;
  }
}
