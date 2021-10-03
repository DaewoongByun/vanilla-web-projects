"use-strict";

const $ = (query) => document.querySelector(query);

function App() {
  const $form = document.querySelector("form");
  $form.addEventListener("submit", submit);

  function submit(e) {
    e.preventDefault();
    const username = $("#username").value;
    const email = $("#email").value;
    const password = $("#password").value;
    const password2 = $("#password2").value;

    usernameValidator(username);
    emailValidator(email);
    passwordValidator(password);
    password2Validator(password, password2);
  }

  function usernameValidator(value) {
    const $usernameErrorMessage = $("#username + small");
    if (value.length < 3) {
      $usernameErrorMessage.innerText =
        "Username must be at least 3 characters";
      $usernameErrorMessage.style.visibility = "visible";
      $("#username").className = "error";
    } else {
      $usernameErrorMessage.innerText = "";
      $usernameErrorMessage.style.visibility = "hidden";
      $("#username").className = "success";
    }
  }
  function emailValidator(value) {
    const $emailErrorMessage = $("#email + small");
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (re.test(value)) {
      $emailErrorMessage.innerText = "";
      $emailErrorMessage.style.visibility = "hidden";
      $("#email").className = "success";
    } else {
      $emailErrorMessage.innerText = "Email is not valid";
      $emailErrorMessage.style.visibility = "visible";
      $("#email").className = "error";
    }
  }
  function passwordValidator(value) {
    const $passwordErrorMessage = $("#password + small");
    if (value.length < 6) {
      $passwordErrorMessage.innerText =
        "Password must be at least 6 characters";
      $passwordErrorMessage.style.visibility = "visible";
      $("#password").className = "error";
    } else {
      $passwordErrorMessage.innerText = "";
      $passwordErrorMessage.style.visibility = "hidden";
      $("#password").className = "success";
    }
  }
  function password2Validator(password1, password2) {
    const $password2ErrorMessage = $("#password2 + small");
    if (password2.length === 0) {
      $password2ErrorMessage.innerText = "Password2 is required";
      $password2ErrorMessage.style.visibility = "visible";
      $("#password2").className = "error";
    } else if (password1 !== password2) {
      $password2ErrorMessage.innerText = "Passwords do not match";
      $password2ErrorMessage.style.visibility = "visible";
      $("#password2").className = "error";
    } else {
      $password2ErrorMessage.innerText = "";
      $password2ErrorMessage.style.visibility = "hidden";
      $("#password2").className = "success";
    }
  }
}

App();
