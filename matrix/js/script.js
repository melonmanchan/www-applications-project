function run(size, mat1, mat2) {
  var out = [];
  for (var x = 0; x < size; x++) {
    out[x] = [];
    for (var y = 0; y < size; y++) {
      out[x][y] = 0;
      for (var k = 0; k < size; k++) {
        out[x][y] += mat1[x][k] * mat2[k][y];
      }
    }
  }

  return out;
}
