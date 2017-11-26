#include <cstring>
#include <emscripten.h>
#include <algorithm>

int stringcmp(const void *a, const void *b) {
    const char **ia = (const char **)a;
    const char **ib = (const char **)b;
    return strcmp(*ia, *ib);
}

extern "C" {
  void sortArr (char **arr, int len) {
    // arr[0][0] = len;
    // arr[1][0] = 'z';
    // arr[2][0] = 'z';
    qsort(arr, len, sizeof(char *), stringcmp);
  }
}
