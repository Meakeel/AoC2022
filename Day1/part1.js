let elves = [];
let count = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
  let value = parseInt(line);
  if (isNaN(value)) {
    elves.push(count);
    count = 0;
    return;
  }

  count = count + value;
});

function printResult() {
  console.log(Math.max(...elves));
}

lineReader.on('close', function () {
  elves.push(count);

  printResult();
});
