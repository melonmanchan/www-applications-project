function compare(a, b) {
  return a.data.amount - b.data.amount;
}

function typeAvg(data) {
  const helperArray = data.reduce((result, item) => {
    if (typeof result[item[0]] === "undefined") {
      result[item[0]] = [item[1]];
    } else {
      result[item[0]].push(item[1]);
    }
    return result;
  }, {});

  let results = [];
  for (let key in helperArray) {
    let sum = helperArray[key].reduce(function(a, b) {
      return a + b;
    });
    let avg = sum / helperArray[key].length;
    results.push([key, avg]);
  }
  return results;
}

function dataAvg(data) {
  let result = {};
  if (typeof data.wasm !== "undefined") {
    result.wasm = typeAvg(data.wasm);
    result.asmjs = typeAvg(data.asmjs);
    result.js = typeAvg(data.js);
  }
  return result;
}
