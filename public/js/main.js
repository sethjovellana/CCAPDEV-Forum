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

async function submitLoginForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const user_name = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Login data:", { user_name, password });
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, password }),
    });

    if (response.ok) {
      // Redirect or perform other actions upon successful login
      window.location.href = "home";
    } else if (response.status === 404) {
      alert("User not found. Please check your username.");
    } else if (response.status === 401) {
      alert("Invalid password. Please try again.");
    } else {
      alert("An unexpected error occurred. Please try again later.");
      try {
        errorData = await response.json();
      } catch (jsonError) {
        // If parsing as JSON fails, assume it's HTML/text
        console.error("Non-JSON error response:", response.statusText);
        alert("Login failed. An unexpected error occurred.");
        return;
      }

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
      console.log(response);
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
  const newProfilePictureInput = document.getElementById("newProfilePicture").value;
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

// For up/down vote count
function upvote(element) {
  const postElement = element.closest(".table-row");

  const upvoteCountElement = postElement.querySelector(".upvote-count");
  const currentUpvotes = parseInt(upvoteCountElement.textContent);
  upvoteCountElement.textContent = currentUpvotes + 1;
}

function downvote(element) {
  const postElement = element.closest(".table-row");
  const downvoteCountElement = postElement.querySelector(".downvote-count");
  const currentDownvotes = parseInt(downvoteCountElement.textContent);
  downvoteCountElement.textContent = currentDownvotes - 1;
}

function deletePost() {
  // Optionally, you can show a confirmation dialog before deleting
  const confirmDelete = confirm("Are you sure you want to delete this post?");

  if (confirmDelete) {
    // Find the post container and remove it
    const postContainer = document.querySelector('.topic-container');
    postContainer.remove();

    // Optionally, you can send a request to the server to delete the post
    // This is just a client-side removal; actual deletion should happen on the server
  }
}

// Create Comment
/*function createComment() {
  const commentText = document.getElementById("comment-text").value.trim();

  // Check if the comment is not empty
  if (commentText !== "") {
    fetch("/comments", { method: 'POST', body: JSON.stringify({ text: commentText }), headers: { 'Content-Type': 'application/json' } })

    alert("Comment created successfully!");
  } else {
    alert("Please enter a comment before submitting.");
  }
}

// Edit Comment
function editComment(element) {
  const commentContainer = element.closest('.comment-container');
  const commentTextElement = commentContainer.querySelector('.comment-text');
  const currentCommentText = commentTextElement.textContent;

  const updatedCommentText = prompt("Edit your comment:", currentCommentText);

  if (updatedCommentText !== null) {
     fetch(`/comments/${commentId}`, { method: 'PUT', body: JSON.stringify({ text: updatedCommentText }), headers: { 'Content-Type': 'application/json' } })
    commentTextElement.textContent = updatedCommentText;
  }
}


//save edied
//save edited comment
function saveEditedComment(element) {
  // Find the parent comment container element
  const commentContainer = element.closest('.comment');

  // Find the edited comment content
  const editedCommentContent = commentContainer.querySelector('.edited-comment-content');

  // Update the original comment content with the edited content
  const commentContent = commentContainer.querySelector('.commentContainer');
  if (commentContent) {
    commentContent.textContent = editedCommentContent.value;
  }

  // Toggle back to displaying the comment content
  commentContent.style.display = 'block';
  const editForm = commentContainer.querySelector('.edit-comment-form');
  if (editForm) {
    editForm.style.display = 'none';
  }
}





function cancelEditComment(element) {
  // Find the parent comment container element
  const commentContainer = element.closest('.comment');

  // Toggle back to displaying the comment content
  const commentContent = commentContainer.querySelector('.commentContainer');
  if (commentContent) {
    commentContent.style.display = 'block';
  }

  const editForm = commentContainer.querySelector('.edit-comment-form');
  if (editForm) {
    editForm.style.display = 'none';
  }
}




//#3 Deletes comment in a post
function deleteComment(element) {
  // Find the parent comment container element
  const commentContainer = element.closest('.comment');

  // Replace the comment content with "deleted comment"
  const commentContent = commentContainer.querySelector('.commentContainer');
  if (commentContent) {
    commentContent.innerHTML = '<span style="color: red;">Deleted comment</span>';
  }

  // Optionally, you can send the comment deletion data to the server here
  // Example: sendDeleteCommentRequest(commentId);
}

//For the up/down vote for posts

let upvoteCount = 0;
let downvoteCount = 0;

function upvote(element) {
  if (!upvoteCount){
    upvoteCount++;
  }
  else{
    upvoteCount--
  }
  updateVoteCounts();
}

function downvote(element) {
  if (!downvoteCount){
    downvoteCount--;
  }
  else{
    downvoteCount++;
  }
  updateVoteCounts();
}

function hoverButton(element) {
  element.classList.add("hovered");
}

function unhoverButton(element) {
  element.classList.remove("hovered");
}

function updateVoteCounts() {
  const upvoteCountElement = document.querySelector(".upvote-count");
  const downvoteCountElement = document.querySelector(".downvote-count");

  upvoteCountElement.textContent = upvoteCount;
  downvoteCountElement.textContent = downvoteCount;
}

// EDIT COMMENT 
//edit
function editComment(element) {
  // Find the parent comment container element
  const commentContainer = element.closest('.comment');

  // Toggle between displaying the comment content and the edit form
  const commentContent = commentContainer.querySelector('.commentContainer');
  const editForm = commentContainer.querySelector('.edit-comment-form');
  const editButton = commentContainer.querySelector('button'); // Assuming it's the first button, you might need to adjust this selector

  if (commentContent && editForm && editButton) {
    commentContent.style.display = 'none';
    editForm.style.display = 'block';
    
    // Hide the "Edit Comment" button
    editButton.style.display = 'none';
  }
}


//EDIT POST FEATURE
//EDIT POST 
function editPost() {
  // Hide the post content and show the edit form
  const postContent = document.getElementById("postContent");
  const editPostForm = document.getElementById("editPostForm");

  postContent.style.display = "none";
  editPostForm.style.display = "block";

  // Get the current post content and set it in the edit form
  const currentDescription = postContent.textContent.trim();
  document.getElementById("newPost").value = currentDescription;

  // Hide the comment button when editing
  const commentButton = document.querySelector('.comment button');
  if (commentButton) {
    commentButton.style.display = 'none';
  }

  // Show the save and cancel buttons
  const saveButton = document.getElementById("saveChangesButton");
  const cancelButton = document.getElementById("cancelEditButton");
  if (saveButton && cancelButton) {
    saveButton.style.display = "block";
    cancelButton.style.display = "block";
  }
}


function cancelEdit() {
  document.getElementById("postContent").style.display = "block";
  document.getElementById("editPostForm").style.display = "none";

  // Show the edit button only when not editing
  document.querySelector(".comment button").style.display = "block";
}

function saveChanges() {
  const newDescription = document.getElementById("newPost").value;

  // Apply the changes to the profile content
  document.getElementById("postContent").innerHTML = newPost;

  document.getElementById("postContent").style.display = "block";
  document.getElementById("editPostForm").style.display = "none";

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
