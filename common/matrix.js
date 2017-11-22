function runAndMeasure(matrixFn, type) {
  var size = parseInt(window.location.search.split("?n=")[1]);
  var results = {
    multiplication: 0,
    size: size,
    type: type
  };

  console.log("Matrix multiplication starting...");
  console.time();
  var rStart = performance.now();
  matrixFn(size);
  var rEnd = performance.now();
  console.timeEnd();
  console.log("Matrix multiplication ended...");
  results.multiplication = rEnd - rStart;

  // post results to server
  var url = "https://olavihaapala.fi/api/measurements/matrix";
  postResults(url, results);
  document.querySelector(".results").innerHTML = JSON.stringify(results);
}

function runEmscripten(type) {
  var size = parseInt(window.location.search.split("?n=")[1]);
  var results = {
    multiplication: 0,
    size: size,
    type: type
  };

  // Import function from Emscripten generated file
  var float_multiply_matrix = Module.cwrap("float_multiply_matrix", "number", [
    "number",
    "number",
    "number"
  ]);

  // Create example data to test float_multiply_matrix
  var width = size;
  var height = size;
  var data = new Float32Array(width * height);
  for (var i = 0; i < width * height; i++) {
    data[i] = i;
  }

  // Get data byte size, allocate memory on Emscripten heap, and get pointer
  var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
  var dataPtr = Module._malloc(nDataBytes);

  // Copy data to Emscripten heap
  var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
  dataHeap.set(new Uint8Array(data.buffer));

  // Create array of pointers that reference each row in the data
  // Note the use of Uint32Array. The pointer is limited to 2147483648 bytes
  // or only 2GB of memory :(
  var pointers = new Uint32Array(height);
  for (var i = 0; i < pointers.length; i++) {
    pointers[i] = dataPtr + i * data.BYTES_PER_ELEMENT * width;
  }

  // Allocate bytes needed for the array of pointers
  var nPointerBytes = pointers.length * pointers.BYTES_PER_ELEMENT;
  var pointerPtr = Module._malloc(nPointerBytes);

  // Copy array of pointers to Emscripten heap
  var pointerHeap = new Uint8Array(
    Module.HEAPU8.buffer,
    pointerPtr,
    nPointerBytes
  );
  pointerHeap.set(new Uint8Array(pointers.buffer));

  // Call the function by passing a number pointing to the byte location of
  // the array of pointers on the Emscripten heap.  Emscripten knows what to do!
  var rStart = performance.now();
  float_multiply_matrix(pointerHeap.byteOffset, height, width);
  var rEnd = performance.now();
  results.multiplication = rEnd - rStart;

  /*   var result = new Float32Array(
    dataHeap.buffer,
    dataHeap.byteOffset,
    data.length
  ); */

  // Free memory
  Module._free(pointerHeap.byteOffset);
  Module._free(dataHeap.byteOffset);

  var url = "https://olavihaapala.fi/api/measurements/matrix";
  postResults(url, results);
  document.querySelector(".results").innerHTML = JSON.stringify(results);
}
