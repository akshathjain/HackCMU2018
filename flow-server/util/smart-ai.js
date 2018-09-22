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
  const regression = new PolynomialRegression(newData[0], newData[1], n);

  const numIntervals = 20;
  const lastTime = parseInt(newData[0][n - 1]);
  const interval = (time - lastTime) / numIntervals;
  
  const outputData = [];
  for (let i = 1; i <= numIntervals; i += 1) {
    const xVal = parseInt(lastTime + i * interval);
    outputData[i - 1] = {
      x: xVal,
      y: regression.predict(xVal),
    };
  }
  return outputData;
}

//console.log(predict([{ x: '1537617195', y: '1' }, { x: '1537617224', y: '4' }, { x: '1537617233', y: '2.5' }], 1538236733));

module.exports = {
  toPlotPoints,
  predict2,
};
