function fetchData(url, cb) {
  return $.getJSON(url, cb);
}

function processData(data) {
  var processed = {
    intData: {
      wasm: [],
      asmjs: [],
      js: []
    },
    floatData: {
      wasm: [],
      asmjs: [],
      js: []
    },
    doubleData: {
      wasm: [],
      asmjs: [],
      js: []
    }
  };

  $.each(data.sort(compare), function(key, value) {
    var result = value.data;

    var type = result.type
    console.log(result)

    switch (result.type) {
      case "WASM":
        switch (result.functionName) {
          case "float_sort":
            processed.floatData.wasm.push([result.size, result.sorting])
            break;
          case "int_sort":
            processed.intData.wasm.push([result.size, result.sorting])
            break;
          case "double_sort":
            processed.doubleData.wasm.push([result.size, result.sorting])
            break;
        }
        break;
      case "ASMJS":
        switch (result.functionName) {
          case "float_sort":
            processed.floatData.asmjs.push([result.size, result.sorting])
            break;
          case "int_sort":
            processed.intData.asmjs.push([result.size, result.sorting])
            break;
          case "double_sort":
            processed.doubleData.asmjs.push([result.size, result.sorting])
            break;
        }
        break;
      case "JS":
        processed.doubleData.js.push([result.size, result.sorting]);
        break;
    }
  });

//  processed.recursiveData = dataAvg(processed.recursiveData);
//  processed.forLoopData = dataAvg(processed.recursiveData);

  return processed;
}

function dataReceived(d) {
  const data = processData(d);
  let options = defaultOptions;
  options.title = {
    text: "Results for integer sort"
  };

  options.series = [
    {
      name: "wasm",
      data: data.intData.wasm
    },
    {
      name: "asm.js",
      data: data.intData.asmjs
    },
    {
      name: "JS",
      data: data.doubleData.js
    }
  ];

  drawChart("sort-int", options);

  options.title = {
    text: "Results for float sort"
  };

  options.series = [
    {
      name: "wasm",
      data: data.floatData.wasm
    },
    {
      name: "asm.js",
      data: data.floatData.asmjs
    },
    {
      name: "JS",
      data: data.doubleData.js
    }
  ];

  drawChart("sort-float", options);

  options.title = {
    text: "Results for double sort"
  };

  options.series = [
    {
      name: "wasm",
      data: data.doubleData.wasm
    },
    {
      name: "asm.js",
      data: data.doubleData.asmjs
    },
    {
      name: "JS",
      data: data.doubleData.js
    }
  ];

  drawChart("sort-double", options);
}

function perBrowser(browser) {
  const url =
    "https://olavihaapala.fi/api/measurements/sort" +
    "?browser=" +
    browser;
  fetchData(url, onProcessPerBrowserData);
}

function onProcessPerBrowserData(d) {
  const data = processData(d);
  console.log(data)
  let options = defaultOptions;
  options.title = {
    text: "Results for integer sort per browser"
  };

  options.series = [
    {
      name: "wasm",
      data: data.intData.wasm
    },
    {
      name: "asm.js",
      data: data.intData.asmjs
    },
    {
      name: "JS",
      data: data.doubleData.js
    }
  ];

  drawChart("per-browser-int", options);

  options.title = {
    text: "Results for float sort per browser"
  };

  options.series = [
    {
      name: "wasm",
      data: data.floatData.wasm
    },
    {
      name: "asm.js",
      data: data.floatData.asmjs
    },
    {
      name: "JS",
      data: data.doubleData.js
    }
  ];

  drawChart("per-browser-float", options);

  options.title = {
    text: "Results for double sort per browser"
  };

  options.series = [
    {
      name: "wasm",
      data: data.doubleData.wasm
    },
    {
      name: "asm.js",
      data: data.doubleData.asmjs
    },
    {
      name: "JS",
      data: data.doubleData.js
    }
  ];

  drawChart("per-browser-double", options);
}

$(function() {
  const url = "https://olavihaapala.fi/api/measurements/sort";
  fetchData(url, dataReceived);
  perBrowser("firefox");
});

$(".per-browser-select").change(function() {
  perBrowser(this.value);
});
