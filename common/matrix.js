// Setting up globals
window.onerror = function() {
  var arr = Array.prototype.slice.call(arguments);

  // post results to server
  var url = "https://olavihaapala.fi/api/error";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      document.title = "done";
    }
  };

  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify({ errorArguments: arr }));
};

// Utility functions
function runAndMeasure(recursiveFibonacci, forLoopFibonacci, type) {
  var amount = parseInt(window.location.search.split("?n=")[1]);
  var results = {
    recursive: 0,
    forLoop: 0,
    amount: amount,
    type: type
  };

  console.log(amount);
  console.log("Recursive fibonacci starting...");
  console.time();
  var rStart = performance.now();
  for (i = 0; i < amount; i++) {
    recursiveFibonacci(i);
  }
  var rEnd = performance.now();
  console.timeEnd();
  console.log("Recursive fibonacci ended...");
  results.recursive = rEnd - rStart;

  console.log("For loop fibonacci starting...");
  console.time();
  var fStart = performance.now();
  for (i = 0; i < amount; i++) {
    forLoopFibonacci(i);
  }
  var fEnd = performance.now();
  console.timeEnd();
  console.log("For loop fibonacci ended...");
  results.forLoop = fEnd - fStart;

  console.log(JSON.stringify(results));
  var url = "https://olavihaapala.fi/api/measurements/fibonacci";
  postResults(url, results);

  document.querySelector(".recursive").innerHTML = results.recursive;
  document.querySelector(".for").innerHTML = results.forLoop;
}

function postResults(url, results) {
  // post results to server
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
}
