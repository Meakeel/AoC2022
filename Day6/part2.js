let signals = [];
let counter = 14;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  signals = [...line.split("")];  
});

function calcResult() {
  for (let i = 13; i < signals.length; i++) {
    let set = new Set();
    set.add(signals[i - 14]);
    set.add(signals[i - 13]);
    set.add(signals[i - 12]);
    set.add(signals[i - 11]);
    set.add(signals[i - 10]);
    set.add(signals[i - 9]);
    set.add(signals[i - 8]);
    set.add(signals[i - 7]);
    set.add(signals[i - 6]);
    set.add(signals[i - 5]);
    set.add(signals[i - 4]);
    set.add(signals[i - 3]);
    set.add(signals[i - 3]);
    set.add(signals[i - 2]);
    set.add(signals[i - 1]);
    set.add(signals[i]);

    if (set.size === 14) {
      console.log(set);
      console.log(counter);
      return;
    }

    counter++;    
  }
}

lineReader.on('close', function () {
  calcResult();
});