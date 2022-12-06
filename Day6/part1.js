let signals = [];
let counter = 4;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  signals = [...line.split("")];  
});

function calcResult() {
  for (let i = 3; i < signals.length; i++) {
    let set = new Set();
    set.add(signals[i - 3]);
    set.add(signals[i - 2]);
    set.add(signals[i - 1]);
    set.add(signals[i]);

    if (set.size === 4) {
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