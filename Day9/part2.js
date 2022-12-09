let rows = [];
let map = [];

let knots = [{
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}, {
  position: [0, 0],
  lastPosition: [0, 0]
}]

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
      move(rows[i][0]);
      moveKnots();
      // printMap();
    }

  }
}

function move(direction) {
  knots[0].lastPosition = [...knots[0].position];
  let head = knots[0].position;

  switch (direction) {
    case "U":
      knots[0].position = [head[0] + 1, head[1]]
      break;
    case "D":
      knots[0].position = [head[0] - 1, head[1]]
      break;
    case "L":
      knots[0].position = [head[0], head[1] - 1]
      break;
    case "R":
      knots[0].position = [head[0], head[1] + 1]
      break;

    default:
      break;
  }
}

function moveKnots() {
  for (let i = 1; i < knots.length; i++) {
    let isLast = i == knots.length - 1;

    checkTail(knots[i - 1], knots[i], isLast);
  }
}

function checkTail(head, tail, isLast) {
  isValid = false

  let headY = head.position[0];
  let headX = head.position[1];

  let tailY = tail.position[0];
  let tailX = tail.position[1];

  if (tailY == headY && (tailX == headX || tailX == headX - 1 || tailX == headX + 1)) {
    isValid = true;
  }

  if (tailX == headX && (tailY == headY || tailY == headY - 1 || tailY == headY + 1)) {
    isValid = true;
  }

  if (tailY == headY + 1 && (tailX == headX - 1 || tailX == headX + 1)) {
    isValid = true;
  }

  if (tailY == headY - 1 && (tailX == headX - 1 || tailX == headX + 1)) {
    isValid = true;
  }

  if (tailX == headX + 1 && (tailY == headY - 1 || tailY == headY + 1)) {
    isValid = true;
  }

  if (tailX == headX - 1 && (tailY == headY - 1 || tailY == headY + 1)) {
    isValid = true;
  }

  if (!isValid) {
    if (tailX != headX) {
      // Left or right?    
      if (headX - tailX > 0) {
        tail.position = [tail.position[0], tail.position[1] + 1];
      } else {
        tail.position = [tail.position[0], tail.position[1] - 1];
      }
    }
    if (tailY != headY) {
      if (headY - tailY > 0) {
        tail.position = [tail.position[0] + 1, tail.position[1]];
      } else {
        tail.position = [tail.position[0] - 1, tail.position[1]];
      }
    }

    if (isLast) {
      map[tail.position.join(",")] = 1;
    }
  }
}

function printResult() {
  let results = Object.keys(map).map(function (key) {
    return key;
  });
  console.log(results.length);
}

function printMap() {
  for (let i = 0; i < knots.length - 1; i++) {
    console.log(knots[i]);
  }
  console.log("");
  console.log("");
}

lineReader.on('close', function () {
  calcResult();
  printResult();
});