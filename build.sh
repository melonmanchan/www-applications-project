#!/usr/bin/env bash
set -e
set -x
emcc ./fibonacci/fibonacci.cc -o fibonacci/wasm/output.wasm.js -s EXPORTED_FUNCTIONS="['_fibonacci', '_fibonacci_for']" -s WASM=1 -O3
emcc ./fibonacci/fibonacci.cc -o fibonacci/asmjs/output.asm.js -s EXPORTED_FUNCTIONS="['_fibonacci', '_fibonacci_for']" -O3
