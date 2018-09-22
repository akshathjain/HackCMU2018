// Nice Scrolling
// eslint-disable-next-line no-unused-vars
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
  });
}

// Self-explanatory
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Show or hide LogIn/SignUp popups
// eslint-disable-next-line no-unused-vars
function showModal(id, displayVal) {
  if (displayVal) {
    document.getElementById('showPassword').checked = false;
    document.querySelector(`#${id}`).style.display = 'inherit';
  } else {
    document.querySelector(`#${id}`).style.display = 'none';
  }
}

// Make password visible
let passwordVisible = false;
// eslint-disable-next-line no-unused-vars
function togglePWVisibility() {
  if (passwordVisible) {
    document.querySelector('#PWVisible').classList.add('fa-eye');
    document.querySelector('#PWVisible').classList.remove('fa-eye-slash');
    document.querySelector('#signUpPassword').type = 'password';
    passwordVisible = false;
  } else {
    document.querySelector('#PWVisible').classList.remove('fa-eye');
    document.querySelector('#PWVisible').classList.add('fa-eye-slash');
    document.getElementById('signUpPassword').type = 'text';
    passwordVisible = true;
  }
}

// eslint-disable-next-line no-unused-vars
function checkUName(username) {
  axios.get('/login/usercheck', {
    params: {
      username,
    },
  }).then(() => {
    document.querySelector('#usernameTaken').classList.add('is-hidden');
  }).catch(() => {
    document.querySelector('#usernameTaken').classList.remove('is-hidden');
  });
}

function logIn(...args) {
  let [username, password] = args;
  if (!username) username = document.querySelector('#logInUsername').value;
  if (!password) password = document.querySelector('#logInPassword').value;

  axios.post('/login/', {
    username,
    password: sha512(password),
  }).then(() => {
    window.location.href = '/login/dashboard';
  }).catch(() => {
    // TODO: turn something red
  });
}

// eslint-disable-next-line no-unused-vars
function signUp() {
  const username = document.querySelector('#signUpUsername').value;
  const email = document.querySelector('#signUpEmail').value;
  const password = document.querySelector('#signUpPassword').value;
  // document.querySelector('#signUpError').classList.add('is-hidden');

  if (!username) {
    document.querySelector('#signUpError').innerHTML = 'You need a username.';
    document.querySelector('#signUpError').classList.remove('is-hidden');
    return;
  }
  if (!validateEmail(email)) {
    document.querySelector('#signUpError')
      .innerHTML = 'You need to input a valid email.';
    document.querySelector('#signUpError').classList.remove('is-hidden');
    return;
  }
  if (!password) {
    document.querySelector('#signUpError')
      .innerHTML = 'As lazy as you are, your password must be more than 0 characters long.';
    document.querySelector('#signUpError').classList.remove('is-hidden');
    return;
  }

  axios.post('/login/signup/', {
    username,
    email,
    password: sha512(password),
  }).then(() => {
    logIn(username, password);
  }).catch(() => {
    alert('RIP');
  });

  return true;
}
