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

function run(size, a, b) {
  var matMult = createMatMult(size);
  var res = matMult(a, b);
  return res;
}
