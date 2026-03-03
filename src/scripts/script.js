document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;

  const fileInput = document.getElementById('pfp');

  let profilePicture = sessionStorage.getItem('pfp');

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    storeImageInSession(file);
    profilePicture = sessionStorage.getItem('pfp');
  }

  const formData = {
    name: capitalizeWords(form.fullname.value),
    email: form.email.value,
    dob: form.dob.value,
    bio: form.bio.value,
    fact: form.fact.value,
    music: form.music.value,
    profilepicture: profilePicture,
  };

  sessionStorage.setItem('formData', JSON.stringify(formData));

  window.location.href = 'submitted.html';
});

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function storeImageInSession(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    sessionStorage.setItem('avatar', e.target.result);
  };

  reader.readAsDataURL(file);
}
