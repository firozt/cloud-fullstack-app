document.querySelector('form').addEventListener('submit', (e) => {
  const form = e.target;

  // check for html validation
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }

  const fileInput = document.getElementById('profileImg');

  if (fileInput.files.length > 0) {
    storeImageInSession(fileInput.files[0]);
  }

  const formData = {
    name: capitalizeWords(form.fullname.value),
    email: form.email.value,
    dob: form.dob.value,
    bio: form.bio.value,
    fact: form.fact.value,
    music: form.music.value,
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
    sessionStorage.setItem('profileImg', e.target.result);
  };

  reader.readAsDataURL(file);
}
