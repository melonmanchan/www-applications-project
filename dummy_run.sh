for i in $(seq 1 40); do
    for t in wasm asmjs js; do
        url=https://melonmanchan.github.io/www-applications-project/$t/?n=$i
        echo "Launching url: $url"
        dur=$(expr $i \* 2)
        echo "Launching chromium"
        chromium-browser $url --incognito
        echo "Going to sleep for $dur seconds"
        sleep $dur
        echo "Launching FF"
        firefox -private-window $url &
        pid=$!
        echo "Going to sleep for $dur seconds"
        sleep $dur
    done
done
