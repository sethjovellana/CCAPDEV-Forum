  function editProfile() {
    // Have to replace the profile content with editedd form
    document.getElementById('profileDescription').style.display = 'none';
    document.getElementById('editProfileForm').style.display = 'block';
  
    const currentDescription = document.getElementById('profileDescription').innerHTML.trim();
    document.getElementById('newDescription').value = currentDescription;
  
    // Hide the edit button when eduiting
    document.querySelector('.comment button').style.display = 'none';
  }
  
  function cancelEdit() {
    document.getElementById('profileDescription').style.display = 'block';
    document.getElementById('editProfileForm').style.display = 'none';
  
    // Show the edit button only when not editing
    document.querySelector('.comment button').style.display = 'block';
  }
  
  function saveChanges() {
    // Retrieve the values from the edit form
    const newProfilePictureInput = document.getElementById('newProfilePicture');
    const newDescription = document.getElementById('newDescription').value;
  
    // Profile pIc:
    if (newProfilePictureInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // new image data
            document.querySelector('.author img').src = e.target.result;
        };
        //for contents of the selected file
        reader.readAsDataURL(newProfilePictureInput.files[0]);
    }
  
    // Apply the changes to the profile content
    document.getElementById('profileDescription').innerHTML = newDescription;
  
    document.getElementById('profileDescription').style.display = 'block';
    document.getElementById('editProfileForm').style.display = 'none';
  
    // Show the edit button
    document.querySelector('.comment button').style.display = 'block';
  } 

