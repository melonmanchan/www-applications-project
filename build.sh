#!/usr/bin/env bash
set -e
set -x

# String sort
emcc ./stringsort/stringsort.cc -std=c++11 -o stringsort/wasm/output.wasm.js -s EXPORTED_FUNCTIONS="['_sortArr']" -s WASM=1 -O3
emcc ./stringsort/stringsort.cc -std=c++11 -o stringsort/asmjs/output.asm.js -s EXPORTED_FUNCTIONS="['_sortArr']" -O3

# Fibonacci
emcc ./fibonacci/fibonacci.cc -o fibonacci/wasm/output.wasm.js -s EXPORTED_FUNCTIONS="['_fibonacci', '_fibonacci_for']" -s WASM=1 -O3
emcc ./fibonacci/fibonacci.cc -o fibonacci/asmjs/output.asm.js -s EXPORTED_FUNCTIONS="['_fibonacci', '_fibonacci_for']" -O3

# Matrix multiplication
emcc ./matrix/matrix.cc -o matrix/wasm/output.wasm.js -s EXPORTED_FUNCTIONS="['_float_multiply_matrix', '_int_multiply_matrix', '_double_multiply_matrix']" -s WASM=1 -O3 -s ALLOW_MEMORY_GROWTH=1
emcc ./matrix/matrix.cc -o matrix/asmjs/output.asm.js -s EXPORTED_FUNCTIONS="['_float_multiply_matrix', '_int_multiply_matrix', '_double_multiply_matrix']" -O3 -s ALLOW_MEMORY_GROWTH=1

