// RETURNS PSEUDO-RANDOM NUMBER IN RANGE min...max
function randomNumber(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

function runEmscripten(type, functionName, dataType) {
  var list = [];
  var n = parseInt(window.location.search.split("?n=")[1]);

  for (var i = 0; i < n; i++) {
    list.push(randomNumber(-10000, 10000));
  }

  var size = list.length;

  var results = {
    sorting: 0,
    size: size,
    type: type,
    functionName: functionName
  };

  // Import function from Emscripten generated file
  var sort_list = Module.cwrap(functionName, "number", ["number", "number"]);

  var input = new dataType(size);

  for (var i = 0; i < list.length; i++) {
    input[i] = list[i];
  }

  var nDataBytes = input.length * input.BYTES_PER_ELEMENT;

  var inputPtr = Module._malloc(nDataBytes);

  var inputHeap = new Uint8Array(Module.HEAPU8.buffer, inputPtr, nDataBytes);
  inputHeap.set(new Uint8Array(input.buffer));

  var rStart = performance.now();

  sort_list(inputHeap.byteOffset, size);

  var result = new dataType(
    inputHeap.buffer,
    inputHeap.byteOffset,
    input.length
  );

  Module._free(inputHeap.byteOffset);

  var rEnd = performance.now();
  results.sorting = rEnd - rStart;

  var url = "https://olavihaapala.fi/api/measurements/matrix";
  postResults(url, results);
  document.querySelector(".results").innerHTML = JSON.stringify(results);
}
