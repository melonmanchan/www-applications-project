function fibonacci(n) {
  if (n <= 1) {
    return n
  } else {
    return fibo(n-1) + fibo(n-2)
  }
}

function fibonacci_for (n) {
  if (n <= 1){
    return n;
  }

  var fibo = 1;

  var fiboPrev = 1;

  for (var i = 2; i < n; ++i){
    var temp = fibo;
    fibo += fiboPrev;
    fiboPrev = temp;
  }

  return fibo;
}
