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
    qsort(arr, len, sizeof(char *), stringcmp);
  }
}
