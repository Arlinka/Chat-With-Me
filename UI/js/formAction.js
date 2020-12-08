window.addEventListener("load", function () {
  const login = document.getElementById("login");
  (inp1 = document.getElementById("password-input1")),
    (inp2 = document.getElementById("password-input2")),
    (in1 = document.getElementById("pass-inp1")),
    (in2 = document.getElementById("pass-inp2")),
    (button = document.getElementById("registerbtn"));

  // function checkEmpty() {
  //   document.getElementByClassName("registerbtn").disabled = !cansubmit;
  // }

  function addActiveField() {
    this.classList.add("reg-input-active");
  }

  function removeActiveField() {
    this.classList.remove("reg-input-active");
  }

  login.addEventListener("click", addActiveField);
  in1.addEventListener("click", addActiveField);
  in2.addEventListener("click", addActiveField);
  login.addEventListener("mouseout", removeActiveField);
  in1.addEventListener("mouseout", removeActiveField);
  in2.addEventListener("mouseout", removeActiveField);

  document.getElementById("registerbtn").addEventListener("click", function () {
    if (inp1.value != inp2.value) {
      document.getElementById("res").innerHTML = "Passwords do not match!";
      in1.classList.remove("equal-pass");
      in2.classList.remove("equal-pass");
      res.classList.remove("equal-pass");
      in1.classList.add("not-equal-pass");
      in2.classList.add("not-equal-pass");
      res.classList.add("not-equal-pass");
      inp1.value = "";
      inp2.value = "";
    } else if (inp1.value == "" && inp2.value == "") {
      document.getElementById("res").innerHTML = "Password not entered!";
      in1.classList.remove("equal-pass");
      in2.classList.remove("equal-pass");
      res.classList.remove("equal-pass");
      in1.classList.add("not-equal-pass");
      in2.classList.add("not-equal-pass");
      res.classList.add("not-equal-pass");
    } else {
      document.getElementById("res").innerHTML = "Passwords match!";
      in1.classList.remove("not-equal-pass");
      in2.classList.remove("not-equal-pass");
      res.classList.remove("not-equal-pass");
      in1.classList.add("equal-pass");
      in2.classList.add("equal-pass");
      res.classList.add("equal-pass");
      button.removeAttribute("disabled");
    }
  });
});

function removeAll() {
    document.getElementById("res").innerHTML = "";
    document.getElementById("log1").value = "";
    document.getElementById("pass-login").value = "";
    document.getElementById("log1").classList.remove("not-equal-pass");
    document.getElementById("pass-login").classList.remove("not-equal-pass");
}


function errorLogin(){
  document.getElementById("log1").classList.add("not-equal-pass");
  document.getElementById("pass-login").add("not-equal-pass");
  return false;
}