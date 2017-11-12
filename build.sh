#!/usr/bin/env bash
set -e
set -x
emcc ./main.cc -o docs/wasm/output.wasm.js -s EXPORTED_FUNCTIONS="['_fibonacci', '_fibonacci_for']" -s WASM=1 -O3
emcc ./main.cc -o docs/asmjs/output.asm.js -s EXPORTED_FUNCTIONS="['_fibonacci', '_fibonacci_for']" -O3
