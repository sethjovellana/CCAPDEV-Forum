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

// login (old version)
// async function login() {
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;

//   if (username === "username" && password === "password") {
//     document.getElementById("loginMessage").innerHTML = "Login successful!";

//     window.location.href = "home";
//   } else {
//     document.getElementById("loginMessage").innerHTML =
//       "Invalid username or password";
//   }
// }

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Redirect or perform other actions upon successful login
      window.location.href = "home";
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.errorMessage}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again later.");
  }
}

async function register() {
  // Get form elements
  var form = document.getElementById("registrationForm");
  var profile_photo = form.elements["profile_photo"].value;
  var full_name = form.elements["name"].value; // full name
  var user_name = form.elements["username"].value;
  var email = form.elements["email"].value;
  var password = form.elements["password"].value;
  var confirmPassword = form.elements["confirmpassword"].value;

  if (password === confirmPassword && form.checkValidity()) {
    try {
      const requestData = {
        profile_photo: profile_photo,
        full_name: full_name,
        user_name: user_name,
        email: email,
        password: password,
      };

      const response = await fetch("/Register", {
        method: "POST",
        body: JSON.stringify(requestData), // Convert data to JSON string
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "successfulRegister";
      } else {
        const errorData = await response.json();
        displayError(errorData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      displayError("An error occurred. Please try again later.");
    }
  } else {
    if (password !== confirmPassword) {
      displayError(
        "Password and Confirm Password do not match. Please try again."
      );
    } else {
      form.reportValidity();
    }
  }
}

function displayError(errorMessage) {
  // Display the error message on the webpage (you can customize this based on your HTML structure)
  const errorElement = document.getElementById("error-message");
  errorElement.textContent = errorMessage;
  errorElement.style.display = "block"; // Make the error message visible
}

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
