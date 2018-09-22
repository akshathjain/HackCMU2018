const PolynomialRegression = require('ml-regression-polynomial');

function format(data) {
  const x = [];
  const y = [];

  for (let i = 0; i < data.length; i += 1) {
    x[i] = data[i].x;
    y[i] = data[i].y;
  }
  return [x, y];
}

function predict(data, time) {
  const newData = format(data);
  const n = newData[0].length;
  const regression;
  try {
    regression = new PolynomialRegression(newData[0], newData[1], n);
  } catch (e) {
    try {
      regression = new PolynomialRegression(newData[0], newData[1], 3);
    } catch (e) {
      regression = new PolynomialRegression(newData[0], newData[1], 2);
    }
  }

  const numIntervals = 20;
  const lastTime = Number.parseInt(newData[0][newData[0].length - 1], 10);
  const interval = (time - lastTime) / numIntervals;

  const outputData = [];
  for (let i = 1; i <= numIntervals; i += 1) {
    const xVal = Number.parseInt(lastTime + i * interval, 10);
    outputData[i - 1] = {
      x: xVal,
      y: regression.predict(xVal),
    };
  }
  return outputData;
}

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
/*
console.log(predict([{ x: 1, y: 4 }, { x: 2, y: 8 }, { x: 3, y: 7 }, { x: 3, y: 8 }], 30));*/

module.exports = {
  toPlotPoints,
  predict,
};
