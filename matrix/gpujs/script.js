var gpu = new GPU();

// Create the GPU accelerated function from a kernel
// function that computes a single element in the
// size x size matrix (2D array). The kernel function
// is run in a parallel manner in the GPU resulting
// in very fast computations! (...sometimes)
function createMatMult(size) {
  return gpu.createKernel(
    function(a, b) {
      var sum = 0;
      for (var i = 0; i < this.constants.size; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
      }
      return sum;
    },
    {
      constants: { size: size },
      output: [size, size]
    }
  );
}

// RETURNS PSEUDO-RANDOM NUMBER IN RANGE min...max
function randomNumber(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

function createRandomMatrix(size) {
  var ret = [];
  for (var a = 0; a < size; ++a) {
    ret[a] = [];
    for (var i = 0; i < size; ++i) {
      ret[a][i] = randomNumber(1, size * size);
    }
  }
  return ret;
}

function run(size) {
  var a = createRandomMatrix(size),
    b = createRandomMatrix(size),
    matMult = createMatMult(size);
  var res = matMult(a, b);
  return res;
}
