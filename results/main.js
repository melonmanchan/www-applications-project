$(function() {
  var options = {
    chart: {
      type: "spline"
    },
    subtitle: {
      text: "WWW-applications project"
    },
    yAxis: {
      title: {
        text: "Time in ms"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    tooltip: {
      split: true,
      valueSuffix: " ms"
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      },
      spline: {
        marker: {
          enabled: true
        }
      }
    }
  };

  $.getJSON("https://olavihaapala.fi/api/measurements/fibonacci", function(
    data
  ) {
    var recursiveData = {
      wasm: [],
      asmjs: [],
      js: []
    };

    var forLoopData = {
      wasm: [],
      asmjs: [],
      js: []
    };

    $.each(data.sort(compare), function(key, value) {
      var result = value.data;
      switch (result.type) {
        case "WASM":
          recursiveData.wasm.push([result.amount, result.recursive]);
          forLoopData.wasm.push([result.amount, result.forLoop]);
          break;
        case "ASMJS":
          recursiveData.asmjs.push([result.amount, result.recursive]);
          forLoopData.asmjs.push([result.amount, result.forLoop]);
          break;
        case "JS":
          recursiveData.js.push([result.amount, result.recursive]);
          forLoopData.js.push([result.amount, result.forLoop]);
          break;
      }
    });

    recursiveData = dataAvg(recursiveData);
    forLoopData = dataAvg(recursiveData);

    options.title = {
      text: "Results for recursive fibonacci"
    };

    options.series = [
      {
        name: "wasm",
        data: recursiveData.wasm
      },
      {
        name: "asm.js",
        data: recursiveData.asmjs
      },
      {
        name: "JS",
        data: recursiveData.js
      }
    ];
    new Highcharts.chart("results-recursive", options);

    options.title = {
      text: "Results for for loop fibonacci"
    };
    options.series = [
      {
        name: "wasm",
        data: forLoopData.wasm
      },
      {
        name: "asm.js",
        data: forLoopData.asmjs
      },
      {
        name: "JS",
        data: forLoopData.js
      }
    ];
    new Highcharts.chart("results-for", options);
  });
});

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
