let rows = [];
let map = [];

let xSize = 0;
let ySize = 0;

let count = 0;
let edgeCount = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  rows.push(line.split("").map(Number));
});

function buildMap() {
  for (let i = 0; i < rows.length; i++) {
    map.push(Array(rows[i].length).fill(0));
  }

  xSize = rows.length;
  ySize = rows[0].length;
}

function calcResult() {
  for (let y = 1; y < ySize - 1; y++) {
    for (let x = 1; x < xSize - 1; x++) {
      let tree = rows[y][x];
      checkAround(tree, y, x);
    }

  }

  // Add edges
  edgeCount = (xSize * 2) + (ySize * 2) - 4;
}

function checkAround(tree, y, x) {
  LookLeft(tree, y, x);
  LookRight(tree, y, x);
  LookUp(tree, y, x);
  LookDown(tree, y, x);
}

function LookLeft(tree, y, x) {
  let treeCount = 0;
  for (let i = x; i > 0; i--) {
    let nextTree = rows[y][i - 1];
    if (nextTree >= tree) {
      map[y][x] = treeCount + 1;
      return false;
    }
    treeCount++;
  }

  map[y][x] = treeCount;
  return false;
}

function LookRight(tree, y, x) {
  let treeCount = 0;
  for (let i = x; i < xSize - 1; i++) {
    let nextTree = rows[y][i + 1];
    if (nextTree >= tree) {
      map[y][x] = map[y][x] * (treeCount + 1);
      return false;
    }
    treeCount++;
  }

  map[y][x] = map[y][x] * treeCount;
  return false;
}

function LookUp(tree, y, x) {
  let treeCount = 0;
  for (let i = y; i > 0; i--) {
    let nextTree = rows[i - 1][x];
    if (nextTree >= tree) {
      map[y][x] = map[y][x] * (treeCount + 1);
      return false;
    }
    treeCount++;
  }

  map[y][x] =  map[y][x] * treeCount;
  return false;
}

function LookDown(tree, y, x) {
  let treeCount = 0;
  for (let i = y; i < ySize - 1; i++) {
    let nextTree = rows[i + 1][x];
    if (nextTree >= tree) {
      map[y][x] = map[y][x] * (treeCount + 1);
      return false;
    }
    treeCount++;
  }

  map[y][x] =  map[y][x] * treeCount;
  return false;
}

function printResult() {
  for (let i = 0; i < map.length; i++) {
    count = Math.max(count, map[i].reduce((accumulator, currentValue) => Math.max(accumulator, currentValue),  0));
  }

  console.log(count);
}

lineReader.on('close', function () {
  buildMap();
  calcResult();
  printResult();
});

