var passwordVisible = false;

// Nice Scrolling
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
  });
}

// Show or hide LogIn/SignUp popups
function showModal(id, displayVal) {
  if (displayVal) {
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
    console.log(username);
  }
}

function signUp() {
  var username = $('#signUpUserName').val();
  var email = $('#signUpEmail').val();
  var password = sha512($('#signUpPassword').val());
  
  $.post("/login/signup/", 
    {
      "username": username, 
      "email": email, 
      "password": password
    }, 
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
      //alert("Hello");
    }
  );
}

function logIn() {
  var username = $('#logInUserName').val();
  var password = $('#logInPassword').val();
  doSomething(username, email, password);
}
