document.getElementsByTagName('form')[0].addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;

  const formData = {
    name: form.name.value,

    email: form.email.value,
    phone_number: form['phonenumber'].value,
    dob: form.dob.value,
  };
  sessionStorage.setItem('formData', JSON.stringify(formData));

  // Redirect to submitted page
  window.location.href = 'submitted.html';
});
