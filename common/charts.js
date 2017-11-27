var defaultOptions = {
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

function drawChart(id, options) {
  new Highcharts.chart(id, options);
}
