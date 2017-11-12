for i in $(seq 1 40); do
    for t in wasm asmjs js; do
        echo "Launching $t with n=$i"
        chromium-browser http://localhost:8000/docs/$t/?n=$i --incognito
        pid=$!
        dur=$(expr $i \* 3)
        echo "Going to sleep for $dur seconds"
        sleep $dur
    done
done
