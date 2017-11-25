extern "C" {
  int float_multiply_matrix(float *mat1, float *mat2, float *out, int size) {
    for (int x = 0; x < size; x++) {
      for (int y = 0; y < size; y++) {
        out[x * size + y] = 0.0f;
        for (int k = 0; k < size; k++) {
          out[size * x + y] += mat1[size * x + k] * mat2[size * k + y];
        }
      }
    }
    return 0;
  }
}
