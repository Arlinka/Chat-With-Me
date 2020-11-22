class ActiveUsersView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(users) {
    const activeUsers = document.getElementById(this.containerId);
    activeUsers.innerHTML = users.map((item) => `<li>${item}</li>`).join("\n");
  }
}
