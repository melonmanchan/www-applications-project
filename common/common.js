
function runAndMeasure(recursiveFibonacci, forLoopFibonacci) {
    var amount = parseInt(window.location.search.split('?n=')[1]);
    var results = {
        recursive: 0,
        forLoop: 0
    }

    console.log(amount);
    console.log('Recursive fibonacci starting...');
    console.time();
    var rStart = performance.now();
    for (i = 0; i < amount; i++) {
        recursiveFibonacci(i);
    }
    var rEnd = performance.now();
    console.timeEnd();
    console.log('Recursive fibonacci ended...');
    results.recursive = rEnd - rStart;


    console.log('For loop fibonacci starting...');
    console.time();
    var fStart = performance.now();
    for (i = 0; i < amount; i++) {
        forLoopFibonacci(i);
    }
    var fEnd = performance.now();
    console.timeEnd();
    console.log('For loop fibonacci ended...');
    results.forLoop = fEnd - fStart;

    return results;
}
