let commands = [];
let cycle = 0;
let result = 1;
let signal = 0;
let signalCount = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  let lineSplit = line.split(" ");
  commands.push([lineSplit[0], Number(lineSplit[1])]);
});


function calcResult() {
  for (let j = 0; j < commands.length; j++) {    
    // printResult("start");
    let command = commands[j];
    if (command[0] === "addx") {
      cycle++;
      signal = cycle * result;
      checkSingal();
      cycle++;
      signal = cycle * result;
      checkSingal();
      result = result + command[1];
    } else {
      cycle++;
      signal = cycle * result;
      checkSingal();
    }
    // printResult("end");
  }
}

function checkSingal() {
  if (cycle == 20) {
    signalCount = signal;
    return;
  }

  if ((cycle - 20) % 40 === 0) {
    signalCount = signalCount + signal;
  }

  if (cycle > 221) {
    console.log(`end result ${signalCount}`)
  }
} 


function printResult(text) {
  console.log(`${text} ${cycle} ${result}`);
}

function printSignal() {
  console.log(signalCount);
}

lineReader.on('close', function () {
  calcResult();
  printSignal();
});