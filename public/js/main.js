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
    document.getElementById("loginMessage").innerHTML =
      "Invalid username or password";
  }
}
function register() {
  // Get form elements
  var form = document.getElementById("registrationForm");
  var password = form.elements["password"].value;
  var confirmPassword = form.elements["confirmpassword"].value;

  // Check if password and confirmPassword match
  if (password === confirmPassword && form.checkValidity()) {
    // If all conditions are met, redirect to successfulRegister.html
    window.location.href = "successfulRegister";
  } else {
    // If passwords don't match or any other field is invalid, display notification
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match. Please try again.");
    } else {
      // If any other field is invalid, submit the form to display browser's default validation messages
      form.reportValidity();
    }
  }
}
// function register() {
//   window.location.href = "successfulRegister";
// }

// MyProfile edit form
// MyProfile Page function:
function editProfile() {
  // Have to replace the profile content with editedd form
  document.getElementById("profileDescription").style.display = "none";
  document.getElementById("editProfileForm").style.display = "block";

  const currentDescription = document
    .getElementById("profileDescription")
    .innerHTML.trim();
  document.getElementById("newDescription").value = currentDescription;

  // Hide the edit button when eduiting
  document.querySelector(".comment button").style.display = "none";
}

function cancelEdit() {
  document.getElementById("profileDescription").style.display = "block";
  document.getElementById("editProfileForm").style.display = "none";

  // Show the edit button only when not editing
  document.querySelector(".comment button").style.display = "block";
}

function saveChanges() {
  // Retrieve the values from the edit form
  const newProfilePictureInput = document.getElementById("newProfilePicture");
  const newDescription = document.getElementById("newDescription").value;

  // Profile pIc:
  if (newProfilePictureInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // new image data
      document.querySelector(".author img").src = e.target.result;
    };
    //for contents of the selected file
    reader.readAsDataURL(newProfilePictureInput.files[0]);
  }

  // Apply the changes to the profile content
  document.getElementById("profileDescription").innerHTML = newDescription;

  document.getElementById("profileDescription").style.display = "block";
  document.getElementById("editProfileForm").style.display = "none";

  // Show the edit button
  document.querySelector(".comment button").style.display = "block";
}

// AddPost

function submitPost() {
  // Get values from the input fields
  var postTitle = document.getElementById("post-title").value.trim();
  var postContent = document.getElementById("post-content").value.trim();

  // Check if both title and content have content
  if (postTitle !== "" && postContent !== "") {
    // Redirect to index.html
    window.location.href = "MyPosts";
  } else {
    // Display an alert or handle the case when either title or content is empty
    alert("Please fill in both title and content before submitting.");
  }
}
