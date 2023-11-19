// Navbar
function hideIconBar() {
  var iconBar = document.getElementById("iconBar");
  var navigation = document.getElementById("navigation");
  iconBar.setAttribute("style", "display:none;");
  navigation.classList.remove("hide");
}

function showIconBar() {
  var iconBar = document.getElementById("iconBar");
  var navigation = document.getElementById("navigation");
  iconBar.setAttribute("style", "display:block;");
  navigation.classList.add("hide");
}

// Comment

function showComment() {
  var commentArea = document.getElementById("comment-area");
  commentArea.setAttribute("style", "display:block;");
}

function showReply() {
  var replyArea = document.getElementById("reply-area");
  replyArea.setAttribute("style", "display:block;");
}

//logout

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      
      window.location.href = "logout";
    });
  }
});

// logout confirmation
document.addEventListener("DOMContentLoaded", function () {
  const logoutYesButton = document.getElementById("logout-yes");
  if (logoutYesButton) {
      logoutYesButton.addEventListener("click", function () {
          window.location.href = "logoutConfirmation";
      });
  }

  const logoutNoButton = document.getElementById("logout-no");
  if (logoutNoButton) {
      logoutNoButton.addEventListener("click", function () {
          
          window.history.back();
      });
  }
});

// login
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  if (username === "username" && password === "password") {
      document.getElementById("loginMessage").innerHTML = "Login successful!";

      window.location.href = "home";
  } else {
      document.getElementById("loginMessage").innerHTML = "Invalid username or password";
  }
}

function register() {
  window.location.href = "successfulRegister";
}