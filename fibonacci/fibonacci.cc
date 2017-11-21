extern "C" {
  int fibonacci(int n) {
    if (n <= 1) {
      return n;
    }
    else {
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  }

  int fibonacci_for(int n) {
    int fibo = 1;
    int fiboPrev = 1;
    if (n <= 1) {
      return n;
    }

    for(int i = 2; i < n; ++i){
      int temp = fibo;
      fibo += fiboPrev;
      fiboPrev = temp;
    }
    return fibo;
  }
}
