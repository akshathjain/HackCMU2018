var user;

$(document).ready(function () {
  $.get('/api/my', function(data, status) {
    if (status == 'success') {
      user = data;
      if (user.flow) {
        $.get('/api/myflow', function(data, success) {
          if (status == 'success') {
            $('#flowinfo').removeClass('is-hidden');
          } else {
            alert('An error has occurred!')
          }
        });
      } else {
        $('#registerflow').removeClass('is-hidden');
      }
    } else {
      alert('An error has occurred!');
      window.location.href = '/';
    }
  });
});

function addFlow() {
  var flow = $('#flowid').val();
  if(flow) {
    $.post('/api/register', {
      id: flow
    }, function(data, success) {
      if (success == 'success') {
        window.location.reload();
      } else {
        alert('An error has occurred!');
      }
    });
  }
}
