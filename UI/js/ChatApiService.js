let topM = 10;

setTimeout(() => {
  const chatBody = document.getElementsByClassName("chat-body")[0];
  chatBody.scrollTop = chatBody.scrollHeight;
}, 2000);

let userList,
  currUser,
  currentUser = "",
  isEdit = false,
  itemEdit = "",
  choosedUser = "";
const headerView = new HeaderView("current-user");
const messagesView = new MessagesView("messages-item");
const activeUsersView = new ActiveUsersView("users-online");

let asideMain = document.getElementById("sidebar-main"),
  mainBody = document.getElementById("chat-body-main"),
  asideLog = document.getElementById("sidebar-log"),
  logBody = document.getElementById("chat-body-log"),
  regBody = document.getElementById("chat-body-reg"),
  loadMore = document.getElementById("load-more");

let showActiveUsers = (usersView, currentUserList) => {
  usersView.display(currentUserList);
};

let btnSubmit = document.getElementById("chat-form");
let setCurrentUser = (user) => headerView.display(user);

async function appUsers() {
  const usersAllArrJSON = await fetch("https://jslabdb.datamola.com/users");
  const usersAllArr = await usersAllArrJSON.json();

  const usersOnline = usersAllArr
    .filter((user) => user.isActive)
    .map((user) => {
      return user.name;
    });

  const usersAll = usersAllArr.map((user) => {
    return user.name;
  });
  userList = new UserList([...usersAll], [...usersOnline]);

  showActiveUsers(activeUsersView, userList._activeUsers);
}
appUsers();

let mainPageIntervalUser = setInterval(() => {
  appUsers();
}, 120000);

async function app(da = false) {
  async function getMesages() {
    var myHeaders = new Headers();
    const bearerInvalidToken = "Bearer " + localStorage.getItem("Token") || "";
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", bearerInvalidToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url = `https://jslabdb.datamola.com/messages?skip=0&top=${topM}
    ${
      !!sessionStorage.getItem("IsFilter") &&
      sessionStorage.getItem("IsFilter").value
        ? `&author=${
            !!sessionStorage.getItem("filterAuthor")
              ? sessionStorage.getItem("filterAuthor")
              : ""
          }&dateTo=${
            !!sessionStorage.getItem("filterDate")
              ? sessionStorage.getItem("filterDate")
              : ""
          }&text=${
            !!sessionStorage.getItem("filterText")
              ? sessionStorage.getItem("filterText")
              : ""
          }`
        : ``
    }`;

    const messagesAllArrJSON = await fetch(url, requestOptions);
    let messagesAllArr = await messagesAllArrJSON.json();

    return messagesAllArr;
  }

  const messagesAllArr = await getMesages();

  // currUser = JSON.parse(localStorage.getItem("currentUser"));
  // currentUser = currUser;

//   const script2 = document.createElement("script");
//   script2.type = "text/javascript";
//   script2.src = "js/showPassword.js";
//   await document.getElementsByTagName("head")[0].appendChild(script2);

  const script5 = document.createElement("script");
  script5.type = "text/javascript";
  script5.src = "js/ChatController.js";
  await document.getElementsByTagName("head")[0].appendChild(script5);

  const messagesView = new MessagesView("messages-item");

  const message = new Message("New text");
  const messageList = new MessageList([message], currUser);

  messageList.messages = messagesAllArr.map(
    (msg) =>
      new Message(
        msg.text,
        msg.to,
        msg.id,
        msg.author,
        msg.createdAt,
        msg.isPersonal
      )
  );

  const showMessages = (skip = 0, top = 10, filterConfig) => {
    messagesView.display(messageList.getPage(skip, top, filterConfig));
  };


  setTimeout(() => {
    showMessages(0, messagesAllArr.length+1);
    if (da) {
      chatBody = document.getElementsByClassName("chat-body")[0];
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, 505);
}

app();

let mainPageInterval = setInterval(() => {
  app();
}, 2000);

async function loginPost(userLogin, userPassword) {
  clearInterval(mainPageInterval);
  var formdata = new FormData();
  formdata.append("name", userLogin);
  formdata.append("pass", userPassword);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch("https://jslabdb.datamola.com/auth/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {

      console.log(result);
      const resultParsed = JSON.parse(result);
      if (resultParsed.token) {
        localStorage.setItem("Token", resultParsed.token);
        currUser = userLogin;
        setCurrentUser(currUser);
        localStorage.setItem("currentUser", JSON.stringify(currUser));
        location.reload();
        mainPage();
      } else {
        document.getElementById("login").classList.add("not-equal-pass");
        document.getElementById("pass-inp-log").classList.add("not-equal-pass");
        document.getElementById("res-log").innerHTML = resultParsed.error;
      }
    })
    .catch((error) => console.log("error", error));
 // app(true);
}

async function logout() {
  var myHeaders = new Headers();
  const bearerInvalidToken = "Bearer " + localStorage.getItem("Token") || "";
  myHeaders.append("Authorization", bearerInvalidToken);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch("https://jslabdb.datamola.com/auth/logout", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      clearInterval(mainPageInterval);
      console.log("logout:", result);
    })
    .catch((error) => console.log("error", error));
  loginPage();
}

async function register(userLogin, userPassword) {
  var formdata = new FormData();
  formdata.append("name", userLogin);
  formdata.append("pass", userPassword);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch("https://jslabdb.datamola.com/auth/register", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("registration: ", result);
      if (result == "OK") {
        loginPost(userLogin, userPassword);
        mainPage();
      } else {
        document.getElementById("registr").classList.add("not-equal-pass");
        document.getElementById("pass-inp1").classList.add("not-equal-pass");
        document.getElementById("pass-inp2").classList.add("not-equal-pass");
        document.getElementById("res").innerHTML = "Error!";
      }
    })
    .catch((error) => console.log("error", error));
 // app(true);
}

async function addMesages(text, to) {
  var myHeaders = new Headers();
  const bearerInvalidToken = "Bearer " + localStorage.getItem("Token") || "";
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", bearerInvalidToken);

  var raw = JSON.stringify({
    text: text,
    isPersonal: to ? true : false,
    to: to ? to : "",
    author: localStorage.getItem("currentUser"),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("https://jslabdb.datamola.com/messages", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
  app(true);
}

async function editMesages(id, text, to = "") {
  var myHeaders = new Headers();
  const bearerInvalidToken = "Bearer " + localStorage.getItem("Token") || "";
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", bearerInvalidToken);

  var raw = JSON.stringify({
    text: text,
    isPersonal: to ? true : false,
    to: to ? to : "",
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let url = `https://jslabdb.datamola.com/messages/${id}`;

  await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  app();
}

async function removeMesages(id) {
  var myHeaders = new Headers();
  const bearerInvalidToken = "Bearer " + localStorage.getItem("Token") || "";
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", bearerInvalidToken);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = `https://jslabdb.datamola.com/messages/${id}`;

  await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  app();
}
