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
    "number",
    "number"
  ]);

  var width = size;
  var height = size;

  var mat1 = new Float32Array(width * height);
  var mat2 = new Float32Array(width * height);
  var out = new Float32Array(width * height);

  for (var i = 0; i < size * height; i++) {
    mat1[i] = i + 1;
    mat2[i] = i + 1;
  }

  var nDataBytes = mat1.length * mat1.BYTES_PER_ELEMENT;

  var mat1Ptr = Module._malloc(nDataBytes);
  var mat2Ptr = Module._malloc(nDataBytes);
  var outPtr = Module._malloc(nDataBytes);

  var mat1Heap = new Uint8Array(Module.HEAPU8.buffer, mat1Ptr, nDataBytes);
  mat1Heap.set(new Uint8Array(mat1.buffer));

  var mat2Heap = new Uint8Array(Module.HEAPU8.buffer, mat2Ptr, nDataBytes);
  mat2Heap.set(new Uint8Array(mat2.buffer));

  var outHeap = new Uint8Array(Module.HEAPU8.buffer, outPtr, nDataBytes);
  outHeap.set(new Uint8Array(out.buffer));

  var rStart = performance.now();
  float_multiply_matrix(
    mat1Heap.byteOffset,
    mat2Heap.byteOffset,
    outHeap.byteOffset,
    size
  );
  var result = new Float32Array(outHeap.buffer, outHeap.byteOffset, out.length);

  console.log(mat1);
  console.log(mat2);
  console.log(result);

  Module._free(mat1Heap.byteOffset);
  Module._free(mat2Heap.byteOffset);
  Module._free(outHeap.byteOffset);

  var rEnd = performance.now();
  results.multiplication = rEnd - rStart;

  var url = "https://olavihaapala.fi/api/measurements/matrix";
  postResults(url, results);
  document.querySelector(".results").innerHTML = JSON.stringify(results);
}
