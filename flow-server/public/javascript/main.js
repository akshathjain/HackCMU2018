function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
  });
}

function showModal(id, displayVal) {
  if (displayVal) {
    $(`#${id}`).css('display', 'inherit');
  }
  else {
    $(`#${id}`).css('display', 'none');
  }
}

function checkPassword() {
  if ($('#passwordVal1').val() === '') {
    $('.passwordMatch').addClass('is-hidden');
    return true;
  }
  console.log($('#passwordVal1').val(), $('#passwordVal0').val());
  if ($('#passwordVal0').val() !== $('#passwordVal1').val()) {
    $('.passwordMatch').removeClass('is-hidden');
    return false;
  }
  $('.passwordMatch').addClass('is-hidden');
  return true;
}
