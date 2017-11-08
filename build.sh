#!/usr/bin/env bash
set -e
set -x
emcc ./main.cc -o wasm/output.wasm.js -s EXPORTED_FUNCTIONS="['_fibonacci']" -s WASM=1 -O3
emcc ./main.cc -o asmjs/output.asm.js -s EXPORTED_FUNCTIONS="['_fibonacci']" -O3
