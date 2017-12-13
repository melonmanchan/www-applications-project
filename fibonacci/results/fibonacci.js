function fetchData(url, cb) {
  return $.getJSON(url, cb);
}

function processData(data) {
  var processed = {
    recursiveData: {
      wasm: [],
      asmjs: [],
      js: []
    },
    forLoopData: {
      wasm: [],
      asmjs: [],
      js: []
    }
  };

  $.each(data.sort(compare), function(key, value) {
    var result = value.data;
    switch (result.type) {
      case "WASM":
        processed.recursiveData.wasm.push([result.amount, result.recursive]);
        processed.forLoopData.wasm.push([result.amount, result.forLoop]);
        break;
      case "ASMJS":
        processed.recursiveData.asmjs.push([result.amount, result.recursive]);
        processed.forLoopData.asmjs.push([result.amount, result.forLoop]);
        break;
      case "JS":
        processed.recursiveData.js.push([result.amount, result.recursive]);
        processed.forLoopData.js.push([result.amount, result.forLoop]);
        break;
    }
  });

  processed.recursiveData = dataAvg(processed.recursiveData);
  processed.forLoopData = dataAvg(processed.recursiveData);

  return processed;
}

function dataReceived(d) {
  const data = processData(d);
  let options = defaultOptions;
  options.title = {
    text: "Results for recursive fibonacci"
  };

  options.series = [
    {
      name: "wasm",
      data: data.recursiveData.wasm
    },
    {
      name: "asm.js",
      data: data.recursiveData.asmjs
    },
    {
      name: "JS",
      data: data.recursiveData.js
    }
  ];

  drawChart("fibonacci-recursive", options);

  options.title = {
    text: "Results for for loop fibonacci"
  };
  options.series = [
    {
      name: "wasm",
      data: data.forLoopData.wasm
    },
    {
      name: "asm.js",
      data: data.forLoopData.asmjs
    },
    {
      name: "JS",
      data: data.forLoopData.js
    }
  ];
  drawChart("fibonacci-for", options);
}

function perBrowser(browser) {
  const url =
    "https://olavihaapala.fi/api/measurements/fibonacci" +
    "?browser=" +
    browser;
  fetchData(url, onProcessPerBrowserData);
}

function onProcessPerBrowserData(d) {
  const data = processData(d);
  let options = defaultOptions;
  options.title = {
    text: "Results recursive for browser"
  };

  options.series = [
    {
      name: "wasm",
      data: data.recursiveData.wasm
    },
    {
      name: "asm.js",
      data: data.recursiveData.asmjs
    },
    {
      name: "JS",
      data: data.recursiveData.js
    }
  ];

  drawChart("per-browser-recursive", options);

  options.title = {
    text: "Results for loop for browser"
  };

  options.series = [
    {
      name: "wasm",
      data: data.forLoopData.wasm
    },
    {
      name: "asm.js",
      data: data.forLoopData.asmjs
    },
    {
      name: "JS",
      data: data.forLoopData.js
    }
  ];

  drawChart("per-browser-for", options);
}

$(function() {
  const url = "https://olavihaapala.fi/api/measurements/fibonacci";
  fetchData(url, dataReceived);
  perBrowser("firefox");
});

$(".per-browser-select").change(function() {
  perBrowser(this.value);
});
