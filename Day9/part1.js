let rows = [];
let map = [];

let head = [0, 0];
let tail = [0, 0];
let lastHead = [0,0];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split(" "));
});


function calcResult() {
  map["0,0"] = 1;

  for (let i = 0; i < rows.length; i++) {
    let steps = Number(rows[i][1]);

    for (let j = 0; j < steps; j++) {
      move(rows[i][0], rows[i][1]);
    }

  }
}

function move(direction, step) {
  switch (direction) {
    case "U":
      head = [head[0] + 1, head[1]]
      break;
    case "D":
      head = [head[0] - 1, head[1]]
      break;
    case "L":
      head = [head[0], head[1] - 1]
      break;
    case "R":
      head = [head[0], head[1] + 1]
      break;

    default:
      break;
  }

  checkTail();
  lastHead = [...head];
}

function checkTail() {
  isValid = false

  let headY = head[0];
  let headX = head[1];

  let tailY = tail[0];
  let tailX = tail[1];

  if (tailY == headY && (tailX == headX || tailX == headX -1 || tailX == headX + 1)) {
    isValid = true;
  }

  if (tailX == headX && (tailY == headY || tailY == headY -1 || tailY == headY + 1)) {
    isValid = true;
  }

  if (tailY == headY + 1 && (tailX == headX -1 || tailX == headX + 1)) {
    isValid = true;    
  }

  if (tailY == headY - 1 && (tailX == headX -1 || tailX == headX + 1)) {
    isValid = true;    
  }

  if (tailX == headX + 1 && (tailY == headY -1 || tailY == headY + 1)) {
    isValid = true;    
  }

  if (tailX == headX - 1 && (tailY == headY -1 || tailY == headY + 1)) {
    isValid = true;    
  }

  if (!isValid) {
    tail = [...lastHead];
    map[tail.join(",")] = 1;
  }
}

function printResult() {
  let results = Object.keys(map).map(function(key) {
    return key;
  });
  console.log(results.length);
}

lineReader.on('close', function () {
  calcResult();
  printResult();
});