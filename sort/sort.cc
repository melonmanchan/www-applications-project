#include <cstring>
#include <algorithm>

int int_cmp(const void *a, const void *b) {
    const int *ia = (const int *)a;
    const int *ib = (const int *)b;
    return *ia  - *ib;
}

int float_cmp(const void *a, const void *b) {
    const float *ia = (const float *)a;
    const float *ib = (const float *)b;
    return *ia  - *ib;
}

int double_cmp(const void *a, const void *b) {
    const double *ia = (const double *)a;
    const double *ib = (const double *)b;
    return *ia  - *ib;
}

extern "C" {
  void int_sort (int *arr, int len) {
    qsort(arr, len, sizeof(int), int_cmp);
  }

  void float_sort (float *arr, int len) {
    qsort(arr, len, sizeof(float), float_cmp);
  }

  void double_sort (double *arr, int len) {
    qsort(arr, len, sizeof(double), double_cmp);
  }
}
