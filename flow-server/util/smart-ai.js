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
  //console.log(newData);
  /*let regression;
  try {
    regression = new PolynomialRegression(newData[0], newData[1], 39);
  } catch (e) {
    try {
      regression = new PolynomialRegression(newData[0], newData[1], 3);
    } catch (event) {
      regression = new PolynomialRegression(newData[0], newData[1], 2);
    }
  }*/
  const regression = new PolynomialRegression(newData[0], newData[1], Math.min(5, n));

  const numIntervals = 20;
  const lastTime = Number.parseInt(newData[0][newData[0].length - 1], 10);
  const interval = (time - lastTime) / numIntervals;

  const outputData = [];
  //console.log(regression);
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

//console.log(predict([{ x: "1537642282512", y: "90" },{ x: "1537642486563", y: "87" },{ x: "1537642487546", y: "100" },{ x: "1537642488561", y: "84" },{ x: "1537642490561", y: "120" },{ x: "1537642491563", y: "121" },{ x: "1537642493546", y: "114" },{ x: "1537642494564", y: "80" },{ x: "1537642741594", y: "115" },{ x: "1537642743594", y: "96" },{ x: "1537642744595", y: "71" },{ x: "1537642745610", y: "101" },{ x: "1537642748593", y: "48" },{ x: "1537642749612", y: "98" },{ x: "1537642751610", y: "53" },{ x: "1537642753610", y: "40" },{ x: "1537642756609", y: "91" },{ x: "1537642757612", y: "104" },{ x: "1537642759613", y: "113" },{ x: "1537642762612", y: "76" },{ x: "1537642763612", y: "42" },{ x: "1537642771613", y: "92" },{ x: "1537642772613", y: "117" },{ x: "1537642773613", y: "111" },{ x: "1537642774613", y: "116" },{ x: "1537642775613", y: "77" },{ x: "1537642776614", y: "95" },{ x: "1537642777611", y: "10" },{ x: "1537642778611", y: "99" },{ x: "1537642779612", y: "19" },{ x: "1537642780613", y: "28" },{ x: "1537642781613", y: "60" },{ x: "1537642782614", y: "108" },{ x: "1537642783614", y: "97" },{ x: "1537642786615", y: "75" },{ x: "1537642787614", y: "83" },{ x: "1537645073120", y: "13" },{ x: "1537645078119", y: "30" },{ x: "1537645093123", y: "0" }], 1537645093123204));

module.exports = {
  toPlotPoints,
  predict,
};
