class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(user) {
    const headerUserView = document.getElementById(this.containerId);
    headerUserView.innerHTML = user
      ? `Hi, ${user}! <button type="button">Sign Out</button>`
      : `Hi, Guest! <button type="button">Sign In</button>`;
  }
}
