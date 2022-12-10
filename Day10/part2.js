let commands = [];
let cycle = 0;
let result = 1;
let signal = 0;
let sprite = 2;
let crtPointer = 0;
let crtRows = [
  []
];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  let lineSplit = line.split(" ");
  commands.push([lineSplit[0], Number(lineSplit[1])]);
});


function calcResult() {
  for (let j = 0; j < commands.length; j++) {
    let command = commands[j];
    if (command[0] === "addx") {
      cycle++;
      signal = cycle * result;
      checkCRT();
      cycle++;
      signal = cycle * result;
      checkCRT();
      result = result + command[1];
      sprite = result;
    } else {
      cycle++;
      signal = cycle * result;
      checkCRT();
    }
  }
}

function checkCRT() {
  if (crtPointer == sprite || crtPointer == sprite - 1 || crtPointer == sprite + 1) {
    crtRows[crtRows.length - 1].push("#");
  } else {
    crtRows[crtRows.length - 1].push(" ");
  }

  if (cycle % 40 === 0) {
    crtPointer = 0;
    crtRows.push([]);
  } else {
    crtPointer++;
  }
}


function printResult(text) {
  console.log(`${text} ${cycle} ${result}`);
}

function printSignal() {
  for (let i = 0; i < crtRows.length; i++) {
    console.log(crtRows[i].join(""));

  }
}

lineReader.on('close', function () {
  calcResult();
  printSignal();
});