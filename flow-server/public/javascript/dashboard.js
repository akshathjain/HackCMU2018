let user;

document.addEventListener('DOMContentLoaded', () => {
  axios.get('/api/my').then((res) => {
    user = res.data;
    if (user.flow) {
      axios.get('/api/myflow').then(() => {
        document.querySelector('#flowinfo').classList.remove('is-hidden');
      }).catch(() => {
        alert('Data unavailable');
      });
    } else {
      document.querySelector('#registerflow').classList.remove('is-hidden');
    }
  }).catch(() => {
    alert('Idk what went wrong');
  });
});

// eslint-disable-next-line no-unused-vars
function addFlow() {
  const flow = document.querySelector('#flowid').value;
  if (flow) {
    axios.post('/api/register', {
      id: flow,
    }).then(() => {
      window.location.reload();
    }).catch(() => {
      alert('Failed to register');
    });
  }
}
