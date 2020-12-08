currUser = JSON.parse(localStorage.getItem("currentUser"));
currentUser = currUser;

setTimeout(() => {
  if (!currUser) mainPageGuest();
  else mainPage(currUser);
}, 0);

function clearPage() {
  asideMain.style.display = "none";
  mainBody.style.display = "none";
  asideLog.style.display = "none";
  logBody.style.display = "none";
  regBody.style.display = "none";
}

document.getElementById("reg").addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    registrPage();
  }, 200);
});

document.getElementById("current-user").addEventListener("click", (event) => {
  event.preventDefault();
  clearInterval(mainPageInterval);
  if (currUser) {
    logout();
  } else {
    clearInterval(mainPageInterval);
    loginPage();
  }
});

document.getElementById("logo").addEventListener("click", (event) => {
  event.preventDefault();
  !!currUser ? mainPage() : mainPageGuest();
});

document.querySelector("a.log").addEventListener("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    loginPage();
  }, 200);
});

document.getElementById("home").addEventListener("click", (event) => {
  event.preventDefault();
  location.reload();
  mainPageGuest()
});

document.getElementById("users-online").addEventListener("click", chooseUserTo);
document
  .getElementsByClassName("fa-times")[0]
  .addEventListener("click", clearUser);

function mainPageGuest() {
  clearPage();
  setTimeout(() => {
    setCurrentUser("");
  //  app(); 
  }, 1004);
  document.getElementsByTagName("textarea")[0].disabled = true;
  document.getElementsByClassName("fa-paper-plane")[0].disabled = true;
  document.getElementsByTagName("textarea")[0].placeholder =
    "Please Sign In before start chatting ...";
  document.getElementById("current-user").style.display = "inline";
  if (window.screen.width > 966) asideMain.style.display = "block";
  mainBody.style.display = "block";
}

function mainPage() {
  clearPage();
  currUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser = currUser;
  setCurrentUser(currUser);
  document.getElementById("current-user").style.display = "inline";
  setTimeout(() => {
    if (
      currUser &&
      !!document.getElementById(currUser) &&
      document.getElementById(currUser).id == currUser
    ) {
      document.getElementById(currUser).classList.add("li-first-child");
    }
  }, 0);

  if (window.screen.width > 966) asideMain.style.display = "block";
  mainBody.style.display = "block";
}

 function loginPage() {
  clearInterval(mainPageInterval);
  localStorage.removeItem("currentUser");
  clearPage();
  // location.reload;
  document.getElementById("current-user").style.display = "none";
  asideLog.style.display = "block";
  logBody.style.display = "block";
  document.getElementsByClassName("get-started")[0].innerText = "Hello again";
  document.getElementById("welcome-text").innerText =
    "Please login with your personal info to keep connected with people all around the world.";
  document
    .getElementById("form-login")
    .addEventListener("submit", async (e) => {
      clearInterval(mainPageInterval);
      e.preventDefault();
      let userLogin = document.getElementById("log1").value;
      let userPassword = document.getElementById("pass-login").value;
      if (userLogin && userPassword) {
        clearInterval(mainPageInterval);
        loginPost(userLogin, userPassword);
      } else {
        document
          .getElementById("form-login")
          .setAttribute("onsubmit", "return false;");
      }
    });
}

function registrPage() {
  //removeAll();
  clearInterval(mainPageInterval);
  clearPage();
  document.getElementById("current-user").style.display = "none";
  asideLog.style.display = "block";
  regBody.style.display = "block";
  document.getElementsByClassName("get-started")[0].innerText = "Get Started";
  document.getElementById("welcome-text").innerText =
    "Create an account in a few clicks and enjoy messaging with people all around the world.";
  document
    .getElementById("form-registr")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      let userLogin = document.getElementById("registr-login").value;
      let userPassword = document.getElementById("password-input1").value;
      let userPasswordConfirm = document.getElementById("password-input2")
        .value;
      if (userLogin && userPassword === userPasswordConfirm) {
        register(userLogin, userPassword);
      } else if (userPassword != userPasswordConfirm) {
        document.getElementById("pass-inp1").classList.add("not-equal-pass");
        document.getElementById("pass-inp2").classList.add("not-equal-pass");
        document.getElementById("res").innerHTML = "Passwords do not match!";
      } else {
        return false;
      }
    });
}


//кнопка load-more
loadMore.style.visibility = "visible";
loadMore.addEventListener("click", (event) => {
 event.preventDefault();

      topM += 10;
      console.log(topM);

});

//Для отправки личного сообщения
function chooseUserTo(event) {
  if (currUser) {
    const toUser = document.getElementsByClassName("to")[0];
    if (event.target.id != "users-online") {
      if (event.target.textContent == currUser) {
        return;
      }
      toUser.style.display = "block";
      toUser.innerText = event.target.textContent;
      document.getElementsByClassName("fa-times")[0].style.visibility =
        "visible";
      choosedUser = event.target.textContent;
    }
  }
  return;
}

function clearUser() {
  document.getElementsByClassName("to")[0].style.display = "none";
  document.getElementsByClassName("fa-times")[0].style.visibility = "hidden";
}

//Редактирование сообщения
function editMessageUI() {
  setTimeout(() => {
    const btnEdit = document.getElementsByClassName("fa-pencil");
    for (item of btnEdit) {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        isEdit = true;
        const textarea = document.getElementsByTagName("textarea")[0];
        textarea.value = e.target.parentNode.parentNode.getElementsByTagName(
          "p"
        )[0].textContent;
        textarea.style.color = "#333333";
        document.getElementById("clear").style.visibility = "visible";
        itemEdit = e.target.parentNode.parentNode.id;
      });
    }
    document.getElementById("clear").addEventListener("click", () => {
      document.getElementById("clear").style.visibility = "hidden";
      document.getElementsByTagName("textarea")[0].value = "";
      isEdit = true;
      itemEdit = "";
      location.reload();
    });
  }, 1002);
}

// Ввод сообщения и редактирование
btnSubmit = document.getElementById("chat-form");
editMessageUI();
if (!isEdit)
  btnSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    const textarea = document.getElementsByTagName("textarea")[0];
    if (!!textarea.value.trim()) {
      const colorBtn = event.target.style.color;
      event.target.style.color = "#6C3C9F";
      const serializedMessage = textarea.value.trim();
      if (!isEdit) {
        addMesages(serializedMessage, choosedUser);
      } else if (!!itemEdit) {
        console.log(itemEdit);
        editMesages(itemEdit, serializedMessage, choosedUser);
      } else {
        return;
      }
      setTimeout(() => {
        event.target.style.color = colorBtn;
      }, 1000);
    }
    textarea.value = "";
  });

//Удаление сообщения
setTimeout(() => {
  const btnDelete = document.getElementsByClassName("fa-trash");
  const windowDelete = document.getElementById("delete-message-window");
  for (item of btnDelete) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      windowDelete.style.display = "block";
      document.getElementById("delYes").addEventListener("click", (even) => {
        even.preventDefault();
        setTimeout(() => {
          windowDelete.style.display = "none";
        }, 0);
        removeMesages(event.target.parentNode.parentNode.id);
      });
    });
  }
  document.getElementById("delNo").addEventListener("click", (event) => {
    event.preventDefault();
    windowDelete.style.display = "none";
  });
}, 1002);

function errorPage() {
  clearPage();
  setTimeout(() => {
    document.getElementById("current-user").style.display = "none";
    document.getElementById("error-aside").style.display = "block";
    document.getElementById("error-main").style.display = "block";
  }, 0);
}

//Фильтры
function filterMesseges(val) {
  sessionStorage.setItem("IsFilter", val);
  if (!!document.getElementById("filter-1").value)
    sessionStorage.setItem(
      "filterAuthor",
      document.getElementById("filter-1").value
    );
  if (!!document.getElementById("filter-2").value)
    sessionStorage.setItem(
      "filterDate",
      document.getElementById("filter-2").value
    );
  if (!!document.getElementById("filter-3").value)
    sessionStorage.setItem(
      "filterText",
      document.getElementById("filter-3").value
    );
   // app();
      document.getElementById("filter-3").value = "";
      document.getElementById("filter-2").value = "";
      document.getElementById("filter-1").value = "";
      // sessionStorage.removeItem("filterAuthor");
      // sessionStorage.removeItem("filterDate");
      // sessionStorage.removeItem("filterText");
}

document.getElementById("filter-btn").addEventListener("click", (event) =>{
  event.preventDefault();
  clearInterval(mainPageInterval);
  filterMesseges(true);
});
