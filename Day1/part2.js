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
  elves.sort((a,b) => a - b);
  let last = elves.length -1;
  console.log(`${elves[last]} + ${elves[last - 1]} + ${elves[last - 2]}`)
  console.log(elves[last] + elves[last -1] + elves[last -2]);
}

lineReader.on('close', function () {
  elves.push(count);

  printResult();
});
