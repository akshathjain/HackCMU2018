var passwordVisible = false;

// Nice Scrolling
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
  });
}

// Self-explanatory
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show or hide LogIn/SignUp popups
function showModal(id, displayVal) {
  if (displayVal) {
    document.getElementById('showPassword').checked = false;
    $(`#${id}`).css('display', 'inherit');
  }
  else {
    $(`#${id}`).css('display', 'none');
  }
}

// Make password visible I think
function togglePWVisibility() {
  if (passwordVisible) {
    $("#PWVisible").addClass("fa-eye");
    $("#PWVisible").removeClass("fa-eye-slash");
    document.getElementById('signUpPassword').type = "password";
    passwordVisible = false;
  }
  else {
    $("#PWVisible").removeClass("fa-eye");
    $("#PWVisible").addClass("fa-eye-slash");
    document.getElementById('signUpPassword').type = "text";
    passwordVisible = true;
  }
}

function checkUName(username) {
  if (username !== "") {
    $.post("/login/usercheck/",
      {
        "username": username
      },
      function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      }
    );
  }
}

function signUp() {
  var username = $('#signUpUsername').val();
  var email = $('#signUpEmail').val();
  var password = $('#signUpPassword').val();
  //$('#signUpError').addClass("is-hidden");

  if (!username) {
    $('#signUpError').html("You need a username.");
    $('#signUpError').removeClass("is-hidden");
    return false;
  }
  else if (!validateEmail(email)) {
    $('#signUpError').html("You need to input a valid email.");
    $('#signUpError').removeClass("is-hidden");
    return false;
  }
  else if (!password) {
    $('#signUpError').html("As lazy as you are, your password  must be more than 0 characters long.");
    $('#signUpError').removeClass("is-hidden");
    return false;
  }

  $.post("/login/signup/",
    {
      "username": username,
      "email": email,
      "password": sha512(password)
    }, (data, status) => {
      if (status == 'success') {
        logIn(username, password);
      } else {
        alert("Rip");
      }
    }
  );

  return true;
}

function logIn(username, password) {
  if (!username) username = $('#logInUsername').val();
  if (!password) password = $('#logInPassword').val();

  $.post("/login/",
    {
      "username": username,
      "password": sha512(password)
    }, (data, status) => {
      if (status == 'success') {
        window.location.href = '/login/dashboard';
      } else {
        alert('Login failed!');
      }
    }
  );
}
