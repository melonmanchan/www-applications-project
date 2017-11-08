$(function() {
  var options = {
    chart: {
      type: 'spline'
    },
    subtitle: {
      text: 'WWW-applications project'
    },
    yAxis: {
      title: {
        text: 'Time in ms'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    tooltip: {
      split: true,
      valueSuffix: ' ms'
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

  $.getJSON('http://159.89.0.207:3000/fibonacci', function(data) {
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

    $.each(data, function(key, value) {
      var result = value.data;
      switch (result.type) {
        case 'WASM':
          recursiveData.wasm.push([result.amount, result.recursive]);
          forLoopData.wasm.push([result.amount, result.forLoop]);
          break;
        case 'ASMJS':
          recursiveData.asmjs.push([result.amount, result.recursive]);
          forLoopData.asmjs.push([result.amount, result.forLoop]);
          break;
        case 'JS':
          recursiveData.js.push([result.amount, result.recursive]);
          forLoopData.js.push([result.amount, result.forLoop]);
          break;
      }
    });

    options.title = {
      text: 'Results for recursive fibonacci'
    };

    options.series = [
      {
        name: 'wasm',
        data: recursiveData.wasm
      },
      {
        name: 'asm.js',
        data: recursiveData.asmjs
      },
      {
        name: 'JS',
        data: recursiveData.js
      }
    ];
    new Highcharts.chart('results-recursive', options);

    options.title = {
      text: 'Results for for loop fibonacci'
    };
    options.series = [
      {
        name: 'wasm',
        data: forLoopData.wasm
      },
      {
        name: 'asm.js',
        data: forLoopData.asmjs
      },
      {
        name: 'JS',
        data: forLoopData.js
      }
    ];
    new Highcharts.chart('results-for', options);
  });
});
