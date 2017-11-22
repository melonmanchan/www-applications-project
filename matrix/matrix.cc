extern "C" {
int float_multiply_matrix(float **arr, int ilength, int jlength)
{
  float *row;
  for (int i = 0; i < ilength; i++)
  {
    row = arr[i];
    for (int j = 0; j < jlength; j++)
    {
      row[j] = 2.0 * row[j];
    }
  }
  return 0;
}
}
