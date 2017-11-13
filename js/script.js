function fibonacci(n) {
  if (n <= 1) {
    return n
  } else {
    return fibonacci(n-1) + fibonacci(n-2)
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
