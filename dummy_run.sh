for f in 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34
do
    echo "Launching $f"
    chromium-browser http://localhost:8000/wasm/?n=$f
    sleep 2
    chromium-browser http://localhost:8000/asmjs/?n=$f
    sleep 2
    chromium-browser http://localhost:8000/js/?n=$f
    sleep 2
done
