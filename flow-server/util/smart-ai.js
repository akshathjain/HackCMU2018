const regression = require('regression');

// Converts array of timestamps and values into {x, y}
function toPlotPoints(arr) {
  const data = [];
  for (let i = 0; i < arr.length - 1; i += 2) {
    data.push({
      x: arr[i + 1],
      y: arr[i],
    });
  }
  return data;
}

function format(data) {
  const newData = [];
  for (let i = 0; i < data.length; i += 1) {
    newData[i] = [data[i].x, data[i].y];
  }
  return newData;
}

function polynomial(data, time, scale) {
  const newData = data;

  for (let i = 0; i < data.length; i += 1) {
    newData[i][0] /= scale;
  }

  return regression.polynomial(data, { order: data.length - 1 }).equation;
}

function evaluate(equation, x, scale) {
  let y = 0;
  for (let i = 0; i < equation.length; i += 1) {
    y += equation[i] * ((x / scale) ** (equation.length - i - 1));
  }
  return y;
}

function predict(data, time) {
  const scale = 10 ** 6;
  const numIntervals = 20;
  const lastTime = data[data.length - 1].x;
  const interval = (time - lastTime) / numIntervals;
  const equation = polynomial(format(data), time, scale);

  const outputData = [];
  for (let i = 1; i <= numIntervals; i += 1) {
    const xVal = lastTime + i * interval;
    outputData[i - 1] = {
      x: xVal,
      y: evaluate(equation, xVal, scale),
    };
  }
  return outputData;
}

module.exports = {
  toPlotPoints,
  predict,
};
