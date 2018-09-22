let user;
let data;

function saveData(arr) {
  data = [];
  for (let i = 0; i < arr.length - 1; i += 2) {
    data.push({
      x: arr[i + 1],
      y: arr[i]
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  axios.get('/api/my').then((res) => {
    user = res.data;
    if (user.flow) {
      axios.get('/api/myflow').then((fRes) => {
        saveData(fRes.data);
        document.querySelector('#flowid-text').innerHTML = user.flow;
        document.querySelector('#flowinfo').classList.remove('is-hidden');
        createChart();
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

// eslint-disable-next-line no-unused-vars
function removeFlow() {
  if (confirm('Are you sure?')) {
    axios.post('/api/deregister').then(() => {
      window.location.reload();
    }).catch(() => {
      alert('You are stuck with your Flow');
    });
  }
}

function createChart() {
  const config = {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Water',
          data,
          fill: false,
          borderColor: '#2B60FF',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            format: 'X',
            tooltipFormat: 'DD/MM/YYYY HH:mm:ss',
          },
          scaleLabel: {
            display: true,
            labelString: 'Date/Time',
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'value',
          },
        }],
      },
    },
  };

  const ctx = document.getElementById('flow-chart').getContext('2d');
  new Chart(ctx, config);
}
