// fills in data to card from session storage
const data = JSON.parse(sessionStorage.getItem('formData') || '{}');

document.getElementById('name').textContent = data.name || 'Anonymous';
document.getElementById('bio').textContent = data.bio || '';
document.getElementById('dob').textContent = data.dob || '';
document.getElementById('email').textContent = data.email || '';
document.getElementById('fact').textContent = data.fact || '';
document.getElementById('music').textContent = data.music || '';

const profilePicture = sessionStorage.getItem('avatar');
if (profilePicture) {
  document.getElementById('avatarImg').src = profilePicture;
}

// panel event listeners, changes color if elements using input elements
const card = document.getElementById('card');
const bio = document.getElementById('bio');

// background color
document.getElementById('bgColor').addEventListener('input', (e) => {
  card.style.backgroundColor = e.target.value;
});

// general text colour
document.getElementById('textColor').addEventListener('input', (e) => {
  card.style.color = e.target.value;
});

// bio text colour
document.getElementById('bioTextColor').addEventListener('input', (e) => {
  bio.style.color = e.target.value;
});

// toggle show dob
document.getElementById('toggleDob').addEventListener('change', (e) => {
  document.getElementById('dobRow').style.display = e.target.checked
    ? 'flex'
    : 'none';
});

// toggle show email
document.getElementById('toggleEmail').addEventListener('change', (e) => {
  document.getElementById('emailRow').style.display = e.target.checked
    ? 'flex'
    : 'none';
});

// toggle show fun fact
document.getElementById('toggleFact').addEventListener('change', (e) => {
  document.getElementById('factRow').style.display = e.target.checked
    ? 'flex'
    : 'none';
});

// toggle show favourite music artist
document.getElementById('toggleMusic').addEventListener('change', (e) => {
  document.getElementById('musicRow').style.display = e.target.checked
    ? 'flex'
    : 'none';
});
