function runAndMeasure(matrixFn, type) {
  var amount = parseInt(window.location.search.split("?n=")[1]);
  var results = {
    multiplication: 0,
    amount: amount,
    type: type
  };

  console.log(amount);
  console.log("Matrix multiplication starting...");
  console.time();
  var rStart = performance.now();
  for (i = 1; i < amount + 1; i++) {
    matrixFn(i);
  }
  var rEnd = performance.now();
  console.timeEnd();
  console.log("Matrix multiplication ended...");
  results.multiplication = rEnd - rStart;

  // post results to server
  var url = "https://olavihaapala.fi/api/measurements/matrix";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        document.title = "done";
        data = JSON.parse(request.responseText);
        console.log("POST success, result:", data);
      } else {
        console.error(
          "Error in POST! The status is " +
            request.status +
            " - " +
            request.responseText
        );
      }
    }
  };
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(results));

  document.querySelector(".results").innerHTML = JSON.stringify(results);
}
